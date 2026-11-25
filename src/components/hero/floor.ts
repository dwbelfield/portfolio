import { clamp01, palette, rgba, seeded, smoothstep, type Scene } from "./scene";

/**
 * PMB Companies: a production floor seen from above at an angle. Six divisions
 * stand on what was an empty grid. Each one sends finished units down a feeder
 * to the main aisle and out to shipping on the right. Every few seconds one
 * division is rebuilt from its footprint up: there was always a launch in flight.
 */

const COLS = 16;
const ROWS = 11;
const AISLE = 4.7; // the main aisle runs west to east along this row
const EXIT = COLS + 0.6;

type Bay = {
  x0: number; y0: number; x1: number; y1: number;
  height: number; // full height in pixels at tile width 72
  door: [number, number]; // where its feeder meets the bay
  grow: number; // 0 footprint only, 1 fully built
  state: "online" | "down" | "up";
  emit: number; // seconds until the next unit leaves
};
type Unit = { bay: number; s: number; speed: number; gold: boolean };

const plan: Omit<Bay, "grow" | "state" | "emit">[] = [
  { x0: 2, y0: 1, x1: 5, y1: 3, height: 46, door: [3.5, 3] },
  { x0: 7, y0: 1, x1: 9, y1: 3, height: 66, door: [8, 3] },
  { x0: 11, y0: 1.6, x1: 14, y1: 3.6, height: 38, door: [12.5, 3.6] },
  { x0: 3, y0: 6, x1: 5, y1: 9, height: 56, door: [4, 6] },
  { x0: 8, y0: 6, x1: 11, y1: 8, height: 44, door: [9.5, 6] },
  { x0: 12.4, y0: 6.6, x1: 14.4, y1: 8.6, height: 72, door: [13.4, 6.6] },
];

