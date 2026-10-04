import type { Metadata } from "next";
import type { ImageId } from "@/content/images";
import { site } from "@/content/site";

type PageMetaInput = {
  title?: string;
  description: string;
  /** Canonical path with trailing slash, e.g. "/work/". */
  path: string;
  /** Photograph used for the social preview (public/og/<id>.jpg). */
  image: ImageId;
  type?: "website" | "article";
  noindex?: boolean;
};

/**
 * Complete metadata for a page. Next.js replaces (rather than merges) nested
 * objects such as openGraph, so every page builds the full set here.
 */
export function pageMeta({ title, description, path, image, type = "website", noindex = false }: PageMetaInput): Metadata {
  const images = [{ url: `/og/${image}.jpg`, width: 1200, height: 630 }];
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      title: title ? `${title} | ${site.name}` : site.name,
      description,
      url: path,
      images,
    },
    twitter: { card: "summary_large_image", images: images.map((i) => i.url) },
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
