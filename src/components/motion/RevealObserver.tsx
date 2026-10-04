"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { splitLines, unsplitLines } from "@/lib/split-lines";

/** Time for the last line of a heading to settle before its text is restored. */
const LINES_SETTLE_MS = 1800;

/**
 * One observer for the whole page. Server components opt in with
 * `data-reveal="up" | "group" | "image" | "line" | "lines"`; this marks them
 * `data-revealed` once, the first time they enter the viewport.
 * Headings with "lines" are split into masked lines first (after web fonts
 * load, so line breaks are measured with the real typeface).
 * Also flags client-side navigations so page transitions can run.
 */
export function RevealObserver() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  // Enable page-transition styles from the first client-side navigation on,
  // before the new page paints.
  useLayoutEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.dataset.navigated = "";
  }, [pathname]);

  useEffect(() => {
    const pending = (selector: string) =>
      [...document.querySelectorAll<HTMLElement>(selector)].filter((el) => !el.hasAttribute("data-revealed"));
    const blocks = pending('[data-reveal]:not([data-reveal="lines"])');
    const headings = pending('[data-reveal="lines"]');

    if (!("IntersectionObserver" in window)) {
      for (const el of [...blocks, ...headings]) {
        el.setAttribute("data-split", "");
        el.setAttribute("data-revealed", "");
      }
      return;
    }

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute("data-revealed", "");
          io.unobserve(el);
          if (el.dataset.reveal === "lines") {
            timers.push(window.setTimeout(() => unsplitLines(el), LINES_SETTLE_MS));
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    blocks.forEach((el) => io.observe(el));

    // Split headings once fonts are ready; re-split on width changes until revealed.
    let cancelled = false;
    const widths = new WeakMap<HTMLElement, number>();
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const width = Math.round(entry.contentRect.width);
        if (widths.get(el) === width) continue;
        widths.set(el, width);
        if (!el.hasAttribute("data-revealed")) splitLines(el);
      }
    });
    document.fonts.ready.then(() => {
      if (cancelled) return;
      headings.forEach((el) => {
        splitLines(el);
        widths.set(el, Math.round(el.getBoundingClientRect().width));
        ro.observe(el);
        io.observe(el);
      });
    });

    return () => {
      cancelled = true;
      io.disconnect();
      ro.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
