import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="card text-center py-16 md:py-24">
          <div className="eyebrow mb-5">Ihr nächster Schritt</div>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-tight max-w-3xl mx-auto text-[color:var(--text-primary)]">
            Ihr neues Lächeln{" "}
            <span className="italic text-[color:var(--gold-text)]">beginnt jetzt.</span>
          </h2>
          <p className="text-[color:var(--text-secondary)] max-w-xl mx-auto mt-6 leading-relaxed">
            Kostenlose Erstberatung. Keine Kostenvorab. Antwort innerhalb von 24 Stunden.
          </p>
          <div className="mt-10">
            <Link href="/konfigurator" className="btn-primary">
              Jetzt kostenlose Beratung sichern
            </Link>
          </div>
          <p className="text-xs text-[color:var(--text-muted)] mt-6 max-w-md mx-auto">
            Indikative Schätzung. Verbindliches Angebot ausschließlich über{" "}
            <a href="https://kairosconfident.de" className="underline decoration-dotted hover:text-[color:var(--gold-text)]">
              kairosconfident.de
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
