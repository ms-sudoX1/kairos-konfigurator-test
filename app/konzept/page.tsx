import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { FOOTER_DISCLAIMER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Konzept — Test-Setup & Hypothesen",
  description:
    "Internes Konzeptpapier zum Konfigurator-Funnel. Hypothesen, KPI-Stack, Test-Setup.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const HYPOTHESES = [
  {
    id: "H₁",
    statement:
      "Ein Konfigurator-Funnel senkt die Lead-Kosten gegenüber der Master-Site, weil er Selbstqualifikation ermöglicht und Anfragen vorstrukturiert.",
    target: "CPL < 45 €",
  },
  {
    id: "H₂",
    statement:
      "Premium-Tonalität in Kombination mit transparentem Preisvergleich erhöht das Vertrauen und steigert die Conversion-Rate vom Besucher zum Lead.",
    target: "CR ≥ 2,5 %",
  },
  {
    id: "H₃",
    statement:
      "Die Live-Preview reduziert Abbrüche im Funnel, weil sie die Investition jederzeit kontextualisiert und Transparenz schafft.",
    target: "Funnel-Completion ≥ 60 %",
  },
  {
    id: "H₄",
    statement:
      "Aus den Lead-Anfragen entsteht ein qualifiziertes Sales-Pipeline-Volumen, das den Test-Aufwand innerhalb des Aktionszeitraums refinanziert.",
    target: "Lead-zu-Termin ≥ 25 %",
  },
];

const OPPORTUNITIES = [
  "Neuer, günstigerer Akquise-Kanal — unabhängig von SEO der Master-Site.",
  "Klar messbare Hypothesen statt Bauchgefühl-Marketing.",
  "Stack ist wiederverwendbar (Konfigurator-Pattern für andere Kunden).",
  "Mobile-first Premium-Experience als Differenzierung im Markt.",
];

const RISKS = [
  "Verwässerung des Master-Brands, falls Test-Wirkung billiger wirkt.",
  "Compliance-Risiko bei Heilmittel-Werbung (HWG) — Texte müssen vorsichtig formuliert sein.",
  "Datenschutz: Lead-Daten verlassen die Domain — n8n-Routing muss DSGVO-konform sein.",
  "Erwartungs-Diskrepanz zwischen indikativer Schätzung und Befund-Angebot.",
];

const KPIS = [
  { value: "2,5 %", label: "Conversion Rate (Visit → Lead)" },
  { value: "< 45 €", label: "Cost per Lead" },
  { value: "60 %", label: "Funnel-Completion (Step 1 → 6)" },
  { value: "25 %", label: "Lead → Beratungstermin" },
];

const SETUP_ROWS = [
  ["Traffic-Quelle", "Meta Ads (Lookalikes auf bestehende Kunden) + organische Tests"],
  ["Tracking", "Umami für Reichweite, Meta Pixel optional, Klaro als Consent-Layer"],
  ["Lead-Routing", "n8n-Webhook → Mail an Michael@admantics.de + info@kairosconfident.de"],
  ["Laufzeit", "4 Wochen Initial-Test, danach Auswertung gegen H₁–H₄"],
  ["Budget", "≤ 1.500 € Ad-Spend in der Testphase"],
  ["Erfolgs-Schwelle", "≥ 2 von 4 Hypothesen erreichen Target → Funnel wird auf Custom-Domain gehoben"],
];

