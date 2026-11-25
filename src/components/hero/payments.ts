import { clamp01, palette, rgba, seeded, smoothstep, type Pointer, type Scene } from "./scene";

/**
 * RallyPay: payments as traffic. Transactions stream in from the left on many
 * lanes, converge on a gateway, and fan out to the acquirers on the right.
 * Card-testing attacks (red) arrive in the same traffic and stop at the gate;
 * everything else passes and brightens once it is authorized.
 */

const LANES = 30;
const ROWS = 6; // acquirer rows the lanes fan out to
const TAIL = 7; // samples in a transaction's trail
const TAIL_GAP = 0.011; // spacing of those samples along the lane

type Lane = { y0: number; gy: number; y1: number; depth: number; flash: number; flashRed: boolean };
type Txn = { lane: number; u: number; speed: number; attack: boolean; gold: boolean; wait: number };
type Burst = { x: number; y: number; age: number };

export function createPayments(): Scene {
  let w = 0;
  let h = 0;
  let gateX = 0;
  const lanes: Lane[] = [];
  const txns: Txn[] = [];
  let bursts: Burst[] = [];
  let drift = 0; // eased pointer offset on the gate, in pixels
  const rand = seeded(20200612);

  /** Position on a lane: u in [0,1) runs entry to gate, [1,2) gate to exit. */
  function at(l: Lane, u: number): [number, number] {
    const gy = l.gy + drift * l.depth;
    let x0: number, y0: number, x1: number, y1: number, cx0: number, cx1: number, t: number;
    if (u < 1) {
      t = u;
      x0 = -0.04 * w; y0 = l.y0; x1 = gateX; y1 = gy;
      cx0 = 0.3 * w; cx1 = gateX - 0.17 * w;
    } else {
      t = u - 1;
      x0 = gateX; y0 = gy; x1 = 1.04 * w; y1 = l.y1;
      cx0 = gateX + 0.14 * w; cx1 = 0.86 * w;
    }
    const m = 1 - t;
    const a = m * m * m, b = 3 * m * m * t, c = 3 * m * t * t, d = t * t * t;
    return [a * x0 + b * cx0 + c * cx1 + d * x1, a * y0 + b * y0 + c * y1 + d * y1];
  }

  function spawn(t: Txn, fresh: boolean) {
    t.lane = Math.floor(rand() * lanes.length);
    t.u = fresh ? rand() * 2 : 0;
    t.speed = (0.09 + rand() * 0.11) * (0.55 + 0.45 * lanes[t.lane].depth);
    t.attack = rand() < 0.16;
    t.gold = !t.attack && rand() < 0.07;
    t.wait = fresh ? 0 : rand() * 1.2;
    // An attack never appears past the gate.
    if (t.attack && t.u >= 1) t.u -= 1;
  }

  return {
    resize(width, height) {
      const first = lanes.length === 0;
      w = width;
      h = height;
      gateX = w * 0.64;
      if (first) {
        for (let i = 0; i < LANES; i++) {
          lanes.push({ y0: 0, gy: 0, y1: 0, depth: 0.35 + rand() * 0.65, flash: 0, flashRed: false });
        }
      }
      // Layout is recomputed from each lane's index, so a resize keeps traffic in place.
      const order = seeded(7);
      lanes.forEach((l, i) => {
        const f = i / (LANES - 1);
        l.y0 = h * (-0.12 + 1.24 * f) + (order() - 0.5) * h * 0.05;
        l.gy = h * (0.5 + (f - 0.5) * 0.4);
        const row = Math.floor(order() * ROWS);
        l.y1 = h * (0.1 + (0.8 * row) / (ROWS - 1)) + (order() - 0.5) * h * 0.02;
      });
      if (first) {
        const count = Math.round(Math.min(190, Math.max(90, (w * h) / 5200)));
        for (let i = 0; i < count; i++) {
          const t: Txn = { lane: 0, u: 0, speed: 0, attack: false, gold: false, wait: 0 };
          spawn(t, true);
          txns.push(t);
        }
      }
    },

    step(dt, pointer: Pointer) {
      const target = pointer.active ? (pointer.y / h - 0.5) * 26 : 0;
      drift += (target - drift) * Math.min(1, dt * 3);
      for (const l of lanes) l.flash = Math.max(0, l.flash - dt * 2.6);
      for (const t of txns) {
        if (t.wait > 0) {
          t.wait -= dt;
          continue;
        }
        const before = t.u;
        t.u += t.speed * dt;
        if (before < 1 && t.u >= 1) {
          const l = lanes[t.lane];
          l.flash = 1;
          l.flashRed = t.attack;
          if (t.attack) {
            const [x, y] = at(l, 0.9999);
            bursts.push({ x, y, age: 0 });
            spawn(t, false);
            continue;
          }
        }
        if (t.u >= 2) spawn(t, false);
      }
      for (const b of bursts) b.age += dt;
      bursts = bursts.filter((b) => b.age < 0.9);
    },

    draw(ctx) {
      // Keep the left third quiet: the chapter title sits there.
      const calm = (x: number) => smoothstep(w * 0.08, w * 0.5, x);

      // Lanes: the network itself, faint.
      const stroke = ctx.createLinearGradient(0, 0, w, 0);
      stroke.addColorStop(0, rgba(palette.steel, 0));
      stroke.addColorStop(0.42, rgba(palette.steel, 0.2));
      stroke.addColorStop(0.64, rgba(palette.steel, 0.34));
      stroke.addColorStop(1, rgba(palette.white, 0.16));
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      for (const l of lanes) {
        ctx.globalAlpha = 0.25 + 0.5 * l.depth;
        ctx.beginPath();
        for (let s = 0; s <= 40; s++) {
          const [x, y] = at(l, (s / 40) * 2);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // The gate, and one checkpoint per lane.
      const top = at(lanes[0], 1)[1];
      const bottom = at(lanes[LANES - 1], 1)[1];
      const glow = ctx.createLinearGradient(gateX - 60, 0, gateX + 60, 0);
      glow.addColorStop(0, rgba(palette.white, 0));
      glow.addColorStop(0.5, rgba(palette.white, 0.05));
      glow.addColorStop(1, rgba(palette.white, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(gateX - 60, top - 28, 120, bottom - top + 56);
      ctx.strokeStyle = rgba(palette.white, 0.42);
      ctx.beginPath();
      ctx.moveTo(gateX + 0.5, top - 22);
      ctx.lineTo(gateX + 0.5, bottom + 22);
      ctx.stroke();
      for (const l of lanes) {
        const y = at(l, 1)[1];
        const c = l.flashRed ? palette.rallypay : palette.white;
        ctx.fillStyle = rgba(palette.steel, 0.55);
        ctx.fillRect(gateX - 2, y - 2, 5, 5);
        if (l.flash > 0) {
          ctx.fillStyle = rgba(c, 0.9 * l.flash);
          ctx.fillRect(gateX - 3, y - 3, 7, 7);
        }
      }

      // Transactions, each with a short trail back along its lane.
      ctx.lineCap = "round";
      for (const t of txns) {
        if (t.wait > 0) continue;
        const l = lanes[t.lane];
        const past = t.u >= 1;
        const colour = t.attack ? palette.rallypay : past ? (t.gold ? palette.amber : palette.white) : palette.steel;
        const base = (t.attack ? 0.95 : past ? 0.9 : 0.6) * (0.4 + 0.6 * l.depth);
        const size = (t.attack ? 2.3 : 1.8) * (0.55 + 0.45 * l.depth);
        let [px, py] = at(l, t.u);
        const head = calm(px) * base;
        if (head <= 0.01) continue;
        ctx.strokeStyle = rgba(colour, 1);
        ctx.lineWidth = size;
        for (let k = 1; k <= TAIL; k++) {
          const u = t.u - k * TAIL_GAP;
          if (u < 0) break;
          const [x, y] = at(l, u);
          ctx.globalAlpha = head * (1 - k / (TAIL + 1)) * 0.75;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
          px = x;
          py = y;
        }
        const [hx, hy] = at(l, t.u);
        ctx.globalAlpha = head;
        ctx.fillStyle = rgba(colour, 1);
        ctx.beginPath();
        ctx.arc(hx, hy, size * 0.95, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // A blocked attack: a ring that opens and fades at the gate.
      for (const b of bursts) {
        const p = clamp01(b.age / 0.9);
        ctx.strokeStyle = rgba(palette.rallypay, (1 - p) * 0.9);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3 + p * 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(palette.rallypay, (1 - p) * 0.9);
        ctx.fillRect(b.x - 4, b.y - 1, 8, 2);
      }
    },
  };
}
