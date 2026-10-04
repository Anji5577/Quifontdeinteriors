import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import type { Project } from "@/content/projects";

/** After the story: the project's own palette, the full image set, and an enquiry prompt. */
export function ProjectClosing({ project, imageCount }: { project: Project; imageCount: number }) {
  return (
    <section aria-labelledby="palette-title" className="section">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 md:col-span-4">
          <SectionMarker index={project.index} title="Palette" />
          <h2 id="palette-title" data-reveal="lines" className="serif mt-8 text-h2 text-ink">
            Finishes in this project
          </h2>
          <button
            type="button"
            data-lightbox-start={`project-${project.slug}`}
            className="group label mt-10 inline-flex items-center gap-3 text-ink"
          >
            <span className="link-line">
              <span className="roll" data-text={`View all ${imageCount} images`}>
                <span>View all {imageCount} images</span>
              </span>
            </span>
            <span aria-hidden="true" className="arrow group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        <ul
          className="col-span-12 grid gap-x-[var(--col-gap)] md:col-span-7 md:col-start-6"
          style={{ gridTemplateColumns: `repeat(${project.palette.length}, minmax(0, 1fr))` }}
        >
          {project.palette.map((swatch, i) => (
            <li key={swatch.name} className={i % 2 === 1 ? "mt-8" : undefined}>
              <figure>
                <Photo id={swatch.image} alt="" ratio="1 / 3" position={swatch.position} sizes="(min-width: 48rem) 11vw, 18vw" />
                <figcaption className="label mt-3 text-muted">{swatch.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="col-span-12 grid-12 mt-[var(--section-sm)] items-end gap-y-8 bg-paper-deep px-[clamp(1.25rem,1rem+3vw,4rem)] py-[clamp(2.5rem,2rem+4vw,6rem)]">
          <p data-reveal="lines" className="serif col-span-12 text-h2 text-ink md:col-span-7">
            Thinking of a home like this?
          </p>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:text-right">
            <ArrowLink href={`/contact/?project=${project.slug}#enquire`} variant="outline">
              Enquire about a similar home
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
