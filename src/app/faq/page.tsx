import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { answeredFaqGroups } from "@/content/studio";

export const metadata: Metadata = pageMeta({ title: "FAQ", description: "How projects start, what to prepare, and how design decisions are made.", path: "/faq/", image: "disha-sage-bedroom" });

export default function FaqPage() {
  const groups = answeredFaqGroups();

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={["Questions,", "*answered*"]}
      />

      <div className="wrap space-y-[var(--section-sm)] pb-[var(--section-sm)]">
        {groups.map((group, i) => (
          <section key={group.title} aria-labelledby={`faq-group-${i}`} className="grid-12 gap-y-6 border-t border-line pt-8">
            <h2 id={`faq-group-${i}`} className="label col-span-12 text-muted md:col-span-3">
              {String(i + 1).padStart(2, "0")} — {group.title}
            </h2>
            <Faq items={group.items} className="col-span-12 md:col-span-8 md:col-start-5" />
          </section>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: groups.flatMap((g) =>
            g.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          ),
        }}
      />

      <ClosingCta />
    </>
  );
}
