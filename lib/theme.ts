export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "kairos-theme";

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0a0a0a",
  light: "#faf6ee",
};

/**
 * Inline-Script string, das im <head> VOR dem ersten Paint
 * das initiale Theme setzt. Verhindert Flash of Wrong Theme.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var initial = stored || (prefersLight ? 'light' : 'dark');
    document.documentElement.dataset.theme = initial;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', initial === 'light' ? '${THEME_COLORS.light}' : '${THEME_COLORS.dark}');
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export function applyTheme(next: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("theme-transitioning");
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* localStorage blocked */
  }
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = THEME_COLORS[next];
  window.setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, 50);
}

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const value = document.documentElement.dataset.theme;
  return value === "light" ? "light" : "dark";
}
