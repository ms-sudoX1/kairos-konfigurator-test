import Image from "next/image";
import { supabaseAsset } from "@/lib/storage-url";

// Bilder: Slots 1-3 via Pexels-Free-Photos (Hotlinking, Pexels-Lizenz erlaubt
// kommerzielle Nutzung ohne Attribution). Slot 4 via Welle-2 Cairo-Mood-Asset
// (kein Pexels-API-Key verfügbar — siehe HO-KONFIG-VISUAL-PASS-1, Punkt 6.G
// Workaround).
const TRAVEL_ITEMS = [
  {
    title: "Pyramiden von Gizeh",
    body: "Wahrzeichen vor der Klinik-Tür.",
    image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Pyramiden von Gizeh in Ägypten",
  },
  {
    title: "5★ Resort am Roten Meer",
    body: "Optional als Erholungsphase nach der Behandlung.",
    image: "https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Luxuriöses Resort am Meer",
  },
  {
    title: "Khan el-Khalili",
    body: "Historischer Bazaar — Gold, Gewürze, Geschichte.",
    image: "https://images.pexels.com/photos/2087387/pexels-photo-2087387.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Historischer Bazaar in Kairo",
  },
  {
    title: "Nil-Cruise (3 Nächte)",
    body: "Auf Wunsch als Verlängerung Ihrer Reise.",
    image: supabaseAsset("ai-generated/welle-2/cairo-mood/cairo-luxury-lifestyle.webp"),
    alt: "Stimmungsbild Cairo-Luxury-Lifestyle",
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
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                <div className="font-display text-lg md:text-xl text-white leading-tight">
                  {item.title}
                </div>
                <div className="text-xs text-white/80 mt-1">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
