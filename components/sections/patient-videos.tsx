import { supabaseAsset } from "@/lib/storage-url";

const PATIENT_VIDEOS = [
  {
    id: "patient-01",
    behandlung: "Implantat",
    video: "testimonials/patient-01.mp4",
    poster: "testimonials/patient-01-poster.jpg",
  },
  {
    id: "patient-02",
    behandlung: "Veneers",
    video: "testimonials/patient-02.mp4",
    poster: "testimonials/patient-02-poster.jpg",
  },
  {
    id: "patient-03",
    behandlung: "All-on-4",
    video: "testimonials/patient-03.mp4",
    poster: "testimonials/patient-03-poster.jpg",
  },
  {
    id: "patient-04",
    behandlung: "Vollkeramik-Krone",
    video: "testimonials/patient-04.mp4",
    poster: "testimonials/patient-04-poster.jpg",
  },
];

export function PatientVideos() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Patientenerfahrungen</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Stimmen aus <span className="italic text-[color:var(--gold-text)]">der Praxis.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PATIENT_VIDEOS.map((v) => (
            <figure
              key={v.id}
              className="rounded-2xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--bg-elevated)]"
            >
              <video
                className="w-full aspect-[9/16] object-cover bg-black"
                controls
                preload="none"
                playsInline
                poster={supabaseAsset(v.poster)}
              >
                <source src={supabaseAsset(v.video)} type="video/mp4" />
                Ihr Browser unterstützt keine Video-Wiedergabe.
              </video>
              <figcaption className="p-4">
                <div className="eyebrow text-[color:var(--gold-text)]">{v.behandlung}</div>
                <p className="text-xs text-[color:var(--text-muted)] mt-2 leading-relaxed">
                  Demo-Stimme. Endgültige Patientenfreigaben in Vorbereitung.
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
