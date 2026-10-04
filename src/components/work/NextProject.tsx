import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { WarmImage } from "@/components/media/WarmImage";
import { getImage } from "@/content/images";
import type { Project } from "@/content/projects";
import { imageSrcSet, PROJECT_HERO_SIZES } from "@/lib/images";

export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Next project" className="section">
      <div className="wrap">
        <Link href={`/work/${project.slug}/`} data-cursor="View" className="group grid-12 gap-y-8 border-t border-line pt-8 md:pt-10">
          <div className="col-span-12 flex flex-col justify-between gap-8 md:col-span-5">
            <p className="label text-muted">Next project</p>
            <div className="shift transition-[translate] duration-[500ms] ease-soft group-hover:-translate-y-1">
              <p className="label text-muted">
                {project.index}
                <span aria-hidden="true" className="mx-2">·</span>
                {project.category}
              </p>
              <p className="serif mt-3 text-h1 text-ink">{project.title}</p>
              <p className="label mt-6 inline-flex items-center gap-3 text-ink">
                <span className="link-line">View project</span>
                <span aria-hidden="true" className="arrow group-hover:translate-x-1">→</span>
              </p>
            </div>
          </div>
          <Photo
            id={project.cover}
            alt=""
            ratio="3 / 2"
            sizes="(min-width: 48rem) 58vw, 100vw"
            className="col-span-12 md:col-span-7 md:col-start-6"
            vtName={`cover-${project.slug}`}
          />
          <WarmImage srcSet={imageSrcSet(getImage(project.cover), "avif")} sizes={PROJECT_HERO_SIZES} />
        </Link>
      </div>
    </section>
  );
}
