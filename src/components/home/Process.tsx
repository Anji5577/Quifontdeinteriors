import type { CSSProperties } from "react";
import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { process } from "@/content/studio";

type ProcessProps = {
  index?: string;
};

/**
 * Four steps as stacking cards: each pins below the header and the next slides
 * over it (plain CSS sticky — no script, works everywhere).
 */
export function Process({ index = "05" }: ProcessProps) {
  return (
    <section aria-labelledby="process-title" className="section">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <SectionMarker index={index} title="Process" />
            <h2 id="process-title" data-reveal="lines" className="serif mt-8 text-h1 text-ink">
              Four steps, taken in order.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <ArrowLink href="/process/">The full process</ArrowLink>
          </div>
        </div>

        <ol className="mt-10 md:mt-14">
          {process.map((step, i) => (
            <li
              key={step.step}
              className="process-card sticky mb-[8vh] last:mb-0"
              style={{ "--i": i, top: `calc(var(--header-h) + 1rem + ${i} * 1.25rem)` } as CSSProperties}
            >
              <div className="grid-12 items-stretch gap-y-6 border-t border-ink/15 bg-paper py-6 md:py-8">
                <div className="col-span-12 flex flex-col justify-between gap-6 md:col-span-5">
                  <div>
                    <p className="label text-muted">
                      {step.step} <span className="mx-1">/</span> {String(process.length).padStart(2, "0")}
                    </p>
                    <h3 className="serif mt-4 text-h1 text-ink">{step.title}</h3>
                  </div>
                  <p className="max-w-[24rem] text-body text-ink-soft">{step.body}</p>
                </div>
                <Photo
                  id={step.image}
                  alt=""
                  ratio="16 / 9"
                  sizes="(min-width: 48rem) 55vw, 100vw"
                  className="col-span-12 md:col-span-7 md:col-start-6"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
