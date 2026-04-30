import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { themeInitScript } from "@/lib/theme";
import { ConsentProvider } from "@/components/consent/consent-provider";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kairos Confi Dent — Premium Zahntourismus",
    template: "%s · Kairos Confi Dent",
  },
  description:
    "Hochwertige Zahnmedizin in Kairo, kombiniert mit echtem Urlaub. Bis zu 70 % günstiger als in Deutschland — Master-Zertifikate, deutsche Materialien, persönliche Begleitung.",
  applicationName: "Kairos Confi Dent",
  authors: [{ name: "Admantics UG" }],
  creator: "Admantics UG",
  metadataBase: new URL("https://kairos-konfigurator-test.vercel.app"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Kairos Confi Dent",
    title: "Kairos Confi Dent — Premium Zahntourismus",
    description:
      "Echte Premium-Zahnmedizin. Echter Urlaub. Bis zu 70 % günstiger.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <ConsentProvider>{children}</ConsentProvider>
        <div id="klaro" />
      </body>
    </html>
  );
}
