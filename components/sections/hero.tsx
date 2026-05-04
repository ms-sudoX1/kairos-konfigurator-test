import Image from "next/image";
import Link from "next/link";
import { supabaseAsset } from "@/lib/storage-url";

const STATS = [
  { value: "70 %", label: "Ersparnis vs. Deutschland" },
  { value: "5★", label: "Klinik & Hotel" },
  { value: "24 h", label: "Antwort auf Anfrage" },
  { value: "DE", label: "Materialien & Beratung" },
];

const HERO_QUOTES = [
  {
    pseudonym: "Elias M.",
    behandlung: "Smile-Makeover",
    quote: "Ein wunderschönes neues Lächeln dank der hervorragenden Behandlung und dem erstklassigen Service.",
  },
  {
    pseudonym: "Jessica M.",
    behandlung: "Mehrfach-Behandlung + Reise",
    quote: "Wunderbare Ergebnisse und eine unvergessliche Reise nach Ägypten.",
  },
  {
    pseudonym: "Layla W.",
    behandlung: "Komplettsanierung + Nachsorge",
    quote: "Exzellente Betreuung vom ersten Kontakt bis zur Nachsorge.",
  },
];

const HERO_VISUAL = supabaseAsset("ai-generated/welle-2/hero/clinic-modern-interior.webp");

export function Hero() {
  return (
    <section className="relative pt-20 md:pt-28 pb-12 md:pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          <div>
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
          </div>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[color:var(--border-strong)]">
            <Image
              src={HERO_VISUAL}
              alt="Behandlungsraum der Clinica Javera in Kairo"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, rgba(212,162,76,0.10) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid md:grid-cols-3 gap-5 md:gap-6">
          {HERO_QUOTES.map((q) => (
            <figure
              key={q.pseudonym}
              className="border-l-2 border-[color:var(--gold)] pl-4 md:pl-5"
            >
              <blockquote className="font-display italic text-base md:text-[1.05rem] text-[color:var(--text-primary)] leading-snug">
                „{q.quote}“
              </blockquote>
              <figcaption className="eyebrow mt-3 text-[color:var(--text-secondary)]">
                {q.pseudonym} · {q.behandlung}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-xs text-[color:var(--text-muted)] mt-12 max-w-xl">
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
