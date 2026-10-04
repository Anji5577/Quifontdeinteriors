# Studio website

Static Next.js site (App Router, TypeScript, Tailwind v4). Every route is pre-rendered to `out/`, so it can be hosted on any static host.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run serve      # serve out/ on :4173
npm run lint && npm run typecheck
npm run qa         # with `npm run serve` running: every route × 7 widths
```

**Before launch, work through [CLIENT-REVIEW.md](CLIENT-REVIEW.md)**: contact details, wording to confirm, hidden FAQ answers, project facts, testimonials and the journal drafts.

## Before launch: replace placeholders

All studio identity lives in **`src/content/site.ts`**:

- `name`: Quifontdeinteriors; `contact.email / phone / whatsapp` switch on every link and the enquiry's send buttons
- `url`: used for canonical URLs, Open Graph and the sitemap
- `address`, `serviceAreas`, `hours`, `social`, `budgetBands`: each appears on the site only once set

Project facts (location, year, etc.) were deliberately left out because none were supplied. Add verified ones to `details` in `src/content/projects.ts`.

## Content

| File | What it holds |
| --- | --- |
| `src/content/projects.ts` | The three projects and their case-study layout blocks (`full`, `pair`, `offset`, `chapter`) |
| `src/content/studio.ts` | Statement, services, process and philosophy copy |
| `src/content/images.ts` | Alt text for every photograph |

## Images

Originals extracted from the project PDFs live in `assets/source/` (two were cropped to remove white padding). To regenerate the responsive AVIF/WebP files and the typed manifest after adding or replacing a photo:

```bash
npm run images
```

This writes to `public/img/` and `src/content/images.generated.ts`. Then add alt text for any new image in `src/content/images.ts`.

## Fonts

- **Hanken Grotesk**, loaded via `next/font/google`.
- **Newsreader** (SIL OFL), self-hosted in `src/fonts/`. It is the Google latin subset, instanced at weight 300 with the optical-size axis kept, which brings it to 41 KB.

## Motion

Tokens are in `src/app/globals.css`. Server components opt into reveals with `data-reveal="up" | "group" | "image" | "line"`, and a single observer (`src/components/motion/RevealObserver.tsx`) handles all of them. All motion is removed or reduced to fades under `prefers-reduced-motion`.
