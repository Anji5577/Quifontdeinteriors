import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { WarmImage } from "@/components/media/WarmImage";
import { getImage } from "@/content/images";
import { projectImages, type Project } from "@/content/projects";
import { imageSrcSet, PROJECT_HERO_SIZES } from "@/lib/images";

/**
 * Three editorial compositions for project entries. Each is a single link;
 * photographs inside it are decorative (alt="") because the title names it.
 */
export type FeatureLayout = "wide-left" | "wide-right" | "tall-right";

/** Layouts cycle in this order down a list of projects. */
export const featureLayouts: readonly FeatureLayout[] = ["wide-left", "wide-right", "tall-right"];

type ProjectFeatureProps = {
  project: Project;
  layout: FeatureLayout;
  headingLevel?: "h2" | "h3";
  /** First entry on a page: load the cover eagerly as the LCP image. */
  priority?: boolean;
};

function Info({ project, headingLevel: Heading = "h3", className = "" }: { project: Project; headingLevel?: "h2" | "h3"; className?: string }) {
  return (
    <div className={`shift transition-[translate] duration-[500ms] ease-soft group-hover:-translate-y-1 ${className}`}>
      <p className="label text-muted">
        {project.index}
        <span aria-hidden="true" className="mx-2">·</span>
        {project.category}
        <span aria-hidden="true" className="mx-2">·</span>
        {projectImages(project).length} images
      </p>
      <Heading className="serif mt-3 text-h2 text-ink">{project.title}</Heading>
      <p className="label mt-6 inline-flex items-center gap-3 text-ink">
        <span className="link-line">
          <span className="roll" data-text="View project">
            <span>View project</span>
          </span>
        </span>
        <span aria-hidden="true" className="arrow group-hover:translate-x-1">→</span>
      </p>
    </div>
  );
}

export function ProjectFeature({ project, layout, headingLevel = "h3", priority = false }: ProjectFeatureProps) {
  const href = `/work/${project.slug}/`;
  const cover = { priority, reveal: !priority, vtName: `cover-${project.slug}` } as const;
  // Same link props for every layout: the cursor hint and hero pre-warm.
  const linkProps = { href, "data-cursor": "View" } as const;
  const warm = <WarmImage srcSet={imageSrcSet(getImage(project.cover), "avif")} sizes={PROJECT_HERO_SIZES} />;

  if (layout === "wide-left") {
    return (
      <Link {...linkProps} className="group grid-12 gap-y-8">
        {warm}
        <Photo id={project.cover} alt="" ratio="5 / 4" sizes="(min-width: 48rem) 62vw, 100vw" className="col-span-12 md:col-span-8" {...cover} />
        <div className="col-span-12 flex flex-col justify-between gap-10 md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10">
          <Photo id={project.secondary} alt="" ratio="4 / 5" sizes="(min-width: 48rem) 22vw, 50vw" className="hidden w-full md:block" />
          <Info project={project} headingLevel={headingLevel} />
        </div>
      </Link>
    );
  }

  if (layout === "wide-right") {
    return (
      <Link {...linkProps} className="group grid-12 gap-y-8">
        {warm}
        <Info project={project} headingLevel={headingLevel} className="order-2 col-span-12 self-end md:order-1 md:col-span-4 lg:col-span-3" />
        <Photo id={project.cover} alt="" ratio="3 / 2" sizes="(min-width: 48rem) 66vw, 100vw" className="order-1 col-span-12 md:order-2 md:col-span-8 md:col-start-5" {...cover} />
      </Link>
    );
  }

  return (
    <Link {...linkProps} className="group grid-12 gap-y-8">
      {warm}
      <div className="order-2 col-span-12 flex flex-col justify-between gap-10 md:order-1 md:col-span-4 lg:col-span-4">
        <Info project={project} headingLevel={headingLevel} />
        <Photo id={project.secondary} alt="" ratio="4 / 3" sizes="(min-width: 48rem) 30vw, 50vw" className="hidden w-full md:block" />
      </div>
      <Photo
        id={project.cover}
        alt=""
        ratio="1 / 1"
        sizes="(min-width: 48rem) 58vw, 100vw"
        className="order-1 col-span-12 md:order-2 md:col-span-7 md:col-start-6"
        {...cover}
      />
    </Link>
  );
}
