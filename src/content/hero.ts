import type { ImageId } from "./images";

// Full-screen homepage slides. Landscape photographs get a portrait or square
// sibling for phones (`mobileImage`) so small screens never show an
// over-enlarged crop. The first slide is square, so one file serves both and
// it can be preloaded as the LCP image without art-direction.
export type HeroSlide = {
  image: ImageId;
  mobileImage?: ImageId;
  caption: string;
  href: string;
  /** object-position on phones / tablet-and-up */
  mobile: string;
  desktop: string;
};

export const heroSlides: readonly HeroSlide[] = [
  { image: "disha-oak-window-seat", caption: "Window seat, Disha Courtyard", href: "/work/disha-courtyard/", mobile: "64% 50%", desktop: "50% 62%" },
  { image: "furniture-media-wall", mobileImage: "furniture-walnut-grain", caption: "Walnut media wall", href: "/work/custom-furniture/", mobile: "50% 50%", desktop: "50% 55%" },
  { image: "furniture-bookcase", mobileImage: "furniture-bookcase-angle", caption: "Lattice bookcase", href: "/work/custom-furniture/", mobile: "50% 50%", desktop: "50% 45%" },
  { image: "disha-sage-wardrobe", mobileImage: "disha-sage-wardrobe-glass", caption: "Sage wardrobe, Disha Courtyard", href: "/work/disha-courtyard/", mobile: "40% 50%", desktop: "50% 50%" },
  { image: "wardrobe-teal", mobileImage: "wardrobe-teal-open", caption: "Teal wardrobe system", href: "/work/wardrobe-systems/", mobile: "50% 50%", desktop: "50% 50%" },
];
