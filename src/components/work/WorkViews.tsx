"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Photo } from "@/components/media/Photo";
import type { Project } from "@/content/projects";
import { setUrlParam, useUrlParam } from "@/lib/url-param";

type WorkViewsProps = {
  projects: readonly Project[];
  /** The editorial grid, rendered on the server. */
  grid: ReactNode;
};

/** Switches the works index between the editorial grid and a compact numbered list. */
export function WorkViews({ projects, grid }: WorkViewsProps) {
  const view = useUrlParam("view") === "list" ? "list" : "grid";
  const [preview, setPreview] = useState(0);

  return (
    <>
      <div className="flex items-center justify-between border-y border-line py-4">
        <p className="label text-muted">
          {projects.length} projects
        </p>
        <div role="group" aria-label="Layout" className="flex gap-1">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setUrlParam("view", v === "grid" ? null : v)}
              className="label rounded-full px-4 py-2 text-muted transition-colors hover:text-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {v === "grid" ? "Grid" : "List"}
            </button>
          ))}
        </div>
      </div>

      <div hidden={view !== "grid"} className="pt-[var(--section-sm)]">
        {grid}
      </div>

      <div hidden={view !== "list"} className="grid-12 gap-y-10 pt-12">
        <ol className="col-span-12 lg:col-span-7">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/work/${p.slug}/`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-7 md:grid-cols-[3.5rem_1fr_14rem_auto]"
                onPointerEnter={() => setPreview(i)}
                onFocus={() => setPreview(i)}
              >
                <span className="label text-muted">{p.index}</span>
                <span className="shift serif text-h2 text-ink transition-[translate] duration-[500ms] ease-reveal group-hover:translate-x-2">
                  {p.title}
                </span>
                <span className="label hidden text-muted md:block">{p.category}</span>
                <span aria-hidden="true" className="arrow text-ink-soft group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div aria-hidden="true" className="relative col-span-4 col-start-9 hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className={`transition-opacity duration-[600ms] ease-soft ${i === 0 ? "relative" : "absolute inset-0"} ${
                  preview === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Photo id={p.cover} alt="" ratio="4 / 5" reveal={false} sizes="30vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
