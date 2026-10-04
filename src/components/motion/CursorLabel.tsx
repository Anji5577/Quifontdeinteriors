"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small label ("View", "Open") that eases after the pointer while it is over
 * an element marked `data-cursor="View"`. The system cursor stays visible —
 * this only adds a hint. Mouse/trackpad only; hidden under reduced motion.
 * The animation loop runs only while a label is showing.
 */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduced || !el) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    let active = false;

    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      frame = active || Math.abs(x - cx) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX + 18;
      y = e.clientY + 18;
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? null;
      if (next && !active) {
        // Appear at the pointer rather than flying in from the last position.
        cx = x;
        cy = y;
      }
      active = !!next;
      setLabel(next);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      active = false;
      setLabel(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // A click usually navigates: hide until the pointer moves again.
    window.addEventListener("click", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="cursor-label" data-active={label ? "" : undefined}>
      <span className="label block rounded-full bg-ink px-4 py-2 text-[0.6875rem] text-paper">{label ?? "View"}</span>
    </div>
  );
}
