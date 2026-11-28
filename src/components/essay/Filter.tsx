"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { Shell, useFigure } from "./shell";

/**
 * The Great Filter, live. Civilizations drift in from the left as points of
 * light and die against a line. Every few seconds one, in amber, goes
 * through and carries on into a sky full of stars. Drawn on a canvas; it runs
 * only while on screen, and with reduced motion it is one still frame.
 */

const LINE_AT = 0.66; // how far across the filter stands

type Mote = { x: number; y: number; v: number; r: number; gold: boolean };
type Spark = { x: number; y: number; vx: number; vy: number; age: number; life: number };
type Flash = { y: number; age: number; gold: boolean };
type Star = { x: number; y: number; r: number; a: number; f: number; p: number };
type Sim = {
  w: number;
  h: number;
  t: number;
  motes: Mote[];
  sparks: Spark[];
  flashes: Flash[];
  stars: Star[];
  nextMote: number;
  nextGold: number;
};

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function create(w: number, h: number): Sim {
  const lx = w * LINE_AT;
  const stars: Star[] = [];
  const beyond = Math.round(w / 9);
  for (let i = 0; i < beyond; i++) stars.push({ x: rnd(lx + 10, w), y: rnd(4, h - 4), r: rnd(0.4, 1.3), a: rnd(0.25, 0.95), f: rnd(0.4, 1.4), p: rnd(0, 6.3) });
  for (let i = 0; i < beyond / 6; i++) stars.push({ x: rnd(0, lx - 12), y: rnd(4, h - 4), r: rnd(0.4, 0.9), a: rnd(0.1, 0.3), f: rnd(0.4, 1.2), p: rnd(0, 6.3) });
  return { w, h, t: 0, motes: [], sparks: [], flashes: [], stars, nextMote: 0, nextGold: 2.5 };
}

function advance(s: Sim, dt: number) {
  const k = s.w / 816; // everything moves in proportion to the width
  const lx = s.w * LINE_AT;
  s.t += dt;
  if (s.t >= s.nextMote) {
    s.nextMote = s.t + rnd(0.22, 0.5);
    s.motes.push({ x: -20, y: s.h * rnd(0.16, 0.92), v: k * rnd(60, 115), r: rnd(1.1, 2.1), gold: false });
  }
  if (s.t >= s.nextGold) {
    s.nextGold = s.t + rnd(6.5, 8.5);
    s.motes.push({ x: -20, y: s.h * rnd(0.4, 0.62), v: k * 125, r: 2.7, gold: true });
  }
  for (const m of s.motes) {
    const before = m.x;
    m.x += m.v * dt;
    if (before < lx && m.x >= lx) {
      s.flashes.push({ y: m.y, age: 0, gold: m.gold });
      if (!m.gold) {
        const n = 6 + Math.floor(Math.random() * 4);
        for (let i = 0; i < n; i++) s.sparks.push({ x: lx - 1, y: m.y, vx: -k * rnd(20, 120), vy: k * rnd(-80, 80), age: 0, life: rnd(0.45, 0.95) });
        m.x = Infinity; // gone
      }
    }
  }
  s.motes = s.motes.filter((m) => m.x < s.w + 220 * k);
  for (const p of s.sparks) {
    p.age += dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 1 - 1.8 * dt;
    p.vy *= 1 - 1.8 * dt;
  }
  s.sparks = s.sparks.filter((p) => p.age < p.life);
  for (const f of s.flashes) f.age += dt;
  s.flashes = s.flashes.filter((f) => f.age < 0.7);
}

