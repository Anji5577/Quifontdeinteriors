import { pageMeta } from "@/lib/metadata";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/media/Photo";
import { ContactList } from "@/components/ui/ContactList";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({ title: "Contact", description: "Start a conversation about your home, a room, or a single piece.", path: "/contact/", image: "disha-window-seat-detail" });

const nextSteps = [
  "Answer a few short questions about the home and what it needs.",
  "Send the brief on WhatsApp or by email — it’s written for you.",
  "We read it and get back to you to talk it through.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={["Let’s talk about", "your *space*"]}
        intro="A few details are enough to start: the home, the rooms, and roughly when. Or reach us directly."
      >
        <div className="enter-rise col-span-12 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
          <ContactList />
          {site.address && (
            <address className="mt-6 text-small text-ink-soft not-italic">
              {site.address.street}, {site.address.locality}
              <br />
              {site.address.city} {site.address.postalCode}
            </address>
          )}
          {site.hours && <p className="label mt-4 text-muted">{site.hours}</p>}
        </div>
      </PageHeader>

      <section id="enquire" aria-labelledby="enquire-title" className="scroll-mt-[var(--header-h)] border-t border-line">
        <div className="wrap grid-12 gap-y-14 py-[var(--section-sm)]">
          <div className="col-span-12 lg:col-span-7">
            <h2 id="enquire-title" className="label text-muted">
              Start a project
            </h2>
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>

          <aside aria-label="How it works" className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Photo id="disha-window-seat-detail" ratio="4 / 3" sizes="(min-width: 64rem) 30vw, 100vw" />
              <p className="label mt-8 text-muted">How it works</p>
              <ol className="mt-4 border-t border-line">
                {nextSteps.map((s, i) => (
                  <li key={s} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-4 text-small text-ink-soft">
                    <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-small text-muted">
                Your answers stay in your browser until you choose to send them — this site doesn’t collect them.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
