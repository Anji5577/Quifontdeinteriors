import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/media/Photo";
import { posts, publishedPosts } from "@/content/journal";

const live = publishedPosts().length > 0;

// Until a post is published this page only lists drafts for the studio to review.
export const metadata: Metadata = pageMeta({
  title: "Journal",
  description: "Practical guides to planning homes, kitchens and storage.",
  path: "/journal/",
  image: "wardrobe-sliding",
  noindex: !live,
});

export default function JournalPage() {
  const list = live ? publishedPosts() : posts;

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title={["Notes on", "making homes"]}
        intro="Short, practical guides to the decisions that shape a home — written for anyone planning one."
      />
      <div className="wrap pb-[var(--section)]">
        {!live && (
          <p className="label mb-10 border border-dashed border-ink/30 px-5 py-4 text-ink-soft">
            Drafts for review — not yet public. Set <code>published: true</code> in src/content/journal.ts to publish.
          </p>
        )}
        <ul className="grid gap-x-[var(--col-gap)] gap-y-16 border-t border-line pt-12 md:grid-cols-3">
          {list.map((post) => (
            <li key={post.slug}>
              <Link href={`/journal/${post.slug}/`} data-cursor="Read" className="group block">
                <Photo id={post.cover} alt="" ratio="4 / 5" sizes="(min-width: 48rem) 31vw, 100vw" vtName={`journal-${post.slug}`} />
                <p className="label mt-5 text-muted">
                  {post.readingMinutes} min read{!post.published && " · Draft"}
                </p>
                <h2 className="serif mt-3 text-h3 text-ink">
                  <span className="link-line">{post.title}</span>
                </h2>
                <p className="mt-3 text-small text-ink-soft">{post.dek}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
