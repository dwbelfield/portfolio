"use client";

import { useState } from "react";
import { Shell, useFigure } from "./shell";

/**
 * What $1,000 put away at birth becomes if it is never touched: one line per
 * yearly growth rate, on one dollar axis. Point at the chart (or use the
 * arrow keys) to read any age. The figures are arithmetic, not a forecast:
 * 1,000 x (1 + rate) ^ age.
 */

const W = 816;
const H = 430;
// The plot: age 0 to 65 across, $0 to $500K up.
const X0 = 28;
const X1 = 664;
const Y0 = 372;
const Y1 = 64;
const AGE_MAX = 65;
const V_MAX = 500_000;

// One hue, lighter as the rate rises (checked as an ordinal ramp on this surface).
const RATES = [
  { r: 0.1, name: "10%", color: "#f0c14a" },
  { r: 0.07, name: "7%", color: "#c98500" },
  { r: 0.05, name: "5%", color: "#8a5a00" },
];

const worth = (r: number, age: number) => 1000 * Math.pow(1 + r, age);
const px = (age: number) => X0 + (age / AGE_MAX) * (X1 - X0);
const py = (v: number) => Y0 - (v / V_MAX) * (Y0 - Y1);
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const line = (r: number) =>
  Array.from({ length: AGE_MAX + 1 }, (_, a) => `${a ? "L" : "M"}${px(a).toFixed(1)} ${py(worth(r, a)).toFixed(1)}`).join(" ");

const GRID = [100_000, 200_000, 300_000, 400_000, 500_000];
const AGES = [
  { age: 0, name: "Birth" },
  { age: 18, name: "Age 18" },
  { age: 40, name: "Age 40" },
  { age: 65, name: "Age 65" },
];
// Where the three end values sit; the lower two are eased apart so they never touch.
const END_Y = [py(worth(0.1, 65)), py(worth(0.07, 65)) - 5, py(worth(0.05, 65)) + 6];

