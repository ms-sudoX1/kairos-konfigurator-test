// ASSUMPTION: Reise-Bilder als CSS-Placeholder. Vor Live-Schaltung
// durch lizensierte Pexels-Photos in /public/travel/*.{avif,jpg}
// ersetzen (Pyramiden, 5★ Resort, Khan el-Khalili, Nil-Cruise).
// Mike reviewt am Ende.

const TRAVEL_ITEMS = [
  {
    title: "Pyramiden von Gizeh",
    body: "Wahrzeichen vor der Klinik-Tür.",
    gradient: "linear-gradient(135deg, #c9a35a 0%, #8c6620 50%, #1c1814 100%)",
  },
  {
    title: "5★ Resort am Roten Meer",
    body: "Optional als Erholungsphase nach der Behandlung.",
    gradient: "linear-gradient(135deg, #2a5a7a 0%, #6ea7c4 50%, #d4a24c 100%)",
  },
  {
    title: "Khan el-Khalili",
    body: "Historischer Bazaar — Gold, Gewürze, Geschichte.",
    gradient: "linear-gradient(135deg, #8c6620 0%, #d4a24c 50%, #f5ede0 100%)",
  },
  {
    title: "Nil-Cruise (3 Nächte)",
    body: "Auf Wunsch als Verlängerung Ihrer Reise.",
    gradient: "linear-gradient(135deg, #1a3a4a 0%, #5c8aa3 50%, #ebc477 100%)",
  },
];

export function Travel() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Ihre Reise</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight mt-4 text-[color:var(--text-primary)]">
            Behandlung in Kairo.
            <br />
            <span className="italic text-[color:var(--gold-text)]">Urlaub in Ägypten.</span>
          </h2>
          <p className="text-sm text-[color:var(--text-secondary)] mt-5 max-w-xl">
            Wir kombinieren Ihre Behandlung mit Aufenthalten an Orten, die Sie sonst auf einer Bucket-List finden — ohne Aufpreis.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {TRAVEL_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-[color:var(--border)] transition-transform duration-500 hover:scale-[1.02]"
            >
              <div
                className="absolute inset-0"
                style={{ background: item.gradient }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                <div className="font-display text-lg md:text-xl text-white leading-tight">
                  {item.title}
                </div>
                <div className="text-xs text-white/70 mt-1">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
