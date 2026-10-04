import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { processStages } from "@/content/studio";

export const metadata: Metadata = pageMeta({ title: "Process", description: "How a project moves from first conversation to handover, stage by stage.", path: "/process/", image: "furniture-liftup-flap" });

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title={["From conversation", "to *handover*"]}
        intro="Seven stages, taken in order. The big decisions happen early, while they are still easy to change; by the time anything is built, it has already been drawn."
      />

      <ol className="wrap border-t border-line">
        {processStages.map((stage, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={stage.title} className="grid-12 gap-y-8 border-b border-line py-[var(--section-sm)]">
              <div className={`col-span-12 md:col-span-6 lg:col-span-5 ${flip ? "md:order-2 md:col-start-7 lg:col-start-8" : ""}`}>
                <p className="label text-muted" aria-hidden="true">
                  Stage {String(i + 1).padStart(2, "0")} <span className="mx-2">/</span> {String(processStages.length).padStart(2, "0")}
                </p>
                <h2 data-reveal="lines" className="serif mt-5 text-h2 text-ink">
                  {stage.title}
                </h2>
                <p data-reveal="up" className="mt-6 max-w-[34rem] text-body text-ink-soft">
                  {stage.body}
                </p>
                <div data-reveal="up" className="mt-8 border-t border-line pt-5">
                  <p className="label text-muted">At the end of this stage</p>
                  <ul className="mt-3 space-y-1.5">
                    {stage.receive.map((r) => (
                      <li key={r} className="flex gap-3 text-small text-ink">
                        <span aria-hidden="true" className="text-muted">—</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  {stage.duration && <p className="label mt-5 text-muted">Typically {stage.duration}</p>}
                </div>
              </div>
              <Photo
                id={stage.image}
                ratio="4 / 3"
                sizes="(min-width: 48rem) 45vw, 100vw"
                parallax
                className={`col-span-12 self-center md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
              />
            </li>
          );
        })}
      </ol>

      <section aria-label="More about working with us" className="section">
        <div className="wrap grid-12 gap-y-6">
          <p data-reveal="lines" className="serif col-span-12 text-lead text-ink md:col-span-7">
            Questions about timing, preparation or how decisions are made are answered in the FAQ.
          </p>
          <div className="col-span-12 self-end md:col-span-4 md:col-start-9">
            <ArrowLink href="/faq/">Read the FAQ</ArrowLink>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
