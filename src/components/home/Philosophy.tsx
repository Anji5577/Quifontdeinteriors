import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { studio } from "@/content/studio";

type PhilosophyProps = {
  index?: string;
};

/**
 * The studio's one-line philosophy, set large. Where scroll-driven animation
 * is supported, each word turns from faint to full ink as the line scrolls
 * through the screen; elsewhere the line is simply shown.
 */
export function Philosophy({ index = "08" }: PhilosophyProps) {
  const words = studio.philosophy.lead.split(" ");
  return (
    <section aria-labelledby="philosophy-title" className="section border-t border-line">
      <div className="wrap grid-12 gap-y-10">
        <SectionMarker index={index} title="Philosophy" className="col-span-12 md:col-span-3" />
        <h2
          id="philosophy-title"
          className="scroll-words serif col-span-12 text-[clamp(2.25rem,1.2rem+4.2vw,6rem)] leading-[1.04] text-ink md:col-span-9"
          aria-label={studio.philosophy.lead}
        >
          {words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{ "--from": `${10 + (i / words.length) * 45}%`, "--to": `${16 + (i / words.length) * 45}%` } as CSSProperties}
            >
              {word}{" "}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
