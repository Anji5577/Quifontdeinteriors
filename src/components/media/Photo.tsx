import { ViewTransition, type CSSProperties } from "react";
import { preload } from "react-dom";
import { getImage, type ImageId } from "@/content/images";
import { imageSrcSet as srcSet } from "@/lib/images";

type PhotoProps = {
  id: ImageId;
  /** Responsive `sizes` attribute — describe the rendered width at each breakpoint. */
  sizes: string;
  /**
   * CSS aspect-ratio for the frame, e.g. "4 / 5". Defaults to the photograph's
   * own ratio; pass `null` when the frame is sized by `className` instead.
   */
  ratio?: string | null;
  /** Above-the-fold image: loads eagerly with high fetch priority. */
  priority?: boolean;
  /** Reveal the photograph as it enters the viewport. */
  reveal?: boolean;
  /** object-position for cropped frames, e.g. "50% 40%". */
  position?: string;
  /** Extra class for the frame (sizing, grid placement). */
  className?: string;
  /** Extra class for the <img>, e.g. an entrance animation. */
  imgClassName?: string;
  /** Override alt text (use "" for a purely decorative repeat). */
  alt?: string;
  /**
   * Shared-element name: a photo with the same name on the next page morphs
   * into place during navigation (e.g. a project cover into its hero).
   * Names must be unique within a page.
   */
  vtName?: string;
  /** The photograph drifts gently inside its frame as it crosses the viewport. */
  parallax?: boolean;
  /** Extra inline style for the frame (e.g. CSS variables used by imgClassName). */
  style?: CSSProperties;
};

/**
 * A framed photograph. Layers, outermost first:
 *   frame      — aspect ratio, overflow; observed for the reveal
 *   settle     — placeholder colour; clip-path wipe and scale during reveal
 *   picture    — AVIF/WebP sources
 *   img        — hover zoom (inside a `.group`), inner parallax drift
 * Optionally wrapped in a <ViewTransition> for shared-element morphs.
 */
export function Photo({
  id,
  sizes,
  ratio,
  priority = false,
  reveal = true,
  position,
  className = "",
  imgClassName = "",
  alt,
  vtName,
  parallax = false,
  style,
}: PhotoProps) {
  const image = getImage(id);
  const largest = image.widths[image.widths.length - 1];

  // Hoist the above-the-fold photograph into <head> so it is requested
  // alongside (not after) the stylesheet and fonts.
  if (priority) {
    preload(`/img/${image.id}-${largest}.avif`, {
      as: "image",
      type: "image/avif",
      imageSrcSet: srcSet(image, "avif"),
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }
  const frameStyle: CSSProperties = {
    ...style,
    aspectRatio: ratio === null ? undefined : (ratio ?? `${image.width} / ${image.height}`),
  };

  const frame = (
    <div
      className={`relative overflow-hidden ${className}`}
      style={frameStyle}
      data-reveal={reveal && !priority ? "image" : undefined}
      data-parallax={parallax ? "" : undefined}
    >
      <div className="photo-settle absolute inset-0" style={{ backgroundColor: image.color }}>
        <picture>
          <source type="image/avif" srcSet={srcSet(image, "avif")} sizes={sizes} />
          <source type="image/webp" srcSet={srcSet(image, "webp")} sizes={sizes} />
          <img
            src={`/img/${image.id}-${largest}.webp`}
            width={image.width}
            height={image.height}
            alt={alt ?? image.alt}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
            className={`photo-zoom absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-soft group-hover:scale-[1.02] ${imgClassName}`}
            style={position ? { objectPosition: position } : undefined}
          />
        </picture>
      </div>
    </div>
  );

  return vtName ? (
    <ViewTransition name={vtName} share="morph" default="none">
      {frame}
    </ViewTransition>
  ) : (
    frame
  );
}
