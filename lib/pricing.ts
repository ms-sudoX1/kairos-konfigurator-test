/**
 * Konfigurator-Preis-Mapping (clientside).
 *
 * Anker aus Mockup: 4-8 Zähne Implantate + 7 Tage 5★ ≈ ab 6.890 €.
 * Andere Kombinationen plausibel im selben Range interpoliert.
 *
 * Hinweis: Indikative Schätzung. Verbindliches Angebot nur nach
 * individuellem Befund.
 */

export type TreatmentId =
  | "implants"
  | "veneers"
  | "bleaching"
  | "crowns"
  | "full"
  | "consult";

export type ScopeId = "1-3" | "4-8" | "all" | "consult";

export type HotelTier = "4-star" | "5-star" | "resort";
export type TravelDays = 5 | 7 | 10 | 14;
export type CompanionMode = "alone" | "partner" | "family";

export interface ConfiguratorState {
  treatments: TreatmentId[];
  scope: ScopeId | null;
  travelDays: TravelDays | null;
  hotelTier: HotelTier | null;
  companionMode: CompanionMode | null;
  familyCount: number; // additional people beyond the user
  travelMonth: string | null; // "YYYY-MM"
}

export const TREATMENT_OPTIONS: { id: TreatmentId; label: string }[] = [
  { id: "implants", label: "Implantate" },
  { id: "veneers", label: "Veneers" },
  { id: "bleaching", label: "Bleaching" },
  { id: "crowns", label: "Kronen / Brücken" },
  { id: "full", label: "Komplettsanierung" },
  { id: "consult", label: "Beratung gewünscht" },
];

export const SCOPE_OPTIONS: { id: ScopeId; label: string }[] = [
  { id: "1-3", label: "1 – 3 Zähne" },
  { id: "4-8", label: "4 – 8 Zähne" },
  { id: "all", label: "Komplette Sanierung" },
  { id: "consult", label: "Erst beraten lassen" },
];

export const HOTEL_OPTIONS: { id: HotelTier; label: string }[] = [
  { id: "4-star", label: "4★ Boutique" },
  { id: "5-star", label: "5★ Hotel" },
  { id: "resort", label: "5★ Resort am Roten Meer" },
];

export const TRAVEL_DAY_OPTIONS: { id: TravelDays; label: string }[] = [
  { id: 5, label: "5 Tage" },
  { id: 7, label: "7 Tage" },
  { id: 10, label: "10 Tage" },
  { id: 14, label: "14 Tage" },
];

export const COMPANION_OPTIONS: { id: CompanionMode; label: string }[] = [
  { id: "alone", label: "Ich reise allein" },
  { id: "partner", label: "Mit Partner / Partnerin" },
  { id: "family", label: "Mit Familie" },
];

// Treatment-Preise je Scope (in EUR, Kairos-Preis inklusive Material).
const TREATMENT_PRICES: Record<TreatmentId, Record<ScopeId, number>> = {
  implants:    { "1-3": 2490, "4-8": 5300, all: 11500, consult: 0 },
  veneers:     { "1-3": 1490, "4-8": 3290, all:  7500, consult: 0 },
  bleaching:   { "1-3":  290, "4-8":  390, all:   490, consult: 0 },
  crowns:      { "1-3":  990, "4-8": 2890, all:  6500, consult: 0 },
  full:        { "1-3": 2990, "4-8": 5890, all: 11890, consult: 0 },
  consult:     { "1-3":    0, "4-8":    0, all:     0, consult: 0 },
};

// Hotel-Tagespreis pro Person in EUR.
const HOTEL_DAY_RATE: Record<HotelTier, number> = {
  "4-star": 130,
  "5-star": 220,
  resort:   320,
};

// Service-Pauschale (Transfer, Übersetzer, Konzierge) pro Reise.
const SERVICE_FEE = 50;

function personMultiplier(state: ConfiguratorState): number {
  if (state.companionMode === "alone") return 1;
  if (state.companionMode === "partner") return 1.7;
  if (state.companionMode === "family") {
    const extras = Math.max(0, Math.min(state.familyCount, 5));
    return 1 + extras * 0.6;
  }
  return 1;
}

export function calcTreatmentTotal(state: ConfiguratorState): number {
  if (!state.scope) return 0;
  const scope = state.scope;
  return state.treatments.reduce((sum, id) => sum + TREATMENT_PRICES[id][scope], 0);
}

export function calcTravelTotal(state: ConfiguratorState): number {
  if (!state.travelDays || !state.hotelTier) return 0;
  const base = HOTEL_DAY_RATE[state.hotelTier] * state.travelDays;
  return Math.round(base * personMultiplier(state));
}

export function calcServiceFee(state: ConfiguratorState): number {
  if (!state.travelDays && state.treatments.length === 0) return 0;
  return SERVICE_FEE;
}

export function calcGrandTotal(state: ConfiguratorState): number {
  return calcTreatmentTotal(state) + calcTravelTotal(state) + calcServiceFee(state);
}

export function formatEUR(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function germanyEquivalent(state: ConfiguratorState): number {
  // Heuristik für DE-Vergleichspreis: Behandlungs-Anteil × 2.7 (entspricht
  // Mockup-Anker 18.500 / 6.890 ≈ 2.7).
  const treatments = calcTreatmentTotal(state);
  if (treatments === 0) return 0;
  return Math.round(treatments * 2.7);
}

// Wunsch-Reisemonat-Optionen: nächste 12 Monate ab "jetzt".
export function nextTwelveMonths(now = new Date()): { value: string; label: string }[] {
  const monthLabels = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];
  const list: { value: string; label: string }[] = [];
  const base = new Date(now.getFullYear(), now.getMonth(), 1);
  for (let i = 1; i <= 12; i += 1) {
    const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
    const v = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    list.push({ value: v, label: `${monthLabels[d.getMonth()]} ${d.getFullYear()}` });
  }
  return list;
}
