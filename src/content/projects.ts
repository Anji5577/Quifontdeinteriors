import type { ImageId } from "./images";

// Project content is written only from what the supplied photographs show.
// No location, client, year, size or budget is stated anywhere because none
// was provided. Verified facts go in `details`: each field appears on the
// case study only once it is filled in.

export type ProjectBlock =
  | { kind: "full"; image: ImageId }
  | { kind: "pair"; images: readonly [ImageId, ImageId]; lead?: "left" | "right" }
  | { kind: "offset"; image: ImageId; align: "left" | "right"; note?: string }
  | { kind: "chapter"; heading: string; body: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  intro: string;
  cover: ImageId;
  secondary: ImageId;
  facts: readonly { label: string; value: string }[];
  /** Confirmed project facts — empty strings are not shown. */
  details: { location: string; area: string; year: string; status: string; photography: string };
  /** Finishes cropped from this project's own photographs. */
  palette: readonly { name: string; image: ImageId; position: string }[];
  blocks: readonly ProjectBlock[];
};

const noDetails = { location: "", area: "", year: "", status: "", photography: "" };

export const projects: readonly Project[] = [
  {
    slug: "disha-courtyard",
    index: "01",
    title: "Disha Courtyard",
    category: "Residential interior",
    summary:
      "A family home of living room, kitchen and three bedrooms, each organised around a single built-in element.",
    intro:
      "Every room here is shaped by one piece of joinery. An oak-finish tower holds the living room together; ivory tall units steady the kitchen; and in the bedrooms the wardrobes take on the colour of the room, in sage, pale blue and oak, until one of them wraps around a window and becomes a seat.",
    cover: "disha-oak-window-seat",
    secondary: "disha-sage-wardrobe",
    details: noDetails,
    palette: [
      { name: "Oak finish", image: "disha-window-seat-detail", position: "18% 40%" },
      { name: "Sage", image: "disha-sage-wardrobe", position: "12% 50%" },
      { name: "Pale blue", image: "disha-kids-wardrobe", position: "78% 50%" },
      { name: "Ivory", image: "disha-kitchen-tall-unit", position: "62% 30%" },
    ],
    facts: [
      { label: "Type", value: "Residential interior" },
      { label: "Spaces", value: "Living, kitchen, three bedrooms" },
      { label: "Finishes", value: "Oak finish, sage, pale blue, ivory, textured grey" },
      { label: "Elements", value: "Media wall, kitchen, wardrobes, window seat, bunk bed" },
    ],
    blocks: [
      { kind: "full", image: "disha-living-media" },
      {
        kind: "chapter",
        heading: "Living",
        body: "A tall oak-finish cabinet with a dark open niche anchors the television wall. The textured grey panel behind and the floating console beneath keep the wall quiet and the floor clear.",
      },
      {
        kind: "offset",
        image: "disha-media-detail",
        align: "right",
        note: "Oak finish against a textured grey panel, with a shadowed niche at eye level.",
      },
      {
        kind: "chapter",
        heading: "Kitchen",
        body: "An L-shaped kitchen pairs warm overhead cabinets with ivory base drawers and a dark stone-look backsplash. A separate floor-to-ceiling unit takes the oven at a comfortable working height.",
      },
      { kind: "pair", images: ["disha-kitchen", "disha-kitchen-tall-unit"], lead: "left" },
      {
        kind: "chapter",
        heading: "Sage bedroom",
        body: "Sage-green panels run from wall to wall, interrupted only by a pair of tinted glass doors lit from within. The bed is upholstered to match.",
      },
      { kind: "full", image: "disha-sage-wardrobe" },
      { kind: "pair", images: ["disha-sage-bedroom", "disha-sage-wardrobe-glass"], lead: "right" },
      {
        kind: "chapter",
        heading: "Children’s room",
        body: "A white bunk bed with blue drawers stands against hill-pattern wallpaper, beside a tall two-tone wardrobe in sage and pale blue.",
      },
      { kind: "pair", images: ["disha-kids-room-motion", "disha-kids-wardrobe"], lead: "left" },
      {
        kind: "chapter",
        heading: "Window seat",
        body: "In the third bedroom an oak-finish wardrobe wraps around the window, turning the sill into an upholstered seat with drawers beneath it.",
      },
      { kind: "pair", images: ["disha-window-seat-detail", "disha-guest-bedroom"], lead: "left" },
    ],
  },
  {
    slug: "custom-furniture",
    index: "02",
    title: "Custom Furniture",
    category: "Media walls, consoles & shelving",
    summary:
      "Media walls, consoles, a desk and shelving, mostly wall-mounted and finished in a warm walnut tone.",
    intro:
      "A collection of individual pieces rather than a single home. Most float above the floor; most pair a walnut-tone exterior with charcoal interiors. The detail is in the mechanisms: a drop-down glass flap, lift-up upper doors, cable ports cut cleanly into the counter.",
    cover: "furniture-bookcase",
    secondary: "furniture-liftup-flap",
    details: noDetails,
    palette: [
      { name: "Walnut tone", image: "furniture-walnut-grain", position: "50% 30%" },
      { name: "Charcoal", image: "furniture-liftup-flap", position: "30% 70%" },
      { name: "Tinted glass", image: "furniture-dropdown-flap", position: "45% 70%" },
      { name: "Pale grey", image: "furniture-sideboard", position: "40% 62%" },
      { name: "Dark wood", image: "furniture-bookcase", position: "6% 50%" },
    ],
    facts: [
      { label: "Type", value: "Custom furniture" },
      { label: "Pieces", value: "Media wall, consoles, desk, sideboard, bookcase" },
      { label: "Finishes", value: "Walnut tone, charcoal, tinted glass, pale grey" },
      { label: "Details", value: "Lift-up flaps, drop-down glass flap, cable ports" },
    ],
    blocks: [
      { kind: "full", image: "furniture-media-wall" },
      {
        kind: "chapter",
        heading: "Media wall",
        body: "A single floating composition: upper cabinets, an open charcoal shelf, a tinted glass side cabinet and a low drawer unit, all held clear of the floor.",
      },
      {
        kind: "offset",
        image: "furniture-media-wall-angle",
        align: "right",
        note: "Held clear of the floor, so the wall reads as one plane.",
      },
      { kind: "pair", images: ["furniture-liftup-flap", "furniture-dropdown-flap"], lead: "left" },
      {
        kind: "offset",
        image: "furniture-walnut-grain",
        align: "left",
        note: "The grain carries across the panel; the counter edge stays thin.",
      },
      {
        kind: "chapter",
        heading: "Consoles & desk",
        body: "Lower pieces follow the same logic: wall-hung, with drawers stacked into one side and the rest left open. The sideboard is the exception, a long pale grey body on slim legs.",
      },
      { kind: "pair", images: ["furniture-console", "furniture-floating-desk"], lead: "right" },
      { kind: "full", image: "furniture-sideboard" },
      {
        kind: "chapter",
        heading: "Shelving",
        body: "A full-height bookcase in dark wood with a diagonal lattice at its centre, so books lean into the grid, above a row of glass-fronted cabinets.",
      },
      { kind: "full", image: "furniture-bookcase-angle" },
    ],
  },
  {
    slug: "wardrobe-systems",
    index: "03",
    title: "Wardrobe Systems",
    category: "Wardrobes & storage",
    summary:
      "Floor-to-ceiling wardrobes in teal, stone-textured grey, ivory and oak, often combined with a desk, mirror or display niche.",
    intro:
      "Wardrobes treated as walls rather than furniture: full height, handleless or with slim edge pulls, and often doing a second job as a study desk, a display niche or a full-length mirror. Inside, hanging space, drawers and shelves are arranged around what each one needs to hold.",
    cover: "wardrobe-oak-niche",
    secondary: "wardrobe-teal-open",
    details: noDetails,
    palette: [
      { name: "Teal", image: "wardrobe-teal", position: "22% 50%" },
      { name: "Stone texture", image: "wardrobe-stone-study", position: "14% 50%" },
      { name: "Ivory", image: "wardrobe-ivory-mirror", position: "36% 50%" },
      { name: "Oak finish", image: "wardrobe-oak-niche", position: "84% 50%" },
      { name: "Tinted glass", image: "wardrobe-teal-open", position: "22% 40%" },
    ],
    facts: [
      { label: "Type", value: "Wardrobes & storage" },
      { label: "Finishes", value: "Teal, stone texture, ivory, oak finish, tinted glass" },
      { label: "Doors", value: "Hinged, sliding, mirrored, glass" },
      { label: "Integrated", value: "Study desk, display niche, internal lighting" },
    ],
    blocks: [
      { kind: "full", image: "wardrobe-teal" },
      {
        kind: "chapter",
        heading: "Inside",
        body: "Behind the doors: charcoal interiors with hanging rails and drawers, lit glass sections for what should be seen, and warm timber shelving behind a sliding ivory front.",
      },
      { kind: "pair", images: ["wardrobe-teal-open", "wardrobe-sliding"], lead: "left" },
      {
        kind: "chapter",
        heading: "Integrated",
        body: "A stone-textured wardrobe wall opens at its centre into a small study with a desk and shelf, and closes at one end with a full-length mirror.",
      },
      { kind: "full", image: "wardrobe-stone-study" },
      { kind: "offset", image: "wardrobe-stone-angle", align: "left" },
      {
        kind: "chapter",
        heading: "Quiet fronts",
        body: "Where the room needs calm, the fronts stay plain: ivory panels with black edge pulls, or oak-finish doors around a display niche and mirrored panels.",
      },
      {
        kind: "offset",
        image: "wardrobe-ivory-mirror",
        align: "right",
        note: "One mirrored panel in a wall of ivory; black edge pulls in place of handles.",
      },
    ],
  },
];

/** Every photograph in a project, in reading order (cover first). */
export function projectImages(project: Project): ImageId[] {
  const ids = project.blocks.flatMap((b) =>
    b.kind === "full" || b.kind === "offset" ? [b.image] : b.kind === "pair" ? [...b.images] : [],
  );
  return [...new Set([project.cover, ...ids])];
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length]!;
}
