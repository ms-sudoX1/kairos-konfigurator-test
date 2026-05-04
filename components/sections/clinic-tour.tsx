import Image from "next/image";
import { supabaseAsset } from "@/lib/storage-url";

const CLINIC_TILES = [
  {
    image: "clinic-tour-v2/clinic-04-eingangsbereich-v2.jpeg",
    alt: "Eingangsbereich der Clinica Javera",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    image: "clinic-tour-v2/clinic-09-beratungslounge-v2.jpeg",
    alt: "Beratungslounge",
    span: "",
  },
  {
    image: "clinic-tour-v2/clinic-10-behandlungsraum-v2.jpeg",
    alt: "Moderner Behandlungsraum",
    span: "",
  },
  {
    image: "clinic-tour-v2/clinic-08-fachexpertise-v2.jpeg",
    alt: "Fachexpertise im Detail",
    span: "lg:col-span-2",
  },
  {
    image: "clinic-tour-v2/clinic-17-team-v2.jpeg",
    alt: "Team der Clinica Javera",
    span: "",
  },
  {
    image: "clinic-tour-v2/clinic-01-javera-bei-nacht-v2.jpeg",
    alt: "Clinica Javera bei Nacht",
    span: "",
  },
];

export function ClinicTour() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Clinica Javera, Kairo</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Wo Sie <span className="italic text-[color:var(--gold-text)]">behandelt werden.</span>
          </h2>
          <p className="text-sm text-[color:var(--text-secondary)] mt-5 max-w-xl">
            Eingangsbereich, Beratungslounge, Behandlungsräume, Team — eine kurze visuelle Tour durch die Klinik in Kairo.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[180px] gap-3 md:gap-4">
          {CLINIC_TILES.map((tile) => (
            <div
              key={tile.image}
              className={`group relative rounded-2xl overflow-hidden border border-[color:var(--border)] transition-transform duration-500 hover:scale-[1.015] ${tile.span}`}
            >
              <Image
                src={supabaseAsset(tile.image)}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
