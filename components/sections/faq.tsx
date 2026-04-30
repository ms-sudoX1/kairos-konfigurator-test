"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Welche Garantie habe ich auf meine Behandlung?",
    a: "Auf alle Implantate gewähren wir fünf Jahre Material-Garantie, auf Kronen und Brücken drei Jahre. Die Nachsorge erfolgt auf Wunsch in einer unserer DE-Partnerpraxen in München, Hamburg oder Köln — ohne Mehrkosten innerhalb des Garantiezeitraums.",
  },
  {
    q: "Wie hoch ist die Ersparnis im Vergleich zu Deutschland wirklich?",
    a: "Im Schnitt liegt unsere Investition rund 60 bis 70 Prozent unter deutschen Premium-Praxen — bei identischer Material- und Behandlungsqualität. Die genaue Höhe hängt von Ihrer individuellen Behandlung ab. Unser Konfigurator zeigt Ihnen eine erste Schätzung in Echtzeit; das verbindliche Angebot folgt nach Befund.",
  },
  {
    q: "Sind die Behandler wirklich vergleichbar mit deutschen Zahnärzten?",
    a: "Unsere Master-Behandlerinnen und -Behandler haben ihre Spezialisierungen an europäischen Universitäten erworben — viele mit Stationen in Deutschland und der Schweiz. Wir arbeiten ausschließlich mit Materialien aus DE und CH (Straumann, Nobel Biocare, Ivoclar). Der einzige Unterschied: Standort, Personal-Kosten, Mietniveau.",
  },
  {
    q: "Wie läuft die Reise organisatorisch ab?",
    a: "Wir koordinieren Klinik-Termine, Hotel-Buchung, Flughafen-Transfer und alle Wege vor Ort. Sie kommen mit Ihrem gepackten Koffer an, eine deutschsprachige Konzierge begleitet Sie. Die Behandlungen werden so geplant, dass zwischen den Sitzungen genug Zeit für Ausflüge bleibt.",
  },
  {
    q: "Was passiert, wenn nach der Rückkehr Probleme auftreten?",
    a: "Sie erreichen uns rund um die Uhr telefonisch und per WhatsApp. Akute Behandlungen erfolgen in unserer DE-Partnerpraxis in Ihrer Nähe — Befund und Röntgen wandern digital zwischen den Praxen, sodass Ihre Behandlung lückenlos dokumentiert bleibt.",
  },
];

export function Faq() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[860px] px-5 md:px-10">
        <div className="mb-12">
          <div className="eyebrow">Häufige Fragen</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Alles, was Sie <span className="italic text-[color:var(--gold-text)]">vor</span> der Reise wissen sollten.
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-1">
          {FAQ_ITEMS.map((item, idx) => (
            <Accordion.Item
              key={idx}
              value={`item-${idx}`}
              className="border-b border-[color:var(--border)]"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group w-full py-5 flex items-center justify-between gap-6 text-left">
                  <span className="font-display text-lg md:text-xl text-[color:var(--text-primary)]">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="text-[color:var(--gold-text)] transition-transform group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pb-5 text-sm text-[color:var(--text-secondary)] leading-relaxed">
                  {item.a}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
