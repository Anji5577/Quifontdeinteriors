import { pageMeta } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Jost, Noto_Serif_Display } from "next/font/google";
import type { ReactNode } from "react";
import { DeferredUI } from "@/components/layout/DeferredUI";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

// Typography (both SIL Open Font License, self-hosted by next/font):
// - Noto Serif Display Light + Light Italic — a light, high-contrast display
//   serif in the manner of the faces used by luxury hospitality and interior
//   brands; the italic is reserved for a single accent word.
// - Jost — a Futura-style geometric sans that echoes the thin capitals of the
//   QIS monogram; used for labels, navigation and body text.
const display = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Residential Interior Design`,
    template: `%s | ${site.name}`,
  },
  ...pageMeta({ description: site.description, path: "/", image: "furniture-media-wall" }),
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
};

// Runs before first paint:
// - marks the document as JS-capable, so reveal styles apply only when they
//   can be resolved (without JS everything is simply visible);
// - flags the first visit of a session for the short intro (never on
//   internal navigation, never under reduced motion).
const bootScript = `(function(d){d.classList.add("js");try{if(!sessionStorage.getItem("visited")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro")}sessionStorage.setItem("visited","1")}catch(e){}})(document.documentElement)`;

// Organization + WebSite on every page; an InteriorDesignBusiness entry
// (with address and opening hours) appears once the studio address is set.
const sameAs = site.social.map((s) => s.href);
const organization = {
  "@context": "https://schema.org",
  "@type": site.address ? ["Organization", "InteriorDesignBusiness"] : "Organization",
  name: site.name,
  url: site.url,
  logo: new URL("/qis-mark.svg", site.url).toString(),
  description: site.description,
  ...(sameAs.length > 0 && { sameAs }),
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  ...(site.address && {
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  }),
  ...(site.serviceAreas.length > 0 && { areaServed: site.serviceAreas }),
};
const website = { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={organization} />
        <JsonLd data={website} />
      </head>
      <body>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <SmoothScroll />
        <DeferredUI />
      </body>
    </html>
  );
}