export function createFloor(): Scene {
  let w = 0;
  let h = 0;
  let tile = 72;
  let ox = 0;
  let oy = 0;
  let clock = 0;
  let nextLaunch = 3;
  const rand = seeded(20260401);
  const bays: Bay[] = plan.map((p) => ({ ...p, grow: 1, state: "online", emit: rand() * 1.5 }));
  let units: Unit[] = [];

  /** Floor coordinates (tiles, plus height in pixels) to the screen. */
  const iso = (x: number, y: number, z = 0): [number, number] => [
    ox + ((x - y) * tile) / 2,
    oy + ((x + y) * tile) / 4 - z,
  ];

  /** Where a unit is after travelling s tiles from its bay's door. */
  function along(b: Bay, s: number): [number, number] {
    const [dx, dy] = b.door;
    const feeder = Math.abs(AISLE - dy);
    if (s <= feeder) return [dx, dy + Math.sign(AISLE - dy) * s];
    return [dx + (s - feeder), AISLE];
  }
  const tripLength = (b: Bay) => Math.abs(AISLE - b.door[1]) + (EXIT - b.door[0]);

  function quad(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
  }

  return {
    resize(width, height) {
      w = width;
      h = height;
      tile = Math.min((0.76 * w * 2) / (COLS + ROWS), (0.98 * h * 4) / (COLS + ROWS));
      ox = w * 1.03 - (COLS * tile) / 2;
      oy = (h - ((COLS + ROWS) * tile) / 4) / 2 + 22;
    },

    step(dt) {
      clock += dt;
      // Every few seconds one running division goes back to its footprint and is rebuilt.
      nextLaunch -= dt;
      if (nextLaunch <= 0) {
        const running = bays.filter((b) => b.state === "online");
        if (running.length > 3) running[Math.floor(rand() * running.length)].state = "down";
        nextLaunch = 4 + rand() * 3;
      }
      bays.forEach((b, i) => {
        if (b.state === "down") {
          b.grow -= dt / 0.7;
          if (b.grow <= 0) {
            b.grow = 0;
            b.state = "up";
          }
        } else if (b.state === "up") {
          b.grow += dt / 2.6;
          if (b.grow >= 1) {
            b.grow = 1;
            b.state = "online";
            b.emit = 0.4;
          }
        } else {
          b.emit -= dt;
          if (b.emit <= 0) {
            units.push({ bay: i, s: 0, speed: 1.25 + rand() * 0.5, gold: rand() < 0.3 });
            b.emit = 1.1 + rand() * 1.5;
          }
        }
      });
      for (const u of units) u.s += u.speed * dt;
      units = units.filter((u) => u.s < tripLength(bays[u.bay]));
    },

    draw(ctx) {
      const scale = tile / 72;
      // Keep the left quiet for the title; the floor gathers on the right.
      const calm = (x: number) => smoothstep(w * 0.12, w * 0.5, x);

      // The floor grid.
      const grid = ctx.createLinearGradient(0, 0, w, 0);
      grid.addColorStop(0.1, rgba(palette.steel, 0));
      grid.addColorStop(0.5, rgba(palette.steel, 0.34));
      grid.addColorStop(1, rgba(palette.steel, 0.5));
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= COLS; x++) {
        ctx.moveTo(...iso(x, 0));
        ctx.lineTo(...iso(x, ROWS));
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.moveTo(...iso(0, y));
        ctx.lineTo(...iso(COLS, y));
      }
      ctx.stroke();

      // The main aisle and each feeder, drawn on the floor.
      ctx.strokeStyle = rgba(palette.white, 0.34);
      ctx.setLineDash([2 * scale, 7 * scale]);
      ctx.beginPath();
      ctx.moveTo(...iso(1, AISLE));
      ctx.lineTo(...iso(EXIT, AISLE));
      for (const b of bays) {
        ctx.moveTo(...iso(b.door[0], b.door[1]));
        ctx.lineTo(...iso(b.door[0], AISLE));
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Units and divisions together, far to near, so nearer boxes cover what is behind them.
      type Item = { depth: number; paint: () => void };
      const items: Item[] = [];

      for (const u of units) {
        const b = bays[u.bay];
        const [x, y] = along(b, u.s);
        const [sx, sy] = iso(x, y, 3 * scale);
        const fade = clamp01(u.s / 0.5) * clamp01((tripLength(b) - u.s) / 1.2) * calm(sx);
        const colour = u.gold ? palette.amber : palette.white;
        items.push({
          depth: x + y,
          paint: () => {
            const r = 4.2 * scale;
            ctx.fillStyle = rgba(colour, 0.95 * fade);
            quad(ctx, [[sx, sy - r], [sx + r * 1.7, sy], [sx, sy + r], [sx - r * 1.7, sy]]);
            ctx.fill();
          },
        });
      }

      bays.forEach((b, i) => {
        const [cx] = iso((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2);
        const a = 0.35 + 0.65 * calm(cx);
        const building = b.state !== "online";
        // Ease the rise so a division settles into place instead of stopping dead.
        const g = 1 - Math.pow(1 - b.grow, 3);
        const z = b.height * scale * g;
        items.push({
          depth: b.x1 + b.y1,
          paint: () => {
            const edge = building ? palette.amber : palette.white;
            if (building) {
              ctx.strokeStyle = rgba(palette.amber, 0.75 * a);
              ctx.setLineDash([4 * scale, 4 * scale]);
              quad(ctx, [iso(b.x0, b.y0), iso(b.x1, b.y0), iso(b.x1, b.y1), iso(b.x0, b.y1)]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
            if (z < 1) return;
            const left: [number, number][] = [iso(b.x0, b.y1), iso(b.x1, b.y1), iso(b.x1, b.y1, z), iso(b.x0, b.y1, z)];
            const right: [number, number][] = [iso(b.x1, b.y1), iso(b.x1, b.y0), iso(b.x1, b.y0, z), iso(b.x1, b.y1, z)];
            const top: [number, number][] = [iso(b.x0, b.y0, z), iso(b.x1, b.y0, z), iso(b.x1, b.y1, z), iso(b.x0, b.y1, z)];
            const faces: [typeof left, string][] = [
              [left, rgba(palette.steel, 0.36 * a)],
              [right, rgba(palette.steel, 0.2 * a)],
              [top, rgba(palette.white, 0.16 * a)],
            ];
            for (const [face, tint] of faces) {
              quad(ctx, face);
              ctx.fillStyle = palette.bg;
              ctx.fill();
              ctx.fillStyle = tint;
              ctx.fill();
              ctx.strokeStyle = rgba(edge, (building ? 0.85 : 0.62) * a);
              ctx.lineWidth = 1;
              ctx.stroke();
            }
            // Rack lines up both visible walls.
            ctx.strokeStyle = rgba(palette.white, 0.16 * a);
            ctx.beginPath();
            for (let level = 14 * scale; level < z - 3; level += 14 * scale) {
              ctx.moveTo(...iso(b.x0, b.y1, level));
              ctx.lineTo(...iso(b.x1, b.y1, level));
              ctx.lineTo(...iso(b.x1, b.y0, level));
            }
            ctx.stroke();
            // A running light on the roof once the division is online.
            if (!building) {
              const [lx, ly] = iso(b.x1 - 0.45, b.y1 - 0.45, z);
              const blink = 0.55 + 0.45 * Math.sin(clock * 2.2 + i * 1.7);
              ctx.fillStyle = rgba(palette.amber, blink * a);
              ctx.fillRect(lx - 2.5 * scale, ly - 2.5 * scale, 5 * scale, 5 * scale);
            }
          },
        });
      });

      items.sort((p, q) => p.depth - q.depth);
      for (const item of items) item.paint();
    },
  };
}
