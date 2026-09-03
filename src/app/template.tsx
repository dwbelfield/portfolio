"use client";

import { motion } from "motion/react";
import { useReducedMotion, ease, dur } from "@/lib/motion";

/** Page-enter transition. Remounts on every navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur.base, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
