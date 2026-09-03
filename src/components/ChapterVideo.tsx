"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";

/**
 * Full-bleed looping background video for a chapter header.
 * Muted, inline, no controls. With reduced motion it shows the first frame
 * and never plays. A graphite gradient keeps the headline legible and blends
 * the footage into the page.
 */
export default function ChapterVideo({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      return;
    }
    // Autoplay can be refused by the browser; ignore the rejection.
    v.play().catch(() => {});
  }, [reduced]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: ease.out }}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={!reduced}
        title={alt}
        className="h-full w-full object-cover opacity-80 grayscale-[25%]"
      />
      {/* Darken and fade into the page background. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,21,22,0.25)_0%,rgba(20,21,22,0.45)_55%,var(--bg)_100%)]" />
    </motion.div>
  );
}
