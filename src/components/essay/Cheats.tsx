"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { Shell, useFigure } from "./shell";

/**
 * A game with the cheat codes on, and the same game with them off. The
 * reader flips the switch. The curves are a sketch of the argument, not
 * measurements, so the axes carry names and no numbers. The first time the
 * figure comes on screen it plays cheats on, then switches them off.
 */

const W = 816;
const H = 404;
const BASE = 340; // the floor of the plot
const LEFT = 64;
const RIGHT = 768;

// Cheats on: everything at once, gone in twenty minutes.
const RUSH = `M${LEFT} 330 C80 330 92 96 132 86 C176 75 214 78 244 92 C306 120 318 308 400 322 L486 328`;
const TWENTY = 244;

// Cheats off: six walls, each one stalls you before you get over it.
const LEVELS = [330, 288, 244, 200, 156, 112, 70];
const STEP = (RIGHT - LEFT) / 6;
const CLIMB = LEVELS.slice(0, 6).reduce((d, y, i) => {
  const x = LEFT + i * STEP;
  const next = LEVELS[i + 1];
  return `${d} C${x + 34} ${y} ${x + 38} ${y + 9} ${x + 58} ${y + 9} C${x + 86} ${y + 9} ${x + 90} ${next} ${(x + STEP).toFixed(1)} ${next}`;
}, `M${LEFT} 330`);
const WON = LEVELS.slice(1).map((y, i) => ({ x: LEFT + (i + 1) * STEP, y }));
const CLIMB_SECONDS = 3.6;

// Two series, checked together on this surface.
const BLUE = "#3987e5";
const GOLD = "#c98500";

type Vars = React.CSSProperties & Record<`--${string}`, string>;

