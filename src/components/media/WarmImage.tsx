"use client";

import { useEffect, useRef } from "react";

type WarmImageProps = {
  srcSet: string;
  sizes: string;
};

/**
 * Decodes an image the visitor is about to see (e.g. a project hero) as soon
 * as they hover or focus the parent link, so a shared-element morph lands on
 * a ready photograph instead of its placeholder colour. Renders nothing visible.
 */
export function WarmImage({ srcSet, sizes }: WarmImageProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const warm = () => {
      const img = new Image();
      img.sizes = sizes;
      img.srcset = srcSet;
      img.decode().catch(() => {});
    };
    host.addEventListener("pointerenter", warm, { once: true });
    host.addEventListener("focusin", warm, { once: true });
    return () => {
      host.removeEventListener("pointerenter", warm);
      host.removeEventListener("focusin", warm);
    };
  }, [srcSet, sizes]);

  return <span ref={ref} hidden />;
}
