import { Photo } from "@/components/media/Photo";
import type { ImageId } from "@/content/images";

type ExpandingFrameProps = {
  image: ImageId;
  line: string;
  position?: string;
};

/**
 * A photograph that opens from an inset frame to full screen as it is
 * scrolled through (CSS scroll-driven animation). Where that isn't supported,
 * or motion is reduced, it is simply a full-bleed photograph with its line.
 */
export function ExpandingFrame({ image, line, position }: ExpandingFrameProps) {
  return (
    <section aria-label={line} className="expand-wrap relative bg-paper">
      <div className="expand-stage sticky top-0 h-[100svh] overflow-hidden">
        <div className="expand-frame absolute inset-0">
          <Photo id={image} ratio={null} reveal={false} sizes="100vw" position={position} className="h-full w-full" imgClassName="expand-img" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,14,0)_45%,rgba(20,17,14,0.55)_100%)]" />
        </div>
        <p className="expand-line serif absolute inset-x-0 bottom-[clamp(2rem,1rem+5vw,5rem)] wrap text-display text-paper">{line}</p>
      </div>
    </section>
  );
}
