import type { ReactNode } from "react";
import { getImage, type ImageId } from "@/content/images";

type LightboxButtonProps = {
  /** Images sharing a group are browsable together in the viewer. */
  group: string;
  id: ImageId;
  children: ReactNode;
  className?: string;
};

/** Makes a thumbnail open the shared <Lightbox> on this image. */
export function LightboxButton({ group, id, children, className = "" }: LightboxButtonProps) {
  return (
    <button
      type="button"
      data-lightbox={group}
      data-image-id={id}
      data-cursor="Open"
      aria-label={`Enlarge image: ${getImage(id).alt}`}
      className={`group block w-full cursor-zoom-in text-left ${className}`}
    >
      {children}
    </button>
  );
}
