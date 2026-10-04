import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Philosophy } from "@/components/home/Philosophy";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Photo } from "@/components/media/Photo";
import { Lines } from "@/components/motion/Lines";
import { StudioProof } from "@/components/trust/StudioProof";
import { studio } from "@/content/studio";

export const metadata: Metadata = pageMeta({ title: "About", description: studio.statement, path: "/about/", image: "furniture-console" });

export default function AboutPage() {
  return (
    <>
      <header className="pt-[var(--header-h)]">
        <div className="wrap grid-12 gap-y-6 pt-[clamp(2rem,1.5rem+3vw,5rem)] pb-[var(--section-sm)]">
          <p className="enter-rise label col-span-12 text-muted">About</p>
          <h1 className="serif col-span-12 text-display text-ink md:col-span-10">
            <Lines lines={["Designed from", "the inside *out*."]} delay={120} />
          </h1>
        </div>
        <div className="wrap">
          <Photo
            id="furniture-console"
            priority
            reveal={false}
            ratio="16 / 9"
            position="50% 60%"
            sizes="(min-width: 96rem) 92rem, 100vw"
            imgClassName="page-hero-photo"
          />
        </div>
      </header>

      <section aria-label="Approach" className="section">
        <div className="wrap grid-12 gap-y-10">
          <p data-reveal="lines" className="serif col-span-12 text-lead text-ink md:col-span-8 md:col-start-2">
            {studio.statement}
          </p>
          <p data-reveal="up" className="col-span-12 text-body text-ink-soft md:col-span-5 md:col-start-6">
            {studio.intro}
          </p>
        </div>
      </section>

      <Services index="01" />
      <Process index="02" />
      <Philosophy index="03" />
      <StudioProof />
      <ClosingCta />
    </>
  );
}
