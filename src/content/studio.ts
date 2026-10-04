import type { ImageId, RoomTag } from "./images";

// Studio positioning copy. It describes approach, not credentials: no
// numbers, awards, clients or claims that cannot be verified.
// Services are limited to work evidenced by the supplied photography.
// Wording that implies a specific offering (visualisation, site execution)
// is listed in CLIENT-REVIEW.md for the studio to confirm.

/** The studio statement with small photographs set between its words (homepage). */
export const statementParts: readonly (string | { image: ImageId; position?: string })[] = [
  "We design homes",
  { image: "disha-living-media", position: "40% 50%" },
  "from the inside out, starting with how a room is used,",
  { image: "wardrobe-teal-open", position: "30% 50%" },
  "then what it needs to hold, then how it should feel to stand in.",
];

export const studio = {
  statement:
    "We design homes from the inside out, starting with how a room is used, then what it needs to hold, then how it should feel to stand in.",
  intro:
    "Most of our work is built in: wardrobes that run wall to wall, media walls that float, kitchens and storage drawn for the rooms they sit in. The result should feel calm, warm and quietly considered.",
  philosophy: {
    lead: "A good room doesn’t ask to be noticed. It simply makes the day easier.",
  },
};

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export type Service = {
  slug: string;
  title: string;
  /** One line for lists. */
  short: string;
  intro: string;
  cover: ImageId;
  /** Archive tags whose photographs illustrate the service. */
  tags: readonly RoomTag[];
  /** Project that shows this work. */
  project: string;
  covers: readonly string[];
  considerations: readonly { title: string; body: string }[];
  faq: readonly { q: string; a: string }[];
};