function draw(ctx: CanvasRenderingContext2D, s: Sim, dpr: number) {
  const { w, h } = s;
  const k = Math.max(0.62, w / 816);
  const lx = w * LINE_AT;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // Stars: a few on this side, a sky full beyond.
  for (const st of s.stars) {
    ctx.globalAlpha = st.a * (0.65 + 0.35 * Math.sin(s.t * st.f + st.p));
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, 6.3);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // The filter: a wash of light on the near side, then the line itself.
  const top = 40;
  const wash = ctx.createLinearGradient(lx - 130 * k, 0, lx, 0);
  wash.addColorStop(0, "rgba(143,214,238,0)");
  wash.addColorStop(1, "rgba(143,214,238,0.13)");
  ctx.fillStyle = wash;
  ctx.fillRect(lx - 130 * k, top, 130 * k, h - top - 10);
  const beam = ctx.createLinearGradient(0, top, 0, h - 10);
  beam.addColorStop(0, "rgba(143,214,238,0)");
  beam.addColorStop(0.12, "rgba(190,236,250,0.95)");
  beam.addColorStop(0.88, "rgba(190,236,250,0.95)");
  beam.addColorStop(1, "rgba(143,214,238,0)");
  ctx.fillStyle = beam;
  ctx.fillRect(lx - 1, top, 2, h - top - 10);

  ctx.globalCompositeOperation = "lighter";
  for (const f of s.flashes) {
    const life = 1 - f.age / 0.7;
    const r = (f.gold ? 46 : 22) * k * (1.2 - life * 0.5);
    const g = ctx.createRadialGradient(lx, f.y, 0, lx, f.y, r);
    g.addColorStop(0, f.gold ? `rgba(255,205,96,${0.9 * life})` : `rgba(190,236,250,${0.75 * life})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(lx - r, f.y - r, r * 2, r * 2);
  }

  // Motes: a head and the trail behind it.
  for (const m of s.motes) {
    if (m.x === Infinity) continue;
    const tail = m.v * (m.gold ? 1.5 : 0.75);
    const trail = ctx.createLinearGradient(m.x - tail, 0, m.x, 0);
    trail.addColorStop(0, "rgba(0,0,0,0)");
    trail.addColorStop(1, m.gold ? "rgba(245,184,61,0.85)" : "rgba(214,228,238,0.5)");
    ctx.strokeStyle = trail;
    ctx.lineWidth = m.r * (m.gold ? 1.5 : 1.1) * k;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(m.x - tail, m.y);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();
    const halo = m.r * (m.gold ? 9 : 5) * k;
    const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, halo);
    g.addColorStop(0, m.gold ? "rgba(255,200,90,0.55)" : "rgba(200,225,240,0.32)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(m.x - halo, m.y - halo, halo * 2, halo * 2);
    ctx.fillStyle = m.gold ? "#FFE3A6" : "#F2F7FA";
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r * k * (m.gold ? 1.25 : 1), 0, 6.3);
    ctx.fill();
  }
  for (const p of s.sparks) {
    ctx.globalAlpha = 1 - p.age / p.life;
    ctx.fillStyle = "#BEECFA";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.1 * k, 0, 6.3);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

export default function Filter() {
  const [frame, on] = useFigure(816);
  const reduced = useReducedMotion();
  const canvas = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Sim | null>(null);

  // Size the canvas to its box, and draw a first frame with the scene already under way.
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const fit = () => {
      const box = el.getBoundingClientRect();
      if (!box.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(box.width * dpr);
      el.height = Math.round(box.height * dpr);
      const s = create(box.width, box.height);
      for (let i = 0; i < 360; i++) advance(s, 1 / 30);
      // Make sure the still frame shows one that got through.
      if (!s.motes.some((m) => m.gold && m.x > s.w * LINE_AT && m.x < s.w)) {
        s.motes.push({ x: s.w * 0.84, y: s.h * 0.5, v: (s.w / 816) * 125, r: 2.7, gold: true });
      }
      sim.current = s;
      const ctx = el.getContext("2d");
      if (ctx) draw(ctx, s, dpr);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!on || reduced) return;
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const s = sim.current;
      if (s) {
        advance(s, Math.min(0.05, (now - last) / 1000));
        draw(ctx, s, el.width / s.w);
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, reduced]);

  return (
    <Shell
      frame={frame}
      on={on}
      className="filter-sky"
      label="The Great Filter, drawn as a line of light. Points of light, each a civilization, drift toward it and burst against it. Now and then one, in amber, passes through and carries on into a sky full of stars."
    >
      <canvas ref={canvas} className="block h-[230px] w-full md:h-[340px]" aria-hidden="true" />
      <p
        aria-hidden="true"
        className="home-display pointer-events-none absolute top-3 -translate-x-1/2 whitespace-nowrap text-[13px] font-semibold text-[#DCEFF6] md:top-4 md:text-[15px]"
        style={{ left: `${LINE_AT * 100}%` }}
      >
        The Great Filter
      </p>
    </Shell>
  );
}
