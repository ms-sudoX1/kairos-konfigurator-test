import Image from "next/image";
import Link from "next/link";
import { supabaseAsset } from "@/lib/storage-url";

const BACKGROUND = supabaseAsset("ai-generated/welle-2/cairo-mood/cairo-luxury-lifestyle.webp");

export function FinalCta() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="relative rounded-2xl overflow-hidden border border-[color:var(--border-strong)]">
          <Image
            src={BACKGROUND}
            alt=""
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 80%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 text-center py-16 md:py-24 px-5 md:px-10">
            <div className="eyebrow mb-5 text-white/80">Ihr nächster Schritt</div>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-tight max-w-3xl mx-auto text-white">
              Ihr neues Lächeln{" "}
              <span className="italic text-[color:var(--gold-bright)]">beginnt jetzt.</span>
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mt-6 leading-relaxed">
              Kostenlose Erstberatung. Keine Kostenvorab. Antwort innerhalb von 24 Stunden.
            </p>
            <div className="mt-10">
              <Link href="/konfigurator" className="btn-primary">
                Jetzt kostenlose Beratung sichern
              </Link>
            </div>
            <p className="text-xs text-white/60 mt-6 max-w-md mx-auto">
              Indikative Schätzung. Verbindliches Angebot ausschließlich über{" "}
              <a href="https://kairosconfident.de" className="underline decoration-dotted hover:text-[color:var(--gold-bright)]">
                kairosconfident.de
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
