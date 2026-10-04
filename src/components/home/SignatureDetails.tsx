"use client";

import { useEffect, useRef, useState } from "react";
import { LightboxButton } from "@/components/media/LightboxButton";
import { Photo } from "@/components/media/Photo";
import { SectionMarker } from "@/components/ui/SectionMarker";
import type { ImageId } from "@/content/images";

const details: readonly { image: ImageId; title: string; position?: string }[] = [
  { image: "furniture-walnut-grain", title: "Grain, carried through" },
  { image: "furniture-liftup-flap", title: "Lift-up flaps" },
  { image: "furniture-dropdown-flap", title: "Drop-down glass" },
  { image: "wardrobe-teal-open", title: "Lit from within" },
  { image: "disha-window-seat-detail", title: "Seat in the joinery" },
  { image: "wardrobe-sliding", title: "Warm behind the slide" },
  { image: "disha-media-detail", title: "Oak on texture" },
  { image: "furniture-console", title: "Ports, not cables", position: "62% 50%" },
  { image: "wardrobe-ivory-mirror", title: "Edge pulls", position: "50% 55%" },
];

/**
 * A horizontal rail of close-up photographs. Native scroll-snap does the work
 * (touch swipe, trackpad, keyboard); mouse users can also drag it, and the
 * arrows step one card at a time. A progress line tracks the position.
 */
export function SignatureDetails() {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  };

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  // Drag to scroll with a mouse (touch and trackpads already scroll natively).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.dataset.dragging = "";
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const up = () => {
      dragging = false;
      delete el.dataset.dragging;
    };
    // A drag must not also count as a click on the photograph underneath.
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
    };
  }, []);

  return (
    <section aria-labelledby="details-title" className="section overflow-hidden bg-ink text-umber-text">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 md:col-span-7">
            <SectionMarker index="05" title="Signature details" tone="light" />
            <h2 id="details-title" data-reveal="lines" className="serif mt-8 text-h1">
              The quiet work is in the <em>details</em>.
            </h2>
          </div>
          <div className="col-span-12 flex items-center gap-3 md:col-span-4 md:col-start-9 md:justify-end">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={edges.start}
              aria-label="Previous details"
              className="label grid h-12 w-12 place-items-center rounded-full border border-umber-line transition-colors hover:border-umber-text disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={edges.end}
              aria-label="Next details"
              className="label grid h-12 w-12 place-items-center rounded-full border border-umber-line transition-colors hover:border-umber-text disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={measure}
        tabIndex={0}
        aria-label="Signature details, scrollable"
        className="details-track mt-14 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-6 overflow-x-auto px-[var(--gutter)] pb-4 outline-none [scrollbar-width:none] md:mt-12"
      >
        {details.map((d, i) => (
          <li key={d.image} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]">
            <LightboxButton group="signature-details" id={d.image}>
              <Photo id={d.image} alt="" ratio="4 / 5" position={d.position} sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 46vw, 78vw" />
            </LightboxButton>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="label text-umber-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="serif text-h3">{d.title}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="wrap mt-10">
        <div className="h-px bg-umber-line" aria-hidden="true">
          <div className="h-px origin-left bg-umber-text transition-transform duration-200" style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
        </div>
      </div>
    </section>
  );
}
