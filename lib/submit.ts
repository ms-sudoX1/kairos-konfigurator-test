import type { ConfiguratorState } from "./pricing";

const DEFAULT_WEBHOOK = "https://flow.admantics.eu/webhook/kairos-test-lead";

export interface LeadPayload {
  source: "kairos-konfigurator-test";
  submittedAt: string;
  contact: {
    firstName: string;
    email: string;
    phone?: string;
    consent: true;
  };
  configuration: ConfiguratorState;
  estimate: {
    treatments: number;
    travel: number;
    serviceFee: number;
    total: number;
    germanyEquivalent: number;
    currency: "EUR";
  };
  meta?: {
    referrer?: string;
    userAgent?: string;
    locale?: string;
  };
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; status: number }> {
  const url = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || DEFAULT_WEBHOOK;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok, status: res.status };
}
