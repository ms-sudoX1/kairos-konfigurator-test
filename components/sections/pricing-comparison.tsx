const DE_ITEMS = [
  "6 Implantate (Straumann)",
  "6 Vollkeramik-Kronen",
  "Diagnostik & Vorbereitung",
  "Nachsorge",
];

const KAIROS_ITEMS = [
  "6 Implantate (Straumann)",
  "6 Vollkeramik-Kronen",
  "Diagnostik & Vorbereitung",
  "Nachsorge in DE-Partnerpraxis",
  "7 Tage 5★ Hotel inkl. Frühstück",
  "Flughafen-Transfer & Konzierge",
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
            Beispielszenario: Komplettsanierung mit sechs Implantaten und sechs Kronen — ein typischer Fall, mit dem wir täglich arbeiten.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-stretch">
          <div className="card">
            <div className="eyebrow mb-2">Deutschland</div>
            <div className="font-display text-5xl md:text-6xl text-[color:var(--text-secondary)] line-through decoration-1">
              18.500 €
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
              6.890 €
            </div>
            <div className="text-xs text-[color:var(--text-secondary)] mt-2">
              ≈ 63 % unter dem deutschen Vergleichspreis
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
