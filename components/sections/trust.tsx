import Image from "next/image";
import { supabaseAsset } from "@/lib/storage-url";

const TRUST_ITEMS = [
  {
    roman: "i.",
    title: "Materialien aus DE & CH.",
    body:
      "Namhafte deutsche und schweizer Hersteller. Verarbeitung nach deutschen Qualitätsstandards.",
    image: supabaseAsset("ai-generated/welle-2/treatments/zirkonium-krone.webp"),
    alt: "Zirkonium-Krone — Materialqualität",
  },
  {
    roman: "ii.",
    title: "Premium Implantatsysteme.",
    body:
      "Straumann, Nobel Biocare, Dentsply Sirona, Zimmer Biomet, BioHorizons. International anerkannte Systeme mit hohen Langzeit-Erfolgsraten.",
    image: supabaseAsset("ai-generated/welle-2/treatments/implantologie.webp"),
    alt: "Implantologie — Premium-Systeme",
  },
  {
    roman: "iii.",
    title: "Garantie & Nachsorge.",
    body:
      "Behandlungsgarantie auf alle Arbeiten. Garantierte Nachsorge durch unsere Partner in Deutschland.",
    image: supabaseAsset("clinic-tour/clinic-08-fachexpertise-16x9.jpeg"),
    alt: "Fachexpertise im Behandlungsdetail",
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
            <div
              key={s.roman}
              className="card !p-0 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full border border-[color:var(--gold)] bg-[color:var(--bg-deep)]/70 backdrop-blur-sm flex items-center justify-center">
                  <span className="roman text-xl">{s.roman}</span>
                </div>
              </div>
              <div className="p-7 flex-1">
                <h3 className="font-display text-2xl text-[color:var(--text-primary)] mb-3">{s.title}</h3>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
