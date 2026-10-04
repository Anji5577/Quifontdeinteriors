import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { LightboxButton } from "@/components/media/LightboxButton";
import { Photo } from "@/components/media/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, posts } from "@/content/journal";
import { site } from "@/content/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.dek,
    path: `/journal/${post.slug}/`,
    image: post.cover,
    type: "article",
    noindex: !post.published,
  });
}

export default async function JournalPostPage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== post.slug && p.published === post.published).slice(0, 2);

  return (
    <article>
      {!post.published && (
        <p className="label fixed bottom-4 left-1/2 z-40 -translate-x-1/2 bg-ink px-4 py-2 text-paper">Draft for review</p>
      )}
      <PageHeader crumbs={[{ label: "Journal", href: "/journal/" }]} eyebrow={`${post.readingMinutes} min read`} title={[post.title]} intro={post.dek} />

      <div className="wrap">
        <Photo
          id={post.cover}
          priority
          reveal={false}
          ratio="16 / 9"
          sizes="(min-width: 96rem) 92rem, 100vw"
          imgClassName="page-hero-photo"
          vtName={`journal-${post.slug}`}
        />
      </div>

      <div className="wrap grid-12 py-[var(--section-sm)]">
        <div className="prose-journal col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
          {post.body.map((block, i) => {
            if (block.kind === "p") return <p key={i}>{block.text}</p>;
            if (block.kind === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.kind === "list")
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            return (
              <figure key={i} className="my-12 md:-mx-[12%]">
                <LightboxButton group={`journal-${post.slug}`} id={block.image}>
                  <Photo id={block.image} sizes="(min-width: 64rem) 55vw, 100vw" />
                </LightboxButton>
                {block.caption && <figcaption className="label mt-3 text-muted">{block.caption}</figcaption>}
              </figure>
            );
          })}
        </div>
      </div>

      {others.length > 0 && (
        <aside aria-label="More from the journal" className="wrap border-t border-line py-[var(--section-sm)]">
          <p className="label text-muted">More from the journal</p>
          <ul className="mt-8 grid gap-x-[var(--col-gap)] gap-y-8 md:grid-cols-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/journal/${p.slug}/`} className="serif text-h3 text-ink">
                  <span className="link-line">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {post.published && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.dek,
            image: new URL(`/img/${post.cover}-1265.webp`, site.url).toString(),
            ...(post.date && { datePublished: post.date }),
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
          }}
        />
      )}

      <ClosingCta />
    </article>
  );
}
