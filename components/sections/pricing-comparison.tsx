const DE_ITEMS = [
  "Komplette Gebisssanierung",
  "Premium-Materialien (Straumann, Nobel Biocare)",
  "Diagnostik und Vorbereitung",
  "Reine Behandlung, ohne Hotel/Flug/Transfer",
];

const KAIROS_ITEMS = [
  "Komplette Gebisssanierung",
  "Selbe Premium-Materialien",
  "7 Tage 5★ Hotel mit Nilblick",
  "Direktflüge ab Deutschland inklusive",
  "Privater Chauffeur ganzer Aufenthalt",
  "Garantierte Nachsorge in DE",
];

export function PricingComparison() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Preis-Vergleich</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Identische Leistung.
            <br />
            <span className="italic text-[color:var(--gold-text)]">Anderes Preisschild.</span>
          </h2>
          <p className="text-sm text-[color:var(--text-secondary)] mt-5 max-w-xl">
            Beispielszenario: Komplettsanierung Full Mouth Restoration (Hollywood Smile) — eine vollständige ästhetische Rekonstruktion.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-stretch">
          <div className="card">
            <div className="eyebrow mb-2">Deutschland</div>
            <div className="font-display text-5xl md:text-6xl text-[color:var(--text-secondary)] line-through decoration-1">
              bis zu 35.000 €
            </div>
            <div className="text-xs text-[color:var(--text-muted)] mt-2">
              Vergleichspreise in Deutschland
            </div>
            <ul className="mt-7 space-y-2 text-sm text-[color:var(--text-secondary)]">
              {DE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[color:var(--text-muted)] mt-[2px]">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <span className="roman text-4xl">vs.</span>
          </div>
          <div className="md:hidden flex items-center justify-center py-2">
            <span className="roman text-3xl">vs.</span>
          </div>

          <div className="card card-strong relative overflow-hidden">
            <div className="eyebrow text-[color:var(--gold-text)] mb-2">Kairos Confi Dent</div>
            <div className="font-display text-5xl md:text-6xl text-[color:var(--gold-text)]">
              ab 7.990 €
            </div>
            <div className="text-xs text-[color:var(--gold-text)]/80 mt-2">
              Luxury Package All-Inclusive
            </div>
            <div className="text-xs text-[color:var(--text-secondary)] mt-1">
              ca. 77 % unter dem deutschen Vergleichspreis
            </div>
            <ul className="mt-7 space-y-2 text-sm text-[color:var(--text-primary)]">
              {KAIROS_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[color:var(--gold-text)] mt-[2px]">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-[color:var(--text-muted)] mt-8">
          Indikative Preise. Endgültige Investition nach individuellem Befund.
        </p>
      </div>
    </section>
  );
}
