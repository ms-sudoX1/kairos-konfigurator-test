"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

interface Props {
  variant?: "header" | "floating";
}

export function ThemeToggle({ variant = "header" }: Props) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  const label = theme === "dark" ? "Light Mode aktivieren" : "Dark Mode aktivieren";

  const className =
    variant === "floating"
      ? "theme-toggle-btn fixed top-5 right-5 z-50 backdrop-blur"
      : "theme-toggle-btn";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className={className}
      style={variant === "floating" ? { background: "var(--header-bg)" } : undefined}
    >
      <span className="sr-only">{label}</span>
      {theme === "dark" ? (
        <Sun size={16} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon size={16} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
