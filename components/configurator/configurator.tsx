"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  COMPANION_OPTIONS,
  HOTEL_OPTIONS,
  SCOPE_OPTIONS,
  TRAVEL_DAY_OPTIONS,
  TREATMENT_OPTIONS,
  calcGrandTotal,
  calcServiceFee,
  calcTravelTotal,
  calcTreatmentTotal,
  formatEUR,
  germanyEquivalent,
  nextTwelveMonths,
  type CompanionMode,
  type ConfiguratorState,
  type HotelTier,
  type ScopeId,
  type TravelDays,
  type TreatmentId,
} from "@/lib/pricing";
import { submitLead, type SubmitResult } from "@/lib/submit";
import { readUTMFromWindow, type UTMParams } from "@/lib/utm";
import { getLeadSubmissionConsent, openConsentModal } from "@/components/consent/consent-provider";

const STEP_COUNT = 6;
const MAX_TREATMENTS = 3;

const initialState: ConfiguratorState = {
  treatments: [],
  scope: null,
  travelDays: null,
  hotelTier: null,
  companionMode: null,
  familyCount: 2,
  travelMonth: null,
};

const leadSchema = z.object({
  firstName: z
    .string()
    .min(2, "Bitte mindestens 2 Zeichen")
    .max(60, "Bitte kürzer fassen"),
  email: z.string().email("Bitte gültige E-Mail-Adresse"),
  phone: z
    .string()
    .max(40)
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    message: "Bitte zustimmen, damit wir dich kontaktieren dürfen.",
  }),
});

type LeadForm = z.infer<typeof leadSchema>;

type SubmitErrorState =
  | { kind: "consent_required" }
  | { kind: "missing_required" }
  | { kind: "rate_limit"; retryAfterSeconds: number }
  | { kind: "server_error" }
  | { kind: "network_error" }
  | { kind: "timeout" };

