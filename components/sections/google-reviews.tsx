// PLACEHOLDER — replace via Google Places API before live-go.
// Tracking: Notion Open-Item auf Kairos Customer-Page.
import { Star } from "lucide-react";

const REVIEWS = [
  {
    initial: "M",
    name: "Maria K.",
    stars: 5,
    text: "Sehr professionelle Beratung von Anfang an. Klare Kommunikation, faire Konditionen. Hat alle meine Fragen geduldig beantwortet.",
    date: "vor 2 Wochen",
  },
  {
    initial: "A",
    name: "Ahmed S.",
    stars: 5,
    text: "Top organisiert, Termine pünktlich, Team freundlich. Habe mich von Anfang an gut aufgehoben gefühlt.",
    date: "vor 3 Wochen",
  },
  {
    initial: "J",
    name: "Julia W.",
    stars: 5,
    text: "Hervorragender Service. Transparenter Ablauf, keine versteckten Kosten. Klare Empfehlung.",
    date: "vor 1 Monat",
  },
  {
    initial: "S",
    name: "Stefan M.",
    stars: 4,
    text: "Insgesamt sehr zufrieden. Beratung kompetent, Wartezeiten minimal. Bei der Erreichbarkeit ist noch Luft nach oben.",
    date: "vor 1 Monat",
  },
  {
    initial: "L",
    name: "Lina R.",
    stars: 5,
    text: "Erstklassige Betreuung von der ersten Anfrage bis zum Folgetermin. Sehr klare Aufklärung über alle Schritte.",
    date: "vor 2 Monaten",
  },
];

const GOOGLE_PLACE_URL = "https://www.google.com/search?q=Kairos+Confi+Dent+Bewertungen";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

export function GoogleReviewsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <header className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-10 md:mb-14">
          <GoogleG className="h-7 w-7 md:h-8 md:w-8" />
          <span className="font-semibold text-lg md:text-xl text-[color:var(--text-primary)]">Google</span>
          <span className="text-[color:var(--text-secondary)]">·</span>
          <span className="font-display text-xl md:text-2xl text-[color:var(--text-primary)]">4,9 ★</span>
          <span className="text-sm md:text-base text-[color:var(--text-secondary)]">47 Bewertungen</span>
        </header>

        <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="bg-white text-slate-900 rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700"
                >
                  {r.initial}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.date}</div>
                </div>
              </div>

              <div
                className="flex gap-0.5 mb-3"
                role="img"
                aria-label={`${r.stars} von 5 Sternen`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={
                      i < r.stars
                        ? "h-4 w-4 fill-amber-400 text-amber-400"
                        : "h-4 w-4 fill-slate-200 text-slate-200"
                    }
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-slate-700 flex-1">{r.text}</p>

              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
                <GoogleG className="h-3.5 w-3.5" />
                <span>auf Google</span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <a
            href={GOOGLE_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <GoogleG className="h-4 w-4" />
            Alle Bewertungen auf Google ansehen
          </a>
        </div>
      </div>
    </section>
  );
}
