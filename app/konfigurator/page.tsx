import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Configurator } from "@/components/configurator/configurator";
import { Trust } from "@/components/sections/trust";

export const metadata: Metadata = {
  title: "Konfigurator — Ihr Paket in sechs Schritten",
  description:
    "Konfigurieren Sie Behandlung, Reise und Begleitung in sechs Schritten. Indikative Investition in Echtzeit. Persönliche Beratung innerhalb von 24 Stunden.",
};

export default function KonfiguratorPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">
        <section className="pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10">
            <div className="eyebrow">Konfigurator</div>
            <h1 className="font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-tight mt-5 max-w-3xl text-[color:var(--text-primary)]">
              Ihr Premium-Paket. <span className="italic text-[color:var(--gold-text)]">Sechs Schritte.</span>
            </h1>
            <p className="text-lg text-[color:var(--text-secondary)] max-w-2xl mt-6 leading-relaxed">
              Skizzieren Sie Ihre Wünsche. Der Konfigurator zeigt Ihnen Echtzeit-Schätzung und Vergleich zu Deutschland. Verbindliches Angebot folgt nach individuellem Befund.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10">
            <Configurator />
          </div>
        </section>

        <Trust />
      </main>
      <SiteFooter />
    </>
  );
}
