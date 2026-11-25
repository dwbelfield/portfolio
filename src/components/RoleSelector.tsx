"use client";

import { useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";
import { useMediaQuery } from "@/lib/media";
import type { Position } from "@/content/positions";

/**
 * Roles on the left, the selected role's detail on the right.
 *
 * Every role's panel is rendered into the same grid cell, so the block is
 * always as tall as the tallest role and the page never shifts on switch.
 * Accessible tabs: arrow keys move between roles, Home/End jump.
 */
export default function RoleSelector({
  positions,
  label = "Roles",
}: {
  positions: Position[];
  /** The accessible name of the tab list. */
  label?: string;
}) {
  // The list is a column beside the detail on wide screens and a wrapping row of pills on phones.
  const wide = useMediaQuery("(min-width: 768px)");
  // Open on the most recent role that has real detail, so a one-line advisory role does not lead.
  const [active, setActive] = useState(() => Math.max(0, positions.findIndex((p) => p.bullets.length >= 3)));
  const reduced = useReducedMotion();
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const n = positions.length;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const fade = (on: boolean) =>
    reduced ? { opacity: on ? 1 : 0 } : { opacity: on ? 1 : 0, y: on ? 0 : 12 };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        {/* Role list */}
        <div
          role="tablist"
          aria-orientation={wide ? "vertical" : "horizontal"}
          aria-label={label}
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-2 md:block md:self-start md:border-l md:border-line md:col-span-4"
        >
          {positions.map((pos, k) => {
            const selected = k === active;
            return (
              <button
                key={pos.title + pos.period}
                ref={(el) => {
                  tabs.current[k] = el;
                }}
                role="tab"
                id={`${id}-tab-${k}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${k}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(k)}
                className={`relative min-h-11 shrink-0 rounded-full border px-4 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:block md:w-full md:rounded-none md:border-0 md:py-4 md:pl-6 md:pr-4 ${
                  selected ? "border-accent text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={`${id}-marker`}
                    className="absolute -left-px top-0 hidden h-full w-0.5 bg-accent md:block"
                    transition={reduced ? { duration: 0 } : { duration: 0.35, ease: ease.out }}
                  />
                )}
                <span className="block whitespace-nowrap text-sm font-medium md:whitespace-normal md:text-base">{pos.title}</span>
                <span className="readout mt-1 hidden md:block">
                  {pos.period}
                  {pos.duration ? ` · ${pos.duration}` : ""}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail: all panels stacked in one cell; only the active one is visible. */}
        <div className="grid md:col-span-8">
          {positions.map((p, k) => {
            const on = k === active;
            return (
              <motion.div
                key={k}
                role="tabpanel"
                id={`${id}-panel-${k}`}
                aria-labelledby={`${id}-tab-${k}`}
                aria-hidden={!on}
                tabIndex={on ? 0 : -1}
                className={`focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:[grid-area:1/1] ${on ? "" : "pointer-events-none invisible max-md:hidden"}`}
                initial={false}
                animate={fade(on)}
                transition={{ duration: 0.28, ease: ease.out }}
              >
                <h3 className="home-display text-2xl font-semibold md:text-3xl">{p.title}</h3>
                <p className="readout mt-2">
                  {p.period}
                  {p.duration ? ` · ${p.duration}` : ""} · {p.location}
                </p>
                <ul className="bullets mt-5 space-y-2.5 text-sm text-[#C9D1D8] md:mt-6 md:space-y-3 md:text-base md:leading-snug">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
