"use client";

import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Colour to transition to after mount (e.g. a brand colour). */
  to?: string;
  /** Seconds before the transition starts. */
  delay?: number;
};

/**
 * Organisation mark drawn as a CSS mask in the current text colour. Starts
 * white; if `to` is given, eases to that colour after `delay`. Hover colour
 * can be applied by the parent via `group-hover:` on the className.
 */
export default function Logo({ src, alt, className, to, delay = 1.2 }: Props) {
  const reduced = useReducedMotion();
  const style = { maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` };
  if (!to) {
    return <span role="img" aria-label={alt} className={`logo-mask ${className ?? ""}`} style={style} />;
  }
  return (
    <motion.span
      role="img"
      aria-label={alt}
      className={`logo-mask ${className ?? ""}`}
      style={style}
      initial={{ color: "var(--fg)" }}
      animate={{ color: to }}
      transition={reduced ? { duration: 0 } : { duration: 1.2, delay, ease: ease.inOut }}
    />
  );
}
