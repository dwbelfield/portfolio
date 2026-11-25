"use client";

import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";
import { Counter } from "./primitives";

export type Outcome = {
  label: string;
  org: string;
  role: string;
  /** The employer's mark, white on transparent, shown as a faint watermark (path under /public). */
  logo: { src: string; wide?: boolean };
  /** The starting point as text: "15.1%", "36 months", or "Before" where there was no figure. */
  before: string;
  /** Bar widths, as percentages of the card. */
  beforeWidth: number;
  afterWidth: number;
  /** The result, counted up (or down) to when the card scrolls into view. */
  count: { from: number; to: number; decimals?: number; prefix?: string; suffix?: string };
  /** Place in the bento grid: "hero" is two columns by two rows, "wide" is two columns. */
  size?: "hero" | "wide";
};

/**
 * One outcome: the employer's mark behind it, the starting bar, then the
 * result bar growing out to its length while the figure counts to its value.
 * The markup carries the final figure, so it reads correctly without script;
 * with reduced motion nothing moves. The card lifts a little on hover.
 */
export default function OutcomeCard({ outcome: o, index }: { outcome: Outcome; index: number }) {
  const reduced = useReducedMotion();
  const hero = o.size === "hero";
  const big = hero || o.size === "wide";
  const view = { once: true, margin: "0px 0px -48px 0px" };
  const grow = (width: number, delay: number, duration: number) =>
    reduced
      ? { style: { width: `${width}%` } }
      : {
          initial: { width: "0%" },
          whileInView: { width: `${width}%` },
          viewport: view,
          transition: { duration, delay: index * 0.05 + delay, ease: ease.out },
        };

  return (
    <motion.div
      className={`home-raised group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl home-lift transition-[translate,border-color] duration-300 hover:-translate-y-1 ${
        big ? "p-6 md:p-8" : "p-4 md:p-6"
      }`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.5, delay: index * 0.05, ease: ease.out }}
    >
      {/* The employer's mark, bleeding off the right edge. */}
      <span
        aria-hidden="true"
        className={`logo-mask pointer-events-none absolute text-white/[0.055] transition-colors duration-500 group-hover:text-white/[0.11] ${
          o.logo.wide ? "-right-[6%] top-[8%] aspect-[2.89/1] w-[92%]" : "-right-[7%] top-1/2 aspect-square h-[82%] -translate-y-1/2"
        }`}
        style={{ maskImage: `url(${o.logo.src})`, WebkitMaskImage: `url(${o.logo.src})` }}
      />

      <div className="relative">
        <p className={`font-semibold leading-snug ${hero ? "text-xl md:text-2xl" : big ? "text-lg" : "text-[15px] md:text-base"}`}>{o.label}</p>
        <p className="mt-1 text-[12px] leading-snug text-[#9AA6B0] md:text-[13px]">
          {o.org} · {o.role}
        </p>
      </div>

      <div className="relative mt-auto flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <motion.span className={`min-w-1 rounded-sm bg-[#5B6772] ${hero ? "h-3.5" : "h-2.5"}`} {...grow(o.beforeWidth, 0.1, 0.5)} />
          <span className="shrink-0 font-mono text-[12px] text-[#9AA6B0] md:text-[13px]">
            <span className="sr-only">From </span>
            {o.before}
          </span>
        </div>
        <motion.span className={`min-w-1 rounded-sm bg-accent ${hero ? "h-6" : "h-3.5"}`} {...grow(o.afterWidth, 0.45, 1.1)} />
        <p className={`home-display font-bold leading-none text-accent ${hero ? "text-6xl md:text-8xl" : big ? "text-5xl md:text-6xl" : "text-[28px] md:text-4xl"}`}>
          <span className="sr-only">to </span>
          <Counter value={o.count.to} from={o.count.from} decimals={o.count.decimals} prefix={o.count.prefix} suffix={o.count.suffix} />
        </p>
      </div>
    </motion.div>
  );
}
