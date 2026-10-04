import type Lenis from "lenis";

/**
 * Shared handle to the Lenis instance (desktop only; null on touch devices,
 * under reduced motion, and before it has loaded). Overlays stop and restart
 * it so the page beneath doesn't scroll.
 */
let instance: Lenis | null = null;

export const smoothScroll = {
  set(lenis: Lenis | null) {
    instance = lenis;
  },
  get() {
    return instance;
  },
  stop() {
    instance?.stop();
  },
  start() {
    instance?.start();
  },
};
