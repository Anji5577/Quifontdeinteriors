import Link from "next/link";
import { getProject } from "@/content/projects";
import { testimonials } from "@/content/trust";

/** One large client quote (renders nothing until a real testimonial is added). */
export function Testimonial() {
  const t = testimonials[0];
  if (!t) return null;
  const project = t.project ? getProject(t.project) : undefined;
  return (
    <section aria-label="Client words" className="section border-t border-line">
      <figure className="wrap grid-12 gap-y-10">
        <blockquote className="col-span-12 md:col-span-10 md:col-start-2">
          <p data-reveal="lines" className="serif text-h1 text-ink">
            “{t.quote}”
          </p>
        </blockquote>
        <figcaption className="label col-span-12 flex flex-wrap gap-x-4 text-muted md:col-span-8 md:col-start-2">
          <span className="text-ink">{t.name}</span>
          {t.context && <span>{t.context}</span>}
          {project && (
            <Link href={`/work/${project.slug}/`} className="link-line">
              {project.title}
            </Link>
          )}
        </figcaption>
      </figure>
    </section>
  );
}
