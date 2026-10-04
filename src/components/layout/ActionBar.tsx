"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { channels } from "@/lib/contact";

/**
 * Phones only: a slim bar with the quickest ways to get in touch. It appears
 * once the hero has scrolled away, steps aside at the footer, and isn't shown
 * on the contact page. WhatsApp and Call appear only once configured.
 */
export function ActionBar() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(([entry]) => setAtFooter(!!entry?.isIntersecting));
    if (footer) io.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;
  const shown = past && !atFooter;
  const quick = channels.filter((c) => c.href && c.kind !== "email");

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-paper/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-[translate] duration-[500ms] ease-soft md:hidden ${
        shown ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!shown}
      inert={!shown}
    >
      <ul className="flex divide-x divide-line">
        <li className="flex-1">
          <Link href={site.cta.href} className="label flex h-14 items-center justify-center gap-2 bg-ink text-paper">
            {site.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </li>
        {quick.map((c) => (
          <li key={c.kind}>
            <a href={c.href!} className="label flex h-14 items-center px-6 text-ink">
              {c.kind === "phone" ? "Call" : c.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
