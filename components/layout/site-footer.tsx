"use client";

import Link from "next/link";
import { openConsentModal } from "@/components/consent/consent-provider";
import { FOOTER_DISCLAIMER } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] mt-24 md:mt-32 relative z-10">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 py-12 md:py-16 grid gap-10 md:grid-cols-3 text-sm">
        <div>
          <div className="font-display text-2xl mb-3">
            Kairos
            <span className="ml-1 italic text-[color:var(--gold-text)]">Confi Dent</span>
          </div>
          <p className="text-[color:var(--text-secondary)] leading-relaxed">
            Premium Zahnmedizin in Kairo, kombiniert mit echtem Urlaub. Eine Test-Implementierung von Admantics.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Navigation</div>
          <ul className="space-y-2 text-[color:var(--text-secondary)]">
            <li><Link href="/" className="hover:text-[color:var(--gold-text)] transition-colors">Startseite</Link></li>
            <li><Link href="/konfigurator" className="hover:text-[color:var(--gold-text)] transition-colors">Konfigurator</Link></li>
            <li><Link href="/konzept" className="hover:text-[color:var(--gold-text)] transition-colors">Konzept</Link></li>
            <li>
              <a href="https://kairosconfident.de" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--gold-text)] transition-colors">
                Master-Site →
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Privatsphäre</div>
          <ul className="space-y-2 text-[color:var(--text-secondary)]">
            <li>
              <button type="button" onClick={openConsentModal} className="hover:text-[color:var(--gold-text)] transition-colors text-left">
                Cookie-Einstellungen
              </button>
            </li>
            <li>
              <a href="https://kairosconfident.de/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--gold-text)] transition-colors">
                Datenschutz
              </a>
            </li>
            <li>
              <a href="https://kairosconfident.de/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--gold-text)] transition-colors">
                Impressum
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 py-5 text-xs text-[color:var(--text-muted)] text-center">
          {FOOTER_DISCLAIMER}
        </div>
      </div>
    </footer>
  );
}
