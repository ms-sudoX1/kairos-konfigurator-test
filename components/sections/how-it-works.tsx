const STEPS = [
  {
    roman: "i.",
    title: "Konfigurieren.",
    body:
      "Sie skizzieren Ihren Wunsch in sechs Schritten. Behandlung, Reise, Begleitung — wir kalkulieren Ihre indikative Investition in Echtzeit.",
  },
  {
    roman: "ii.",
    title: "Beraten.",
    body:
      "Innerhalb von 24 Stunden meldet sich Ihre persönliche Ansprechpartnerin mit drei konkreten Reise-Fenstern und einer ärztlichen Ersteinschätzung.",
  },
  {
    roman: "iii.",
    title: "Reisen.",
    body:
      "Wir koordinieren Klinik, Hotel, Transfer und Nachsorge. Sie kommen mit gepacktem Koffer — und mit einem neuen Lächeln zurück.",
  },
];

export function HowItWorks() {
  return (
    <section id="wie" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">So funktioniert&apos;s</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Drei Schritte zwischen Anfrage und{" "}
            <span className="italic text-[color:var(--gold-text)]">neuem Lächeln</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.roman} className="card">
              <div className="roman text-3xl md:text-4xl mb-5">{s.roman}</div>
              <h3 className="font-display text-2xl text-[color:var(--text-primary)] mb-3">{s.title}</h3>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
