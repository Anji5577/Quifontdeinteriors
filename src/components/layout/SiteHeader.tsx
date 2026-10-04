"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Wordmark } from "@/components/brand/Logo";
import { Photo } from "@/components/media/Photo";
import type { ImageId } from "@/content/images";
import { publishedPosts } from "@/content/journal";
import { site } from "@/content/site";
import { channels } from "@/lib/contact";
import { enterDelay } from "@/lib/motion";
import { smoothScroll } from "@/lib/smooth-scroll";

type MenuItem = { label: string; href: string; image: ImageId };

const menuItems: readonly MenuItem[] = [
  { label: "Home", href: "/", image: "furniture-media-wall" },
  { label: "Work", href: "/work/", image: "disha-oak-window-seat" },
  { label: "Services", href: "/services/", image: "disha-kitchen" },
  { label: "Process", href: "/process/", image: "furniture-liftup-flap" },
  { label: "Materials", href: "/materials/", image: "furniture-walnut-grain" },
  ...(publishedPosts().length ? [{ label: "Journal", href: "/journal/", image: "wardrobe-sliding" as ImageId }] : []),
  { label: "About", href: "/about/", image: "furniture-console" },
  { label: "Contact", href: "/contact/", image: "disha-window-seat-detail" },
];

/** Hide the header after this much downward travel; any upward scroll brings it back. */
const HIDE_AFTER = 320;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [preview, setPreview] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Solid background once the top of the page scrolls away (no scroll listener needed).
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Step aside while reading downwards; return on any upward scroll.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > HIDE_AFTER && y > last);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close the menu whenever the route changes, and show the header on arrival.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setHidden(false);
  }

  // The menu is a modal <dialog>: focus is trapped and Escape closes it natively.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      smoothScroll.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const onDialogClose = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
    smoothScroll.start();
  };

  const openMenu = () => {
    setEverOpened(true);
    setOpen(true);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;
  // Over the homepage's full-screen photograph the header reads in light type.
  const onPhoto = pathname === "/" && !solid;

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-16 w-px" />
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[60] -translate-y-20 bg-ink px-4 py-3 text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,translate] duration-[500ms] ease-soft ${
          solid ? "border-b border-line/70 bg-paper/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        } ${onPhoto ? "text-paper" : "text-ink"} ${hidden && !open ? "-translate-y-full" : ""}`}
        onFocusCapture={() => setHidden(false)}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="enter-logo" aria-label={`${site.name}, home`}>
            <Wordmark compact />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {site.nav.map((item, i) => (
                <li key={item.href} className="enter-rise" style={enterDelay(200 + i * 80, "8px")}>
                  <Link
                    href={item.href}
                    className="group label link-line"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className="roll" data-text={item.label}>
                      <span>{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="enter-rise" style={enterDelay(200 + site.nav.length * 80, "8px")}>
                <Link
                  href={site.cta.href}
                  className={`group label inline-flex items-center gap-3 border px-5 py-2.5 transition-[color,background-color,border-color,scale] duration-[350ms] ease-soft active:scale-[0.98] ${
                    onPhoto
                      ? "border-paper/50 hover:border-paper hover:bg-paper hover:text-ink"
                      : "border-ink/30 hover:border-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  <span className="roll" data-text={site.cta.label}>
                    <span>{site.cta.label}</span>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="label -mr-3 px-3 py-3 lg:hidden"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={openMenu}
          >
            Menu
          </button>
        </div>
      </header>

      <dialog ref={dialogRef} className="menu" aria-label="Site menu" onClose={onDialogClose} data-lenis-prevent>
        <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
          <Link href="/" className="text-ink" aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>
            <Wordmark compact />
          </Link>
          <button type="button" className="label -mr-3 px-3 py-3 text-ink" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>

        <div className="wrap grid-12 flex-1 content-between gap-y-10 pt-6 pb-8 md:pt-10">
          <nav aria-label="Menu" tabIndex={-1} autoFocus className="col-span-12 outline-none md:col-span-7">
            <ul>
              {menuItems.map((item, i) => (
                <li key={item.href} className="line-mask">
                  <Link
                    href={item.href}
                    className="menu-link group serif flex items-baseline gap-5 py-1 text-[clamp(2.25rem,1.6rem+3vw,4rem)] leading-[1.08] text-ink"
                    style={{ "--i": i } as CSSProperties}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    onPointerEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                  >
                    <span className="label w-6 text-muted not-italic">{String(i + 1).padStart(2, "0")}</span>
                    <span className="shift transition-[translate] duration-[500ms] ease-reveal group-hover:translate-x-2">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Image preview per link (tablet and up), loaded only after the menu is first opened. */}
          <div aria-hidden="true" className="relative col-span-4 col-start-9 hidden self-start md:block">
            {everOpened &&
              menuItems.map((item, i) => (
                <div
                  key={item.href}
                  className={`transition-opacity duration-[600ms] ease-soft ${i === 0 ? "relative" : "absolute inset-0"} ${
                    preview === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Photo id={item.image} alt="" ratio="4 / 5" reveal={false} sizes="30vw" />
                </div>
              ))}
          </div>

          <div className="menu-meta col-span-12 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {channels
                .filter((c) => c.href)
                .map((c) => (
                  <li key={c.kind}>
                    <a href={c.href!} className="label link-line text-ink-soft">
                      {c.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
