"use client";

import Link from "next/link";
import { LightboxButton } from "@/components/media/LightboxButton";
import { Photo } from "@/components/media/Photo";
import { imageTags, roomTags, type ImageId, type RoomTag } from "@/content/images";
import { setUrlParam, useUrlParam } from "@/lib/url-param";

const ALL = "All";

/**
 * Every photograph, filterable by room or piece. The filter is mirrored in the
 * URL (?room=Kitchen) so filtered views can be linked. Items are hidden rather
 * than unmounted, so their reveal observers and lightbox order stay intact.
 */
type RoomArchiveProps = {
  /** Show at most this many photographs (with a link to the full archive). */
  limit?: number;
};

export function RoomArchive({ limit }: RoomArchiveProps = {}) {
  const ids = Object.keys(imageTags) as ImageId[];
  const param = useUrlParam("room");
  const room: RoomTag | typeof ALL =
    param && (roomTags as readonly string[]).includes(param) ? (param as RoomTag) : ALL;

  const choose = (next: RoomTag | typeof ALL) => setUrlParam("room", next === ALL ? null : next);

  const matches = (id: ImageId) => room === ALL || imageTags[id].includes(room);
  const matching = ids.filter(matches);
  const count = matching.length;
  const shownIds = new Set(limit ? matching.slice(0, limit) : matching);
  const visible = (id: ImageId) => shownIds.has(id);
  const archiveHref = room === ALL ? "/work/rooms/" : `/work/rooms/?room=${encodeURIComponent(room)}`;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-6 border-y border-line py-5">
        <ul className="flex flex-wrap gap-2" aria-label="Filter by room">
          {[ALL, ...roomTags].map((tag) => (
            <li key={tag}>
              <button
                type="button"
                aria-pressed={room === tag}
                onClick={() => choose(tag as RoomTag | typeof ALL)}
                className="label rounded-full border border-line px-4 py-2 text-ink-soft transition-colors duration-[300ms] hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
        <p className="label text-muted" aria-live="polite">
          {count} photograph{count === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="mt-12 columns-2 gap-[var(--col-gap)] md:columns-3">
        {ids.map((id) => (
          <li key={id} hidden={!visible(id)} className="mb-[var(--col-gap)] break-inside-avoid">
            <LightboxButton group="archive" id={id}>
              <Photo id={id} alt="" sizes="(min-width: 48rem) 31vw, 48vw" />
            </LightboxButton>
          </li>
        ))}
      </ul>

      {limit && count > limit && (
        <div className="mt-12 flex justify-center">
          <Link href={archiveHref} className="group label inline-flex items-center gap-3 border border-ink/30 px-6 py-3.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper">
            View all {count} photographs <span aria-hidden="true" className="arrow group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </>
  );
}