export function Configurator() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<ConfiguratorState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitErrorState | null>(null);
  const [utm] = useState<UTMParams>(() => readUTMFromWindow());

  const form = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: { firstName: "", email: "", phone: "", consent: false as unknown as true },
    mode: "onTouched",
  });

  const total = useMemo(() => calcGrandTotal(state), [state]);
  const treatmentTotal = useMemo(() => calcTreatmentTotal(state), [state]);
  const travelTotal = useMemo(() => calcTravelTotal(state), [state]);
  const serviceFee = useMemo(() => calcServiceFee(state), [state]);
  const deEquiv = useMemo(() => germanyEquivalent(state), [state]);
  const months = useMemo(() => nextTwelveMonths(), []);

  // Validation per Step → controls "Weiter"-Button.
  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return state.treatments.length > 0;
      case 1:
        return state.scope !== null;
      case 2:
        return state.travelDays !== null && state.hotelTier !== null;
      case 3:
        return state.companionMode !== null;
      case 4:
        return state.travelMonth !== null;
      case 5:
        return form.formState.isValid;
      default:
        return false;
    }
  }, [step, state, form.formState.isValid]);

  const next = () => {
    if (step < STEP_COUNT - 1) setStep((s) => s + 1);
  };
  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const onSubmit: SubmitHandler<LeadForm> = async (values) => {
    if (submitting) return;
    setSubmitError(null);

    // Klaro-Gate (E172). Submit nur nach explizitem lead-submission-Consent.
    const klaro = getLeadSubmissionConsent();
    if (!klaro.accepted) {
      setSubmitError({ kind: "consent_required" });
      openConsentModal();
      return;
    }

    setSubmitting(true);
    const phone = values.phone?.trim() || null;
    const email = values.email?.trim() || null;

    const result: SubmitResult = await submitLead({
      contact_name: values.firstName.trim(),
      contact_email: email,
      contact_phone: phone,
      consent_given: values.consent === true,
      utm,
      landing_page_url:
        typeof window !== "undefined" ? window.location.href : "https://kairos-konfigurator-test.vercel.app/konfigurator",
      referrer_url:
        typeof document !== "undefined" && document.referrer ? document.referrer : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      state,
      estimate: {
        treatments_eur: treatmentTotal,
        travel_eur: travelTotal,
        service_fee_eur: serviceFee,
        total_eur: total,
        germany_equivalent_eur: deEquiv,
        currency: "EUR",
      },
      klaro_consent: {
        lead_submission: klaro.accepted,
        accepted_at: klaro.acceptedAt,
      },
    });

    setSubmitting(false);

    switch (result.kind) {
      case "success":
        if (result.mailFailed) {
          console.warn("[lead] webhook returned ok_mail_failed — server-side mail delivery failed");
        }
        if (result.leadId) {
          console.info("[lead] submitted", { leadId: result.leadId });
        }
        setSuccess(true);
        return;
      case "consent_required":
        setSubmitError({ kind: "consent_required" });
        openConsentModal();
        return;
      case "missing_required":
        setSubmitError({ kind: "missing_required" });
        return;
      case "rate_limit":
        setSubmitError({ kind: "rate_limit", retryAfterSeconds: result.retryAfterSeconds });
        return;
      case "timeout":
        setSubmitError({ kind: "timeout" });
        return;
      case "network_error":
        setSubmitError({ kind: "network_error" });
        return;
      case "server_error":
        setSubmitError({ kind: "server_error" });
        return;
    }
  };

  if (success) {
    return <SuccessScreen firstName={form.getValues("firstName")} total={total} />;
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
      <div className="card relative">
        <StepIndicator current={step} count={STEP_COUNT} />

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            // Prevent accidental submit on Enter while not on final step.
            if (e.key === "Enter" && step < STEP_COUNT - 1) e.preventDefault();
          }}
        >
          <div className="min-h-[360px] mt-8">
            {step === 0 && <Step1 state={state} setState={setState} />}
            {step === 1 && <Step2 state={state} setState={setState} />}
            {step === 2 && <Step3 state={state} setState={setState} />}
            {step === 3 && <Step4 state={state} setState={setState} />}
            {step === 4 && <Step5 state={state} setState={setState} months={months} />}
            {step === 5 && (
              <Step6
                form={form}
                submitError={submitError}
              />
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className="btn-ghost inline-flex items-center gap-1 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
              Zurück
            </button>

            {step < STEP_COUNT - 1 ? (
              <button
                type="button"
                onClick={next}
                disabled={!canAdvance}
                className="btn-primary"
              >
                Weiter
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canAdvance || submitting}
                className="btn-primary"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sende …
                  </>
                ) : (
                  <>Beratung anfragen</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      <LivePreview
        state={state}
        treatmentTotal={treatmentTotal}
        travelTotal={travelTotal}
        serviceFee={serviceFee}
        total={total}
        deEquiv={deEquiv}
      />
    </div>
  );
}

/* ============================================================
   STEP INDICATOR
   ============================================================ */

function StepIndicator({ current, count }: { current: number; count: number }) {
  return (
    <div>
      <div className="eyebrow mb-3">
        Schritt {current + 1} von {count}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const state = i < current ? "done" : i === current ? "active" : "todo";
          return <div key={i} className="step-bar" data-state={state} />;
        })}
      </div>
    </div>
  );
}

/* ============================================================
   STEP COMPONENTS
   ============================================================ */

interface StepProps {
  state: ConfiguratorState;
  setState: React.Dispatch<React.SetStateAction<ConfiguratorState>>;
}

