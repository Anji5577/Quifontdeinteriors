"use client";

import { useEffect } from "react";
import { smoothScroll } from "@/lib/smooth-scroll";

/**
 * Gentle inertial wheel scrolling (Lenis). Native scroll position is kept, so
 * sticky, anchors, find-in-page and assistive tech behave normally.
 * Loaded lazily, only for mouse/trackpad users who haven't asked for reduced
 * motion; touch devices keep their native scrolling. Route changes need no
 * handling: Lenis follows the router's native scroll (including back-button
 * restoration) and `stopInertiaOnNavigate` cancels any glide in progress.
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let cancelled = false;
    const start = () =>
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        smoothScroll.set(
          new Lenis({
            lerp: 0.1,
            anchors: false,
            autoRaf: true,
            stopInertiaOnNavigate: true,
            allowNestedScroll: true,
          }),
        );
      });

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    idle(() => void start());

    return () => {
      cancelled = true;
      smoothScroll.get()?.destroy();
      smoothScroll.set(null);
    };
  }, []);

  return null;
}
