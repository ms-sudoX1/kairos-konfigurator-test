"use client";

import { useEffect } from "react";
import { klaroConfig, trackingIds } from "@/lib/klaro-config";
import "klaro/dist/klaro.css";

declare global {
  interface Window {
    klaro?: {
      show: () => void;
      getManager: () => unknown;
    };
    klaroConfig?: typeof klaroConfig;
  }
}

function injectUmami() {
  if (typeof document === "undefined") return;
  if (!trackingIds.umamiWebsiteId) return;
  if (document.querySelector('script[data-name="kairos-umami"]')) return;
  const s = document.createElement("script");
  s.async = true;
  s.defer = true;
  s.src = trackingIds.umamiUrl;
  s.dataset.websiteId = trackingIds.umamiWebsiteId;
  s.dataset.name = "kairos-umami";
  document.head.appendChild(s);
}

function removeUmami() {
  document
    .querySelectorAll('script[data-name="kairos-umami"]')
    .forEach((n) => n.remove());
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const klaro = await import("klaro");
        if (cancelled) return;
        window.klaroConfig = klaroConfig;
        klaro.setup(klaroConfig as never);

        // ASSUMPTION: Klaro-Manager-Watcher API ist v0.7.x kompatibel.
        const manager = klaro.getManager(klaroConfig as never) as {

          watch: (cb: { update: (m: unknown, ev: string, payload: unknown) => void }) => void;
          getConsent: (name: string) => boolean;
        };

        const sync = () => {
          if (manager.getConsent("umami")) injectUmami();
          else removeUmami();
        };

        sync();
        manager.watch({ update: () => sync() });
      } catch (err) {
        // Klaro fehlt → Tracking bleibt aus. Test-Seite funktioniert weiter.
        console.warn("Klaro init failed", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return children;
}

export function openConsentModal() {
  if (typeof window === "undefined") return;
  window.klaro?.show?.();
}
