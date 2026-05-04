import Image from "next/image";
import { supabaseAsset } from "@/lib/storage-url";

const KERNTEAM = [
  {
    foto: "team/team-josef-ukkeh.jpeg",
    name: "Josef Ukkeh",
    titel: "Gründer & Geschäftsführer",
    bio:
      "Ausgebildeter Zahntechniker mit über 20 Jahren Erfahrung in Zahntechnik, Ästhetik und Dentalvertrieb. Bayerische Mentalität, ägyptische Wurzeln. Gründer von Kairos Confi Dent mit der Vision, hochwertige Zahnmedizin und Premium-Reise zu verbinden.",
  },
  {
    foto: "team/team-norbert-schoening.jpeg",
    name: "Dipl. Soz. Dr. Norbert Schöning (M.A.)",
    titel: "Associate Consulting Data Science",
    bio:
      "Verantwortlich für Datenanalyse, Prozessoptimierung und strategische Beratung. Sorgt für transparente Abläufe und konsistente Qualitätsstandards entlang der Patientenreise.",
  },
];

export function Kernteam() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Wer hinter Kairos steht</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Unser <span className="italic text-[color:var(--gold-text)]">Kernteam.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {KERNTEAM.map((person) => (
            <article key={person.name} className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-5 md:gap-7 items-start">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[color:var(--border-strong)]">
                <Image
                  src={supabaseAsset(person.foto)}
                  alt={`Porträt ${person.name}`}
                  fill
                  sizes="(min-width: 640px) 180px, 140px"
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl text-[color:var(--text-primary)] leading-tight">
                  {person.name}
                </h3>
                <div className="eyebrow mt-2 text-[color:var(--gold-text)]">
                  {person.titel}
                </div>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed mt-4">
                  {person.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
