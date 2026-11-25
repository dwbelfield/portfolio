/**
 * A chapter hero drawn live on a canvas. A scene owns its own state: the host
 * (ChapterHero) sizes the canvas, runs the clock, and calls these in order.
 * Units are CSS pixels and seconds; the host handles device pixel ratio.
 */
export type Pointer = { x: number; y: number; active: boolean };

export type Scene = {
  /** Called once before the first frame and again whenever the box changes size. */
  resize(width: number, height: number): void;
  /** Advance the simulation by dt seconds. */
  step(dt: number, pointer: Pointer): void;
  /** Paint the current state. The context is already scaled and cleared to the page colour. */
  draw(ctx: CanvasRenderingContext2D): void;
};

/** The site palette as canvas colours (see globals.css). */
export const palette = {
  bg: "#141516",
  white: [245, 246, 247],
  steel: [110, 118, 129],
  amber: [227, 160, 8],
  rallypay: [208, 38, 43],
} as const;

export const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/** Small seeded generator, so a scene lays out the same way on every load. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
