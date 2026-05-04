/**
 * Klaro Consent Manager Config.
 * Doku: https://klaro.org
 */

const UMAMI_URL =
  process.env.NEXT_PUBLIC_UMAMI_URL || "https://analytics.admantics.eu/script.js";
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

// ASSUMPTION: Umami als analytics-Service ist gemäß Handover OPT-IN
// (Klaro consent required). Wir markieren ihn nicht als "essential",
// damit DSGVO sauber bleibt.
export const klaroConfig = {
  version: 1,
  testing: false,
  elementID: "klaro",
  cookieName: "kairos-klaro",
  cookieExpiresAfterDays: 365,
  privacyPolicy: "/datenschutz",
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  noticeAsModal: true,
  showNoticeTitle: true,
  htmlTexts: true,
  styling: { theme: ["light", "wide"] },
  translations: {
    de: {
      consentModal: {
        title: "Privatsphäre & Cookies",
        description:
          "Wir verwenden optionale Tools, um zu verstehen wie diese Test-Seite genutzt wird. Du kannst frei entscheiden, was du zulässt — die Seite funktioniert auch ohne.",
      },
      consentNotice: {
        changeDescription: "Es gibt Änderungen seit deinem letzten Besuch — bitte prüfe deine Auswahl.",
        title: "Wir respektieren deine Privatsphäre",
        description: "Wir würden gerne mit deiner Zustimmung Reichweite messen, damit wir diese Test-Seite verbessern können.",
        learnMore: "Einstellungen",
        testing: "",
      },
      ok: "Akzeptieren",
      save: "Auswahl speichern",
      decline: "Ablehnen",
      close: "Schließen",
      acceptAll: "Akzeptieren",
      acceptSelected: "Auswahl akzeptieren",
      service: {
        disableAll: { title: "Alles aus", description: "Alle Tools deaktivieren" },
        optOut: { title: "(Opt-out)", description: "Standardmäßig aktiv" },
        required: { title: "(Pflicht)", description: "Funktional notwendig" },
        purposes: "Zwecke",
        purpose: "Zweck",
      },
      purposes: {
        analytics: { title: "Reichweitenmessung" },
        advertising: { title: "Werbung" },
        "lead-processing": { title: "Kontaktaufnahme & Lead-Verarbeitung" },
      },
      poweredBy: "Realisiert mit Klaro!",
      contextualConsent: {
        description: "Möchtest du Inhalte von {title} laden?",
        acceptOnce: "Ja",
        acceptAlways: "Immer",
      },
    },
  },
  services: [
    {
      name: "lead-submission",
      title: "Anfrage-Übermittlung an Kairos zur Kontaktaufnahme",
      purposes: ["lead-processing"],
      cookies: [],
      default: false,
      required: false,
      optOut: false,
      onlyOnce: true,
      description:
        "Übermittelt deine Konfigurator-Eingaben und Kontaktdaten an Kairos, damit du eine persönliche Beratung erhältst. Ohne diese Einwilligung können wir deine Anfrage nicht verarbeiten.",
    },
    {
      name: "umami",
      title: "Umami Analytics",
      purposes: ["analytics"],
      cookies: [],
      default: false,
      required: false,
      optOut: false,
      onlyOnce: true,
      description:
        "Cookieless Reichweitenmessung auf eigenen Servern (analytics.admantics.eu).",
    },
    ...(META_PIXEL_ID
      ? [
          {
            name: "meta_pixel",
            title: "Meta Pixel",
            purposes: ["advertising"],
            cookies: [/^_fb/i, /^fbp/i],
            default: false,
            required: false,
            optOut: false,
            onlyOnce: true,
            description:
              "Conversion-Tracking für Meta-Anzeigen (Facebook/Instagram). Nur wenn aktiv geschaltet.",
          },
        ]
      : []),
  ],
};

export const trackingIds = {
  umamiUrl: UMAMI_URL,
  umamiWebsiteId: UMAMI_WEBSITE_ID,
  metaPixelId: META_PIXEL_ID,
};
