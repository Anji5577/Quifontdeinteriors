import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { wardrobeFinishes as finishes } from "@/content/finishes";



export function WardrobeShowcase() {
  return (
    <section aria-labelledby="wardrobe-title" className="section">
      <div className="wrap">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 md:col-span-6">
            <SectionMarker index="08" title="Wardrobes & storage" />
            <h2 id="wardrobe-title" data-reveal="lines" className="serif mt-8 text-h1 text-ink">
              Wardrobes, built as <em>walls</em>.
            </h2>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-3 gap-x-[var(--col-gap)] gap-y-10 md:mt-14 lg:grid-cols-6">
          {finishes.map((finish, i) => (
            <li key={finish.key} className={i % 2 === 1 ? "lg:mt-16" : undefined}>
              <figure>
                <Photo
                  id={finish.image}
                  alt=""
                  ratio="2 / 5"
                  position={finish.position}
                  sizes="(min-width: 64rem) 15vw, 32vw"
                />
                <figcaption className="label mt-3 text-muted">{finish.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="grid-12 mt-[var(--section-sm)] gap-y-8">
          <Photo
            id="wardrobe-sliding"
            ratio="4 / 3"
            parallax
            sizes="(min-width: 48rem) 58vw, 100vw"
            className="col-span-12 md:col-span-7"
          />
          <div data-reveal="group" className="col-span-12 self-end md:col-span-4 md:col-start-9">
            <div>
              <ArrowLink href="/work/wardrobe-systems/">Wardrobe systems</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
