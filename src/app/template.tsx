import type { ReactNode } from "react";

// Re-mounts on every navigation, giving each page a quiet settle-in
// (fade + 20px rise) instead of a loading screen. Skipped on first load.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
