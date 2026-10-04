import { imageManifest, type ImageId } from "./images.generated";

export type { ImageId };

export type SiteImage = {
  id: ImageId;
  alt: string;
  width: number;
  height: number;
  widths: readonly number[];
  color: string;
};

// Alt text describes only what is visible in each photograph.
const alt: Record<ImageId, string> = {
  "disha-living-media":
    "Living room with a tall oak-finish cabinet and open niche beside a wall-mounted television on a textured grey feature wall, above a floating low unit.",
  "disha-media-detail":
    "Close view of the oak-finish tall cabinet, its dark open niche and the textured grey wall panel behind the television.",
  "disha-kitchen-tall-unit":
    "Floor-to-ceiling ivory kitchen tall unit with long bar handles and a built-in oven at counter height.",
  "disha-kitchen":
    "L-shaped kitchen with oak-finish overhead cabinets, a black chimney, dark stone-look backsplash and counters, and ivory base drawers.",
  "disha-sage-wardrobe":
    "Bedroom wall of sage-green wardrobe panels with a central pair of tinted glass doors, lit inside to show hanging clothes and shelves.",
  "disha-sage-wardrobe-glass":
    "Angled view of the sage-green wardrobe with its tinted glass display doors and a matching upholstered bed.",
  "disha-sage-bedroom":
    "Bedroom with a sage-green wardrobe on one wall, a green upholstered bed with yellow cushions, and family photographs around the window.",
  "disha-kids-room-motion":
    "Child's room with a white bunk bed against a green and cream hill-pattern wallpaper, a child walking past in motion blur.",
  "disha-kids-bunk":
    "White bunk bed with blue drawers and a ladder, set against playful hill-pattern wallpaper.",
  "disha-kids-wardrobe":
    "Tall two-tone wardrobe in sage and pale blue with round knobs, beside the bunk bed in the child's room.",
  "disha-oak-window-seat":
    "Bedroom wardrobe in oak finish that wraps around a window, framing an upholstered window seat with storage beneath.",
  "disha-guest-bedroom":
    "View through a doorway into a bedroom with a slatted upholstered headboard, a timber-legged bed and a window with a printed blind.",
  "disha-window-seat-detail":
    "Detail of the oak-finish wardrobe doors beside the cushioned window seat and its built-in drawers.",
  "furniture-sideboard":
    "Long pale grey sideboard with handleless drawers and doors, a thin timber top, and slim dark legs against a textured wall.",
  "furniture-floating-desk":
    "Wall-mounted walnut-tone desk and floating drawer unit beneath a long overhead cabinet with tinted glass fronts.",
  "furniture-console":
    "Floating walnut-tone console with a white top, cable ports and a stack of drawers, set against a pale textured wall.",
  "furniture-media-wall":
    "Floating walnut-tone media wall with an upper cabinet row, open charcoal shelving, a tall tinted glass side cabinet and a low drawer unit.",
  "furniture-media-wall-angle":
    "Angled view of the walnut-tone media wall showing its floating base, charcoal open shelves and glass side cabinet.",
  "furniture-dropdown-flap":
    "Close-up of the media unit's tinted glass drop-down flap opened below the walnut-tone counter.",
  "furniture-liftup-flap":
    "Walnut-tone upper cabinet with its lift-up flap door raised, revealing charcoal compartments.",
  "furniture-walnut-grain":
    "Close-up of the walnut-tone grain on the media wall panel, with a small plant and figurine on the counter.",
  "furniture-bookcase":
    "Full-height dark wood bookcase with a diagonal lattice of book compartments at its centre and glass-fronted cabinets along the base.",
  "furniture-bookcase-angle":
    "Angled view of the dark wood bookcase with its diagonal lattice shelving above a row of glass-fronted base cabinets.",
  "wardrobe-teal":
    "Teal wardrobe with handleless panel doors and a central pair of tinted glass doors showing lit hanging space.",
  "wardrobe-teal-open":
    "Teal wardrobe with doors open, revealing a charcoal interior with hanging rail, drawers and lit glass-fronted section.",
  "wardrobe-sliding":
    "Ivory sliding-door wardrobe partly open to a warm-lit timber interior with hanging space, shelves and drawers.",
  "wardrobe-stone-angle":
    "Angled view of a stone-textured grey wardrobe wall with a built-in study niche and a full-length mirror door.",
  "wardrobe-stone-study":
    "Stone-textured grey wardrobe wall with an integrated study desk and shelf at its centre and a mirror door at the right.",
  "wardrobe-ivory-mirror":
    "Floor-to-ceiling ivory handleless wardrobe with long black edge pulls and a single full-length mirror panel.",
  "wardrobe-oak-niche":
    "Oak-finish wardrobe wall with mirrored doors at the left, an open display niche with shelves and drawers, and tall doors at the right.",
};

export function getImage(id: ImageId): SiteImage {
  return { id, alt: alt[id], ...imageManifest[id] };
}

// Room / piece tags for the rooms archive and service pages. Assigned only
// from what each photograph visibly shows.
export const roomTags = [
  "Living",
  "Kitchen",
  "Bedroom",
  "Children’s room",
  "Wardrobe",
  "Media wall",
  "Furniture",
  "Detail",
] as const;
export type RoomTag = (typeof roomTags)[number];

export const imageTags: Record<ImageId, readonly RoomTag[]> = {
  "disha-living-media": ["Living", "Media wall"],
  "disha-media-detail": ["Living", "Media wall", "Detail"],
  "disha-kitchen-tall-unit": ["Kitchen"],
  "disha-kitchen": ["Kitchen"],
  "disha-sage-wardrobe": ["Bedroom", "Wardrobe"],
  "disha-sage-wardrobe-glass": ["Bedroom", "Wardrobe"],
  "disha-sage-bedroom": ["Bedroom"],
  "disha-kids-room-motion": ["Children’s room"],
  "disha-kids-bunk": ["Children’s room", "Furniture"],
  "disha-kids-wardrobe": ["Children’s room", "Wardrobe"],
  "disha-oak-window-seat": ["Bedroom", "Wardrobe"],
  "disha-guest-bedroom": ["Bedroom"],
  "disha-window-seat-detail": ["Bedroom", "Wardrobe", "Detail"],
  "furniture-sideboard": ["Furniture"],
  "furniture-floating-desk": ["Furniture"],
  "furniture-console": ["Furniture"],
  "furniture-media-wall": ["Living", "Media wall"],
  "furniture-media-wall-angle": ["Living", "Media wall"],
  "furniture-dropdown-flap": ["Media wall", "Detail"],
  "furniture-liftup-flap": ["Media wall", "Detail"],
  "furniture-walnut-grain": ["Media wall", "Detail"],
  "furniture-bookcase": ["Furniture"],
  "furniture-bookcase-angle": ["Furniture"],
  "wardrobe-teal": ["Wardrobe"],
  "wardrobe-teal-open": ["Wardrobe", "Detail"],
  "wardrobe-sliding": ["Wardrobe", "Detail"],
  "wardrobe-stone-angle": ["Wardrobe"],
  "wardrobe-stone-study": ["Wardrobe"],
  "wardrobe-ivory-mirror": ["Wardrobe"],
  "wardrobe-oak-niche": ["Wardrobe"],
};

/** Images carrying a tag, in archive order. */
export const imagesTagged = (tag: RoomTag): ImageId[] =>
  (Object.keys(imageTags) as ImageId[]).filter((id) => imageTags[id].includes(tag));