export default function KonzeptPage() {
  return (
    <>
      <ThemeToggle variant="floating" />

      <main className="relative z-10 pt-20 md:pt-28 pb-24">
        <article className="mx-auto max-w-[760px] px-5 md:px-8">
          <header className="mb-14">
            <div className="eyebrow">Internes Konzeptpapier</div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] leading-tight mt-5 text-[color:var(--text-primary)]">
              Konfigurator-Funnel.
              <br />
              <span className="italic text-[color:var(--gold-text)]">Test-Setup & Hypothesen.</span>
            </h1>
            <p className="text-[color:var(--text-secondary)] mt-6 leading-relaxed">
              Diese Seite dokumentiert den Test-Aufbau für einen alternativen Akquise-Kanal von Kairos Confi Dent. Sie ist intern, unindexiert und richtet sich an Entscheider und Stakeholder.
            </p>
          </header>

          <Section roman="i." title="Was ist das hier?">
            <p>
              Ein vier-wöchiger Test, ob ein selbstständiger Konfigurator-Funnel auf einer separaten URL günstigere und besser qualifizierte Leads erzeugt als die Master-Site <a href="https://kairosconfident.de" className="underline decoration-dotted">kairosconfident.de</a>. Der Test läuft unter einer Vercel-Subdomain — die Master-URL bleibt unangetastet.
            </p>
            <p>
              Lead-Anfragen werden zentral über einen n8n-Workflow geroutet und parallel an Sales (Michael) und Klinik (Info-Mail) zugestellt. Tracking ist vollständig consent-basiert.
            </p>
          </Section>

          <Section roman="ii." title="Warum diese Idee?">
            <p>
              Premium-Zahnmedizin in Kairo verkauft sich nicht über Preis allein. Sie verkauft sich über Vertrauen, Transparenz und das Gefühl, dass jemand die Reise für mich plant. Eine klassische Landingpage liefert das in Bruchstücken — der Konfigurator macht es interaktiv erfahrbar.
            </p>
            <p className="pullquote">
              Der Patient klickt sich in seine eigene Behandlung — und sieht in Echtzeit, dass es weniger kostet, als er befürchtet hat.
            </p>
            <p>
              Ziel: ein Akquise-Kanal, der ohne Hochglanz-SEO funktioniert, klar messbar ist und auf Mobile genauso überzeugt wie auf Desktop.
            </p>
          </Section>

          <Section roman="iii." title="Vier Hypothesen">
            <div className="space-y-6">
              {HYPOTHESES.map((h) => (
                <div key={h.id} className="border-l-2 border-[color:var(--gold)] pl-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display italic text-2xl text-[color:var(--gold-text)]">{h.id}</span>
                    <span className="eyebrow">Target: {h.target}</span>
                  </div>
                  <p className="mt-2 text-[color:var(--text-primary)] leading-relaxed">{h.statement}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section roman="iv." title="Chancen und Risiken">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="eyebrow text-[color:var(--gold-text)] mb-4">+ Chancen</div>
                <ul className="space-y-3 text-sm">
                  {OPPORTUNITIES.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-[color:var(--text-secondary)]">
                      <span className="text-[color:var(--gold-text)] mt-[2px]">+</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow text-[color:var(--text-secondary)] mb-4">! Risiken</div>
                <ul className="space-y-3 text-sm">
                  {RISKS.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[color:var(--text-secondary)]">
                      <span className="text-[color:var(--text-secondary)] mt-[2px]">!</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section roman="v." title="KPI-Stack">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {KPIS.map((k) => (
                <div key={k.label} className="card text-center py-6">
                  <div className="font-display text-3xl text-[color:var(--gold-text)]">{k.value}</div>
                  <div className="eyebrow mt-2 text-[color:var(--text-secondary)]">{k.label}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section roman="vi." title="Test-Setup">
            <div className="overflow-hidden rounded-xl border border-[color:var(--border)]">
              <table className="w-full text-sm">
                <tbody>
                  {SETUP_ROWS.map(([k, v], i) => (
                    <tr key={k} className={i > 0 ? "border-t border-[color:var(--border)]" : ""}>
                      <th scope="row" className="text-left px-4 py-3 align-top w-[36%] eyebrow text-[color:var(--text-secondary)]">
                        {k}
                      </th>
                      <td className="px-4 py-3 text-[color:var(--text-primary)]">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <div className="card mt-16 py-10">
            <div className="eyebrow mb-3">Entscheidungsfrage</div>
            <p className="font-display italic text-2xl md:text-3xl leading-snug text-[color:var(--text-primary)]">
              &bdquo;Liefert der Funnel innerhalb von vier Wochen ≥ 2 von 4 Hypothesen — und damit den Beweis, dass es einen zweiten, günstigeren Lead-Kanal neben der Master-Site geben kann?&ldquo;
            </p>
          </div>

          <footer className="mt-16 pt-8 border-t border-[color:var(--border)] flex items-center justify-between text-xs text-[color:var(--text-muted)]">
            <span>{FOOTER_DISCLAIMER}</span>
            <Link href="/" className="underline decoration-dotted hover:text-[color:var(--gold-text)]">
              ← zurück
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}

function Section({
  roman,
  title,
  children,
}: {
  roman: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-display italic text-2xl text-[color:var(--gold-text)]">{roman}</span>
        <h2 className="font-display text-2xl md:text-3xl text-[color:var(--text-primary)]">{title}</h2>
      </div>
      <div className="space-y-4 text-[color:var(--text-secondary)] leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  );
}
