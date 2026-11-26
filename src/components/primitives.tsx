"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  animate,
  useInView,
} from "motion/react";
import { useReducedMotion, ease, dur } from "@/lib/motion";

/* ------------------------------------------------------------------
   Reveal: fade + rise when the element scrolls into view.
   ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -64px 0px" }}
      transition={{ duration: dur.base, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Words: heading text revealed word by word from behind a mask.
   ------------------------------------------------------------------ */
export function Words({
  text,
  delay = 0,
  stagger = 0.045,
  className,
  accentWord,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  /** Index of a word to render in the accent colour. */
  accentWord?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  // Observe the (unclipped) container: the masked words themselves never
  // intersect the viewport while they sit below their overflow-hidden wrapper.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -32px 0px" });
  const shown = reduced || inView;
  return (
    <span className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <motion.span
            className={`inline-block ${i === accentWord ? "text-accent" : ""}`}
            initial={reduced ? false : { y: "110%" }}
            animate={{ y: shown ? 0 : "110%" }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: ease.out }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   Counter: number that counts up when it enters the viewport.
   The server-rendered markup carries the final value, so anything that
   reads the page without running it (crawlers, AI agents, no-JS) gets
   the real number. The browser swaps in the start value on hydration,
   before the counter is on screen, then animates as before.
   ------------------------------------------------------------------ */
const subscribeNever = () => () => {};
/** False on the server and during hydration, true once the client has taken over. */
function useHydrated(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

export function Counter({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  grouped = false,
  className,
}: {
  value: number;
  /** Where the count starts; defaults to zero. */
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Show a thousands separator. Leave off for years. */
  grouped?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -32px 0px" });
  const reduced = useReducedMotion();
  const hydrated = useHydrated();
  const [n, setN] = useState(from);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(from, value, {
      duration: 1.6,
      ease: ease.out,
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, reduced, value, from]);

  // The final value renders in the static markup, and with reduced motion.
  const shown = !hydrated || reduced ? value : n;

  return (
    <span ref={ref} className={className}>
      {prefix && <span className="text-accent">{prefix}</span>}
      {grouped
        ? shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : shown.toFixed(decimals)}
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  );
}
