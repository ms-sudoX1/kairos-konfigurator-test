# Kairos Konfigurator-Test Spec

Generated: 2026-04-30
Source: --from-handover (in-conversation handover, "FINAL, alle Klärungen integriert")
Command: /kos:build-website

## 1. Projekt-Identität
- Kunde/Brand: Kairos Confi Dent — Premium Zahntourismus, Kairo (Ägypten). Master-URL `kairosconfident.de` bleibt unangetastet.
- Ziel-Repo: `C:\Users\chefk\kos\repos\clients\kairos-konfigurator-test` (GitHub: `ms-sudoX1/kairos-konfigurator-test`, public)
- Brand DNA: Customer-ID Supabase `kairos-confi-dent`. Visuelle SSOT lokal in `DESIGN.md`. Tonalität: Premium, ruhig, sachlich-luxuriös. Stilreferenz Master-URL ("Jetzt kostenlose Beratung sichern", "perfektes Lächeln mit einem Luxusaufenthalt"). Display-Italic-Akzente in Cormorant Garamond, Body in Outfit.
- Repo-Status: NEU

## 2. Funktionale Anforderungen
- Deliverable (1 Satz): Zwei deploybare Next.js-Seiten (Landingpage mit Konfigurator-Funnel + öffentliche Konzept-Seite mit `noindex`) als günstiger Traffic-Test-Kanal auf einer Vercel-URL.
- Seiten / Views / Endpoints:
  - `/` (Landingpage mit Konfigurator-Sektion + statischen Sektionen)
  - `/konfigurator` (dedizierte Konfigurator-Seite, Lead-Funnel)
  - `/konzept` (Editorial-Whitepaper, `<meta name="robots" content="noindex,nofollow">`)
- Kritische Features:
  - 6-Step-Konfigurator (Behandlungsart multi-select max 3 → Umfang → Reise → Begleitung → Wunsch-Reisemonat → Lead-Capture) mit Live-Preview-Sidebar (Desktop) und Sticky-Footer-Card (Mobile)
  - Preis-Mapping JSON in `/lib/pricing.ts`, Disclaimer "Indikative Schätzung" immer sichtbar
  - Form-Validation mit React Hook Form + Zod, DSGVO-Checkbox Pflicht
  - Lead-Submit POST JSON an `https://flow.admantics.eu/webhook/kairos-test-lead` → Success-Screen
  - Theme-Toggle (Light/Dark) im Header, persistent via `localStorage` Key `kairos-theme`, respektiert `prefers-color-scheme`. Toggle-Button 36×36 Kreis, hover rotate(15deg). Meta `theme-color` dynamisch.
  - Klaro Consent Manager (Services: `meta_pixel` default false, `umami` default false oder essential). Banner theme-aware.
  - Umami Analytics auf `https://analytics.admantics.eu`
  - Statische Sektionen Landingpage in fixer Reihenfolge: Sticky-Glass-Header → Hero → Konfigurator → So-funktioniert (3 Steps mit i. ii. iii.) → Trust (3 Cards) → Preisvergleich (DE vs Kairos) → Reise (4-Bilder-Grid) → FAQ (Accordion) → Final-CTA → Footer mit Disclaimer
  - `/konzept` mit Sektionen i.–vi. (Was ist das hier? / Warum diese Idee? / Vier Hypothesen H₁–H₄ / Chancen+Risiken / KPI-Stack / Test-Setup), Floating-Theme-Toggle top-right
- Nice-to-have: keine zusätzlichen über das oben gelistete hinaus — Prototyp-Niveau
- Referenzen: Mockup-HTML-Files `konfigurator.html` und `konzept.html` aus Mikes Outputs (separat übergeben). Master-URL `kairosconfident.de` für Tonalität & Inhalts-Inspiration.

## 3. Technische Anforderungen
- APIs / Datenquellen:
  - Lead-Webhook (POST JSON): `https://flow.admantics.eu/webhook/kairos-test-lead` — n8n-Workflow wird parallel von KOS angelegt, Mail-Routing an `Michael@admantics.de` UND `info@kairosconfident.de`
  - Umami Analytics: `https://analytics.admantics.eu` (script tag, gated by Klaro)
  - Meta Pixel: optional gated by Klaro (default off)
- Auth: keine (alle Seiten public)
- Wiederverwendete Komponenten / Skills:
  - shadcn/ui (Buttons, Inputs, Accordion, Sheet/Drawer für mobile Footer-Card)
  - Klaro (consent manager, UMD oder npm)
  - lucide-react (Sun/Moon-Icons für Theme-Toggle, Check für Selected-State)
  - frontend-design Skill für UI-Polish
- Runtime-Constraints:
  - Next.js 15 App Router, TypeScript strict
  - Tailwind 3.4+ (passt zu shadcn/ui canonical)
  - Mobile-first, AA-Kontrast in beiden Themes
  - Lighthouse Mobile Performance ≥ 85, Accessibility ≥ 95
  - Vercel Build (default Node 20+), Standard-Region

