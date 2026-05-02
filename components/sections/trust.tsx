const TRUST_ITEMS = [
  {
    roman: "i.",
    title: "Materialien aus DE & CH.",
    body:
      "Namhafte deutsche und schweizer Hersteller, identische Qualitätsklasse wie in einer Premium-Praxis in München.",
  },
  {
    roman: "ii.",
    title: "Master-zertifizierte Zahnärzte.",
    body:
      "International zertifizierte Behandlerinnen und Behandler mit Spezialisierung auf Implantologie und ästhetische Zahnmedizin.",
  },
  {
    roman: "iii.",
    title: "Garantie & Nachsorge.",
    body:
      "Schriftliche Garantie auf alle Arbeiten. Nachsorge-Koordination auf Wunsch in Deutschland.",
  },
];

export function Trust() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Was Vertrauen schafft</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Premium ist <span className="italic text-[color:var(--gold-text)]">kein Versprechen.</span>
            <br />
            Es ist ein Standard.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TRUST_ITEMS.map((s) => (
            <div key={s.roman} className="card">
              <div className="w-14 h-14 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center mb-6">
                <span className="roman text-2xl">{s.roman}</span>
              </div>
              <h3 className="font-display text-2xl text-[color:var(--text-primary)] mb-3">{s.title}</h3>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
