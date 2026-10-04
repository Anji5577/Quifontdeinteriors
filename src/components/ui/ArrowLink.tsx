import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  /** "line" — understated text link; "outline" — bordered button. */
  variant?: "line" | "outline";
  tone?: "ink" | "light";
  className?: string;
};

export function ArrowLink({
  href,
  children,
  variant = "line",
  tone = "ink",
  className = "",
}: ArrowLinkProps) {
  const toneClass =
    tone === "light"
      ? "text-umber-text border-umber-text/40 hover:border-umber-text hover:bg-umber-text hover:text-umber"
      : "text-ink border-ink/30 hover:border-ink hover:bg-ink hover:text-paper";

  const base =
    variant === "outline"
      ? `inline-flex items-center gap-3 border px-6 py-3.5 transition-[color,background-color,border-color,scale] duration-[350ms] ease-soft active:scale-[0.98] ${toneClass}`
      : `inline-flex items-center gap-3 ${tone === "light" ? "text-umber-text" : "text-ink"}`;

  return (
    <Link href={href} className={`group label ${base} ${className}`}>
      <span className={variant === "line" ? "link-line" : undefined}>
        <span className="roll" data-text={typeof children === "string" ? children : undefined}>
          <span>{children}</span>
        </span>
      </span>
      <span aria-hidden="true" className="arrow group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
