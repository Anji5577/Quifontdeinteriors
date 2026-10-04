# Before launch: what the studio needs to confirm

The site never presents an unverified fact. Anything below is either hidden until it is filled in, or shown as a bracketed placeholder. Work through this list with the studio, then rebuild (`npm run build`).

## 1. Contact & identity — `src/content/site.ts`

| Field | Status | Effect once filled |
| --- | --- | --- |
| `contact.email` | **empty** | Email links everywhere; "Send by email" in the enquiry |
| `contact.phone` | **empty** | Call links, mobile action bar "Call" |
| `contact.whatsapp` | **empty** | WhatsApp links, "Send on WhatsApp" in the enquiry, mobile action bar |
| `url` | `https://example.com` | Canonical URLs, sitemap, social previews — **set to the live domain** |
| `address` | empty | Footer & contact address, local-business structured data |
| `serviceAreas` | empty | Footer line and structured data, e.g. `["Bengaluru"]` |
| `hours` | empty | Contact page and footer |
| `social` | empty | Footer links (e.g. Instagram) and structured data |
| `budgetBands` | empty | Adds an optional budget question to the enquiry |

The studio name is set to **Quifontdeinteriors**, exactly as supplied. Confirm the spelling and whether it should be written with spaces (e.g. "Quifont de Interiors").

The logo mark in `src/components/brand/Logo.tsx` is a vector trace of the supplied QIS logo (original kept at `assets/brand/qis-logo-original.jpg`). If the studio has an original vector file, it can replace the traced path.

## 2. Wording to confirm (`src/content/studio.ts`)

These describe *how the studio works*. They are neutral, but the studio must confirm they are true.

- **Process stage "Design development"** — promises detailed drawings and "lighting and electrical layouts".
- **Process stage "Execution"** — implies the studio carries designs through to site. Confirm whether the studio executes work itself, supervises contractors, or provides design only.
- **3D visualisation** is deliberately *not* mentioned anywhere. If the studio offers it, add it to a service's `covers` list and the "Design development" stage.
- **Homepage process step "Execute"** — "Drawings carried through to site…".
- **FAQ answers** in "Starting out", "Before we talk" and "Design & decisions".

## 3. Answers only the studio can write (hidden until filled)

In `faqGroups` → "Timelines, payments & aftercare", each question is hidden until it has an answer:

- How long does a project take?
- How are payments structured?
- Is there a warranty on the work?
- Which areas do you work in?

Each process stage also has an empty `duration` (e.g. `"1–2 weeks"`), shown only once set.

## 4. Project facts (`src/content/projects.ts` → `details`)

For each project: `location`, `area`, `year`, `status`, `photography` (photographer credit). Each appears on the case study only once filled.

- The Disha Courtyard source file was named "Disha Courtyard **BGL**". This was not assumed to mean Bengaluru — confirm and add it as `location` if correct.
- The project descriptions were written from the photographs alone. Check that the room names (for example "three bedrooms") are accurate.

## 5. Social proof (`src/content/trust.ts`) — all empty

Add only real, permitted material:

- `testimonials` → a large quote on the homepage (first entry)
- `people` → team on the About page
- `press` → press list on the About page
- `googleRating` → rating line on the About page

## 6. Journal (`src/content/journal.ts`)

Three practical guides are drafted and **unpublished**:

1. Planning a wardrobe that works as a wall
2. Questions to settle before designing a kitchen
3. From possession to move-in: a checklist

Read them at `/journal/` (each page is marked "Draft for review" and hidden from search engines). To publish one: set `published: true` and a `date`. The Journal then appears in the menu, footer and sitemap automatically.

## 7. Materials guide (`src/content/materials.ts`)

General educational descriptions of shutter finishes, boards and mechanisms. It never states what the studio uses. Check that the wording matches the studio's own advice.
