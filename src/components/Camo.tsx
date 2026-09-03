/**
 * Woodland MARPAT-style digital camouflage, generated as an SVG pattern.
 * Deterministic (seeded), four colours sampled from the real pattern, drawn
 * as four merged paths so the DOM stays small. Used only as small accents on
 * the Marine Corps chapter. Decorative: aria-hidden.
 */

const COLORS = ["#a0925f", "#6f7c46", "#3f4a2f", "#1c211a"]; // tan, green, dark green, near-black
const WEIGHTS = [0.3, 0.32, 0.24, 0.14];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Value noise on a coarse lattice, bilinearly interpolated, so cells cluster into blobs. */
function field(cols: number, rows: number, seed: number, scale: number) {
  const rnd = mulberry32(seed);
  const cw = Math.ceil(cols / scale) + 2;
  const ch = Math.ceil(rows / scale) + 2;
  const lattice = Array.from({ length: cw * ch }, () => rnd());
  const at = (x: number, y: number) => lattice[y * cw + x];
  const out = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const fx = x / scale;
      const fy = y / scale;
      const x0 = Math.floor(fx);
      const y0 = Math.floor(fy);
      const tx = fx - x0;
      const ty = fy - y0;
      const v =
        at(x0, y0) * (1 - tx) * (1 - ty) +
        at(x0 + 1, y0) * tx * (1 - ty) +
        at(x0, y0 + 1) * (1 - tx) * ty +
        at(x0 + 1, y0 + 1) * tx * ty;
      // A little per-cell jitter gives the pixelated edge MARPAT has.
      out[y * cols + x] = v + (rnd() - 0.5) * 0.18;
    }
  }
  return out;
}

export default function Camo({
  width,
  height,
  cell = 4,
  seed = 11,
  className,
}: {
  width: number;
  height: number;
  cell?: number;
  seed?: number;
  className?: string;
}) {
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const values = field(cols, rows, seed, 3.2);

  // Turn weights into thresholds over the sorted value range.
  const sorted = Array.from(values).sort((a, b) => a - b);
  const thresholds: number[] = [];
  let acc = 0;
  for (let i = 0; i < WEIGHTS.length - 1; i++) {
    acc += WEIGHTS[i];
    thresholds.push(sorted[Math.floor(acc * sorted.length)]);
  }

  const paths = COLORS.map(() => [] as string[]);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = values[y * cols + x];
      let k = 0;
      while (k < thresholds.length && v > thresholds[k]) k++;
      paths[k].push(`M${x * cell} ${y * cell}h${cell}v${cell}h-${cell}z`);
    }
  }

  return (
    <svg
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {paths.map((d, i) => (
        <path key={i} d={d.join("")} fill={COLORS[i]} />
      ))}
    </svg>
  );
}
