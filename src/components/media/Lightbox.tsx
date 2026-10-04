"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getImage, type ImageId, type SiteImage } from "@/content/images";
import { imageSrcSet } from "@/lib/images";
import { smoothScroll } from "@/lib/smooth-scroll";

/**
 * One full-screen viewer for every gallery on the site.
 *
 * Server components mark thumbnails with <LightboxButton group="…" id="…">;
 * clicking one opens this dialog on that image, with the rest of its group
 * in a horizontal scroll-snap strip (native swipe and momentum, arrow keys,
 * a live counter for screen readers). Focus returns to the thumbnail.
 */
export function Lightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [index, setIndex] = useState(0);
  const [startAt, setStartAt] = useState<number | null>(null);

  // Open from any [data-lightbox] trigger on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      // [data-lightbox-start="group"] opens a group at its first image ("View all images").
      const starter = target?.closest<HTMLElement>("[data-lightbox-start]");
      const trigger = starter ?? target?.closest<HTMLElement>("[data-lightbox]");
      if (!trigger) return;
      e.preventDefault();
      const group = starter ? starter.dataset.lightboxStart! : trigger.dataset.lightbox!;
      // Only what is currently shown (e.g. after an archive filter) is browsable.
      const triggers = [...document.querySelectorAll<HTMLElement>(`[data-lightbox="${CSS.escape(group)}"]`)].filter(
        (t) => t.getClientRects().length > 0,
      );
      const ids = triggers.map((t) => t.dataset.imageId as ImageId);
      returnFocus.current = trigger;
      setImages(ids.map(getImage));
      const at = starter ? 0 : Math.max(0, triggers.indexOf(trigger));
      setIndex(at);
      setStartAt(at);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Show the dialog once its slides exist, positioned on the chosen image.
  useEffect(() => {
    const dialog = dialogRef.current;
    const track = trackRef.current;
    if (startAt === null || !dialog || !track) return;
    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      smoothScroll.stop();
    }
    track.scrollTo({ left: startAt * track.clientWidth, behavior: "instant" });
    setStartAt(null);
  }, [startAt]);

  const onClose = () => {
    document.documentElement.style.overflow = "";
    smoothScroll.start();
    returnFocus.current?.focus();
  };

  const go = useCallback((delta: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: delta * track.clientWidth, behavior: "smooth" });
  }, []);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const current = images[index];

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Image viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      data-lenis-prevent
    >
      <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-[var(--gutter)]">
        <p className="label text-umber-muted" aria-live="polite">
          {images.length > 0 && (
            <>
              {String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span>
              <span className="sr-only"> of </span> {String(images.length).padStart(2, "0")}
            </>
          )}
        </p>
        <form method="dialog">
          <button className="label -mr-3 px-3 py-3 text-umber-text" autoFocus>
            Close
          </button>
        </form>
      </div>

      <div ref={trackRef} className="lightbox-track" onScroll={onScroll}>
        {images.map((image, i) => (
          <figure key={image.id} className="lightbox-slide" aria-hidden={i !== index}>
            <picture>
              <source type="image/avif" srcSet={imageSrcSet(image, "avif")} sizes="100vw" />
              <img
                src={`/img/${image.id}-${image.widths[image.widths.length - 1]}.webp`}
                srcSet={imageSrcSet(image, "webp")}
                sizes="100vw"
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                decoding="async"
                className="max-h-full w-auto max-w-full object-contain"
                style={{ backgroundColor: image.color }}
              />
            </picture>
          </figure>
        ))}
      </div>

      <div className="flex shrink-0 items-start justify-between gap-6 px-[var(--gutter)] pt-4 pb-6">
        <p className="max-w-[46rem] text-small text-umber-muted">{current?.alt}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="label border border-umber-line px-4 py-3 text-umber-text transition-colors hover:border-umber-text disabled:opacity-30"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            className="label border border-umber-line px-4 py-3 text-umber-text transition-colors hover:border-umber-text disabled:opacity-30"
            onClick={() => go(1)}
            disabled={index >= images.length - 1}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
    </dialog>
  );
}
