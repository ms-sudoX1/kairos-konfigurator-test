# CLAUDE.md — kairos-konfigurator-test

## Repo-Zweck
Test-Funnel für Premium Zahntourismus (Kairos Confi Dent). Zwei Seiten + ein 6-Step-Konfigurator. Master-URL `kairosconfident.de` bleibt unangetastet — dieser Test läuft nur auf einer Vercel-URL.

## Tech Stack
- Next.js 15 App Router + TypeScript strict
- Tailwind 3.4+ + shadcn/ui
- Klaro Consent Manager
- Umami Analytics (consent-gated)
- React Hook Form + Zod für Formular-Validation
- Lucide-react Icons
- Hosting: Vercel (Mikes Account)

## Wichtige Pfade
- `app/page.tsx` — Landingpage mit Konfigurator-Sektion
- `app/konfigurator/page.tsx` — eigenständige Konfigurator-Seite
- `app/konzept/page.tsx` — Editorial mit `noindex,nofollow`
- `lib/pricing.ts` — Konfigurator-Preis-JSON (clientside)
- `lib/theme.ts` — Theme-Init + Toggle-Logik
- `components/configurator/*` — Steps, Live-Preview, Submit-Logik
- `components/sections/*` — Hero, Trust, Pricing, Travel, FAQ, FinalCTA
- `DESIGN.md` — visuelle SSOT (Farben, Typo, Komponenten)
- `.planning/SPEC.md` + `.planning/GATES-LOG.md` — Build-Doku

## Conventions
- Mobile-first, AA-Kontrast in beiden Themes Pflicht.
- Tracking nur hinter Klaro-Consent.
- Webhook-URL via `NEXT_PUBLIC_LEAD_WEBHOOK_URL` Env-Var, mit Fallback auf Default-Value.
- Keine Custom-Domain — Vercel-URL ist final.
- Footer-Disclaimer auf jeder Seite: "Test-Implementierung · Verbindliche Angebote ausschließlich über kairosconfident.de".
