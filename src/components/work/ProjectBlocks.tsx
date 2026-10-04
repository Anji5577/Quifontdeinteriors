import type { ComponentProps } from "react";
import { LightboxButton } from "@/components/media/LightboxButton";
import { Photo } from "@/components/media/Photo";
import { getImage, type ImageId } from "@/content/images";
import type { ProjectBlock } from "@/content/projects";

type PhotoProps = ComponentProps<typeof Photo>;

/** A case-study photograph that opens in the lightbox. `place` positions it on the grid. */
function Zoomable({ group, place, ...photo }: PhotoProps & { group: string; place: string }) {
  return (
    <LightboxButton group={group} id={photo.id} className={place}>
      <Photo {...photo} />
    </LightboxButton>
  );
}

/** Landscape photographs run the full width; squarer ones sit inset so they never dominate the viewport. */
function FullBlock({ image, group }: { image: ImageId; group: string }) {
  const { width, height } = getImage(image);
  const landscape = width / height >= 1.3;
  return landscape ? (
    <Zoomable group={group} id={image} sizes="(min-width: 96rem) 92rem, 100vw" place="col-span-12" parallax />
  ) : (
    <Zoomable
      group={group}
      id={image}
      ratio="5 / 4"
      sizes="(min-width: 48rem) 82vw, 100vw"
      place="col-span-12 md:col-span-10 md:col-start-2"
      parallax
    />
  );
}

function PairBlock({ images, lead = "left", group }: Extract<ProjectBlock, { kind: "pair" }> & { group: string }) {
  const [first, second] = images;
  const big = "col-span-12 md:col-span-7";
  const small = "col-span-9 md:col-span-4 md:self-end";
  const bigSizes = "(min-width: 48rem) 58vw, 100vw";
  const smallSizes = "(min-width: 48rem) 33vw, 75vw";
  return (
    <>
      <Zoomable
        group={group}
        id={first}
        sizes={lead === "left" ? bigSizes : smallSizes}
        place={lead === "left" ? big : `${small} md:col-start-2`}
      />
      <Zoomable
        group={group}
        id={second}
        sizes={lead === "left" ? smallSizes : bigSizes}
        place={lead === "left" ? `${small} col-start-4 md:col-start-9` : `${big} md:col-start-6`}
      />
    </>
  );
}

function OffsetBlock({ image, align, note, group }: Extract<ProjectBlock, { kind: "offset" }> & { group: string }) {
  const right = align === "right";
  return (
    <>
      <Zoomable
        group={group}
        id={image}
        sizes="(min-width: 48rem) 50vw, 100vw"
        place={`col-span-12 md:col-span-6 ${right ? "md:col-start-7" : "md:col-start-1"}`}
      />
      {note && (
        <p
          data-reveal="up"
          className={`label col-span-12 max-w-[20rem] self-end text-muted md:col-span-3 ${
            right ? "md:col-start-3 md:-order-1" : "md:col-start-8"
          }`}
        >
          {note}
        </p>
      )}
    </>
  );
}

function ChapterBlock({ heading, body }: Extract<ProjectBlock, { kind: "chapter" }>) {
  return (
    <div className="col-span-12 grid-12 gap-y-4 py-[clamp(2rem,1rem+4vw,5rem)]">
      <h2 data-reveal="lines" className="serif col-span-12 text-h2 text-ink md:col-span-4 md:col-start-2">
        {heading}
      </h2>
      <p data-reveal="up" className="col-span-12 max-w-[34rem] text-body text-ink-soft md:col-span-5 md:col-start-7 md:pt-3">
        {body}
      </p>
    </div>
  );
}

/** Lays out a case study's blocks; every photograph belongs to the lightbox group `group`. */
export function ProjectBlocks({ blocks, group }: { blocks: readonly ProjectBlock[]; group: string }) {
  return (
    <div className="wrap space-y-[clamp(1.5rem,1rem+4vw,6rem)]">
      {blocks.map((block, i) => (
        <div key={i} className="grid-12 gap-y-[clamp(1.5rem,1rem+3vw,4rem)]">
          {block.kind === "full" && <FullBlock image={block.image} group={group} />}
          {block.kind === "pair" && <PairBlock {...block} group={group} />}
          {block.kind === "offset" && <OffsetBlock {...block} group={group} />}
          {block.kind === "chapter" && <ChapterBlock {...block} />}
        </div>
      ))}
    </div>
  );
}
