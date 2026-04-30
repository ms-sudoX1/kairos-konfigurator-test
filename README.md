# Kairos Konfigurator-Test

Test-Funnel für Premium Zahntourismus (Kairos Confi Dent). Zwei Seiten + ein 6-Step-Konfigurator. Master-URL [`kairosconfident.de`](https://kairosconfident.de) bleibt unangetastet — dieser Test läuft auf einer Vercel-URL.

## Stack

- **Next.js 16** (App Router) + **TypeScript** strict
- **Tailwind v4** (CSS-first config in `app/globals.css`)
- **shadcn-Pattern** mit Radix-Primitiven (Accordion) — keine separate UI-CLI
- **Klaro** Consent Manager
- **Umami** Analytics (consent-gated, selbstgehostet)
- **React Hook Form + Zod** Form-Validation

## Installation

```bash
npm install
cp .env.example .env.local   # Werte nach Bedarf anpassen
npm run dev
```

`http://localhost:3000` öffnen.

## Routen

| Route | Zweck | Indexiert |
|------|------|-----------|
| `/` | Landingpage mit Hero, Konfigurator, Sektionen, CTA | ja |
| `/konfigurator` | Eigenständiger Konfigurator-Funnel | ja |
| `/konzept` | Internes Konzeptpapier mit Hypothesen + KPIs | **nein** (`noindex,nofollow`) |

## Theme-System

Visuelle SSOT in [`DESIGN.md`](./DESIGN.md). Tokens als CSS-Variablen in `app/globals.css`, Theme-Switch via `[data-theme="light"]`/`[data-theme="dark"]` auf `<html>`.

- Default: Dark
- Persistenz: `localStorage["kairos-theme"]`
- Init respektiert `prefers-color-scheme`
- Toggle-Button im Header (Landing/Konfigurator) und floating top-right (/konzept)

## Konfigurator-Pricing

`lib/pricing.ts` enthält das vollständige Preis-Mapping (clientside JSON). Anker:

> 4–8 Zähne Implantate + 7 Tage 5★ Hotel (1 Person) ≈ ab 6.890 €.

Andere Kombinationen werden plausibel im selben Range interpoliert. **Indikative Schätzung — verbindliches Angebot ausschließlich nach individuellem Befund über kairosconfident.de.**

Anpassungen: Edit `TREATMENT_PRICES`, `HOTEL_DAY_RATE`, `SERVICE_FEE` in `lib/pricing.ts`.

## Lead-Submit

Konfigurator-Submit ruft `submitLead()` aus `lib/submit.ts` auf — POST JSON an `NEXT_PUBLIC_LEAD_WEBHOOK_URL` (Default: `https://flow.admantics.eu/webhook/kairos-test-lead`). Das n8n-Routing (Mail an `Michael@admantics.de` und `info@kairosconfident.de`) wird parallel von KOS bereitgestellt.

Payload-Struktur siehe `LeadPayload` in `lib/submit.ts` — enthält Konfigurator-Zustand, Schätzung, Kontaktdaten.

## Consent (Klaro)

Konfiguration in `lib/klaro-config.ts`. Standardmäßig:

- `umami` — Reichweitenmessung (Opt-In)
- `meta_pixel` — nur aktiv wenn `NEXT_PUBLIC_META_PIXEL_ID` gesetzt (Opt-In)

Re-Open-Button im Footer und auf der Konzept-Seite. Banner ist theme-aware.

## Build & Deploy

```bash
npm run build
npm run start          # lokal
```

Deploy via Vercel:

1. Repo nach `ms-sudoX1/kairos-konfigurator-test` (public).
2. Vercel-Project anlegen, Auto-Deploy `main`.
3. ENV-Vars setzen: `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (zwingend für Umami), optional `NEXT_PUBLIC_META_PIXEL_ID`.
4. Vercel-Subdomain wird verwendet — keine Custom-Domain.

## Doku & Planung

- [`DESIGN.md`](./DESIGN.md) — visuelle SSOT (Farben, Typo, Komponenten)
- [`.planning/SPEC.md`](./.planning/SPEC.md) — vollständige Build-Spec (8 Kategorien)
- [`.planning/GATES-LOG.md`](./.planning/GATES-LOG.md) — Validation Gates Log
- [`CLAUDE.md`](./CLAUDE.md) — Repo-Kontext für KI-gestützte Wartung

## Disclaimer

Test-Implementierung · Verbindliche Angebote ausschließlich über [kairosconfident.de](https://kairosconfident.de).
