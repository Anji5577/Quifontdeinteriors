import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { projects } from "@/content/projects";

export default function NotFound() {
  return (
    <section className="pt-[var(--header-h)]">
      <div className="wrap grid-12 min-h-[80svh] items-center gap-y-12 py-[var(--section-sm)]">
        <div className="col-span-12 md:col-span-6">
          <p className="label text-muted">404</p>
          <h1 className="serif mt-6 text-h1 text-ink">This room doesn’t exist.</h1>
          <p className="mt-6 max-w-[28rem] text-body text-ink-soft">
            The page may have moved. These ones are still here:
          </p>
          <ul className="mt-8 border-t border-line">
            {projects.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={`/work/${p.slug}/`} className="group flex items-baseline justify-between py-4">
                  <span className="serif text-h3 text-ink">{p.title}</span>
                  <span aria-hidden="true" className="arrow text-muted group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ArrowLink href="/">Return home</ArrowLink>
          </div>
        </div>
        <Photo
          id="disha-guest-bedroom"
          ratio="4 / 5"
          sizes="(min-width: 48rem) 40vw, 100vw"
          reveal={false}
          className="col-span-12 md:col-span-5 md:col-start-8"
        />
      </div>
    </section>
  );
}
