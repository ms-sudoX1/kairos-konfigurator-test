import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_NAME = "Kairos Confi Dent";
export const FOOTER_DISCLAIMER =
  "Test-Implementierung · Verbindliche Angebote ausschließlich über kairosconfident.de";
