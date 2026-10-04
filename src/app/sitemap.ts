import type { MetadataRoute } from "next";
import { publishedPosts } from "@/content/journal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { services } from "@/content/studio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = publishedPosts();
  const paths = [
    "/",
    "/work/",
    ...projects.map((p) => `/work/${p.slug}/`),
    "/work/rooms/",
    "/services/",
    ...services.map((s) => `/services/${s.slug}/`),
    "/process/",
    "/materials/",
    "/about/",
    "/faq/",
    "/contact/",
    ...(posts.length ? ["/journal/", ...posts.map((p) => `/journal/${p.slug}/`)] : []),
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
