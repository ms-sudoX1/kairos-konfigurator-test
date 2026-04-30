# DESIGN.md — Kairos Konfigurator-Test

Visuelle SSOT für das Repo. Bei Konflikt zwischen DESIGN.md und Code: DESIGN.md gewinnt.

## Brand-Tonalität

- Premium Zahntourismus, ruhig-luxuriös, sachlich-vertrauensbildend.
- Sprache: gehobenes Deutsch, kurze Sätze, keine Marktschreierei. Beispiele aus Master-URL: "Jetzt kostenlose Beratung sichern", "Kombinieren Sie Ihr perfektes Lächeln mit einem Luxusaufenthalt".
- Akzent-Stilmittel: Italic-Quotes und römische Ziffern (i. ii. iii. / H₁ H₂ H₃ H₄) im Display-Font.
- Keine Emojis, keine Fake-Reviews, keine Trust-Badges ohne Beleg. Footer-Disclaimer: "Test-Implementierung · Verbindliche Angebote ausschließlich über kairosconfident.de".

## Typografie

| Rolle | Font | Quelle | Weights |
|------|------|--------|---------|
| Display / Headlines / Italic Akzente | Cormorant Garamond | `next/font` Google | 400, 500, 600, ital 400, ital 500 |
| Body / UI | Outfit | `next/font` Google | 200, 300, 400, 500 |

- Subset: `latin`.
- Letter-spacing für Eyebrow-Labels (z.B. "SCHRITT N VON 6"): `0.18em`, Versalien.
- Hero-H1: dreizeilig, dabei eine Zeile in Italic + Gold (z.B. "Echter Urlaub.").
- Konfigurator-Frage: Display-Font, 22–26px.

## Theme-System

Implementierung über CSS Custom Properties + `data-theme` Attribut auf `<html>`:

```css
:root,
[data-theme="dark"] {
  --bg-deep: #0A0A0A;
  --bg-surface: #14110D;
  --bg-elevated: #1C1814;
  --gold: #D4A24C;
  --gold-bright: #EBC477;
  --gold-deep: #8C6620;
  --gold-text: #D4A24C;
  --gold-glow: rgba(212, 162, 76, 0.18);
  --text-primary: #F5EDE0;
  --text-secondary: #A89B85;
  --text-muted: #6E6557;
  --border: rgba(212, 162, 76, 0.15);
  --border-strong: rgba(212, 162, 76, 0.32);
  --header-bg: rgba(10, 10, 10, 0.72);
  --btn-on-gold: #0A0A0A;
}

[data-theme="light"] {
  --bg-deep: #FAF6EE;
  --bg-surface: #F2EBDD;
  --bg-elevated: #FFFFFF;
  --gold: #B8862E;
  --gold-bright: #D4A24C;
  --gold-deep: #6B4D17;
  --gold-text: #6B4D17;
  --gold-glow: rgba(184, 134, 46, 0.10);
  --text-primary: #1A1612;
  --text-secondary: #5C5142;
  --text-muted: #8C8275;
  --border: rgba(184, 134, 46, 0.20);
  --border-strong: rgba(184, 134, 46, 0.45);
  --header-bg: rgba(250, 246, 238, 0.78);
  --btn-on-gold: #FAF6EE;
}
```

### Theme-Init (vor First Paint)

Inline-Script im `<head>`:

```js
const stored = localStorage.getItem('kairos-theme');
const prefersLight = matchMedia('(prefers-color-scheme: light)').matches;
const initial = stored || (prefersLight ? 'light' : 'dark');
document.documentElement.dataset.theme = initial;
```

`<meta name="theme-color">` wechselt mit Theme: `#0A0A0A` (dark) / `#FAF6EE` (light).

### Theme-Toggle

- 36×36 Kreis-Button im Header, `border: 1px solid var(--border)`.
- Icon: `Sun` (lucide-react) in Dark-Mode, `Moon` in Light-Mode.
- Hover: `transform: rotate(15deg)`.
- Click → `document.documentElement.dataset.theme` umschalten + `localStorage.setItem('kairos-theme', next)` + `<meta theme-color>` aktualisieren.

## Atmosphäre

- Subtile radiale Gold-Glows als Body-Pseudo-Elemente:
  - `body::before`: top-left, radial-gradient mit `--gold-glow`, blurred.
  - `body::after`: bottom-right, gleicher Style, andere Position.
- Header: `backdrop-filter: blur(20px)`, `background: var(--header-bg)`, sticky.
- Sanfte Reveals via Intersection Observer + Tailwind `transition-all duration-700` auf `data-revealed` Klasse.

## Komponenten-Specs

### Buttons

