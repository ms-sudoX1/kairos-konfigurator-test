export interface UTMParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function parseUTM(search: string): UTMParams {
  const params = new URLSearchParams(search);
  const out = {} as UTMParams;
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    out[key] = v && v.trim().length > 0 ? v : null;
  }
  return out;
}

export function readUTMFromWindow(): UTMParams {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null };
  }
  return parseUTM(window.location.search);
}
