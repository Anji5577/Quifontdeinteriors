"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { LightboxButton } from "@/components/media/LightboxButton";
import { Photo } from "@/components/media/Photo";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { imagesTagged, type ImageId, type RoomTag } from "@/content/images";

type Space = { tag: RoomTag; label: string; lead: ImageId };

// Each space opens on its strongest photograph; thumbnails are every other
// photograph carrying the same tag.
const spaces: readonly Space[] = [
  { tag: "Living", label: "Living", lead: "furniture-media-wall" },
  { tag: "Kitchen", label: "Kitchen", lead: "disha-kitchen" },
  { tag: "Bedroom", label: "Bedrooms", lead: "disha-oak-window-seat" },
  { tag: "Children’s room", label: "Children’s rooms", lead: "disha-kids-bunk" },
  { tag: "Wardrobe", label: "Wardrobes", lead: "wardrobe-teal" },
  { tag: "Media wall", label: "Media walls", lead: "furniture-media-wall-angle" },
  { tag: "Furniture", label: "Furniture", lead: "furniture-bookcase" },
];

export function ExploreBySpace() {
  const [active, setActive] = useState(0);
  // Only the first space's photograph loads with the page; the others are
  // fetched once the visitor engages with the list, so they never compete
  // with the hero for bandwidth.
  const [warm, setWarm] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const space = spaces[active]!;
  const photos = imagesTagged(space.tag);
  const thumbs = photos.filter((id) => id !== space.lead).slice(0, 4);

  // Roving focus between tabs with the arrow keys (WAI-ARIA tabs pattern).
  const onKey = (e: KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + spaces.length) % spaces.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="spaces-title" className="section bg-umber text-umber-text">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 md:col-span-7">
            <SectionMarker index="02" title="Spaces" tone="light" />
            <h2 id="spaces-title" data-reveal="lines" className="serif mt-8 text-h1">
              Explore by <em>space</em>
            </h2>
          </div>
        </div>

        <div className="grid-12 mt-14 gap-y-10 md:mt-12">
          {/* Tabs: a horizontal strip on phones, a vertical index from tablet up */}
          <div
            role="tablist"
            aria-label="Spaces"
            onPointerEnter={() => setWarm(true)}
            onFocus={() => setWarm(true)}
            onTouchStart={() => setWarm(true)}
            aria-orientation="vertical"
            className="col-span-12 -mx-[var(--gutter)] flex snap-x scroll-px-[var(--gutter)] gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] md:col-span-4 md:mx-0 md:block md:overflow-visible md:px-0 md:pb-0"
          >
            {spaces.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.tag}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`space-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="space-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group flex shrink-0 snap-start items-baseline gap-4 rounded-full border px-4 py-2 text-left transition-colors duration-[400ms] md:w-full md:rounded-none md:border-0 md:border-b md:border-umber-line md:px-0 md:py-4 ${
                    selected ? "border-umber-text text-umber-text" : "border-umber-line text-umber-muted hover:text-umber-text"
                  }`}
                >
                  <span className="label hidden w-8 md:inline">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`serif text-[1.125rem] transition-[translate] duration-[500ms] ease-reveal md:text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] md:leading-tight ${
                      selected ? "md:translate-x-2 md:italic" : ""
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="label ml-auto hidden md:inline">{imagesTagged(s.tag).length}</span>
                </button>
              );
            })}
          </div>

          <div
            id="space-panel"
            role="tabpanel"
            aria-labelledby={`space-tab-${active}`}
            className="col-span-12 md:col-span-8 md:col-start-5"
          >
            {/* Lead photographs, cross-faded; inactive ones are inert (not focusable or announced) */}
            <div className="relative">
              {spaces.map((s, i) => (
                <div
                  key={s.tag}
                  inert={i !== active}
                  className={`transition-opacity duration-[800ms] ease-soft ${i === 0 ? "relative" : "absolute inset-0"} ${
                    i === active ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {(i === active || warm) && (
                  <LightboxButton group={`space-${s.tag}`} id={s.lead}>
                    <Photo
                      id={s.lead}
                      ratio="16 / 10"
                      sizes="(min-width: 48rem) 62vw, 100vw"
                      reveal={i === 0}
                      imgClassName={`transition-[scale] duration-[1400ms] ease-reveal ${i === active ? "scale-100" : "scale-[1.06]"}`}
                    />
                  </LightboxButton>
                  )}
                </div>
              ))}
            </div>

            <div key={space.tag} className="space-swap mt-6 flex justify-end">
              <Link
                href={`/work/rooms/?room=${encodeURIComponent(space.tag)}`}
                className="group label inline-flex items-center gap-3 text-umber-text"
              >
                <span className="link-line">
                  View all {photos.length} photographs
                </span>
                <span aria-hidden="true" className="arrow group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {thumbs.length > 0 && (
              <ul key={`t-${space.tag}`} className="space-swap mt-8 grid grid-cols-4 gap-[var(--col-gap)]">
                {thumbs.map((id, i) => (
                  <li key={id} style={{ animationDelay: `${120 + i * 70}ms` }} className="space-swap">
                    <LightboxButton group={`space-${space.tag}`} id={id}>
                      <Photo id={id} alt="" ratio="1 / 1" reveal={false} sizes="(min-width: 48rem) 15vw, 24vw" />
                    </LightboxButton>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
