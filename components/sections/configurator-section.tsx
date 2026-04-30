import { Configurator } from "@/components/configurator/configurator";

export function ConfiguratorSection() {
  return (
    <section id="konfigurator" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">Ihr Konfigurator</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Ihr Paket in <span className="italic text-[color:var(--gold-text)]">sechs Schritten</span>.
          </h2>
          <p className="text-sm text-[color:var(--text-secondary)] mt-5 max-w-xl">
            Skizzieren Sie Ihre Wünsche — wir beraten innerhalb von 24 Stunden mit drei konkreten Reise-Fenstern und einer ärztlichen Ersteinschätzung. Kostenlos und unverbindlich.
          </p>
        </div>
        <Configurator />
      </div>
    </section>
  );
}
