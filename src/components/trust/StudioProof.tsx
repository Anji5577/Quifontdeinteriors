import { Photo } from "@/components/media/Photo";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { googleRating, people, press } from "@/content/trust";

/** People, press and rating — each block appears only once it has real content. */
export function StudioProof() {
  if (!people.length && !press.length && !googleRating) return null;
  return (
    <section aria-label="The studio" className="section border-t border-line">
      <div className="wrap space-y-[var(--section-sm)]">
        {people.length > 0 && (
          <div className="grid-12 gap-y-10">
            <SectionMarker index="—" title="People" className="col-span-12 md:col-span-3" />
            <ul className="col-span-12 grid gap-x-[var(--col-gap)] gap-y-12 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
              {people.map((p) => (
                <li key={p.name}>
                  {p.image && <Photo id={p.image} ratio="4 / 5" sizes="(min-width: 64rem) 25vw, 50vw" />}
                  <p className="serif mt-5 text-h3 text-ink">{p.name}</p>
                  <p className="label mt-2 text-muted">{p.role}</p>
                  {p.bio && <p className="mt-4 text-small text-ink-soft">{p.bio}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {press.length > 0 && (
          <div className="grid-12 gap-y-6">
            <SectionMarker index="—" title="Press" className="col-span-12 md:col-span-3" />
            <ul className="col-span-12 border-t border-line md:col-span-9">
              {press.map((item) => (
                <li key={item.title} className="grid grid-cols-[1fr_auto] gap-6 border-b border-line py-5">
                  <span>
                    <span className="label text-muted">{item.publication}</span>
                    <span className="serif mt-1 block text-h3 text-ink">
                      {item.href ? (
                        <a href={item.href} className="link-line" target="_blank" rel="noopener">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </span>
                  </span>
                  {item.year && <span className="label text-muted">{item.year}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {googleRating && (
          <p className="label text-muted">
            <a href={googleRating.href} className="link-line text-ink" target="_blank" rel="noopener">
              {googleRating.rating.toFixed(1)} / 5 on Google
            </a>{" "}
            · {googleRating.count} reviews
          </p>
        )}
      </div>
    </section>
  );
}
