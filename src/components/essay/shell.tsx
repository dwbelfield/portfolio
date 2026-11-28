"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * What every essay figure shares: a frame that breaks out of the text column
 * (edge to edge on a phone), knows when it is on screen, and tells its
 * drawing how big one drawing unit is, so lettering inside an SVG stays the
 * same size on a phone as on a desk. Styles are in globals.css under
 * "Essay figures".
 */

export type Frame = React.RefObject<HTMLElement | null>;

/** `units` is the width of the figure's SVG viewBox. Returns the frame's ref and whether it is on screen. */
export function useFigure(units: number): [Frame, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (!w) return;
      // One CSS pixel, in drawing units; and the size lettering should come out at.
      el.style.setProperty("--u", (units / w).toFixed(4));
      el.style.setProperty("--fpx", w < 520 ? "11.5px" : "13.5px");
    });
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, [units]);
  return [ref, on];
}

export function Shell({
  frame,
  on,
  label,
  role = "img",
  className = "",
  children,
  step,
}: {
  frame: Frame;
  on: boolean;
  /** What the figure shows, for a reader who cannot see it. */
  label: string;
  role?: "img" | "group";
  className?: string;
  children: React.ReactNode;
  /** For figures that play in steps: the step they are on. */
  step?: number;
}) {
  return (
    <figure
      ref={frame}
      role={role}
      aria-label={label}
      data-on={on ? "" : undefined}
      data-step={step}
      className={`essay-fig relative -mx-6 my-10 overflow-hidden border-y border-white/[0.08] md:mx-0 md:my-12 md:rounded-2xl md:border lg:-mx-20 ${className}`}
    >
      {children}
    </figure>
  );
}

/**
 * Plays a figure in steps while it is on screen: each entry of `ms` is how
 * long that step lasts, then it starts again. Off screen it holds where it
 * is. Before script runs, and with reduced motion, it rests on the last
 * step, which every figure draws as its finished picture.
 */
export function useSteps(on: boolean, ms: number[]): number {
  const reduced = useReducedMotion();
  const last = ms.length - 1;
  const [step, setStep] = useState(last);
  const lengths = useRef(ms);
  useEffect(() => {
    if (!on || reduced) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      setStep(i);
      timer = setTimeout(() => {
        i = (i + 1) % lengths.current.length;
        run();
      }, lengths.current[i]);
    };
    timer = setTimeout(run, 0);
    return () => clearTimeout(timer);
  }, [on, reduced]);
  return reduced ? last : step;
}

/** A fixed scatter of stars: the same every render, so server and browser agree. */
export function stars(count: number, w: number, h: number, seed = 7): { x: number; y: number; r: number; o: number }[] {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: count }, () => ({
    x: Math.round(rnd() * w * 10) / 10,
    y: Math.round(rnd() * h * 10) / 10,
    r: Math.round((0.5 + rnd() * 1.1) * 10) / 10,
    o: Math.round((0.25 + rnd() * 0.6) * 100) / 100,
  }));
}