export default function Growth() {
  const [frame, on] = useFigure(W);
  const [age, setAge] = useState<number | null>(null);

  const point = (e: React.PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const at = ((e.clientX - box.left) / box.width) * W;
    setAge(Math.max(0, Math.min(AGE_MAX, Math.round(((at - X0) / (X1 - X0)) * AGE_MAX))));
  };

  return (
    <Shell
      frame={frame}
      on={on}
      role="group"
      className="home-raised"
      label="Chart: what $1,000 at birth becomes if it is never touched. At 18 it is worth between $2,407 and $5,560. At 65 it is worth $23,840 at 5% a year, $81,273 at 7%, and $490,371 at 10%."
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 pt-5 md:px-7 md:pt-6">
        <p className="home-display text-lg font-semibold leading-tight md:text-xl">$1,000 at birth, never touched</p>
        <ul className="flex items-center gap-4 text-xs text-[#C9D1D8] md:text-[13px]" aria-label="Growth a year">
          <li className="text-[#9AA6B0]">Growth a year</li>
          {RATES.map((s) => (
            <li key={s.name} className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full" style={{ background: s.color }} />
              {s.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            <linearGradient id="growth-wash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f0c14a" stopOpacity="0.16" />
              <stop offset="1" stopColor="#f0c14a" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid and axis: hairlines, one step off the surface. */}
          {GRID.map((v) => (
            <g key={v}>
              <line x1={X0} x2={X1} y1={py(v)} y2={py(v)} stroke="rgba(255,255,255,0.07)" className="fig-s1" />
              <text x={X0} y={py(v)} dy="-0.5em" className="fig-t fig-t-sm fig-num" fill="#7F8B95">
                ${v / 1000}K
              </text>
            </g>
          ))}
          <line x1={X0} x2={X1} y1={Y0} y2={Y0} stroke="rgba(255,255,255,0.22)" className="fig-s1" />
          {AGES.map((a) => (
            <g key={a.age}>
              <line x1={px(a.age)} x2={px(a.age)} y1={Y0} y2={Y0 + 6} stroke="rgba(255,255,255,0.22)" className="fig-s1" />
              <text
                x={px(a.age)}
                y={Y0}
                dy="1.7em"
                textAnchor={a.age === 0 ? "start" : a.age === 65 ? "end" : "middle"}
                className="fig-t fig-t-sm"
                fill="#9AA6B0"
              >
                {a.name}
              </text>
            </g>
          ))}

          {/* The lines, lowest rate first so the highest sits on top. */}
          <path d={`${line(0.1)} L${X1} ${Y0} L${X0} ${Y0} Z`} fill="url(#growth-wash)" className="fig-fade" style={{ "--d": "1.6s" } as React.CSSProperties} />
          {[...RATES].reverse().map((s, i) => (
            <path
              key={s.name}
              d={line(s.r)}
              fill="none"
              stroke={s.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="fig-s2 fig-draw"
              style={{ "--t": "2.2s", "--d": `${0.15 + i * 0.25}s`, "--e": "cubic-bezier(0.5, 0, 0.3, 1)" } as React.CSSProperties}
            />
          ))}

          {/* Age 18, when the account opens: still close to where it started. */}
          <g className="fig-fade" style={{ "--d": "2.5s" } as React.CSSProperties}>
            <line x1={px(18)} x2={px(18)} y1={py(worth(0.1, 18))} y2={Y0 - 74} stroke="rgba(255,255,255,0.35)" className="fig-s1" />
            <circle cx={px(18)} cy={py(worth(0.1, 18))} fill="#f0c14a" stroke="#1b2126" className="fig-dot" />
            <text x={px(18)} y={Y0 - 74} dy="-0.55em" textAnchor="middle" className="fig-t" fill="#C9D1D8">
              <tspan className="fig-strong" fill="#F5F6F7">
                {usd(worth(0.1, 18))}
              </tspan>{" "}
              at 18
            </text>
          </g>

          {/* Age 65: each line's value at its end. */}
          {RATES.map((s, i) => (
            <g key={s.name} className="fig-fade" style={{ "--d": `${2.2 + i * 0.15}s` } as React.CSSProperties}>
              <circle cx={X1} cy={py(worth(s.r, 65))} fill={s.color} stroke="#1b2126" className="fig-dot" />
              {/* The top value sits to the left of its point, where the chart is empty; on a phone it would not fit on the right. */}
              <text
                x={X1}
                y={END_Y[i]}
                dx={i === 0 ? "-0.9em" : "1em"}
                dy="0.34em"
                textAnchor={i === 0 ? "end" : "start"}
                className={`fig-t fig-num fig-strong ${i === 0 ? "fig-t-lg" : ""}`}
                fill="#F5F6F7"
              >
                {usd(worth(s.r, 65))}
              </text>
            </g>
          ))}

          {/* The reading line. */}
          {age !== null && (
            <g pointerEvents="none">
              <line x1={px(age)} x2={px(age)} y1={Y1 - 18} y2={Y0} stroke="rgba(255,255,255,0.45)" className="fig-s1" />
              {RATES.map((s) => (
                <circle key={s.name} cx={px(age)} cy={py(worth(s.r, age))} fill={s.color} stroke="#1b2126" className="fig-dot" />
              ))}
            </g>
          )}
          <rect
            x={0}
            y={0}
            width={W}
            height={H}
            fill="transparent"
            style={{ touchAction: "pan-y" }}
            onPointerMove={point}
            onPointerDown={point}
            onPointerLeave={() => setAge(null)}
          />
        </svg>

        {age !== null && (
          <div
            className="pointer-events-none absolute top-[6%] z-10 w-max rounded-lg border border-white/10 bg-[#0d1114]/95 px-3 py-2 text-xs shadow-xl md:text-[13px]"
            style={{ left: `${(px(age) / W) * 100}%`, translate: age > 34 ? "calc(-100% - 12px) 0" : "12px 0" }}
          >
            <p className="text-[#9AA6B0]">{age === 0 ? "At birth" : `Age ${age}`}</p>
            {RATES.map((s) => (
              <p key={s.name} className="mt-1 flex items-center gap-2">
                <span className="h-0.5 w-3 rounded-full" style={{ background: s.color }} />
                <span className="font-semibold text-[#F5F6F7] tabular-nums">{usd(worth(s.r, age))}</span>
                <span className="text-[#9AA6B0]">at {s.name}</span>
              </p>
            ))}
          </div>
        )}

        {/* The same reading line for the keyboard. */}
        <input
          type="range"
          min={0}
          max={AGE_MAX}
          step={1}
          value={age ?? AGE_MAX}
          onChange={(e) => setAge(Number(e.target.value))}
          onFocus={() => setAge((a) => a ?? 18)}
          onBlur={() => setAge(null)}
          aria-label="Age"
          aria-valuetext={age === null ? undefined : `Age ${age}: ${RATES.map((s) => `${usd(worth(s.r, age))} at ${s.name}`).join(", ")}`}
          className="sr-only"
        />
      </div>

      <table className="sr-only">
        <caption>$1,000 at birth, never touched, by yearly growth</caption>
        <thead>
          <tr>
            <th scope="col">Age</th>
            {RATES.map((s) => (
              <th key={s.name} scope="col">
                {s.name} a year
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AGES.map((a) => (
            <tr key={a.age}>
              <th scope="row">{a.name}</th>
              {RATES.map((s) => (
                <td key={s.name}>{usd(worth(s.r, a.age))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Shell>
  );
}
