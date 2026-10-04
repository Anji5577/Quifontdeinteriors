import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextProject } from "@/components/work/NextProject";
import { ProjectClosing } from "@/components/work/ProjectClosing";
import { ProjectBlocks } from "@/components/work/ProjectBlocks";
import { ProjectHero } from "@/components/work/ProjectHero";
import { getNextProject, getProject, projectImages, projects } from "@/content/projects";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMeta({ title: project.title, description: project.summary, path: `/work/${project.slug}/`, image: project.cover });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <ProjectHero project={project} />
      <div className="pt-[var(--section-sm)]">
        <ProjectBlocks blocks={project.blocks} group={`project-${project.slug}`} />
      </div>
      <ProjectClosing project={project} imageCount={projectImages(project).filter((id) => id !== project.cover).length} />
      <NextProject project={getNextProject(project.slug)} />
    </article>
  );
}
