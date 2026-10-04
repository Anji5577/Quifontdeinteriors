import type { SiteImage } from "@/content/images";

/** `srcset` for one format of a pre-optimised image. */
export const imageSrcSet = (image: SiteImage, ext: "avif" | "webp") =>
  image.widths.map((w) => `/img/${image.id}-${w}.${ext} ${w}w`).join(", ");

/** `sizes` of the full-width project hero; shared so covers can pre-warm it. */
export const PROJECT_HERO_SIZES = "(min-width: 96rem) 92rem, 100vw";
