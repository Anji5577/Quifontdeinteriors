"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  /** Maximum travel in px on desktop; halved below 768px. */
  max?: number;
  className?: string;
};

/**
 * Fallback (Firefox) for the hero's scroll drift, which is pure CSS where
 * scroll-driven animations are supported. Very gentle vertical drift. The scroll handler only
 * runs while the element is on screen, writes one transform per frame, and is
 * disabled entirely for reduced-motion users.
 */
export function Parallax({ children, max = 40, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Browsers with scroll-driven animations handle this in CSS (.scroll-drift).
    if (CSS.supports("animation-timeline: view()")) return;

    const limit = window.matchMedia("(min-width: 48rem)").matches ? max : max / 2;
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      el.style.transform = `translate3d(0, ${(progress * limit).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [max]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
