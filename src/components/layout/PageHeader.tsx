import Link from "next/link";
import type { ReactNode } from "react";
import { Lines } from "@/components/motion/Lines";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { enterDelay } from "@/lib/motion";

export type Crumb = { label: string; href: string };

type PageHeaderProps = {
  eyebrow: string;
  /** Authored title lines (each rises in its own mask). */
  title: readonly string[];
  intro?: string;
  /** Trail above the eyebrow, ending with the parent page; also emitted as BreadcrumbList data. */
  crumbs?: readonly Crumb[];
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, intro, crumbs, children }: PageHeaderProps) {
  return (
    <header className="pt-[var(--header-h)]">
      <div className="wrap grid-12 gap-y-6 pt-[clamp(2rem,1.5rem+3vw,5rem)] pb-[var(--section-sm)]">
        {crumbs && (
          <>
            <nav aria-label="Breadcrumb" className="enter-rise col-span-12">
              <ol className="label flex flex-wrap items-center gap-2 text-muted">
                {crumbs.map((c) => (
                  <li key={c.href} className="flex items-center gap-2">
                    <Link href={c.href} className="link-line">
                      {c.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ))}
              </ol>
            </nav>
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [...crumbs, { label: title.join(" ").replace(/\*/g, ""), href: "" }].map((c, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: c.label,
                  ...(c.href && { item: new URL(c.href, site.url).toString() }),
                })),
              }}
            />
          </>
        )}
        <p className="enter-rise label col-span-12 text-muted">{eyebrow}</p>
        <h1 className="serif col-span-12 text-display text-ink md:col-span-10">
          <Lines lines={title} delay={120} />
        </h1>
        {intro && (
          <p
            className="enter-rise col-span-12 text-body text-ink-soft md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9"
            style={enterDelay(320)}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
