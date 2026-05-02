import type { ConfiguratorState } from "./pricing";
import type { UTMParams } from "./utm";

const DEFAULT_WEBHOOK = "https://flow.admantics.eu/webhook/kairos-test-lead";
const TIMEOUT_MS = 15_000;

export interface LeadEstimate {
  treatments_eur: number;
  travel_eur: number;
  service_fee_eur: number;
  total_eur: number;
  germany_equivalent_eur: number;
  currency: "EUR";
}

export interface KlaroConsentMeta {
  lead_submission: boolean;
  accepted_at: string | null;
}

export interface LeadSubmitInput {
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  consent_given: boolean;
  utm: UTMParams;
  landing_page_url: string;
  referrer_url: string | null;
  user_agent: string;
  state: ConfiguratorState;
  estimate: LeadEstimate;
  klaro_consent: KlaroConsentMeta;
}

export type SubmitResult =
  | { kind: "success"; leadId: string | null; mailFailed: boolean }
  | { kind: "consent_required" }
  | { kind: "missing_required" }
  | { kind: "rate_limit"; retryAfterSeconds: number }
  | { kind: "server_error"; status: number }
  | { kind: "network_error" }
  | { kind: "timeout" };

function buildPayload(input: LeadSubmitInput) {
  return {
    contact_name: input.contact_name,
    contact_email: input.contact_email,
    contact_phone: input.contact_phone,
    consent_given: input.consent_given,
    utm_source: input.utm.utm_source,
    utm_medium: input.utm.utm_medium,
    utm_campaign: input.utm.utm_campaign,
    utm_content: input.utm.utm_content,
    utm_term: input.utm.utm_term,
    landing_page_url: input.landing_page_url,
    referrer_url: input.referrer_url,
    user_agent: input.user_agent,
    form_data: {
      step1: { treatments: input.state.treatments },
      step2: { scope: input.state.scope },
      step3: {
        travel_days: input.state.travelDays,
        hotel_tier: input.state.hotelTier,
      },
      step4: {
        companion_mode: input.state.companionMode,
        family_count: input.state.familyCount,
      },
      step5: { travel_month: input.state.travelMonth },
      step6: { contact_consent_acknowledged: input.consent_given },
      estimate: input.estimate,
      _meta: {
        klaro_consent: input.klaro_consent,
      },
    },
  };
}

function parseRetryAfter(headerValue: string | null): number {
  if (!headerValue) return 60;
  const asNumber = Number(headerValue);
  if (Number.isFinite(asNumber) && asNumber > 0) return Math.ceil(asNumber);
  const asDate = Date.parse(headerValue);
  if (!Number.isNaN(asDate)) {
    const delta = Math.ceil((asDate - Date.now()) / 1000);
    return delta > 0 ? delta : 60;
  }
  return 60;
}

async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function submitLead(input: LeadSubmitInput): Promise<SubmitResult> {
  const url = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || DEFAULT_WEBHOOK;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(input)),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof DOMException && err.name === "AbortError") {
      return { kind: "timeout" };
    }
    return { kind: "network_error" };
  }
  clearTimeout(timer);

  if (res.status === 200) {
    const body = await safeJson(res);
    const status = typeof body?.status === "string" ? body.status : null;
    const leadId = typeof body?.lead_id === "string" ? body.lead_id : null;
    return {
      kind: "success",
      leadId,
      mailFailed: status === "ok_mail_failed",
    };
  }

  if (res.status === 400) {
    const body = await safeJson(res);
    if (body?.error === "consent_required") return { kind: "consent_required" };
    return { kind: "server_error", status: 400 };
  }

  if (res.status === 422) {
    return { kind: "missing_required" };
  }

  if (res.status === 429) {
    return {
      kind: "rate_limit",
      retryAfterSeconds: parseRetryAfter(res.headers.get("Retry-After")),
    };
  }

  return { kind: "server_error", status: res.status };
}
