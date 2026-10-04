import { ClosingCta } from "@/components/home/ClosingCta";
import { ExpandingFrame } from "@/components/home/ExpandingFrame";
import { ExploreBySpace } from "@/components/home/ExploreBySpace";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Portfolio } from "@/components/home/Portfolio";
import { Process } from "@/components/home/Process";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { SignatureDetails } from "@/components/home/SignatureDetails";
import { StudioIntro } from "@/components/home/StudioIntro";
import { WardrobeShowcase } from "@/components/home/WardrobeShowcase";
import { Testimonial } from "@/components/trust/Testimonial";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <ExploreBySpace />
      <SelectedWork />
      <FeaturedStory />
      <Testimonial />
      <ExpandingFrame image="wardrobe-oak-niche" line="Built in. Lived in." position="50% 45%" />
      <SignatureDetails />
      <Services index="06" />
      <Process index="07" />
      <WardrobeShowcase />
      <Portfolio />
      <Philosophy index="10" />
      <ClosingCta />
    </>
  );
}
