"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  /** cover fills the box and crops; contain shows the whole frame. */
  fit?: "cover" | "contain";
  /** Screen-blend the video so its black background vanishes into the page. */
  blend?: boolean;
  /** Graphite gradient over the footage, for legibility under text. */
  overlay?: boolean;
  /** Opacity of the footage itself, 0–100. */
  opacity?: number;
  /** Playback speed multiplier; 1 is normal. */
  rate?: number;
};

/**
 * Looping background video. Muted, inline, no controls. With reduced motion
 * it shows the first frame and never plays.
 */
export default function ChapterVideo({
  src,
  alt,
  fit = "cover",
  blend = false,
  overlay = true,
  opacity = 80,
  rate = 1,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = rate;
    if (reduced) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, [reduced, rate]);

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
        style={{ opacity: opacity / 100 }}
        className={`h-full w-full ${fit === "cover" ? "object-cover grayscale-[25%]" : "object-contain"} ${
          blend ? "mix-blend-screen" : ""
        }`}
      />
      {overlay && (
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,21,22,0.25)_0%,rgba(20,21,22,0.45)_55%,var(--bg)_100%)]" />
      )}
    </motion.div>
  );
}
