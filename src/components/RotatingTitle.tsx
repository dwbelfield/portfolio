"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";

/**
 * Cycles through a list of titles. All titles are stacked in one grid cell so
 * the line never changes width or height; the active one fades and rises in.
 */
export default function RotatingTitle({
  titles,
  interval = 2600,
  className,
}: {
  titles: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setI((k) => (k + 1) % titles.length), interval);
    return () => clearInterval(id);
  }, [titles.length, interval]);

  return (
    <span className={`grid ${className ?? ""}`}>
      <span className="sr-only">{titles.join(", ")}</span>
      {titles.map((t, k) => {
        const on = k === i;
        return (
          <motion.span
            key={t}
            aria-hidden="true"
            className="[grid-area:1/1] whitespace-nowrap"
            initial={false}
            animate={reduced ? { opacity: on ? 1 : 0 } : { opacity: on ? 1 : 0, y: on ? 0 : 10 }}
            transition={{ duration: 0.45, ease: ease.out }}
          >
            {t}
          </motion.span>
        );
      })}
    </span>
  );
}