export const services: readonly Service[] = [
  {
    slug: "residential-interiors",
    title: "Residential interiors",
    short: "Whole-home interiors planned room by room, from living spaces to bedrooms.",
    intro:
      "A home designed as one piece: layouts, storage, finishes and furniture worked out together, so each room feels related to the next and nothing is an afterthought.",
    cover: "disha-living-media",
    tags: ["Living", "Bedroom"],
    project: "disha-courtyard",
    covers: [
      "Room-by-room planning around how the home is used",
      "Built-in storage, wardrobes and media walls",
      "Kitchens and utility spaces",
      "Finishes, colour and material palettes",
      "Children’s rooms",
    ],
    considerations: [
      {
        title: "Plan storage before style",
        body: "Most clutter is a storage problem. Knowing what each room has to hold — clothes, books, appliances, toys — shapes the walls before any finish is chosen.",
      },
      {
        title: "Decide early on electrical points",
        body: "Television walls, bedside lighting and wardrobe lights depend on where power and switches sit. These are easiest to place before walls are finished.",
      },
      {
        title: "Keep the palette small",
        body: "Two or three finishes repeated through a home read as calm and intentional; a different idea in every room rarely does.",
      },
    ],
    faq: [
      {
        q: "Can we start with a few rooms and continue later?",
        a: "Yes. Planning the whole home first, even if work happens in stages, keeps later rooms consistent with earlier ones.",
      },
    ],
  },
  {
    slug: "kitchens",
    title: "Kitchens",
    short: "Kitchen layouts and cabinetry, including tall units for built-in appliances.",
    intro:
      "Kitchens planned around the way you cook: what is reached for every day, what is stored for occasions, and how the room works when more than one person is in it.",
    cover: "disha-kitchen",
    tags: ["Kitchen"],
    project: "disha-courtyard",
    covers: [
      "Layout planning around how you cook",
      "Base, overhead and tall-unit cabinetry",
      "Housing for built-in ovens and appliances",
      "Counter, backsplash and shutter finishes",
      "Drawer and internal storage planning",
    ],
    considerations: [
      {
        title: "Drawers over doors",
        body: "Deep drawers in base units usually make better use of space than shelves behind doors, because everything is visible when they open.",
      },
      {
        title: "Tall units for appliances",
        body: "An oven or microwave set into a tall unit at counter height is easier to use and keeps the worktop clear.",
      },
      {
        title: "Finishes that age well",
        body: "Kitchens take the most wear in a home. Counter and shutter finishes are best chosen for how they clean and age, not only how they look on day one.",
      },
    ],
    faq: [
      {
        q: "What should I know about my appliances before planning?",
        a: "Model numbers or dimensions of the hob, chimney, oven, refrigerator and dishwasher help: cabinetry is sized around them.",
      },
    ],
  },
  {
    slug: "wardrobes",
    title: "Wardrobes & storage",
    short: "Full-height wardrobes with planned interiors, mirrors, lighting and integrated desks.",
    intro:
      "Wardrobes treated as walls rather than furniture: full height, with interiors arranged around what each one holds, and often doing a second job as a desk, a display niche or a mirror.",
    cover: "wardrobe-oak-niche",
    tags: ["Wardrobe"],
    project: "wardrobe-systems",
    covers: [
      "Hinged, sliding, mirrored and glass-fronted wardrobes",
      "Interior planning — hanging, drawers, shelves",
      "Integrated study desks and display niches",
      "Internal lighting",
      "Lofts and overhead storage",
      "Window seats and storage benches",
    ],
    considerations: [
      {
        title: "Count before you draw",
        body: "Long hanging, short hanging, folded clothes, shoes, bags, linen: a rough count of each decides the interior far better than a standard layout.",
      },
      {
        title: "Sliding or hinged",
        body: "Sliding doors suit tighter rooms where a swinging door would block a bed or walkway; hinged doors open the whole interior at once.",
      },
      {
        title: "Handles, or none",
        body: "Handleless fronts with edge pulls or profiles keep a full wall of doors calm; visible handles can become part of the design when chosen with care.",
      },
    ],
    faq: [
      {
        q: "Can a wardrobe include a desk or dressing area?",
        a: "Yes — integrated desks, display niches and full-length mirrors appear in several of our wardrobes.",
      },
    ],
  },
  {
    slug: "custom-furniture",
    title: "Custom furniture & media walls",
    short: "Media walls, consoles, desks and shelving designed for a specific wall.",
    intro:
      "Individual pieces drawn for one wall: floating media walls, consoles, desks and bookcases, with the detail in how they open, hide cables and meet the room.",
    cover: "furniture-media-wall",
    tags: ["Media wall", "Furniture"],
    project: "custom-furniture",
    covers: [
      "Media and television walls",
      "Consoles and sideboards",
      "Wall-mounted desks",
      "Bookcases and shelving",
      "Lift-up and drop-down flap mechanisms",
      "Cable management and concealed ports",
    ],
    considerations: [
      {
        title: "Floating pieces need solid walls",
        body: "Wall-mounted units depend on what the wall is made of; it is checked before a floating design is committed to.",
      },
      {
        title: "Plan for cables",
        body: "Set-top boxes, speakers and chargers need ventilation and a route for cables. Ports cut into a counter keep the surface clear.",
      },
      {
        title: "Open and closed",
        body: "A mix of closed storage and a few open shelves keeps a media wall from looking either cluttered or blank.",
      },
    ],
    faq: [
      {
        q: "Do you design single pieces without a full home project?",
        a: "Yes. Our custom furniture work includes individual media walls, consoles, desks and bookcases.",
      },
    ],
  },
  {
    slug: "childrens-rooms",
    title: "Children’s rooms",
    short: "Bunk beds, storage and colour for rooms that change as children grow.",
    intro:
      "Rooms that work for play now and study later: bunk beds with storage below, wardrobes sized for growing wardrobes, and colour used with a light hand.",
    cover: "disha-kids-bunk",
    tags: ["Children’s room"],
    project: "disha-courtyard",
    covers: [
      "Bunk and loft beds with built-in storage",
      "Wardrobes and storage",
      "Wallpaper, colour and finishes",
    ],
    considerations: [
      {
        title: "Design for the next few years",
        body: "A room that suits a five-year-old rarely suits a ten-year-old. Neutral built-ins with colour in replaceable elements adapt more easily.",
      },
      {
        title: "Storage at their height",
        body: "Low drawers and open bins children can reach themselves make tidying up realistic.",
      },
    ],
    faq: [],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

// ---------------------------------------------------------------------------
// Process — the four-step summary (homepage) and the full stages (/process)
// ---------------------------------------------------------------------------

export const process: readonly { step: string; title: string; image: ImageId; body: string }[] = [
  {
    step: "01",
    title: "Understand",
    image: "disha-sage-bedroom",
    body: "We listen to how you live: routines, belongings, light, and what isn’t working now.",
  },
  {
    step: "02",
    title: "Plan",
    image: "disha-kitchen",
    body: "Layouts and storage are worked out first, so every wall earns its place.",
  },
  {
    step: "03",
    title: "Design",
    image: "furniture-liftup-flap",
    body: "Finishes, details and joinery are resolved together, down to handles and edges.",
  },
  {
    step: "04",
    title: "Execute",
    image: "wardrobe-sliding",
    body: "Drawings carried through to site, so what is built matches what was designed.",
  },
];

export type ProcessStage = {
  title: string;
  body: string;
  /** What the client has at the end of the stage. */
  receive: readonly string[];
  /** Typical duration, e.g. "1–2 weeks". Shown only once the studio sets it. */
  duration: string;
  image: ImageId;
};

export const processStages: readonly ProcessStage[] = [
  {
    title: "Conversation",
    body: "We start with the home and the people in it: how each room is used, what has to be stored, what isn’t working today, and how you would like it to feel.",
    receive: ["A shared understanding of scope and priorities", "Agreed next steps"],
    duration: "",
    image: "disha-sage-bedroom",
  },
  {
    title: "Site visit & measurement",
    body: "Built-in work is only as good as its measurements. Walls, windows, beams, switches and service points are recorded before anything is drawn.",
    receive: ["Measurements of the rooms in scope", "Notes on the existing conditions"],
    duration: "",
    image: "disha-guest-bedroom",
  },
  {
    title: "Concept",
    body: "Layouts and storage come first, then a direction for finishes and colour. This is where the big decisions are made, while they are still easy to change.",
    receive: ["Layout and storage plans", "A first palette of finishes"],
    duration: "",
    image: "disha-kitchen",
  },
  {
    title: "Design development",
    body: "The agreed concept is drawn in detail: elevations of every wall, joinery details, lighting and electrical positions.",
    receive: ["Detailed drawings for each room", "Lighting and electrical layouts"],
    duration: "",
    image: "furniture-liftup-flap",
  },
  {
    title: "Materials & finishes",
    body: "Finishes and hardware are chosen from samples, in the light of the actual room — not from a screen.",
    receive: ["A confirmed schedule of finishes and hardware"],
    duration: "",
    image: "furniture-walnut-grain",
  },
  {
    title: "Execution",
    body: "The drawings are carried through to site, with the design checked against what is being built as it takes shape.",
    receive: ["Built work that matches the drawings"],
    duration: "",
    image: "wardrobe-sliding",
  },
  {
    title: "Handover",
    body: "A final walk-through, finishing touches, and guidance on caring for the finishes, so the home is ready to be lived in.",
    receive: ["A finished, checked home", "Care guidance for finishes and hardware"],
    duration: "",
    image: "disha-oak-window-seat",
  },
];

// ---------------------------------------------------------------------------
// FAQ — questions with an empty answer are hidden until the studio writes one.
// ---------------------------------------------------------------------------

export type FaqGroup = { title: string; items: readonly { q: string; a: string }[] };

export const faqGroups: readonly FaqGroup[] = [
  {
    title: "Starting out",
    items: [
      {
        q: "What kind of projects do you take on?",
        a: "Whole homes and individual rooms, kitchens, wardrobes and storage, children’s rooms, and custom pieces such as media walls, consoles, desks and bookcases.",
      },
      {
        q: "How do we begin?",
        a: "Tell us a little about the home through the enquiry form, by WhatsApp or by email. We’ll follow up to talk it through and agree the next steps.",
      },
      {
        q: "Do you work on single rooms or individual pieces?",
        a: "Yes. Some of our work is a single media wall, desk or wardrobe rather than a whole home.",
      },
    ],
  },
  {
    title: "Before we talk",
    items: [
      {
        q: "What should I prepare?",
        a: "A floor plan if you have one, a few photographs of the rooms, a rough list of what needs storing, any images you like, and a sense of your timing.",
      },
      {
        q: "My home is still under construction. Is it too early?",
        a: "Usually it’s a good time. Built-in work depends on where walls, windows and electrical points sit, and these are easiest to plan before they are finished.",
      },
    ],
  },
  {
    title: "Design & decisions",
    items: [
      {
        q: "Will I see the design before anything is made?",
        a: "Yes. Layouts come first, then detailed drawings of each wall, and finishes are chosen from samples before work begins.",
      },
      {
        q: "How are finishes chosen?",
        a: "From physical samples, seen in the room’s own light. A small palette, repeated through the home, usually works better than many different finishes.",
      },
    ],
  },
  {
    title: "Timelines, payments & aftercare",
    items: [
      { q: "How long does a project take?", a: "" },
      { q: "How are payments structured?", a: "" },
      { q: "Is there a warranty on the work?", a: "" },
      { q: "Which areas do you work in?", a: "" },
    ],
  },
];

export const answeredFaqGroups = () =>
  faqGroups
    .map((g) => ({ ...g, items: g.items.filter((i) => i.a.trim()) }))
    .filter((g) => g.items.length > 0);
