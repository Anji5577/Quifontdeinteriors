"use client";

import dynamic from "next/dynamic";

// Interface pieces that are never needed for first paint load as separate,
// client-only chunks, keeping them out of the initial JavaScript.
const Lightbox = dynamic(() => import("@/components/media/Lightbox").then((m) => m.Lightbox), { ssr: false });
const CursorLabel = dynamic(() => import("@/components/motion/CursorLabel").then((m) => m.CursorLabel), { ssr: false });
const Concierge = dynamic(() => import("@/components/layout/Concierge").then((m) => m.Concierge), { ssr: false });
const ActionBar = dynamic(() => import("@/components/layout/ActionBar").then((m) => m.ActionBar), { ssr: false });

export function DeferredUI() {
  return (
    <>
      <ActionBar />
      <Concierge />
      <CursorLabel />
      <Lightbox />
    </>
  );
}
