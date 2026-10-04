import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { LightboxButton } from "@/components/media/LightboxButton";
import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Faq } from "@/components/ui/Faq";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { ProjectFeature } from "@/components/work/ProjectFeature";
import { imagesTagged, type ImageId } from "@/content/images";
import { getProject } from "@/content/projects";
import { getService, services } from "@/content/studio";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMeta({ title: service.title, description: service.short, path: `/services/${service.slug}/`, image: service.cover });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const index = services.indexOf(service);
  const project = getProject(service.project);
  const gallery = [...new Set(service.tags.flatMap(imagesTagged))].filter((id) => id !== service.cover).slice(0, 6) as ImageId[];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <article>
      <PageHeader
        crumbs={[{ label: "Services", href: "/services/" }]}
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        title={[service.title]}
        intro={service.intro}
      />

      <div className="wrap">
        <Photo
          id={service.cover}
          priority
          reveal={false}
          ratio="16 / 9"
          sizes="(min-width: 96rem) 92rem, 100vw"
          imgClassName="page-hero-photo"
          vtName={`service-${service.slug}`}
        />
      </div>

      <section aria-labelledby="covers-title" className="section">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <SectionMarker index="01" title="Scope" />
            <h2 id="covers-title" data-reveal="lines" className="serif mt-8 text-h2 text-ink">
              What it covers
            </h2>
          </div>
          <ol data-reveal="group" className="col-span-12 border-t border-line md:col-span-7 md:col-start-6">
            {service.covers.map((c, i) => (
              <li key={c} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-5">
                <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif text-h3 text-ink">{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="considerations-title" className="section bg-paper-deep">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-8">
            <SectionMarker index="02" title="Worth deciding early" />
            <h2 id="considerations-title" data-reveal="lines" className="serif mt-8 text-h2 text-ink">
              A few things to think about
            </h2>
          </div>
          <ul data-reveal="group" className="col-span-12 grid gap-x-[var(--col-gap)] gap-y-10 md:grid-cols-3">
            {service.considerations.map((c) => (
              <li key={c.title} className="border-t border-ink/20 pt-6">
                <h3 className="label text-ink">{c.title}</h3>
                <p className="mt-4 text-body text-ink-soft">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="section">
          <div className="wrap">
            <div className="grid-12 items-end gap-y-6">
              <div className="col-span-12 md:col-span-8">
                <SectionMarker index="03" title="In our work" />
                <h2 id="gallery-title" data-reveal="lines" className="serif mt-8 text-h2 text-ink">
                  Photographs from finished rooms
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <ArrowLink href={`/work/rooms/?room=${encodeURIComponent(service.tags[0]!)}`}>Browse the archive</ArrowLink>
              </div>
            </div>
            <ul className="mt-14 grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-[var(--col-gap)] md:grid-cols-3">
              {gallery.map((id, i) => (
                <li key={id} className={i === 0 ? "col-span-2 row-span-2" : undefined}>
                  <LightboxButton group={`service-${service.slug}`} id={id}>
                    <Photo id={id} alt="" ratio="1 / 1" sizes={i === 0 ? "(min-width: 48rem) 66vw, 100vw" : "(min-width: 48rem) 33vw, 50vw"} />
                  </LightboxButton>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project && (
        <section aria-label="Related project" className="pb-[var(--section)]">
          <div className="wrap">
            <div className="border-t border-line pt-8 pb-[var(--section-sm)]">
              <SectionMarker index="04" title="Related project" />
            </div>
            <ProjectFeature project={project} layout="wide-right" />
          </div>
        </section>
      )}

      {service.faq.some((f) => f.a) && (
        <section aria-labelledby="faq-title" className="pb-[var(--section)]">
          <div className="wrap grid-12 gap-y-8">
            <h2 id="faq-title" className="serif col-span-12 text-h2 text-ink md:col-span-4">
              Questions
            </h2>
            <Faq items={service.faq} className="col-span-12 md:col-span-7 md:col-start-6" />
          </div>
        </section>
      )}

      <section aria-labelledby="next-title" className="section bg-umber text-umber-text">
        <div className="wrap grid-12 gap-y-10">
          <h2 id="next-title" data-reveal="lines" className="serif col-span-12 text-h1 md:col-span-8">
            Planning {service.title.toLowerCase()}?
          </h2>
          <div data-reveal="group" className="col-span-12 self-end md:col-span-4">
            <p className="text-body text-umber-muted">
              Tell us about the room and what it needs to do. A few details are enough to start.
            </p>
            <div className="mt-8">
              <ArrowLink href={`/contact/?service=${service.slug}#enquire`} variant="outline" tone="light">
                Start an enquiry
              </ArrowLink>
            </div>
          </div>
          <nav aria-label="Other services" className="col-span-12 mt-10 border-t border-umber-line pt-8">
            <ul className="flex flex-wrap gap-x-10 gap-y-3">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="label link-line text-umber-muted hover:text-umber-text">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </article>
  );
}
