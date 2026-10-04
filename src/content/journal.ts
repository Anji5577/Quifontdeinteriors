import type { ImageId } from "./images";

// Journal posts. Only posts with `published: true` are listed publicly,
// linked in navigation or included in the sitemap. Drafts still get a page
// (marked "Draft for review" and hidden from search engines) so the studio
// can read them in place before approving.

export type JournalBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "image"; image: ImageId; caption?: string };

export type JournalPost = {
  slug: string;
  title: string;
  dek: string;
  /** ISO date, set when the studio publishes the post. */
  date: string;
  cover: ImageId;
  readingMinutes: number;
  published: boolean;
  body: readonly JournalBlock[];
};

export const posts: readonly JournalPost[] = [
  {
    slug: "planning-a-wardrobe-that-works-as-a-wall",
    title: "Planning a wardrobe that works as a wall",
    dek: "Start with what it has to hold, then decide how it should look. A short guide to full-height wardrobes.",
    date: "",
    cover: "wardrobe-oak-niche",
    readingMinutes: 4,
    published: false,
    body: [
      { kind: "p", text: "A full-height wardrobe is the largest piece of furniture most bedrooms will ever have. Designed as part of the wall rather than placed against it, it can make a room calmer and larger-feeling. Designed the other way round — appearance first, interior later — it often ends up beautiful outside and frustrating inside." },
      { kind: "h2", text: "1. Count before you draw" },
      { kind: "p", text: "Before any finish is chosen, make a rough count of what the wardrobe needs to hold. It doesn’t need to be precise; it needs to be honest." },
      { kind: "list", items: ["Long hanging: dresses, coats, kurtas", "Short hanging: shirts, jackets", "Folded clothes and knitwear", "Shoes and bags", "Linen, luggage and things used once a year"] },
      { kind: "p", text: "Long and short hanging take very different heights. Folded clothes are easier to see in drawers than on deep shelves. Rarely used things belong in the loft above, not at eye level." },
      { kind: "image", image: "wardrobe-teal-open", caption: "Hanging space, drawers and a lit glass section planned behind one run of doors." },
      { kind: "h2", text: "2. Choose how the doors open" },
      { kind: "p", text: "Hinged doors open the whole interior at once and suit rooms with clear space in front. Sliding doors suit tighter rooms where a swinging door would hit a bed or block a walkway — but only half the wardrobe is open at any time, which affects how the interior is arranged." },
      { kind: "image", image: "wardrobe-sliding", caption: "A sliding front where a hinged door would crowd the room." },
      { kind: "h2", text: "3. Let it do a second job" },
      { kind: "p", text: "Because a wardrobe already occupies a whole wall, it can absorb things that would otherwise need their own furniture: a study desk, a display niche, a full-length mirror, even a window seat." },
      { kind: "image", image: "wardrobe-stone-study", caption: "A study desk set into the middle of a wardrobe wall." },
      { kind: "h2", text: "4. Decide on handles early" },
      { kind: "p", text: "A full wall of doors reads as a single surface when the fronts are plain and the pulls are slim or recessed. Handles can also become part of the design — but they repeat across every door, so they are worth choosing deliberately." },
      { kind: "h2", text: "5. Plan light and power" },
      { kind: "p", text: "Lighting inside a wardrobe, or a switch for a mirror light, needs power in the right place. These points are easiest to plan before walls are finished." },
      { kind: "p", text: "Get these five decisions right and the choice of finish becomes the enjoyable part." },
    ],
  },
  {
    slug: "questions-to-settle-before-designing-a-kitchen",
    title: "Questions to settle before designing a kitchen",
    dek: "Seven questions that shape a kitchen far more than the colour of its shutters.",
    date: "",
    cover: "disha-kitchen",
    readingMinutes: 4,
    published: false,
    body: [
      { kind: "p", text: "The look of a kitchen is decided in an afternoon. How well it works is decided much earlier, by answers to a handful of practical questions. These are worth thinking through before the first drawing." },
      { kind: "h2", text: "1. Who cooks, and how often?" },
      { kind: "p", text: "A kitchen used for two quick meals a day is planned differently from one where several people cook at once. Count the people who are regularly in the room together." },
      { kind: "h2", text: "2. Which appliances, and which models?" },
      { kind: "p", text: "Hob, chimney, oven, microwave, refrigerator, dishwasher, water purifier: cabinetry is sized around each of them. Model numbers or dimensions, even for appliances you plan to buy, prevent surprises later." },
      { kind: "image", image: "disha-kitchen-tall-unit", caption: "A tall unit that takes the oven at a comfortable height." },
      { kind: "h2", text: "3. What do you reach for every day?" },
      { kind: "p", text: "Everyday items belong between hip and shoulder height, close to where they are used. Occasional items can go higher or deeper." },
      { kind: "h2", text: "4. Drawers or doors?" },
      { kind: "p", text: "Deep drawers in the base units usually make better use of space than shelves behind doors, because everything is visible when they open." },
      { kind: "h2", text: "5. Where does the water go?" },
      { kind: "p", text: "The sink position is tied to plumbing and drainage. Moving it is possible but affects cost and layout, so it is best decided early." },
      { kind: "h2", text: "6. How will it be cleaned?" },
      { kind: "p", text: "Kitchens take more wear than any other room. Counters, backsplashes and shutter finishes are worth choosing for how they clean and how they age." },
      { kind: "image", image: "disha-kitchen", caption: "Warm overhead cabinets, ivory base drawers and a dark stone-look backsplash." },
      { kind: "h2", text: "7. What else happens here?" },
      { kind: "p", text: "Breakfast, homework, a coffee corner, a utility area for washing: the kitchen often does more than cooking. Planning for it avoids those things spilling onto the counters." },
    ],
  },
  {
    slug: "from-possession-to-move-in",
    title: "From possession to move-in: a checklist",
    dek: "What to do, and in what order, between receiving the keys and living in the home.",
    date: "",
    cover: "disha-guest-bedroom",
    readingMinutes: 3,
    published: false,
    body: [
      { kind: "p", text: "The weeks after possession move quickly, and some decisions become harder once others are made. This is a general order of things — every home is different, but most follow a similar path." },
      { kind: "h2", text: "Before any work starts" },
      { kind: "list", items: ["Inspect the home and note any defects to raise with the builder", "Collect the floor plan and any electrical and plumbing drawings", "Photograph every room, including switches, points and ceilings", "List what each room needs to hold and how it will be used"] },
      { kind: "h2", text: "Decisions to make early" },
      { kind: "list", items: ["Furniture and storage layout for each room", "Positions of the television, beds and desks — they decide where power is needed", "Kitchen layout and appliances", "Any changes to electrical points, lighting or plumbing"] },
      { kind: "image", image: "disha-sage-wardrobe", caption: "Storage planned as part of the wall." },
      { kind: "h2", text: "During the work" },
      { kind: "list", items: ["Confirm finishes from samples, seen in the room’s own light", "Check measurements again once walls and floors are complete", "Agree what happens on site each week, and who to call with questions"] },
      { kind: "h2", text: "Before moving in" },
      { kind: "list", items: ["Walk through every room and test doors, drawers, lights and fittings", "Keep a note of finishes and hardware for future care", "Clean thoroughly before furniture and belongings arrive"] },
      { kind: "p", text: "The earlier storage and layout are settled, the smoother everything after them tends to be." },
    ],
  },
];

export const publishedPosts = () => posts.filter((p) => p.published);
/** Any post, published or draft (drafts render with a review banner). */
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
