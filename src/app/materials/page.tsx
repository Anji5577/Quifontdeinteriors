import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/media/Photo";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { finishes } from "@/content/finishes";
import { boards, mechanisms, shutterFinishes } from "@/content/materials";

export const metadata: Metadata = pageMeta({ title: "Materials & finishes", description: "A guide to shutter finishes, boards and the mechanisms that make built-in furniture work.", path: "/materials/", image: "furniture-walnut-grain" });

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Materials & finishes"
        title={["The surfaces", "you *live with*"]}
        intro="A short guide to what built-in furniture is made of, how it is finished, and the small mechanisms that decide how it feels to use every day."
      />

      <section aria-labelledby="palette-title" className="pb-[var(--section)]">
        <div className="wrap">
          <div className="grid-12 gap-y-6 border-t border-line pt-8">
            <SectionMarker index="01" title="In our work" className="col-span-12 md:col-span-3" />
            <h2 id="palette-title" data-reveal="lines" className="serif col-span-12 text-h2 text-ink md:col-span-8">
              Finishes from finished rooms
            </h2>
          </div>
          <ul className="mt-14 grid grid-cols-4 gap-x-[var(--col-gap)] gap-y-10 md:grid-cols-8">
            {finishes.map((f, i) => (
              <li key={f.key} className={i % 2 === 1 ? "md:mt-12" : undefined}>
                <figure>
                  <Photo id={f.image} alt="" ratio="1 / 3" position={f.position} sizes="(min-width: 48rem) 11vw, 24vw" />
                  <figcaption className="label mt-3 text-muted">{f.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[40rem] text-small text-muted">
            Names describe how each surface looks in the photographs. Specific materials and suppliers are chosen
            project by project.
          </p>
        </div>
      </section>

      <section aria-labelledby="shutters-title" className="section bg-paper-deep">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <SectionMarker index="02" title="Shutter finishes" />
            <h2 id="shutters-title" data-reveal="lines" className="serif mt-8 text-h2 text-ink">
              Five ways to finish a door
            </h2>
          </div>
          <dl className="col-span-12 border-t border-ink/20 md:col-span-7 md:col-start-6">
            {shutterFinishes.map((s) => (
              <div key={s.name} data-reveal="up" className="grid gap-x-[var(--col-gap)] gap-y-2 border-b border-ink/20 py-7 md:grid-cols-[12rem_1fr]">
                <dt className="serif text-h3 text-ink">{s.name}</dt>
                <dd>
                  <p className="text-body text-ink-soft">{s.body}</p>
                  <p className="mt-2 text-small text-muted">{s.notes}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="mechanisms-title" className="section">
        <div className="wrap">
          <div className="grid-12 gap-y-6">
            <SectionMarker index="03" title="Mechanisms" className="col-span-12 md:col-span-3" />
            <h2 id="mechanisms-title" data-reveal="lines" className="serif col-span-12 text-h2 text-ink md:col-span-8">
              How things open, close and light up
            </h2>
          </div>
          <ul className="mt-16 grid gap-x-[var(--col-gap)] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {mechanisms.map((m) => (
              <li key={m.name}>
                <Photo id={m.image} ratio="4 / 3" position={m.position} sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw" />
                <h3 className="serif mt-5 text-h3 text-ink">{m.name}</h3>
                <p className="mt-3 max-w-[26rem] text-small text-ink-soft">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="boards-title" className="section bg-umber text-umber-text">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <SectionMarker index="04" title="Boards" tone="light" />
            <h2 id="boards-title" data-reveal="lines" className="serif mt-8 text-h2">
              What’s underneath
            </h2>
          </div>
          <dl data-reveal="group" className="col-span-12 grid gap-x-[var(--col-gap)] gap-y-10 md:col-span-7 md:col-start-6 md:grid-cols-3">
            {boards.map((b) => (
              <div key={b.name} className="border-t border-umber-line pt-5">
                <dt className="label text-umber-text">{b.name}</dt>
                <dd className="mt-3 text-small text-umber-muted">{b.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
