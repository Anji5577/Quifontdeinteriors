import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { RoomArchive } from "@/components/work/RoomArchive";

export const metadata: Metadata = pageMeta({ title: "Rooms archive", description: "Every photograph from our projects — kitchens, wardrobes, bedrooms, media walls and furniture.", path: "/work/rooms/", image: "disha-kitchen" });

export default function RoomsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Work", href: "/work/" }]}
        eyebrow="Archive"
        title={["Rooms & pieces"]}
      />
      <div className="wrap pb-[var(--section)]">
        <RoomArchive />
      </div>
      <ClosingCta />
    </>
  );
}
