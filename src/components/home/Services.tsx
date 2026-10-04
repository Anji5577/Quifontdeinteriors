"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { services } from "@/content/studio";

type ServicesProps = {
  index?: string;
};

/** Service rows; on desktop, the photograph beside them follows the row in focus. */
export function Services({ index = "04" }: ServicesProps) {
  const [preview, setPreview] = useState(0);
  return (
    <section aria-labelledby="services-title" className="section">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <SectionMarker index={index} title="Services" />
          <h2 id="services-title" data-reveal="lines" className="serif mt-8 text-h2 text-ink">
            What we design
          </h2>
          <div className="mt-8">
            <ArrowLink href="/services/">All services</ArrowLink>
          </div>
          <div aria-hidden="true" className="relative mt-12 hidden w-4/5 lg:block">
            {services.map((s, i) => (
              <div
                key={s.slug}
                className={`transition-opacity duration-[700ms] ease-soft ${i === 0 ? "relative" : "absolute inset-0"} ${
                  preview === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Photo
                  id={s.cover}
                  alt=""
                  ratio="4 / 5"
                  reveal={i === 0}
                  sizes="25vw"
                  imgClassName={`transition-[scale] duration-[1200ms] ease-reveal ${preview === i ? "scale-100" : "scale-[1.05]"}`}
                />
              </div>
            ))}
          </div>
        </div>

        <ul data-reveal="group" className="col-span-12 border-t border-line lg:col-span-7 lg:col-start-6">
          {services.map((service, i) => (
            <li key={service.title} className="relative border-b border-line">
              <Link
                href={`/services/${service.slug}/`}
                onPointerEnter={() => setPreview(i)}
                onFocus={() => setPreview(i)}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 md:grid-cols-[3.5rem_1fr_auto] md:py-8"
              >
                <span className="label col-start-1 row-start-1 text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="shift col-start-2 row-start-1 serif text-h3 text-ink transition-[translate] duration-[400ms] ease-soft group-hover:translate-x-2">
                  {service.title}
                </h3>
                <span aria-hidden="true" className="arrow col-start-3 row-start-1 text-ink-soft group-hover:translate-x-1">
                  →
                </span>
                {/* Hover line: draws across the row */}
                <span
                  aria-hidden="true"
                  className="absolute right-0 -bottom-px left-0 h-px origin-left scale-x-0 bg-ink transition-[scale] duration-[450ms] ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
