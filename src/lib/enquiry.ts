import { finishes } from "@/content/finishes";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

// The enquiry is assembled into a plain-text brief and sent by the visitor
// over WhatsApp or email — no form backend, no data stored by the site.

export const options = {
  propertyType: ["Apartment", "Villa / independent house", "Penthouse", "Other"],
  size: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Single room or piece"],
  area: ["Under 1,000 sq ft", "1,000–1,500 sq ft", "1,500–2,500 sq ft", "Over 2,500 sq ft", "Not sure"],
  stage: ["Under construction", "Possession received", "Living in it", "Renovating"],
  scope: [
    "Whole home",
    "Kitchen",
    "Wardrobes & storage",
    "Media wall",
    "Custom furniture",
    "Children’s room",
    "Renovation of existing interiors",
  ],
  start: ["Within a month", "In 1–3 months", "In 3–6 months", "Just exploring"],
  contactBy: ["WhatsApp", "Phone call", "Email"],
} as const;

export type Enquiry = {
  propertyType: string;
  size: string;
  area: string;
  locality: string;
  stage: string;
  scope: string[];
  finishes: string[];
  start: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  contactBy: string;
  message: string;
  /** Set from ?project= when enquiring from a case study. */
  reference: string;
};

export const emptyEnquiry: Enquiry = {
  propertyType: "",
  size: "",
  area: "",
  locality: "",
  stage: "",
  scope: [],
  finishes: [],
  start: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  contactBy: "WhatsApp",
  message: "",
  reference: "",
};

export type StepKey = "home" | "scope" | "finishes" | "timing" | "you";

export const steps: readonly { key: StepKey; title: string; hint: string }[] = [
  { key: "home", title: "The home", hint: "A little about the property." },
  { key: "scope", title: "What you need", hint: "Choose everything that applies." },
  { key: "finishes", title: "Finishes you’re drawn to", hint: "Optional — pick any that appeal." },
  { key: "timing", title: "Timing", hint: "Roughly is fine." },
  { key: "you", title: "About you", hint: "So we can reply." },
];

export type Errors = Partial<Record<keyof Enquiry, string>>;

export function validate(step: StepKey, e: Enquiry): Errors {
  const errors: Errors = {};
  if (step === "home") {
    if (!e.propertyType) errors.propertyType = "Choose a property type.";
    if (!e.size) errors.size = "Choose the size of the home.";
  }
  if (step === "scope" && e.scope.length === 0) errors.scope = "Choose at least one thing you need.";
  if (step === "timing" && !e.start) errors.start = "Choose when you’d like to start.";
  if (step === "you") {
    if (!e.name.trim()) errors.name = "Enter your name.";
    if (!e.phone.trim() && !e.email.trim()) errors.phone = "Enter a phone number or an email address.";
    if (e.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim())) errors.email = "Check the email address.";
  }
  return errors;
}

/** Service page slugs → scope options, for prefilled enquiries. */
const scopeForService: Record<string, string[]> = {
  "residential-interiors": ["Whole home"],
  kitchens: ["Kitchen"],
  wardrobes: ["Wardrobes & storage"],
  "custom-furniture": ["Custom furniture", "Media wall"],
  "childrens-rooms": ["Children’s room"],
};

export function prefillFromUrl(search: string, base: Enquiry): Enquiry {
  const params = new URLSearchParams(search);
  const service = params.get("service");
  const project = params.get("project");
  const next = { ...base };
  if (service && scopeForService[service]) next.scope = [...new Set([...next.scope, ...scopeForService[service]])];
  const p = project ? getProject(project) : undefined;
  if (p) next.reference = p.title;
  return next;
}

export function buildBrief(e: Enquiry): string {
  const line = (label: string, value: string) => (value.trim() ? `${label}: ${value.trim()}` : "");
  const section = (title: string, lines: string[]) => {
    const body = lines.filter(Boolean);
    return body.length ? [title.toUpperCase(), ...body].join("\n") : "";
  };
  const finishNames = e.finishes.map((k) => finishes.find((f) => f.key === k)?.name ?? k);

  return [
    `New enquiry — ${site.name} website`,
    e.reference ? `Re: a home like “${e.reference}”` : "",
    section("Home", [
      line("Property", [e.propertyType, e.size, e.area].filter(Boolean).join(" · ")),
      line("Locality", e.locality),
      line("Stage", e.stage),
    ]),
    section("Scope", [e.scope.join(", ")]),
    section("Finishes", [finishNames.join(", ")]),
    section("Timing", [line("Start", e.start), line("Budget", e.budget)]),
    section("Contact", [line("Name", e.name), line("Phone", e.phone), line("Email", e.email), line("Prefers", e.contactBy)]),
    section("Notes", [e.message]),
  ]
    .filter(Boolean)
    .join("\n\n");
}
