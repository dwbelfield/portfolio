import { clamp01, palette, rgba, seeded, smoothstep, type Pointer, type Scene } from "./scene";

/**
 * Mythener: a story as a sphere of facts. Every point is something the book
 * has established, linked to the facts nearest it. A reading ring sweeps the
 * sphere pole to pole, the way the Delphi Engine reads a manuscript. Most
 * facts light and settle. Now and then one is flagged in amber, held, then
 * resolved. Two slow orbits give it the look of an astrolabe.
 */

const POINTS = 170;
const NEIGHBOURS = 3;
const TILT = 0.42;
const BAND = 0.055; // half-width of the reading ring, in sphere units

type Fact = { x: number; y: number; z: number; glow: number; flag: number; inBand: boolean };
type Vec = [number, number, number];

/** `compact` centres the sphere and drops the left-hand fade, for use inside a card. */
export function createOracle(compact = false): Scene {
  let w = 0;
  let h = 0;
  let cx = 0;
  let cy = 0;
  let radius = 0;
  let clock = 0;
  let spin = 0;
  let lean = 0; // eased pointer offset on the spin
  const rand = seeded(1203);
  const facts: Fact[] = [];
  const links: [number, number][] = [];

  // Evenly spread points on a sphere, each nudged a little off the surface.
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < POINTS; i++) {
    const y = 1 - (i / (POINTS - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const r = 0.94 + rand() * 0.12;
    facts.push({ x: Math.cos(theta) * ring * r, y: y * r, z: Math.sin(theta) * ring * r, glow: 0, flag: 0, inBand: false });
  }
  // Link each fact to its nearest neighbours, once per pair.
  const seen = new Set<string>();
  facts.forEach((a, i) => {
    const near = facts
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter((n) => n.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, NEIGHBOURS);
    for (const n of near) {
      const key = i < n.j ? `${i}-${n.j}` : `${n.j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        links.push([i, n.j]);
      }
    }
  });

  /** Rotate a point by the current spin and the fixed tilt, then project it. Returns screen x, y and nearness (1 front, 0 back). */
  function project(x: number, y: number, z: number, angle: number): Vec {
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const x1 = x * ca + z * sa;
    const z1 = -x * sa + z * ca;
    const ct = Math.cos(TILT), st = Math.sin(TILT);
    const y2 = y * ct - z1 * st;
    const z2 = y * st + z1 * ct;
    const scale = 1 / (1 + z2 * 0.28);
    return [cx + x1 * radius * scale, cy + y2 * radius * scale, clamp01((1 - z2) / 2)];
  }

  const scanAt = () => Math.sin(clock * 0.55) * 0.97;

  return {
    resize(width, height) {
      w = width;
      h = height;
      radius = compact ? Math.min(h * 0.36, w * 0.3) : Math.min(h * 0.4, w * 0.19);
      cx = compact ? w * 0.5 : w * 0.71;
      cy = h * 0.5;
    },

    step(dt, pointer: Pointer) {
      clock += dt;
      const target = pointer.active ? (pointer.x / w - 0.5) * 0.9 : 0;
      lean += (target - lean) * Math.min(1, dt * 2.5);
      spin += dt * 0.11;
      const scan = scanAt();
      for (const f of facts) {
        const inside = Math.abs(f.y - scan) < BAND;
        if (inside && !f.inBand) {
          f.glow = 1;
          if (f.flag <= 0 && rand() < 0.07) f.flag = 2.4 + rand() * 1.6;
        }
        f.inBand = inside;
        f.glow = Math.max(0, f.glow - dt * 0.7);
        if (f.flag > 0) {
          f.flag -= dt;
          // Resolved: the fact flashes white as the flag clears.
          if (f.flag <= 0) f.glow = 1;
        }
      }
    },

    draw(ctx) {
      const angle = spin + lean;
      const calm = (x: number) => (compact ? 1 : smoothstep(w * 0.14, w * 0.48, x));
      const at = facts.map((f) => project(f.x, f.y, f.z, angle));

      // Two orbits, drawn first so the sphere sits in front of their far sides.
      const orbits: [number, number, number, number][] = [
        [1.42, 0.5, 0.09, 0],
        [1.72, -0.34, -0.06, 2.1],
      ];
      for (const [r, tiltX, rate, phase] of orbits) {
        const ct = Math.cos(tiltX), st = Math.sin(tiltX);
        const point = (t: number): Vec => {
          const px = Math.cos(t) * r, pz = Math.sin(t) * r;
          return project(px, -pz * st, pz * ct, angle * 0.4);
        };
        let prev = point(0);
        for (let s = 1; s <= 96; s++) {
          const next = point((s / 96) * Math.PI * 2);
          ctx.strokeStyle = rgba(palette.steel, (0.16 + 0.45 * next[2]) * calm(next[0]));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(prev[0], prev[1]);
          ctx.lineTo(next[0], next[1]);
          ctx.stroke();
          prev = next;
        }
        const body = point(clock * rate * 6 + phase);
        ctx.fillStyle = rgba(palette.white, (0.35 + 0.6 * body[2]) * calm(body[0]));
        ctx.beginPath();
        ctx.arc(body[0], body[1], 2 + 1.6 * body[2], 0, Math.PI * 2);
        ctx.fill();
      }

      // Links between facts: brighter in front, and while either end is lit.
      ctx.lineWidth = 1;
      for (const [i, j] of links) {
        const a = at[i], b = at[j];
        const near = (a[2] + b[2]) / 2;
        const lit = Math.max(facts[i].glow, facts[j].glow);
        const flagged = facts[i].flag > 0 || facts[j].flag > 0;
        const colour = flagged ? palette.amber : lit > 0.05 ? palette.white : palette.steel;
        ctx.strokeStyle = rgba(colour, (0.08 + 0.42 * near + 0.45 * lit * near + (flagged ? 0.3 * near : 0)) * calm((a[0] + b[0]) / 2));
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }

      // The reading ring: a circle of latitude, strongest where it faces us.
      const scan = scanAt();
      const ringRadius = Math.sqrt(Math.max(0, 1 - scan * scan)) * 1.03;
      let prev = project(ringRadius, scan, 0, angle);
      ctx.lineWidth = 1.5;
      for (let s = 1; s <= 72; s++) {
        const t = (s / 72) * Math.PI * 2;
        const next = project(Math.cos(t) * ringRadius, scan, Math.sin(t) * ringRadius, angle);
        ctx.strokeStyle = rgba(palette.amber, (0.08 + 0.75 * next[2]) * calm(next[0]));
        ctx.beginPath();
        ctx.moveTo(prev[0], prev[1]);
        ctx.lineTo(next[0], next[1]);
        ctx.stroke();
        prev = next;
      }

      // The facts themselves.
      facts.forEach((f, i) => {
        const [x, y, near] = at[i];
        const a = calm(x);
        const flagged = f.flag > 0;
        const colour = flagged ? palette.amber : f.glow > 0.05 ? palette.white : palette.steel;
        const size = (1.1 + 1.9 * near) * (1 + 0.7 * f.glow);
        ctx.fillStyle = rgba(colour, (0.22 + 0.6 * near + 0.3 * f.glow) * a);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        if (flagged) {
          const pulse = (clock * 1.4 + i) % 1;
          ctx.strokeStyle = rgba(palette.amber, (1 - pulse) * (0.3 + 0.6 * near) * a);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, size + 3 + pulse * 11, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    },
  };
}
