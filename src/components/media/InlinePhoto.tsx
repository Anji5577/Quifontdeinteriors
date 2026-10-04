import { getImage, type ImageId } from "@/content/images";
import { imageSrcSet } from "@/lib/images";

/**
 * A small rounded photograph that sits inside a line of text, at the height of
 * the type. Decorative (the words carry the meaning). It opens from zero width
 * when its paragraph is revealed (data-reveal="inline").
 */
export function InlinePhoto({ id, position, index = 0 }: { id: ImageId; position?: string; index?: number }) {
  const image = getImage(id);
  return (
    <span className="inline-photo" style={{ transitionDelay: `${200 + index * 160}ms`, backgroundColor: image.color }} aria-hidden="true">
      <picture>
        <source type="image/avif" srcSet={imageSrcSet(image, "avif")} sizes="12rem" />
        <img
          src={`/img/${image.id}-480.webp`}
          srcSet={imageSrcSet(image, "webp")}
          sizes="12rem"
          alt=""
          loading="lazy"
          decoding="async"
          width={image.width}
          height={image.height}
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
    </span>
  );
}
