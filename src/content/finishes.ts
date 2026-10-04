import type { ImageId } from "./images";

// Finishes visible in the photography. Names describe appearance only
// ("oak finish", "walnut tone") — the actual materials are not stated.
export type Finish = {
  key: string;
  name: string;
  image: ImageId;
  /** object-position chosen to land a narrow crop on the surface itself */
  position: string;
};

export const finishes: readonly Finish[] = [
  { key: "teal", name: "Teal", image: "wardrobe-teal", position: "22% 50%" },
  { key: "stone", name: "Stone texture", image: "wardrobe-stone-study", position: "14% 50%" },
  { key: "ivory", name: "Ivory", image: "wardrobe-ivory-mirror", position: "36% 50%" },
  { key: "oak", name: "Oak finish", image: "wardrobe-oak-niche", position: "84% 50%" },
  { key: "sage", name: "Sage", image: "disha-sage-wardrobe", position: "12% 50%" },
  { key: "pale-blue", name: "Pale blue", image: "disha-kids-wardrobe", position: "78% 50%" },
  { key: "walnut", name: "Walnut tone", image: "furniture-walnut-grain", position: "50% 30%" },
  { key: "charcoal", name: "Charcoal", image: "furniture-liftup-flap", position: "18% 70%" },
];

export const getFinish = (key: string) => finishes.find((f) => f.key === key);

/** The six wardrobe fronts shown together on the homepage sample board. */
export const wardrobeFinishes = finishes.slice(0, 6);
