import { Photo } from "@/components/media/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import type { ImageId } from "@/content/images";
import { getProject } from "@/content/projects";

type StoryFrame = {
  room: string;
  image: ImageId;
  ratio: string;
  span: string;
};

// A walk through one home, room by room. Spans create a deliberate rhythm:
// wide, narrow-offset, wide, pair.
const frames: readonly StoryFrame[] = [
  { room: "Living", image: "disha-living-media", ratio: "4 / 3", span: "md:col-span-7" },
  { room: "Kitchen", image: "disha-kitchen-tall-unit", ratio: "3 / 4", span: "md:col-span-4 md:col-start-4" },
  { room: "Sage bedroom", image: "disha-sage-bedroom", ratio: "4 / 3", span: "md:col-span-7" },
  { room: "Children’s room", image: "disha-kids-room-motion", ratio: "1 / 1", span: "md:col-span-4" },
  { room: "Window seat", image: "disha-window-seat-detail", ratio: "1 / 1", span: "md:col-span-3" },
];

export function FeaturedStory() {
  const project = getProject("disha-courtyard")!;

  return (
    <section aria-labelledby="story-title" className="section bg-paper-deep">
      <div className="wrap grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionMarker index="04" title="Project story" />
            <div data-reveal="group">
              <h2 id="story-title" className="serif mt-8 text-h1 text-ink">
                {project.title}
              </h2>
              <ol className="mt-10 border-t border-line">
                {frames.map((f, i) => (
                  <li key={f.room} className="label flex gap-6 border-b border-line py-3 text-ink-soft">
                    <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {f.room}
                  </li>
                ))}
              </ol>
              <div className="mt-10">
                <ArrowLink href={`/work/${project.slug}/`} variant="outline">
                  Read the project
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <div className="grid grid-cols-1 gap-x-[var(--col-gap)] gap-y-12 md:grid-cols-7 md:gap-y-20">
            {frames.map((f, i) => (
              <figure key={f.image} className={`col-span-1 ${f.span}`}>
                <Photo id={f.image} ratio={f.ratio} sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 60vw, 100vw" parallax={i % 2 === 0} />
                <figcaption className="label mt-3 flex justify-between text-muted">
                  <span>{f.room}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
