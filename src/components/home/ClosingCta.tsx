import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContactList } from "@/components/ui/ContactList";

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="section">
      <div className="wrap grid-12 gap-y-12">
        <h2 id="cta-title" data-reveal="lines" className="serif col-span-12 text-display text-ink lg:col-span-9">
          Have a space in <em>mind</em>?
        </h2>
        <div data-reveal="group" className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-9">
          <ContactList />
          <div className="mt-10">
            <ArrowLink href="/contact/" variant="outline">
              Start a conversation
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
