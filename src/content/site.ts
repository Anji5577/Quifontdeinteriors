// Single source of truth for studio identity and contact details.
//
// Empty values are deliberate: anything left blank is either shown as a
// bracketed placeholder or not rendered at all, so nothing unverified is ever
// presented as a working link, address or business fact. Fill these in once
// the studio confirms them — every page picks them up automatically.

export const site = {
  name: "Quifontdeinteriors",
  /** Monogram used in the logo mark. */
  monogram: "QIS",
  description:
    "Residential interiors, wardrobes and custom furniture — designed around the way you live.",
  // Used for canonical URLs, Open Graph and the sitemap. Replace on deployment.
  url: "https://example.com",

  contact: {
    /** e.g. "studio@quifontdeinteriors.com" */
    email: "",
    /** International format, e.g. "+91 98765 43210" */
    phone: "",
    /** International format; enables WhatsApp links and enquiries. */
    whatsapp: "",
  },

  /** Studio address — enables the footer address, map link and local-business data. */
  address: null as null | {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  },
  /** Cities or areas the studio works in, e.g. ["Bengaluru"]. Shown only when set. */
  serviceAreas: [] as string[],
  /** Opening hours as display text, e.g. "Mon–Sat, 10am–7pm". */
  hours: "",
  /** Profile URLs, e.g. { label: "Instagram", href: "https://instagram.com/…" }. */
  social: [] as { label: string; href: string }[],
  /**
   * Budget ranges offered in the enquiry form, e.g. ["₹15–25 L", "₹25–50 L"].
   * The budget question is hidden until the studio defines these.
   */
  budgetBands: [] as string[],

  nav: [
    { label: "Work", href: "/work/" },
    { label: "Services", href: "/services/" },
    { label: "Process", href: "/process/" },
    { label: "About", href: "/about/" },
  ],
  cta: { label: "Start a project", href: "/contact/#enquire" },
} as const;
