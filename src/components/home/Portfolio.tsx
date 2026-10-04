import { SectionMarker } from "@/components/ui/SectionMarker";
import { RoomArchive } from "@/components/work/RoomArchive";

/** The homepage portfolio: every photograph, filterable by room. */
export function Portfolio() {
  return (
    <section aria-labelledby="portfolio-title" className="section bg-paper-deep">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6 pb-12">
          <div className="col-span-12 md:col-span-8">
            <SectionMarker index="09" title="Portfolio" />
            <h2 id="portfolio-title" data-reveal="lines" className="serif mt-8 text-h1 text-ink">
              Every room, <em>considered</em>
            </h2>
          </div>
        </div>
        <RoomArchive limit={12} />
      </div>
    </section>
  );
}
