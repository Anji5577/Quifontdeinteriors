import { Fragment } from "react";
import { InlinePhoto } from "@/components/media/InlinePhoto";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { statementParts } from "@/content/studio";

export function StudioIntro() {
  let photo = 0;
  return (
    <section aria-labelledby="studio-title" className="section">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <SectionMarker index="01" title="Studio" />
        </div>

        <div className="col-span-12 md:col-span-9">
          <h2 id="studio-title" className="sr-only">
            About the studio
          </h2>
          <p data-reveal="inline" className="serif text-[clamp(1.75rem,1.1rem+2.6vw,4rem)] leading-[1.18] text-ink">
            {statementParts.map((part, i) => (
              <Fragment key={i}>
                {typeof part === "string" ? part : <InlinePhoto id={part.image} position={part.position} index={photo++} />}
                {i < statementParts.length - 1 && " "}
              </Fragment>
            ))}
          </p>
          <div className="mt-10">
            <ArrowLink href="/about/">About the studio</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
