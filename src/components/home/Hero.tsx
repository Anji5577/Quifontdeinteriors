"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { Photo } from "@/components/media/Photo";
import { Lines } from "@/components/motion/Lines";
import { Parallax } from "@/components/motion/Parallax";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { heroSlides } from "@/content/hero";
import { site } from "@/content/site";
import { enterDelay as delay } from "@/lib/motion";

/** How long each photograph stays before the next fades in. */
const SLIDE_MS = 6500;

/**
 * Full-screen hero: photographs cross-fade with a slow cinematic settle.
 * Only the first loads with the page (it is the LCP image); the rest mount
 * once the browser is idle. Auto-advance pauses when the tab is hidden, can be
 * paused by the visitor, and never runs for reduced-motion users.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    mq.addEventListener("change", sync);
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const handle = idle(() => {
      sync();
      setMounted(heroSlides.length);
    });
    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
      (window.cancelIdleCallback ?? clearTimeout)(handle as number);
    };
  }, []);

  const running = !paused && !hidden && !reduced && mounted > 1;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, running]);

  const slide = heroSlides[index]!;

  return (
    <section aria-labelledby="hero-title" className="relative h-[100svh] min-h-[36rem] overflow-hidden bg-umber text-paper">
      {/* Photographs (oversized for the scroll drift) */}
      <div className="hero-aperture absolute inset-0" aria-hidden="true">
        <Parallax max={60} className="scroll-drift absolute inset-x-0 -top-16 bottom-0">
          {heroSlides.slice(0, mounted).map((s, i) => (
            <div
              key={s.image}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-soft ${i === index ? "z-[1] opacity-100" : "z-0 opacity-0"}`}
            >
              <Photo
                id={s.image}
                alt=""
                ratio={null}
                priority={i === 0}
                reveal={false}
                sizes="100vw"
                className={`h-full w-full ${s.mobileImage ? "hidden md:block" : ""}`}
                imgClassName={`hero-slide object-[var(--pos-m)] md:object-[var(--pos-d)] ${i === index ? "is-active" : ""}`}
                style={{ "--pos-m": s.mobile, "--pos-d": s.desktop } as CSSProperties}
              />
              {s.mobileImage && (
                <Photo
                  id={s.mobileImage}
                  alt=""
                  ratio={null}
                  reveal={false}
                  sizes="100vw"
                  className="h-full w-full md:hidden"
                  position={s.mobile}
                  imgClassName={`hero-slide ${i === index ? "is-active" : ""}`}
                />
              )}
            </div>
          ))}
        </Parallax>
        {/* Shade for legible type: soft at the top for the header, deeper at the foot */}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(20,17,14,0.5)_0%,rgba(20,17,14,0)_24%,rgba(20,17,14,0.05)_42%,rgba(20,17,14,0.78)_100%)]" />
        <div className="absolute inset-0 z-[2] hidden bg-[linear-gradient(90deg,rgba(20,17,14,0.5)_0%,rgba(20,17,14,0)_60%)] md:block" />
      </div>

      <div className="wrap relative z-[3] flex h-full flex-col justify-end pt-[var(--header-h)] pb-[clamp(1.5rem,1rem+3vw,3.5rem)]">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <h1 id="hero-title" className="serif text-display text-paper [--line-from:45%]">
              <Lines lines={["Spaces designed", "around the way", "you *live*."]} />
            </h1>
            <div className="enter-rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" style={delay(520)}>
              <ArrowLink href={site.cta.href} variant="outline" tone="light">
                {site.cta.label}
              </ArrowLink>
              <ArrowLink href="/work/" tone="light">
                View selected work
              </ArrowLink>
            </div>
          </div>

          <div className="enter-rise col-span-12 lg:col-span-4 lg:col-start-9" style={delay(650)}>
            <Link href={slide.href} className="group label flex items-center justify-between gap-4 text-paper/85 hover:text-paper">
              <span key={slide.image} className="hero-caption truncate">
                {slide.caption}
              </span>
              <span aria-hidden="true" className="arrow group-hover:translate-x-1">
                →
              </span>
            </Link>
            <div className="mt-4 flex items-center gap-4">
              <span className="label tabular-nums text-paper/85">
                {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
              </span>
              <ol className="flex flex-1 gap-1.5" aria-label="Choose photograph">
                {heroSlides.map((s, i) => (
                  <li key={s.image} className="flex-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMounted(heroSlides.length);
                        setIndex(i);
                      }}
                      aria-label={`Show photograph ${i + 1}: ${s.caption}`}
                      aria-current={i === index ? "true" : undefined}
                      className="block w-full py-3"
                    >
                      <span className="block h-px overflow-hidden bg-paper/30">
                        <span
                          key={i === index ? `on-${index}-${running}` : "off"}
                          className={`block h-px origin-left bg-paper ${i < index ? "scale-x-100" : "scale-x-0"} ${
                            i === index ? (running ? "hero-progress" : "scale-x-100") : ""
                          }`}
                          style={{ "--slide": `${SLIDE_MS}ms` } as CSSProperties}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                className="label text-paper/85 hover:text-paper"
              >
                {paused ? "Play" : "Pause"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
