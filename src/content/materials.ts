import type { ImageId } from "./images";

// An educational guide. General descriptions only — nothing here states
// which materials or brands the studio uses on a particular project.

export const shutterFinishes: readonly { name: string; body: string; notes: string }[] = [
  {
    name: "Laminate",
    body: "A printed or solid-colour decorative sheet pressed onto board. Available in matte, textured and wood or stone looks.",
    notes: "Hard-wearing and easy to maintain; the most versatile everyday finish.",
  },
  {
    name: "Acrylic",
    body: "A high-gloss sheet with a deep, reflective surface, usually in solid colours.",
    notes: "Striking in kitchens; shows fingerprints more than matte finishes.",
  },
  {
    name: "Lacquer (PU / duco)",
    body: "Paint sprayed in layers and cured to a smooth, seamless finish, in matte or gloss and almost any colour.",
    notes: "Allows exact colour matching and clean edges; needs care against chips.",
  },
  {
    name: "Veneer",
    body: "A thin slice of real timber bonded to board, then finished. Every sheet’s grain is different.",
    notes: "The warmth of natural wood; grain can be matched across a run of doors.",
  },
  {
    name: "Glass",
    body: "Clear, tinted or fluted glass in slim metal or timber frames, often lit from within.",
    notes: "Lightens a large wall of storage and turns a cabinet into a display.",
  },
];

export const mechanisms: readonly { name: string; body: string; image: ImageId; position?: string }[] = [
  {
    name: "Lift-up flaps",
    body: "Upper cabinet doors that rise and stay open, so nothing swings into your head or your view.",
    image: "furniture-liftup-flap",
  },
  {
    name: "Drop-down flaps",
    body: "A door hinged at the bottom that opens downwards — useful for media units where equipment sits behind glass.",
    image: "furniture-dropdown-flap",
  },
  {
    name: "Sliding doors",
    body: "Doors that glide past each other instead of swinging, for rooms where space in front of the wardrobe is tight.",
    image: "wardrobe-sliding",
  },
  {
    name: "Edge pulls & profiles",
    body: "Slim recessed or aluminium pulls along the door edge keep a full wall of fronts calm and handle-free.",
    image: "wardrobe-ivory-mirror",
    position: "50% 60%",
  },
  {
    name: "Internal lighting",
    body: "Light inside glass-fronted or open sections, so clothes and objects are visible the moment doors open.",
    image: "wardrobe-teal-open",
  },
  {
    name: "Cable ports",
    body: "Neat openings cut into a counter or console so chargers and equipment connect without loose cables.",
    image: "furniture-console",
    position: "60% 50%",
  },
];

export const boards: readonly { name: string; body: string }[] = [
  {
    name: "Plywood",
    body: "Thin timber layers bonded crosswise. Commonly specified by grade: moisture-resistant (MR) for dry areas such as wardrobes, and boiling-water-resistant or -proof (BWR / BWP) where water is present, such as kitchens.",
  },
  {
    name: "HDHMR",
    body: "High-density, high-moisture-resistant fibreboard: dense and smooth, often used for shutters.",
  },
  {
    name: "MDF",
    body: "Medium-density fibreboard with a fine, even surface that takes lacquer well; best kept away from moisture.",
  },
];
