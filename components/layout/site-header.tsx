import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="glass-header sticky top-0 z-40">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl md:text-2xl tracking-wide text-[color:var(--text-primary)]"
        >
          Kairos
          <span className="ml-1 italic text-[color:var(--gold-text)]">Confi Dent</span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-5">
          <Link
            href="/konfigurator"
            className="btn-ghost hidden sm:inline-flex"
          >
            Konfigurator
          </Link>
          <Link href="/konfigurator#lead" className="btn-secondary text-sm">
            Beratung sichern
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
