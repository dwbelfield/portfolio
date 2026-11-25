"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";
import { useMediaQuery } from "@/lib/media";

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
  /** A still of the footage (path under /public): shown on phones, and while the video loads. */
  poster?: string;
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
  poster,
}: Props) {
  const reduced = useReducedMotion();
  // Phones get no video: it costs data and battery for a band of blurred
  // pixels behind a title, and the layout is tighter without it.
  const wide = useMediaQuery("(min-width: 768px)");
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

  // Phones get the still where there is one, held to the top of the header so the title sits below it.
  if (!wide) {
    if (!poster) return null;
    return (
      <div className="absolute inset-x-0 top-14 h-56 overflow-hidden" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,var(--bg)_100%)]" />
      </div>
    );
  }

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
        poster={poster}
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
