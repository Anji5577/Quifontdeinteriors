import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { featureLayouts, ProjectFeature } from "@/components/work/ProjectFeature";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="pb-[var(--section)]">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6 md:items-baseline border-t border-line pt-8 md:pt-10">
          <SectionMarker index="03" title="Work" className="col-span-12 md:col-span-3" />
          <h2 id="work-title" data-reveal="lines" className="serif col-span-12 text-h1 text-ink md:col-span-6">
            Selected projects
          </h2>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <ArrowLink href="/work/">All projects</ArrowLink>
          </div>
        </div>

        <ul className="mt-[var(--section-sm)] space-y-[var(--section)]">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectFeature project={project} layout={featureLayouts[i % featureLayouts.length]!} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
