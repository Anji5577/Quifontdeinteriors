import Link from "next/link";
import type { ReactNode } from "react";
import { Mark } from "@/components/brand/Logo";
import { publishedPosts } from "@/content/journal";
import { site } from "@/content/site";
import { services } from "@/content/studio";
import { channels } from "@/lib/contact";

const studioLinks = [
  { label: "Work", href: "/work/" },
  { label: "Rooms archive", href: "/work/rooms/" },
  { label: "Process", href: "/process/" },
  { label: "Materials", href: "/materials/" },
  ...(publishedPosts().length ? [{ label: "Journal", href: "/journal/" }] : []),
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
];

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="label text-muted">{title}</p>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  const { address, hours, social, serviceAreas } = site;

  return (
    <footer className="border-t border-line pb-16 md:pb-0">
      <div className="wrap">
        {/* Closing mark */}
        <div className="grid-12 items-end gap-y-8 border-b border-line py-[clamp(3rem,2rem+4vw,6rem)]">
          <Link href="/" aria-label={`${site.name}, home`} className="col-span-12 text-ink md:col-span-7">
            <Mark className="h-[clamp(2rem,1.4rem+2.4vw,3.5rem)] w-auto" />
          </Link>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:text-right">
            <p className="serif text-h3 text-ink">Have a space in mind?</p>
            <Link href={site.cta.href} className="group label mt-4 inline-flex items-center gap-3 text-ink">
              <span className="link-line">{site.cta.label}</span>
              <span aria-hidden="true" className="arrow group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-12 py-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            {serviceAreas.length > 0 && <p className="label mt-4 text-muted">{serviceAreas.join(" · ")}</p>}
          </div>

          <nav aria-label="Studio">
            <Column title="Studio">
              {studioLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small link-line text-ink-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </Column>
          </nav>

          <nav aria-label="Services">
            <Column title="Services">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="text-small link-line text-ink-soft">
                    {s.title}
                  </Link>
                </li>
              ))}
            </Column>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <Column title="Contact">
              {channels.map((c) => (
                <li key={c.kind} className="text-small text-ink-soft">
                  {c.href ? (
                    <a href={c.href} className="link-line">
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </li>
              ))}
              {address && (
                <li className="pt-2 text-small text-ink-soft">
                  <address className="not-italic">
                    {address.street}, {address.locality}
                    <br />
                    {address.city} {address.postalCode}
                  </address>
                </li>
              )}
              {hours && <li className="label pt-2 text-muted">{hours}</li>}
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-small link-line text-ink-soft" target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </Column>
          </div>
        </div>

        {/* The studio name, set edge to edge as the last thing on every page. */}
        <svg viewBox="0 0 1000 96" className="block h-auto w-full text-ink" aria-hidden="true">
          <text
            x="0"
            y="82"
            textLength="1000"
            lengthAdjust="spacing"
            fill="currentColor"
            className="footer-name"
          >
            {site.name.toUpperCase()}
          </text>
        </svg>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6">
          <p className="label text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href="#main" className="group label inline-flex items-center gap-2 text-muted hover:text-ink">
            Back to top
            <span aria-hidden="true" className="arrow group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
