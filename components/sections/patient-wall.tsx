import Image from "next/image";
import { supabaseAsset } from "@/lib/storage-url";

const PATIENT_WALL_ITEMS = [
  {
    pseudonym: "Elias M.",
    behandlung: "Smile-Makeover",
    quote: "Ein wunderschönes neues Lächeln dank der hervorragenden Behandlung und dem erstklassigen Service.",
    image: "testimonials-bild/testimonial-bild-elias-m.png",
  },
  {
    pseudonym: "Farah K.",
    behandlung: "Ästhetik + Reise",
    quote: "Professionelle Zahnästhetik kombiniert mit einem unvergesslichen Urlaub am Nil.",
    image: "testimonials-bild/testimonial-bild-farah-k.png",
  },
  {
    pseudonym: "Jasmin B.",
    behandlung: "Transformation (Mehrfach-Behandlung)",
    quote: "Die Transformation übertraf all meine Erwartungen. Absolut empfehlenswert!",
    image: "testimonials-bild/testimonial-bild-jasmin-b.png",
  },
  {
    pseudonym: "Jessica M.",
    behandlung: "Mehrfach-Behandlung + Reise",
    quote: "Wunderbare Ergebnisse und eine unvergessliche Reise nach Ägypten.",
    image: "testimonials-bild/testimonial-bild-jessica-m.png",
  },
  {
    pseudonym: "Layla W.",
    behandlung: "Komplettsanierung + Nachsorge",
    quote: "Exzellente Betreuung vom ersten Kontakt bis zur Nachsorge.",
    image: "testimonials-bild/testimonial-bild-layla-w.png",
  },
  {
    pseudonym: "Julia K.",
    behandlung: "Ästhetik + Reise",
    quote: "Ein perfektes Lächeln und eine traumhafte Erfahrung in Ägypten.",
    image: "testimonials-bild/testimonial-bild-julia-k.png",
  },
];

export function PatientWall() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Echte Stimmen</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Was unsere Patienten <span className="italic text-[color:var(--gold-text)]">erzählen.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {PATIENT_WALL_ITEMS.map((item) => (
            <figure
              key={item.pseudonym}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-[color:var(--border)] transition-transform duration-500 hover:scale-[1.015]"
            >
              <Image
                src={supabaseAsset(item.image)}
                alt={`Patientenporträt ${item.pseudonym}`}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                <blockquote className="font-display italic text-sm md:text-base text-white/95 leading-snug">
                  „{item.quote}“
                </blockquote>
                <div className="eyebrow mt-3 text-white/80">
                  {item.pseudonym} · {item.behandlung}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