| Variant | Background | Text | Border | Notes |
|--------|-----------|------|--------|-------|
| Primary CTA | `var(--gold)` | `var(--btn-on-gold)` | none | Hover: `var(--gold-bright)`, leichter Glow `0 0 24px var(--gold-glow)` |
| Secondary | transparent | `var(--gold-text)` | `1px solid var(--border-strong)` | Hover: bg `rgba(212,162,76,0.06)` |
| Ghost (Header-Kontakt) | transparent | `var(--text-secondary)` | none | Hover: `var(--gold-text)` |

Padding: `px-6 py-3` (Primary), `px-5 py-2.5` (Secondary). Letter-spacing 0.04em. Font Outfit 500.

### Konfigurator-Step-Indikator

- 6 schmale Bars top, Höhe `2px`, Breite gleichmäßig per Flex.
- States: `done` → `var(--gold-deep)`, `active` → `var(--gold)`, `todo` → `var(--border)`.
- Step-Label darüber: Outfit 300, 11px, letter-spacing `0.18em`, Versalien — "SCHRITT N VON 6".

### Konfigurator-Optionen

- `<button>` mit `border: 1px solid var(--border)`, `background: var(--bg-elevated)`, padding `1rem 1.25rem`.
- Hover: `border-color: var(--gold)`.
- Selected: `border-color: var(--gold)`, plus rechts ein `<Check>`-Icon `var(--gold)`.
- Multi-Select-State (Step 1): zeigt Counter "x von 3 ausgewählt" unten.

### Live-Preview-Card

- Desktop (≥ md): rechte Sidebar `sticky top-24`, `border: 1px solid var(--border)`, `bg: var(--bg-elevated)`, `rounded-2xl`, padding `1.75rem`.
- Mobile: bottom-fixed Card, `bg: var(--bg-elevated)`, top-Border, hochkant ausziehbar via Sheet.
- Preis-Display: Display-Font, 32px, `var(--gold-text)`. Disclaimer in `var(--text-muted)` 12px.

### Trust-Cards

- 3-Card-Grid, `border: 1px solid var(--border)`, padding `2rem`.
- Icon-Ersatz: kreisrunder Container 56×56 mit Italic-Ziffer (i / ii / iii) im Display-Font, `var(--gold-text)`.
- Headline Display 22px, Body Outfit 14px `var(--text-secondary)`.

### Preisvergleich-Cards

- 2-Card-Layout, mit Italic-Display-Divider "vs." mittig.
- Linke Card: "Deutschland" Headline + Liste, Preis als durchgestrichener `var(--text-muted)`.
- Rechte Card: "Kairo" Headline mit Gold-Border `var(--border-strong)`, Preis prominent in `var(--gold-text)`.

### Reise-Grid

- 4 Bilder: Pyramiden, 5★ Resort, Khan el-Khalili, Nil-Cruise.
- Mobile: 2×2 Grid, Desktop: 4 Spalten.
- AVIF + JPG (Pexels, kommerzielle Lizenz). Alt-Text DE.
- Hover: leichter Zoom `scale(1.03)`.

### FAQ

- shadcn `Accordion`, single-collapsed.
- Trigger: Display-Font 18–20px, links-bündig.
- Content: Outfit 14px, `var(--text-secondary)`.
- Border-Bottom je Item: `1px solid var(--border)`.

### /konzept Editorial-Stil

- Container `max-width: 760px`, padding-x `1.25rem`.
- Floating-Theme-Toggle: `position: fixed; top: 1.25rem; right: 1.25rem; z-50`.
- Sektionen mit Italic-Display-Ziffern (i. – vi.) als Eyebrow.
- Pullquote (in §ii): Display-Italic, Border-Left `4px solid var(--gold)`, padding-left `1.5rem`, `var(--text-primary)`.
- KPI-Cards (§v): 4er-Grid (2×2 mobile, 4 Spalten desktop), Wert in Display 32px Gold, Label Outfit 12px Versalien.

## Spacing & Layout

- Container max-width: 1200px (Landing), 760px (/konzept).
- Section vertikales Padding: `py-20 md:py-28`.
- Card border-radius: `1rem` (`rounded-2xl`).
- Default Gap zwischen Stat-Items: `1.5rem`.

## Bilder & Assets

- Hero ohne Hero-Image (nur Typografie + Glow). Optional Pyramiden-Background mit Overlay.
- Reise-Bilder: Pexels (commercial). AVIF + JPG. `next/image` mit `priority` nur für oberhalb-fold.
- Keine Lorem-Ipsum-Inhalte. Texte aus Mockups übernehmen, ggf. erweitern im Stil der Master-URL.
