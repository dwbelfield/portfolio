"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/media";
import type { HeroScene } from "@/content/site";
import { palette, type Pointer, type Scene } from "./hero/scene";
import { createPayments } from "./hero/payments";
import { createFloor } from "./hero/floor";
import { createOracle } from "./hero/oracle";
import { createSignal } from "./hero/signal";

/** The scenes a chapter can ask for by name in the content model. */
const scenes: Record<HeroScene, (compact?: boolean) => Scene> = {
  payments: createPayments,
  floor: createFloor,
  oracle: createOracle,
  signal: createSignal,
};

/** Seconds of simulation run before the first paint, so a hero never opens empty. */
const WARM_UP = 8;
const STEP = 1 / 30;

/**
 * A chapter header drawn live on a canvas instead of played from a video, so
 * it is sharp at any size and reacts to the pointer. It pauses when scrolled
 * out of view or when the tab is hidden; with reduced motion it paints one
 * still frame. Like the videos it replaces, it is left out on phones.
 *
 * `compact` is for a scene shown inside a card: the subject is centred, it
 * fills the whole box, it shows at every width, and there is no title to
 * keep clear, so the legibility fades are left off.
 */
export default function ChapterHero({ scene, alt, compact = false }: { scene: HeroScene; alt: string; compact?: boolean }) {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const wide = compact || desktop;
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !wide) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sim = scenes[scene](compact);
    const pointer: Pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let visible = true;

    const paint = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);
      sim.draw(ctx);
    };

    const size = () => {
      const box = canvas.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      // The observer also reports the size it starts with; only a real change rebuilds the scene.
      if (box.width === width && box.height === height) return;
      const first = width === 0;
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sim.resize(width, height);
      if (first) for (let t = 0; t < WARM_UP; t += STEP) sim.step(STEP, pointer);
      paint();
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (width === 0) return;
      // A long gap (a hidden tab coming back) is treated as one ordinary frame.
      const dt = Math.min(STEP * 2, (now - last) / 1000 || STEP);
      last = now;
      sim.step(dt, pointer);
      paint();
    };
    const run = () => {
      cancelAnimationFrame(frame);
      if (reduced || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const resized = new ResizeObserver(size);
    resized.observe(canvas);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    seen.observe(canvas);
    const move = (e: PointerEvent) => {
      // In a card the scene just runs: several sit side by side, and none should follow the pointer.
      if (compact) return;
      const box = canvas.getBoundingClientRect();
      pointer.x = e.clientX - box.left;
      pointer.y = e.clientY - box.top;
      pointer.active = pointer.y >= 0 && pointer.y <= box.height;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", run);
    size();
    run();

    return () => {
      cancelAnimationFrame(frame);
      resized.disconnect();
      seen.disconnect();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", run);
    };
  }, [scene, reduced, wide, compact]);

  if (!wide) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={ref} title={compact ? undefined : alt} className="h-full w-full" />
      {!compact && (
        <>
          {/* Legibility: quiet behind the title on the left, and a fade into the page below. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--bg)_0%,rgba(20,21,22,0.72)_30%,transparent_58%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_62%,var(--bg)_100%)]" />
        </>
      )}
    </div>
  );
}
