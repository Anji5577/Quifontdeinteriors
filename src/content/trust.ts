import type { ImageId } from "./images";

// Social proof. Every list starts empty and nothing renders until the studio
// supplies real, permitted material. Never invent entries here.

export type Testimonial = {
  quote: string;
  /** e.g. "Priya & Rohan" — only with the client's permission. */
  name: string;
  /** Project slug the quote relates to, if any. */
  project?: string;
  context?: string;
};

export type PressItem = { publication: string; title: string; href?: string; year?: string };

export type Person = { name: string; role: string; bio?: string; image?: ImageId };

export const testimonials: readonly Testimonial[] = [];

export const press: readonly PressItem[] = [];

export const people: readonly Person[] = [];

/** e.g. { rating: 4.9, count: 37, href: "https://g.page/…" } */
export const googleRating: null | { rating: number; count: number; href: string } = null;
