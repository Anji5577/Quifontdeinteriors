"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/brand/Logo";
import { Faq } from "@/components/ui/Faq";
import { site } from "@/content/site";
import { answeredFaqGroups } from "@/content/studio";
import { channels } from "@/lib/contact";
import { smoothScroll } from "@/lib/smooth-scroll";

const shortcuts = [
  { label: "Start a project", href: site.cta.href },
  { label: "Browse every room", href: "/work/rooms/" },
  { label: "How we work", href: "/process/" },
  { label: "Materials & finishes", href: "/materials/" },
];

/**
 * "Ask QIS": a side panel with quick routes and the studio's own answers to
 * common questions. Deliberately not a chatbot — every answer here is one the
 * studio has written. Tablet and desktop; phones use the action bar.
 */
export function Concierge() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  // Appears once the opening view has scrolled away, so it never sits on the hero.
  const [shown, setShown] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // …and steps aside at the footer, where it would cover the closing links.
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(([entry]) => setAtFooter(!!entry?.isIntersecting), { rootMargin: "0px 0px -35% 0px" });
    if (footer) io.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);
  const visible = shown && !atFooter;

  const open = () => {
    dialog.current?.showModal();
    smoothScroll.stop();
  };

  const questions = answeredFaqGroups().flatMap((g) => g.items).slice(0, 6);
  const direct = channels.filter((c) => c.href);

  if (pathname.startsWith("/contact")) return null;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={`group fixed right-5 bottom-5 z-40 hidden items-center gap-3 rounded-full border border-line bg-paper/90 py-2 pr-5 pl-2 text-ink shadow-[0_8px_30px_-12px_rgba(30,27,23,0.35)] backdrop-blur-md transition-[translate,opacity,border-color] duration-[500ms] ease-soft hover:border-ink md:inline-flex ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper">
          <Mark className="h-2 w-auto" />
        </span>
        <span className="label">Ask {site.monogram}</span>
      </button>

      <dialog
        ref={dialog}
        className="concierge"
        aria-labelledby="concierge-title"
        onClose={() => smoothScroll.start()}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        data-lenis-prevent
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-7 py-5">
            <p className="label flex items-center gap-3 text-muted">
              <Mark className="h-2.5 w-auto text-ink" /> {site.name}
            </p>
            <form method="dialog">
              <button className="label -mr-2 px-2 py-2 text-ink">Close</button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto px-7 py-8">
            <h2 id="concierge-title" className="serif text-h2 text-ink">
              Questions? Start here.
            </h2>
            <p className="mt-3 text-small text-muted">Answers written by the studio, and the quickest routes through the site.</p>

            <ul className="mt-8 grid grid-cols-2 gap-2">
              {shortcuts.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={() => dialog.current?.close()}
                    className="label flex h-full items-end border border-line p-4 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {s.label} →
                  </Link>
                </li>
              ))}
            </ul>

            {questions.length > 0 && (
              <>
                <p className="label mt-10 text-muted">Common questions</p>
                <Faq items={questions} className="mt-3" />
                <Link href="/faq/" onClick={() => dialog.current?.close()} className="label link-line mt-6 inline-block text-ink">
                  All questions →
                </Link>
              </>
            )}
          </div>

          {direct.length > 0 && (
            <div className="flex gap-2 border-t border-line px-7 py-5">
              {direct.map((c) => (
                <a key={c.kind} href={c.href!} className="label flex-1 border border-ink/30 py-3 text-center text-ink hover:border-ink">
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
