import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during prerender and hydration, true once running in the browser. */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