function Step1({ state, setState }: StepProps) {
  const toggle = (id: TreatmentId) => {
    setState((s) => {
      const exists = s.treatments.includes(id);
      if (exists) return { ...s, treatments: s.treatments.filter((t) => t !== id) };
      if (s.treatments.length >= MAX_TREATMENTS) return s;
      return { ...s, treatments: [...s.treatments, id] };
    });
  };
  return (
    <div>
      <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-2 text-[color:var(--text-primary)]">
        Was möchten Sie behandeln lassen?
      </h3>
      <p className="text-sm text-[color:var(--text-secondary)] mb-6">
        Mehrfachauswahl möglich — bis zu drei Optionen.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {TREATMENT_OPTIONS.map((opt) => {
          const selected = state.treatments.includes(opt.id);
          const disabled = !selected && state.treatments.length >= MAX_TREATMENTS;
          return (
            <button
              key={opt.id}
              type="button"
              className="option-btn"
              data-selected={selected}
              disabled={disabled}
              onClick={() => toggle(opt.id)}
            >
              <span>{opt.label}</span>
              {selected && <Check className="option-btn-check" size={18} />}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-[color:var(--text-muted)] mt-5">
        {state.treatments.length} von {MAX_TREATMENTS} ausgewählt
      </p>
    </div>
  );
}

function Step2({ state, setState }: StepProps) {
  const select = (id: ScopeId) => setState((s) => ({ ...s, scope: id }));
  return (
    <div>
      <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-2 text-[color:var(--text-primary)]">
        Wie umfangreich ist Ihre Behandlung?
      </h3>
      <p className="text-sm text-[color:var(--text-secondary)] mb-6">
        Eine grobe Einschätzung reicht — der Befund passt es später präzise an.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {SCOPE_OPTIONS.map((opt) => {
          const selected = state.scope === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className="option-btn"
              data-selected={selected}
              onClick={() => select(opt.id)}
            >
              <span>{opt.label}</span>
              {selected && <Check className="option-btn-check" size={18} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step3({ state, setState }: StepProps) {
  const setDays = (id: TravelDays) => setState((s) => ({ ...s, travelDays: id }));
  const setHotel = (id: HotelTier) => setState((s) => ({ ...s, hotelTier: id }));
  return (
    <div>
      <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-2 text-[color:var(--text-primary)]">
        Wie soll Ihre Reise aussehen?
      </h3>
      <p className="text-sm text-[color:var(--text-secondary)] mb-6">
        Reisedauer und Unterkunfts-Klasse.
      </p>

      <div className="eyebrow mb-3">Aufenthalt</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {TRAVEL_DAY_OPTIONS.map((opt) => {
          const selected = state.travelDays === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className="option-btn justify-center"
              data-selected={selected}
              onClick={() => setDays(opt.id)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="eyebrow mb-3">Unterkunft</div>
      <div className="grid sm:grid-cols-3 gap-3">
        {HOTEL_OPTIONS.map((opt) => {
          const selected = state.hotelTier === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className="option-btn"
              data-selected={selected}
              onClick={() => setHotel(opt.id)}
            >
              <span>{opt.label}</span>
              {selected && <Check className="option-btn-check" size={18} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({ state, setState }: StepProps) {
  const select = (id: CompanionMode) => setState((s) => ({ ...s, companionMode: id }));
  return (
    <div>
      <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-2 text-[color:var(--text-primary)]">
        Wer reist mit?
      </h3>
      <p className="text-sm text-[color:var(--text-secondary)] mb-6">
        Persönliche Begleitung ist auf Wunsch jederzeit möglich.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        {COMPANION_OPTIONS.map((opt) => {
          const selected = state.companionMode === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className="option-btn"
              data-selected={selected}
              onClick={() => select(opt.id)}
            >
              <span>{opt.label}</span>
              {selected && <Check className="option-btn-check" size={18} />}
            </button>
          );
        })}
      </div>

      {state.companionMode === "family" && (
        <div className="card border-[color:var(--border)] flex items-center justify-between">
          <div>
            <div className="text-sm text-[color:var(--text-primary)]">Anzahl mitreisender Personen (zusätzlich)</div>
            <div className="text-xs text-[color:var(--text-muted)]">Maximal 5</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setState((s) => ({ ...s, familyCount: Math.max(1, s.familyCount - 1) }))}
            >
              −
            </button>
            <div className="font-display text-2xl w-10 text-center text-[color:var(--gold-text)]">
              {state.familyCount}
            </div>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setState((s) => ({ ...s, familyCount: Math.min(5, s.familyCount + 1) }))}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Step5({
  state,
  setState,
  months,
}: StepProps & { months: { value: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-2 text-[color:var(--text-primary)]">
        Wann möchten Sie reisen?
      </h3>
      <p className="text-sm text-[color:var(--text-secondary)] mb-6">
        Wählen Sie Ihren Wunsch-Reisemonat. Wir prüfen Verfügbarkeit und melden uns mit drei konkreten Reise-Fenstern zurück.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {months.map((m) => {
          const selected = state.travelMonth === m.value;
          return (
            <button
              key={m.value}
              type="button"
              className="option-btn justify-center"
              data-selected={selected}
              onClick={() => setState((s) => ({ ...s, travelMonth: m.value }))}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function submitErrorMessage(err: SubmitErrorState): {
  text: string;
  showRetry: boolean;
  showConsentReopen: boolean;
} {
  switch (err.kind) {
    case "consent_required":
      return {
        text: "Bitte akzeptiere im Cookie-Banner die Anfrage-Übermittlung, damit wir deine Anfrage verarbeiten dürfen.",
        showRetry: false,
        showConsentReopen: true,
      };
    case "missing_required":
      return {
        text: "Bitte gib eine E-Mail-Adresse oder Telefonnummer an.",
        showRetry: false,
        showConsentReopen: false,
      };
    case "rate_limit":
      return {
        text: `Zu viele Anfragen. Bitte versuche es in ${err.retryAfterSeconds} Sekunden erneut.`,
        showRetry: false,
        showConsentReopen: false,
      };
    case "timeout":
      return {
        text: "Die Anfrage hat zu lange gedauert. Bitte erneut versuchen oder direkt an info@kairosconfident.de schreiben.",
        showRetry: true,
        showConsentReopen: false,
      };
    case "network_error":
    case "server_error":
      return {
        text: "Tut uns leid, technischer Fehler. Bitte schreibe uns direkt an info@kairosconfident.de oder versuche es erneut.",
        showRetry: true,
        showConsentReopen: false,
      };
  }
}

function Step6({
  form,
  submitError,
}: {
  form: ReturnType<typeof useForm<LeadForm>>;
  submitError: SubmitErrorState | null;
}) {
  const { register, formState: { errors } } = form;
  const errInfo = submitError ? submitErrorMessage(submitError) : null;
  return (
    <div id="lead">
      <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-2 text-[color:var(--text-primary)]">
        Ihre Beratung — kostenlos und unverbindlich.
      </h3>
      <p className="text-sm text-[color:var(--text-secondary)] mb-6">
        Wir melden uns innerhalb von 24 Stunden mit einer persönlichen Einschätzung.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="eyebrow mb-2 block">Vorname *</span>
          <input
            type="text"
            autoComplete="given-name"
            {...register("firstName")}
            className="input-field"
            placeholder="z. B. Maria"
          />
          {errors.firstName && (
            <span className="text-xs text-red-400 mt-1 block">{errors.firstName.message}</span>
          )}
        </label>

        <label className="block">
          <span className="eyebrow mb-2 block">E-Mail *</span>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className="input-field"
            placeholder="ihre@email.de"
          />
          {errors.email && (
            <span className="text-xs text-red-400 mt-1 block">{errors.email.message}</span>
          )}
        </label>

        <label className="block sm:col-span-2">
          <span className="eyebrow mb-2 block">Telefon (optional)</span>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className="input-field"
            placeholder="+49 …"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 mt-6 text-sm text-[color:var(--text-secondary)] cursor-pointer">
        <input
          type="checkbox"
          {...form.register("consent")}
          className="mt-1.5 accent-[color:var(--gold)]"
        />
        <span>
          Ja, ich willige ein, dass Kairos Confi Dent mich per E-Mail oder Telefon zu meiner unverbindlichen Beratung kontaktiert. Diese Einwilligung kann ich jederzeit widerrufen.
        </span>
      </label>
      {errors.consent && (
        <span className="text-xs text-red-400 mt-2 block">{errors.consent.message}</span>
      )}

      {errInfo && (
        <div
          role="alert"
          className="mt-5 text-sm text-red-400 border border-red-400/40 rounded-md px-4 py-3"
        >
          <div>{errInfo.text}</div>
          {errInfo.showConsentReopen && (
            <button
              type="button"
              onClick={openConsentModal}
              className="mt-2 underline text-[color:var(--gold-text)] hover:opacity-80"
            >
              Cookie-Einstellungen öffnen
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   LIVE PREVIEW
   ============================================================ */

interface PreviewProps {
  state: ConfiguratorState;
  treatmentTotal: number;
  travelTotal: number;
  serviceFee: number;
  total: number;
  deEquiv: number;
}

function LivePreview({
  state,
  treatmentTotal,
  travelTotal,
  serviceFee,
  total,
  deEquiv,
}: PreviewProps) {
  const treatmentLabels = state.treatments
    .map((t) => TREATMENT_OPTIONS.find((o) => o.id === t)?.label)
    .filter(Boolean)
    .join(", ");
  const scopeLabel = SCOPE_OPTIONS.find((o) => o.id === state.scope)?.label;
  const travelLabel = state.travelDays
    ? `${state.travelDays} Tage${state.hotelTier ? " · " + HOTEL_OPTIONS.find((o) => o.id === state.hotelTier)?.label : ""}`
    : null;

  return (
    <aside className="card lg:sticky lg:top-24">
      <div className="eyebrow mb-3">Ihr Paket</div>
      <div className="font-display text-[2.4rem] leading-none text-[color:var(--gold-text)]">
        {total > 0 ? `ab ${formatEUR(total)}` : "—"}
      </div>
      <div className="text-xs text-[color:var(--text-muted)] mt-2">
        Indikative Schätzung. Verbindliches Angebot nach individuellem Befund.
      </div>

      {deEquiv > 0 && (
        <div className="mt-5 border border-[color:var(--border)] rounded-xl p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-secondary)]">
            Vergleich Deutschland
          </div>
          <div className="font-display text-lg text-[color:var(--text-secondary)] line-through mt-1">
            {formatEUR(deEquiv)}
          </div>
          <div className="text-xs text-[color:var(--gold-text)] mt-1">
            ≈ {Math.round((1 - total / deEquiv) * 100)} % Ersparnis ggü. DE
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3 text-sm">
        <PreviewRow label="Behandlung" value={treatmentLabels || "—"} secondary={scopeLabel} />
        <PreviewRow label="Reise" value={travelLabel || "—"} />
        <PreviewRow
          label="Begleitung"
          value={
            state.companionMode === "alone"
              ? "Allein"
              : state.companionMode === "partner"
                ? "Mit Partner / Partnerin"
                : state.companionMode === "family"
                  ? `Familie (+${state.familyCount})`
                  : "—"
          }
        />
        {state.travelMonth && (
          <PreviewRow
            label="Wunschmonat"
            value={
              nextTwelveMonths().find((m) => m.value === state.travelMonth)?.label || state.travelMonth
            }
          />
        )}
      </div>

      {total > 0 && (
        <div className="mt-6 pt-5 border-t border-[color:var(--border)] text-xs text-[color:var(--text-muted)] space-y-1">
          <div className="flex justify-between">
            <span>Behandlung</span>
            <span>{formatEUR(treatmentTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Reise</span>
            <span>{formatEUR(travelTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service-Pauschale</span>
            <span>{formatEUR(serviceFee)}</span>
          </div>
        </div>
      )}
    </aside>
  );
}

function PreviewRow({
  label,
  value,
  secondary,
}: {
  label: string;
  value: string;
  secondary?: string;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="eyebrow text-[color:var(--text-muted)] flex-shrink-0">{label}</span>
      <span className="text-right text-[color:var(--text-primary)]">
        {value}
        {secondary && <span className="block text-xs text-[color:var(--text-muted)]">{secondary}</span>}
      </span>
    </div>
  );
}

/* ============================================================
   SUCCESS SCREEN
   ============================================================ */

function SuccessScreen({ firstName, total }: { firstName: string; total: number }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  return (
    <div className="card text-center py-14">
      <div className="mx-auto mb-6 w-14 h-14 rounded-full border border-[color:var(--gold)] flex items-center justify-center">
        <Check size={28} className="text-[color:var(--gold-text)]" />
      </div>
      <h3 className="font-display text-3xl md:text-4xl text-[color:var(--text-primary)] mb-3">
        Vielen Dank{firstName ? `, ${firstName}` : ""}.
      </h3>
      <p className="text-[color:var(--text-secondary)] max-w-xl mx-auto mb-2">
        Ihre Anfrage ist eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen — mit einer ersten Einschätzung
        {total > 0 ? ` zu Ihrem Paket ab ${formatEUR(total)}` : ""} und drei konkreten Reise-Fenstern.
      </p>
      <p className="text-xs text-[color:var(--text-muted)]">
        In dringenden Fällen erreichen Sie uns auch direkt unter <a href="mailto:info@kairosconfident.de" className="text-[color:var(--gold-text)]">info@kairosconfident.de</a>.
      </p>
    </div>
  );
}