export default function Cheats() {
  const [frame, on] = useFigure(W);
  const reduced = useReducedMotion();
  const [cheats, setCheats] = useState(false);
  // 0 until the figure has played once; each new run restarts the drawing.
  const [run, setRun] = useState(0);
  const auto = useRef<ReturnType<typeof setTimeout>>(undefined);
  const played = useRef(false);

  // First time on screen: cheats on, then off.
  useEffect(() => {
    if (!on || played.current || reduced) return;
    played.current = true;
    const start = setTimeout(() => {
      setCheats(true);
      setRun(1);
      auto.current = setTimeout(() => {
        setCheats(false);
        setRun(2);
      }, 3600);
    }, 0);
    return () => clearTimeout(start);
  }, [on, reduced]);
  useEffect(() => () => clearTimeout(auto.current), []);

  const flip = () => {
    clearTimeout(auto.current);
    played.current = true;
    setCheats((c) => !c);
    setRun((r) => r + 1);
  };

  const moving = run > 0 && !reduced;

  return (
    <Shell
      frame={frame}
      on={on}
      role="group"
      className="home-raised"
      label="Sketch: how much a game is worth playing over time. With cheat codes on, it peaks at once and is over in twenty minutes, with no achievements. With cheats off, it climbs slowly over six walls, earning an achievement at each."
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 pt-5 md:px-7 md:pt-6">
        <button
          type="button"
          role="switch"
          aria-checked={cheats}
          onClick={flip}
          className="group flex cursor-pointer items-center gap-3 rounded-full"
        >
          <span className="home-display text-lg font-semibold leading-none md:text-xl">Cheat codes</span>
          <span
            className="relative h-7 w-[52px] rounded-full border border-white/15 transition-colors duration-300"
            style={{ background: cheats ? BLUE : "#2b343c" }}
          >
            <span
              className="absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 group-hover:scale-110"
              style={{ transform: cheats ? "translateX(24px)" : undefined }}
            />
          </span>
          <span className="w-7 text-left font-mono text-xs font-semibold text-[#F5F6F7]">{cheats ? "ON" : "OFF"}</span>
        </button>

        {/* Achievements: earned one wall at a time, or not at all. */}
        <div className="flex items-center gap-2.5 text-xs text-[#9AA6B0] md:text-[13px]">
          <span>{cheats ? "Achievements disabled" : "Achievements"}</span>
          <span className="flex items-center gap-1.5" key={`slots-${run}-${cheats}`}>
            {WON.map((_, i) => (
              <span
                key={i}
                className={`block h-3 w-3 rotate-45 rounded-[2px] ${cheats ? "bg-white/10" : moving ? "cheats-earn" : ""}`}
                style={cheats ? undefined : ({ background: GOLD, "--d": `${(CLIMB_SECONDS * (i + 1)) / 6}s` } as Vars)}
              />
            ))}
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <linearGradient id="cheats-wash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={GOLD} stopOpacity="0.2" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cheats-rush" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BLUE} stopOpacity="0.22" />
            <stop offset="1" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Axes: hairlines, and names where numbers would be a lie. */}
        <path d={`M${LEFT} 44 V${BASE} H${RIGHT}`} fill="none" stroke="rgba(255,255,255,0.22)" className="fig-s1" />
        <line x1={TWENTY} x2={TWENTY} y1={BASE} y2={BASE + 6} stroke="rgba(255,255,255,0.22)" className="fig-s1" />
        <text x={TWENTY} y={BASE} dy="1.7em" textAnchor="middle" className="fig-t fig-t-sm" fill="#9AA6B0">
          20 minutes
        </text>
        <text x={RIGHT} y={BASE} dy="1.7em" textAnchor="end" className="fig-t fig-t-sm" fill="#9AA6B0">
          Time played
        </text>
        <text transform={`translate(${LEFT} 192) rotate(-90)`} dy="-0.9em" textAnchor="middle" className="fig-t fig-t-sm" fill="#9AA6B0">
          Worth playing
        </text>

        {/* Cheats on */}
        <g style={{ opacity: cheats ? 1 : 0.3, transition: "opacity 0.5s" }}>
          <path key={`rush-wash-${run}`} d={`${RUSH} V${BASE} H${LEFT} Z`} fill="url(#cheats-rush)" className={moving && cheats ? "fig-fade" : undefined} style={{ "--d": "0.9s" } as Vars} />
          <path
            key={`rush-${run}`}
            d={RUSH}
            fill="none"
            stroke={BLUE}
            strokeLinecap="round"
            pathLength={1}
            className={`fig-s2 ${moving && cheats ? "fig-draw" : ""}`}
            style={{ "--t": "1.7s", "--e": "cubic-bezier(0.3, 0, 0.4, 1)" } as Vars}
          />
          <g key={`quit-${run}`} className={moving && cheats ? "fig-fade" : undefined} style={{ "--d": "1.6s" } as Vars}>
            <path d="M479 321 L493 335 M493 321 L479 335" stroke={BLUE} strokeLinecap="round" className="fig-s2" />
            <text x={486} y={321} dy="-0.8em" textAnchor="middle" className="fig-t" fill="#C9D1D8">
              Quit
            </text>
          </g>
          <g>
            <line x1={262} x2={284} y1={66} y2={66} stroke={BLUE} strokeLinecap="round" className="fig-s2" />
            <text x={292} y={66} dy="0.34em" className="fig-t fig-strong" fill="#F5F6F7">
              Cheats on
            </text>
          </g>
        </g>

        {/* Cheats off */}
        <g style={{ opacity: cheats ? 0.3 : 1, transition: "opacity 0.5s" }}>
          <path key={`climb-wash-${run}`} d={`${CLIMB} V${BASE} H${LEFT} Z`} fill="url(#cheats-wash)" className={moving && !cheats ? "fig-fade" : undefined} style={{ "--d": "2.6s" } as Vars} />
          <path
            key={`climb-${run}`}
            d={CLIMB}
            fill="none"
            stroke={GOLD}
            strokeLinecap="round"
            pathLength={1}
            className={`fig-s2 ${moving && !cheats ? "fig-draw" : ""}`}
            style={{ "--t": `${CLIMB_SECONDS}s`, "--e": "linear" } as Vars}
          />
          {WON.map((p, i) => (
            <rect
              key={`won-${i}-${run}`}
              x={p.x}
              y={p.y}
              fill={GOLD}
              stroke="#1b2126"
              className={`fig-gem ${moving && !cheats ? "fig-pop" : ""}`}
              style={{ "--d": `${(CLIMB_SECONDS * (i + 1)) / 6}s` } as Vars}
            />
          ))}
          <g>
            <line x1={612} x2={634} y1={40} y2={40} stroke={GOLD} strokeLinecap="round" className="fig-s2" />
            <text x={642} y={40} dy="0.34em" className="fig-t fig-strong" fill="#F5F6F7">
              Cheats off
            </text>
          </g>
        </g>
      </svg>
    </Shell>
  );
}
