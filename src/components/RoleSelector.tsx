"use client";

import { useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion, ease } from "@/lib/motion";
import type { Position } from "@/content/positions";

/**
 * Roles on the left, the selected role's detail on the right.
 * Accessible tabs: arrow keys move between roles, Home/End jump.
 */
export default function RoleSelector({ positions }: { positions: Position[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = positions[active];

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

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-8">
      {/* Role list */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Roles"
        onKeyDown={onKeyDown}
        className="border-l border-line md:col-span-4"
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
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(k)}
              className={`relative block w-full py-4 pl-6 pr-4 text-left transition-colors focus-visible:outline-none ${
                selected ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${id}-marker`}
                  className="absolute -left-px top-0 h-full w-0.5 bg-accent"
                  transition={reduced ? { duration: 0 } : { duration: 0.35, ease: ease.out }}
                />
              )}
              <span className="block font-medium">{pos.title}</span>
              <span className="readout mt-1 block">
                {pos.period}
                {pos.duration ? ` · ${pos.duration}` : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="md:col-span-8"
      >
        {/* Keyed so each role mounts fresh and plays its enter animation; no exit
            animation, so the swap is instant even if frames are throttled. */}
        <motion.div
          key={active}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: ease.out }}
        >
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
          <p className="readout mt-2">
            {p.period}
            {p.duration ? ` · ${p.duration}` : ""} · {p.location}
          </p>
          <ul className="bullets mt-8 space-y-4 text-lg text-fg">
            {p.bullets.map((b, k) => (
              <li key={k}>{b}</li>
            ))}
          </ul>
          {p.tags && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Skills">
              {p.tags.map((t) => (
                <li key={t} className="label rounded-full border border-line px-3 py-1">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}
