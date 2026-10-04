import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { featureLayouts, ProjectFeature } from "@/components/work/ProjectFeature";
import { WorkViews } from "@/components/work/WorkViews";
import { projects } from "@/content/projects";

export const metadata: Metadata = pageMeta({ title: "Work", description: "Residential interiors, custom furniture and wardrobe systems.", path: "/work/", image: "disha-oak-window-seat" });

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title={["Homes, pieces", "and *systems*"]}
      >
        <div className="enter-rise col-span-12 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
          <ArrowLink href="/work/rooms/">Browse every room</ArrowLink>
        </div>
      </PageHeader>

      <div className="wrap pb-[var(--section)]">
        <WorkViews
          projects={projects}
          grid={
            <ul className="space-y-[var(--section)]">
              {projects.map((project, i) => (
                <li key={project.slug}>
                  <ProjectFeature
                    project={project}
                    layout={featureLayouts[i % featureLayouts.length]!}
                    headingLevel="h2"
                    priority={i === 0}
                  />
                </li>
              ))}
            </ul>
          }
        />
      </div>

      <ClosingCta />
    </>
  );
}
