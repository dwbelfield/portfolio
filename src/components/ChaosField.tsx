"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const GRID = 32;

type Point = {
  hx: number; // home (grid) position
  hy: number;
  cx: number; // chaos position
  cy: number;
  tick: boolean; // short line instead of a dot
  angle: number; // chaos rotation for ticks
  len: number;
  amber: boolean;
};

/** Deterministic PRNG so the field looks the same on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The "order to chaos" hero field. A canvas of points that begin scattered
 * and rotated, then settle onto the 32px grid on load. Scrolling the hero
 * away loosens them again. With reduced motion, it renders ordered and still.
 */
export default function ChaosField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const state = { p: reduced ? 1 : 0 };
    let pts: Point[] = [];
    let w = 0;
    let h = 0;

    function build() {
      const rect = host!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rnd = mulberry32(7);
      const cols = Math.ceil(w / GRID) + 1;
      const rows = Math.ceil(h / GRID) + 1;
      pts = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = c * GRID;
          const hy = r * GRID;
          const a = rnd() * Math.PI * 2;
          const d = 40 + rnd() * 180;
          pts.push({
            hx,
            hy,
            cx: hx + Math.cos(a) * d,
            cy: hy + Math.sin(a) * d,
            tick: rnd() < 0.08,
            angle: (rnd() - 0.5) * Math.PI * 1.5,
            len: 8 + rnd() * 12,
            amber: rnd() < 0.005,
          });
        }
      }
    }

    function draw() {
      const p = state.p;
      ctx!.clearRect(0, 0, w, h);
      const alpha = 0.7 - 0.32 * p; // busier when chaotic, quieter when ordered
      ctx!.lineWidth = 1;
      for (const q of pts) {
        const x = q.cx + (q.hx - q.cx) * p;
        const y = q.cy + (q.hy - q.cy) * p;
        const color = q.amber ? "rgba(227,160,8,0.9)" : `rgba(110,118,129,${alpha})`;
        if (q.tick) {
          ctx!.save();
          ctx!.translate(x, y);
          ctx!.rotate(q.angle * (1 - p));
          ctx!.strokeStyle = color;
          ctx!.beginPath();
          ctx!.moveTo(-q.len / 2, 0);
          ctx!.lineTo(q.len / 2, 0);
          ctx!.stroke();
          ctx!.restore();
        } else {
          ctx!.fillStyle = q.amber ? color : `rgba(110,118,129,${alpha * 0.75})`;
          ctx!.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }
    }

    build();
    draw();

    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(host);

    let tween: gsap.core.Tween | undefined;
    let trigger: ScrollTrigger | undefined;

    if (!reduced) {
      tween = gsap.to(state, {
        p: 1,
        duration: 2.4,
        delay: 0.3,
        ease: "power3.inOut",
        onUpdate: draw,
      });
      trigger = ScrollTrigger.create({
        trigger: host,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (tween?.isActive()) return;
          state.p = 1 - self.progress * 0.7;
          draw();
        },
      });
    }

    return () => {
      ro.disconnect();
      tween?.kill();
      trigger?.kill();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
