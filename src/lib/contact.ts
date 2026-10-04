import { site } from "@/content/site";

export type ContactChannel = {
  kind: "email" | "phone" | "whatsapp";
  label: string;
  /** Display value, or a bracketed placeholder while unset. */
  value: string;
  /** Working link, or null while the value is unset. */
  href: string | null;
};

const digits = (value: string) => value.replace(/[^\d]/g, "");

const { email, phone, whatsapp } = site.contact;

export const channels: readonly ContactChannel[] = [
  { kind: "email", label: "Email", value: email || "[EMAIL ADDRESS]", href: email ? `mailto:${email}` : null },
  { kind: "phone", label: "Phone", value: phone || "[PHONE NUMBER]", href: phone ? `tel:+${digits(phone)}` : null },
  {
    kind: "whatsapp",
    label: "WhatsApp",
    value: whatsapp || "[WHATSAPP NUMBER]",
    href: whatsapp ? `https://wa.me/${digits(whatsapp)}` : null,
  },
];

/** WhatsApp chat link with a prefilled message, or null if no number is configured. */
export function whatsappLink(text: string): string | null {
  return whatsapp ? `https://wa.me/${digits(whatsapp)}?text=${encodeURIComponent(text)}` : null;
}

/** mailto link with subject and body, or null if no email is configured. */
export function mailtoLink(subject: string, body: string): string | null {
  return email ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : null;
}
