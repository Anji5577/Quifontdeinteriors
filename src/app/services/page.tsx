import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/media/Photo";
import { services } from "@/content/studio";

export const metadata: Metadata = pageMeta({ title: "Services", description: "Residential interiors, kitchens, wardrobes and storage, custom furniture and children’s rooms.", path: "/services/", image: "disha-kitchen" });

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={["What we *design*"]}
      />

      <div className="wrap">
        <ul className="space-y-[var(--section-sm)] border-t border-line pt-[var(--section-sm)]">
          {services.map((service, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`} data-cursor="View" className="group grid-12 items-end gap-y-6">
                  <Photo
                    id={service.cover}
                    alt=""
                    ratio="4 / 3"
                    sizes="(min-width: 48rem) 50vw, 100vw"
                    priority={i === 0}
                    reveal={i !== 0}
                    vtName={`service-${service.slug}`}
                    className={`col-span-12 md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}
                  />
                  <div
                    className={`shift col-span-12 transition-[translate] duration-[500ms] ease-soft group-hover:-translate-y-1 md:col-span-5 ${
                      flip ? "md:order-1 md:col-start-1" : "md:col-start-8"
                    }`}
                  >
                    <p className="label text-muted">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="serif mt-3 text-h2 text-ink">{service.title}</h2>
                    <p className="mt-4 max-w-[28rem] text-body text-ink-soft">{service.short}</p>
                    <ul className="mt-6 border-t border-line">
                      {service.covers.slice(0, 3).map((c) => (
                        <li key={c} className="border-b border-line py-2.5 text-small text-ink-soft">
                          {c}
                        </li>
                      ))}
                    </ul>
                    <p className="label mt-6 inline-flex items-center gap-3 text-ink">
                      <span className="link-line">
                        <span className="roll" data-text="Read more">
                          <span>Read more</span>
                        </span>
                      </span>
                      <span aria-hidden="true" className="arrow group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <ClosingCta />
    </>
  );
}
