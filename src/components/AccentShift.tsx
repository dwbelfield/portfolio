"use client";

import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";

/**
 * Wraps a page and animates its `--accent` variable from the site amber to a
 * brand colour, so every accent inside (rules, indices, units, underlines)
 * shifts together. Timed to match the Logo transition.
 */
export default function AccentShift({
  to,
  delay = 1.2,
  duration = 1.2,
  children,
}: {
  to: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ "--accent": "#e3a008" } as never}
      animate={{ "--accent": to } as never}
      transition={reduced ? { duration: 0 } : { duration, delay, ease: ease.inOut }}
    >
      {children}
    </motion.div>
  );
}
