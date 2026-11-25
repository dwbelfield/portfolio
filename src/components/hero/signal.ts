import { clamp01, palette, rgba, seeded, smoothstep, type Pointer, type Scene } from "./scene";

/**
 * Zenblis: a map of senior care, drawn as a field of dots. A dot is what is
 * known about a place; left alone it goes stale and dims. Each community on
 * the map sends out a wave that refreshes everything it reaches. Families
 * arrive as small moving points and find their way to the nearest community.
 * Where no community reaches, the map stays dim.
 */

const GAP = 22; // spacing of the dot field
const COMMUNITIES = 9;
const REACH = 215; // how far a community's wave carries, at a 540px-tall hero
const WAVE_SPEED = 135;
const STALE = 0.2;
const FAMILIES = 26;

type Dot = { x: number; y: number; fresh: number };
type Community = { fx: number; fy: number; x: number; y: number; wave: number; rest: number; ping: number; near: number[] };
type Family = { x: number; y: number; target: number; age: number; from: [number, number] };

export function createSignal(): Scene {
  let w = 0;
  let h = 0;
  let reach = REACH;
  let dots: Dot[] = [];
  const rand = seeded(75024);
  const communities: Community[] = [];
  const families: Family[] = [];

  // Place the communities once, as fractions of the box, keeping them apart.
  while (communities.length < COMMUNITIES) {
    const fx = 0.4 + rand() * 0.56;
    const fy = 0.12 + rand() * 0.76;
    if (communities.every((c) => Math.hypot((c.fx - fx) * 2.4, c.fy - fy) > 0.27)) {
      communities.push({ fx, fy, x: 0, y: 0, wave: -1, rest: rand() * 7, ping: 0, near: [] });
    }
  }
  // Each community is tied to the two nearest it: the network a family can move through.
  communities.forEach((c, i) => {
    c.near = communities
      .map((o, j) => ({ j, d: Math.hypot((o.fx - c.fx) * 2.4, o.fy - c.fy) }))
      .filter((n) => n.j > i || !communities[n.j].near.includes(i))
      .filter((n) => n.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .map((n) => n.j);
  });

  function nearest(x: number, y: number) {
    let best = 0;
    let bestD = Infinity;
    communities.forEach((c, i) => {
      const d = Math.hypot(c.x - x, c.y - y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }

  function arrive(f: Family) {
    f.x = w * (0.3 + rand() * 0.72);
    f.y = h * (-0.05 + rand() * 1.1);
    f.from = [f.x, f.y];
    f.target = nearest(f.x, f.y);
    f.age = 0;
  }

  return {
    resize(width, height) {
      w = width;
      h = height;
      reach = REACH * Math.max(0.7, Math.min(1.4, h / 540));
      for (const c of communities) {
        c.x = c.fx * w;
        c.y = c.fy * h;
      }
      // Rebuild the field already lit around each community, so it never opens blank.
      dots = [];
      const rowGap = GAP * 0.866;
      let row = 0;
      for (let y = -GAP; y < h + GAP; y += rowGap, row++) {
        for (let x = w * 0.22 + (row % 2 ? GAP / 2 : 0); x < w + GAP; x += GAP) {
          const c = communities[nearest(x, y)];
          const dist = Math.hypot(c.x - x, c.y - y);
          dots.push({ x, y, fresh: Math.max(STALE, 0.8 - 0.75 * (dist / reach)) });
        }
      }
      if (families.length === 0) {
        for (let i = 0; i < FAMILIES; i++) {
          const f: Family = { x: 0, y: 0, target: 0, age: 0, from: [0, 0] };
          arrive(f);
          families.push(f);
        }
      } else {
        for (const f of families) arrive(f);
      }
    },

    step(dt, pointer: Pointer) {
      for (const c of communities) {
        c.ping = Math.max(0, c.ping - dt * 1.6);
        if (c.wave < 0) {
          c.rest -= dt;
          if (c.rest <= 0) c.wave = 0;
        } else {
          c.wave += WAVE_SPEED * dt;
          if (c.wave > reach) {
            c.wave = -1;
            c.rest = 5.5 + rand() * 5;
          }
        }
      }
      for (const d of dots) {
        d.fresh = Math.max(STALE, d.fresh - dt * 0.06);
        for (const c of communities) {
          if (c.wave < 0) continue;
          const dist = Math.hypot(c.x - d.x, c.y - d.y);
          // The wave refreshes a dot as its front passes over it, less at the edge of its reach.
          if (Math.abs(dist - c.wave) < 9) d.fresh = Math.max(d.fresh, 1 - 0.45 * (dist / reach));
        }
        // Looking at part of the map refreshes it too.
        if (pointer.active && Math.hypot(pointer.x - d.x, pointer.y - d.y) < 70) d.fresh = 1;
      }
      for (const f of families) {
        f.age += dt;
        const c = communities[f.target];
        const dx = c.x - f.x, dy = c.y - f.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 7) {
          c.ping = 1;
          arrive(f);
          continue;
        }
        // Families start slowly and quicken as they close in.
        const speed = 22 + 30 * clamp01(f.age / 3);
        f.x += (dx / dist) * speed * dt;
        f.y += (dy / dist) * speed * dt;
      }
    },

    draw(ctx) {
      const calm = (x: number) => smoothstep(w * 0.2, w * 0.52, x);

      // The field: stale dots are small and dim, fresh ones larger and bright.
      for (const d of dots) {
        const a = calm(d.x);
        if (a <= 0.01) continue;
        const size = 1.5 + 1.7 * d.fresh;
        ctx.fillStyle = rgba(d.fresh > 0.5 ? palette.white : palette.steel, (0.3 + 0.6 * d.fresh) * a);
        ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size);
      }

      // The ties between neighbouring communities.
      ctx.lineWidth = 1;
      for (const c of communities) {
        for (const j of c.near) {
          const o = communities[j];
          ctx.strokeStyle = rgba(palette.steel, 0.3 * calm((c.x + o.x) / 2));
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(o.x, o.y);
          ctx.stroke();
        }
      }

      // Each community: its wave, then the marker itself.
      for (const c of communities) {
        const a = calm(c.x);
        if (c.wave >= 0) {
          ctx.strokeStyle = rgba(palette.white, 0.5 * (1 - c.wave / reach) * a);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.wave, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (c.ping > 0) {
          ctx.strokeStyle = rgba(palette.amber, c.ping * 0.9 * a);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 8 + (1 - c.ping) * 14, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = palette.bg;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = rgba(palette.white, 0.85 * a);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = rgba(palette.white, 0.95 * a);
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Families on their way in, each with a short trail back toward where it started.
      ctx.lineCap = "round";
      for (const f of families) {
        const a = calm(f.x) * clamp01(f.age / 0.8);
        if (a <= 0.01) continue;
        const dx = f.from[0] - f.x, dy = f.from[1] - f.y;
        const len = Math.hypot(dx, dy) || 1;
        const tail = Math.min(28, len);
        const trail = ctx.createLinearGradient(f.x, f.y, f.x + (dx / len) * tail, f.y + (dy / len) * tail);
        trail.addColorStop(0, rgba(palette.amber, 0.85 * a));
        trail.addColorStop(1, rgba(palette.amber, 0));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x + (dx / len) * tail, f.y + (dy / len) * tail);
        ctx.stroke();
        ctx.fillStyle = rgba(palette.amber, a);
        ctx.beginPath();
        ctx.arc(f.x, f.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}
