import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { Lines } from "@/components/motion/Lines";
import type { Project } from "@/content/projects";
import { PROJECT_HERO_SIZES } from "@/lib/images";
import { enterDelay as delay } from "@/lib/motion";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="pt-[var(--header-h)]">
      <div className="wrap grid-12 gap-y-8 pt-[clamp(2rem,1.5rem+3vw,5rem)] pb-[clamp(2.5rem,1.5rem+4vw,6rem)]">
        <nav aria-label="Breadcrumb" className="enter-rise col-span-12">
          <Link href="/work/" className="label link-line text-muted">
            Work
          </Link>
          <span aria-hidden="true" className="label ml-2 text-muted">
            /
          </span>
        </nav>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Work", item: new URL("/work/", site.url).toString() },
              { "@type": "ListItem", position: 2, name: project.title },
            ],
          }}
        />
        <p className="enter-rise label col-span-12 -mt-4 text-muted" style={delay(100)}>
          Project {project.index}
          <span aria-hidden="true" className="mx-2">·</span>
          {project.category}
        </p>
        <h1 className="serif col-span-12 text-display text-ink lg:col-span-8">
          <Lines lines={[project.title]} delay={150} />
        </h1>
        <p
          className="enter-rise col-span-12 self-end text-body text-ink-soft md:col-span-7 lg:col-span-4 lg:col-start-9"
          style={delay(320)}
        >
          {project.intro}
        </p>
      </div>

      <div className="wrap">
        <Photo
          id={project.cover}
          priority
          reveal={false}
          ratio="3 / 2"
          sizes={PROJECT_HERO_SIZES}
          imgClassName="page-hero-photo"
          className="w-full"
          vtName={`cover-${project.slug}`}
        />
      </div>

      <div className="wrap">
        <dl className="grid grid-cols-2 gap-x-[var(--col-gap)] border-b border-line md:grid-cols-4">
          {[
            ...project.facts,
            { label: "Location", value: project.details.location },
            { label: "Area", value: project.details.area },
            { label: "Year", value: project.details.year },
            { label: "Status", value: project.details.status },
            { label: "Photography", value: project.details.photography },
          ]
            .filter((fact) => fact.value)
            .map((fact) => (
            <div key={fact.label} className="border-t border-line py-6 md:py-8">
              <dt className="label text-muted">{fact.label}</dt>
              <dd className="mt-2 text-small text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
