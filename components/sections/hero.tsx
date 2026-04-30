import Link from "next/link";

const STATS = [
  { value: "70 %", label: "Ersparnis vs. Deutschland" },
  { value: "5★", label: "Klinik & Hotel" },
  { value: "24 h", label: "Antwort auf Anfrage" },
  { value: "DE", label: "Materialien & Beratung" },
];

export function Hero() {
  return (
    <section className="relative pt-20 md:pt-28 pb-12 md:pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="eyebrow">Premium Zahntourismus · Kairo</div>
        <h1 className="font-display text-[clamp(2.5rem,6vw,4.8rem)] leading-[1.05] mt-5 max-w-4xl text-[color:var(--text-primary)]">
          Ihr neues Lächeln.
          <br />
          <span className="italic text-[color:var(--gold-text)]">Echter Urlaub.</span>
          <br />
          Bis zu 70 % günstiger.
        </h1>
        <p className="text-lg md:text-xl text-[color:var(--text-secondary)] max-w-2xl mt-7 leading-relaxed">
          Kombinieren Sie hochwertige Zahnmedizin in Kairo mit einem Aufenthalt in einem 5★-Resort. Master-zertifizierte Zahnärzte, deutsche Materialien, persönliche Begleitung — von der Anreise bis zur Nachsorge.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/konfigurator" className="btn-primary">
            Jetzt kostenlose Beratung sichern
          </Link>
          <Link href="#wie" className="btn-secondary">
            So funktioniert&apos;s
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl text-[color:var(--gold-text)]">
                {s.value}
              </div>
              <div className="eyebrow mt-2 text-[color:var(--text-secondary)]">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[color:var(--text-muted)] mt-10 max-w-xl">
          Indikative Vergleichswerte. Verbindliche Angebote ausschließlich nach individuellem Befund über die Master-Site
          {" "}
          <a href="https://kairosconfident.de" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-[color:var(--gold-text)]">
            kairosconfident.de
          </a>.
        </p>
      </div>
    </section>
  );
}