## 4. Security & DSGVO
- Personenbezogene Daten: Ja — Lead (Vorname, E-Mail, Telefon optional, Wunschmonat). Verarbeitung NUR nach DSGVO-Checkbox-Ja im Step 6, Übermittlung an n8n (DE-Hosting flow.admantics.eu).
- Cookie-Consent: Klaro pflichtgemäß. Default deny für Tracking-Services. Re-Open via Footer/Floating-Button. AA-konform.
- Rate Limits: Lead-Endpoint serverseitig durch n8n abgesichert (Limit-Logik in n8n-Workflow). Frontend Mehrfach-Submit blockiert über Submit-State.
- Input Validation: React Hook Form + Zod auf Client-Side (Vorname required, E-Mail E-Mail-Format, Telefon optional, DSGVO-Checkbox required true, alle Konfigurator-Steps validierte Enum-Werte).
- Secrets-Storage:
  - Vercel Project ENV: `NEXT_PUBLIC_LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_UMAMI_URL`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_META_PIXEL_ID` (alle public — keine Secrets)
  - Lokal: `.env.local` (in .gitignore), `.env.example` als Vorlage
  - KEINE Server-Secrets im Repo — Webhook-URL ist öffentlich, n8n eigenes Auth-Layer (HMAC oder shared token kann im n8n-Workflow ergänzt werden, falls nötig — out-of-scope für diesen Prototyp)

## 5. Kosten
- Wiederkehrende API-Kosten: keine (eigene n8n-Instanz, kein paid LLM-Call, kein Drittanbieter-Lead-Service)
- Hosting-Kosten: Vercel (Mikes bestehender Account, Free oder Pro). Erwartet: kein zusätzlicher Kostenposten weil Pro-Quota bereits gebucht.
- Domain / Infra: keine (Vercel-Subdomain, keine Custom-Domain)
- Budget-Obergrenze: Test-Implementierung, kein definiertes Hard-Limit. Kosten effektiv 0 € durch bestehende Infra.
- Akzeptanz durch User: Mike akzeptiert via Handover ("Vercel Free oder Pro ist Mikes Account").

## 6. Output-Format
- Deployment-Target: Vercel Project `kairos-konfigurator-test` in Mikes Vercel-Account
- Domain / URL: Vercel-Subdomain (z.B. `kairos-konfigurator-test.vercel.app`). Keine Custom-Domain. Keine Vercel Password Protection.
- Preview oder Production: Production auf `main` branch (Auto-Deploy), Preview-Deployments für PRs.

## 7. Erfolgskriterien
- Kriterium 1: Vercel-URL liefert Landingpage + `/konfigurator` + `/konzept` öffentlich (200 OK), `/konzept` antwortet mit `noindex,nofollow` Meta.
- Kriterium 2: 6-Step-Konfigurator durchläuft End-to-End → POST an Webhook gibt 2xx → Success-Screen "Wir melden uns innerhalb von 24 Stunden". Mail erreicht beide Empfänger (`Michael@admantics.de` und `info@kairosconfident.de`).
- Kriterium 3: Theme-Toggle wechselt Light↔Dark, Wahl persistent über Reload, beide Themes AA-Kontrast in jeder Sektion.
- Kriterium 4: Lighthouse Mobile (375×667) Performance ≥ 85, Accessibility ≥ 95 auf der Landingpage.
- Kriterium 5: Klaro-Banner blockiert Tracking initial; nach Accept startet Umami; Re-Open-Button im Footer/Sidebar funktional.
- Test-Methode: Lokal `npm run build` + `npm run start` + manuelle Klick-Route + Chrome DevTools Lighthouse Mobile + Webhook-Submit gegen Production-Webhook in Test-Run.
- Abnahme durch: Mike (User selbst). Lead-Empfang verifiziert beide Mail-Empfänger.

## 8. Abhängigkeiten
- DB-Tabellen: keine (statische Seite, keine eigene DB)
- n8n Workflows: `kairos-test-lead` Webhook auf `flow.admantics.eu` — KOS legt parallel an, Mail-Routing an Michael+info-Mail (Vorbedingung für Phase 5 Erfolgskriterium 2; Build kann ohne Workflow starten, Submit-Test erst danach möglich).
- DNS-Einträge: keine
- Accounts / Keys / Secrets:
  - GitHub Account `ms-sudoX1` (Mike), Repo wird public erstellt
  - Vercel Account (Mike) — Project anlegen, Auto-Deploy
  - Webhook-URL `https://flow.admantics.eu/webhook/kairos-test-lead` (öffentlich)
  - Umami: `analytics.admantics.eu` (Mike trägt `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in Vercel ENV nach — kann nach Deploy nachgereicht werden)
  - Meta Pixel ID: optional (kann leer bleiben → Pixel-Service nicht initialisiert in Klaro)
- Notion-Seiten: keine
