"use client";

import { useSyncExternalStore } from "react";

/**
 * Reactive media query. Returns false during server rendering and the first
 * client render so markup matches on hydration, then the real value.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
