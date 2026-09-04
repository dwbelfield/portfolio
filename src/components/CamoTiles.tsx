"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chapter accents on the grid: a few of the 32px cells along the edges of a
 * `.grid-underlay` section, in small clusters. "marpat" fills cells with
 * woodland camo colours; "chevron" draws small RallyPay-red chevrons.
 * Place as a direct child of the section. Decorative only.
 */

export type TileVariant = "marpat" | "chevron";

const GRID = 32;
// tan, green, dark green, near-black, with per-colour opacity so the tan
// never shouts on graphite.
const PALETTES: Record<TileVariant, [string, number][]> = {
  marpat: [
    ["#a0925f", 0.45],
    ["#6f7c46", 0.55],
    ["#3f4a2f", 0.8],
    ["#262c22", 0.95],
  ],
  chevron: [
    ["var(--rallypay)", 0.55],
    ["var(--rallypay)", 0.35],
    ["var(--rallypay-deep)", 0.7],
  ],
};

type Tile = { x: number; y: number; color: string; opacity: number; delay: number };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(width: number, height: number, clusters: number, seed: number, colors: [string, number][]): Tile[] {
  const cols = Math.floor(width / GRID);
  const rows = Math.floor(height / GRID);
  if (cols < 8 || rows < 3) return [];
  const rnd = mulberry32(seed);
  const used = new Set<string>();
  const tiles: Tile[] = [];
  const bandX = 3; // columns from the left/right edge
  const bandY = 1; // rows from the top/bottom edge

  const inBand = (c: number, r: number) =>
    c >= 0 && c < cols && r >= 0 && r < rows &&
    (c < bandX || c >= cols - bandX || r < bandY || r >= rows - bandY);

  for (let k = 0; k < clusters; k++) {
    // Anchor on one of the four edges, biased to the sides.
    const side = rnd();
    let c: number;
    let r: number;
    if (side < 0.4) { c = Math.floor(rnd() * bandX); r = Math.floor(rnd() * rows); }
    else if (side < 0.8) { c = cols - 1 - Math.floor(rnd() * bandX); r = Math.floor(rnd() * rows); }
    else if (side < 0.9) { c = Math.floor(rnd() * cols); r = 0; }
    else { c = Math.floor(rnd() * cols); r = rows - 1; }

    const size = 2 + Math.floor(rnd() * 3); // 2–4 cells per cluster
    let cc = c;
    let rr = r;
    for (let i = 0; i < size; i++) {
      if (inBand(cc, rr) && !used.has(`${cc},${rr}`)) {
        used.add(`${cc},${rr}`);
        const [color, opacity] = colors[Math.floor(rnd() * colors.length)];
        tiles.push({ x: cc * GRID, y: rr * GRID, color, opacity, delay: tiles.length * 40 });
      }
      // Step to a neighbour; camo clusters are blocky, not lines.
      if (rnd() < 0.5) cc += rnd() < 0.5 ? -1 : 1;
      else rr += rnd() < 0.5 ? -1 : 1;
    }
  }
  return tiles;
}

export default function CamoTiles({
  clusters = 5,
  seed = 1,
  variant = "marpat",
}: {
  clusters?: number;
  seed?: number;
  variant?: TileVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    // ResizeObserver fires once on observe, so it also handles the first layout.
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setTiles(pick(width, height, clusters, seed, PALETTES[variant]));
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, [clusters, seed, variant]);

  return (
    <div ref={ref} className="grid-tiles" aria-hidden="true">
      {tiles.map((t, i) =>
        variant === "chevron" ? (
          <svg
            key={i}
            className="grid-tile"
            viewBox="0 0 32 32"
            style={{ left: t.x + 1, top: t.y + 1, opacity: t.opacity, animationDelay: `${t.delay}ms` }}
          >
            {/* The chevron from the RallyPay mark, one grid cell wide. */}
            <path d="M4 20 16 8l12 12v6L16 14 4 26z" fill={t.color} />
          </svg>
        ) : (
          <span
            key={i}
            className="grid-tile"
            style={{
              left: t.x + 1,
              top: t.y + 1,
              background: t.color,
              opacity: t.opacity,
              animationDelay: `${t.delay}ms`,
            }}
          />
        ),
      )}
    </div>
  );
}
