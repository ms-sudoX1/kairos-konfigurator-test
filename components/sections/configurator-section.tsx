"use client";

import dynamic from "next/dynamic";

const Configurator = dynamic(
  () => import("@/components/configurator/configurator").then((m) => m.Configurator),
  {
    ssr: false,
    loading: () => (
      <div className="card card-strong min-h-[480px] grid place-items-center text-[color:var(--text-secondary)] text-sm">
        Konfigurator wird geladen …
      </div>
    ),
  }
);

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
