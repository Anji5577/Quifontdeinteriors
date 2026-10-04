import type { CSSProperties } from "react";

/** Inline style for staggered entrance animations (`.enter-rise`), with optional rise distance. */
export const enterDelay = (ms: number, rise?: string): CSSProperties =>
  ({ "--delay": `${ms}ms`, ...(rise && { "--rise": rise }) }) as CSSProperties;
