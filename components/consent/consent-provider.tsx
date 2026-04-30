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

function patchDialogA11y() {
  const notice = document.getElementById("klaro-cookie-notice");
  if (notice && !notice.getAttribute("aria-label")) {
    notice.setAttribute("aria-label", "Cookies und Tracking — Auswahl");
  }
  const modal = document.querySelector(".klaro .cookie-modal [role='dialog']");
  if (modal && !modal.getAttribute("aria-label")) {
    modal.setAttribute("aria-label", "Cookie-Einstellungen");
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
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
          patchDialogA11y();
        };

        sync();
        manager.watch({ update: () => sync() });
        const obs = new MutationObserver(patchDialogA11y);
        obs.observe(document.body, { childList: true, subtree: true });
      } catch (err) {
        console.warn("Klaro init failed", err);
      }
    };

    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    if (typeof idle === "function") {
      idle(() => { void boot(); }, { timeout: 2000 });
    } else {
      const t = window.setTimeout(boot, 1200);
      return () => { cancelled = true; clearTimeout(t); };
    }

    return () => { cancelled = true; };
  }, []);

  return children;
}

export function openConsentModal() {
  if (typeof window === "undefined") return;
  window.klaro?.show?.();
}
