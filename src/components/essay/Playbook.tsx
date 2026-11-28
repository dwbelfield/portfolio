"use client";

import { Caveat } from "next/font/google";
import { Shell, useFigure } from "./shell";

/**
 * Two plays chalked on a coach's board. Mine is a clean route: three marks to
 * hit, then the end zone. Theirs starts the same way, with two players (aged
 * 3 and 4), then loses the thread: the route knots, breaks into guesses, and
 * the end zone has been rubbed out.
 */

const chalk = Caveat({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });

const W = 408;
const H = 300;
const INK = "#F1EEE4";

type Vars = React.CSSProperties & Record<`--${string}`, string>;
const d = (s: number): Vars => ({ "--d": `${s}s` });

/** Chalk: a wobble on every edge, and a grain that lets the board show through. */
function ChalkFilter({ id, seed }: { id: string; seed: number }) {
  return (
    <filter id={id} x="-4%" y="-4%" width="108%" height="108%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} result="wobble" />
      <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="rough" />
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="1" seed={seed + 5} result="grain" />
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.5 0 0 0 1.55" result="mask" />
      <feComposite in="rough" in2="mask" operator="in" />
    </filter>
  );
}

function Board({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {/* Yard lines, barely there. */}
      {[68, 136, 204, 272, 340].map((x) => (
        <line key={x} x1={x} x2={x} y1="14" y2={H - 14} stroke="#fff" strokeOpacity="0.045" strokeWidth="2" />
      ))}
      {children}
    </svg>
  );
}

const cross = (x: number, y: number) => `M${x - 8} ${y - 8} L${x + 8} ${y + 8} M${x + 8} ${y - 8} L${x - 8} ${y + 8}`;
const HATCH = Array.from({ length: 6 }, (_, i) => {
  // Diagonals across the end zone, clipped to its box (332..394 by 60..124).
  const c = 352 + i * 18;
  const x1 = Math.max(332, c - 64);
  const x2 = Math.min(394, c);
  return `M${x1} ${60 + (c - x1)} L${x2} ${60 + (c - x2)}`;
}).join(" ");

export default function Playbook() {
  const [frame, on] = useFigure(816);
  return (
    <Shell
      frame={frame}
      on={on}
      role="group"
      className={`playbook ${chalk.className}`}
      label="Two plays drawn in chalk. Mine: a route through school, uniform and a trade or degree into an end zone marked middle class. Theirs: two players, aged four and three, whose route knots, breaks into three guesses and ends at an end zone that has been rubbed out, leaving a question mark."
    >
      <div className="grid md:grid-cols-2">
        <Board label="Mine: school, uniform, trade or degree, then the middle class.">
          <defs>
            <ChalkFilter id="chalk-mine" seed={3} />
          </defs>
          <g filter="url(#chalk-mine)" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <text x="22" y="46" fontSize="34" fontWeight="700" fill={INK} stroke="none">
              Mine
            </text>
            <circle cx="46" cy="238" r="13" className="fig-fade" style={d(0.1)} />
            {/* The route, and its arrowhead at the end zone. */}
            <path d="M59 231 L132 188 L214 212 L290 150 L330 114" pathLength={1} className="fig-draw" style={{ "--t": "2s", "--e": "linear", ...d(0.3) } as Vars} />
            <path d="M315 117 L332 112 L326 128" className="fig-fade" style={d(2.2)} />
            {/* The marks to hit. */}
            <path d={cross(132, 188)} className="fig-pop" style={d(0.8)} />
            <path d={cross(214, 212)} className="fig-pop" style={d(1.3)} />
            <path d={cross(290, 150)} className="fig-pop" style={d(1.9)} />
            {/* The end zone. */}
            <g className="fig-fade" style={d(2.3)}>
              <rect x="332" y="60" width="62" height="64" strokeWidth="3.4" />
              <path d={HATCH} strokeWidth="2" strokeOpacity="0.75" />
            </g>
            <g fill={INK} stroke="none" fontSize="23" fontWeight="500">
              <text x="132" y="168" textAnchor="middle" className="fig-fade" style={d(0.9)}>
                School
              </text>
              <text x="214" y="246" textAnchor="middle" className="fig-fade" style={d(1.4)}>
                Uniform
              </text>
              <text x="276" y="132" textAnchor="end" className="fig-fade" style={d(2)}>
                Trade or degree
              </text>
              <text x="396" y="48" textAnchor="end" fontWeight="700" className="fig-fade" style={d(2.5)}>
                Middle class
              </text>
            </g>
          </g>
        </Board>

        <div className="border-t border-white/[0.07] md:border-l md:border-t-0">
          <Board label="Theirs: the route knots, breaks into guesses, and the end zone is rubbed out.">
            <defs>
              <ChalkFilter id="chalk-theirs" seed={9} />
              <filter id="chalk-smudge" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            {/* Where an end zone was rubbed out with the heel of a hand. */}
            <ellipse cx="360" cy="94" rx="54" ry="44" fill="#fff" opacity="0.07" filter="url(#chalk-smudge)" />
            <ellipse cx="346" cy="112" rx="38" ry="20" fill="#fff" opacity="0.05" filter="url(#chalk-smudge)" transform="rotate(-18 346 112)" />
            <g filter="url(#chalk-theirs)" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <text x="22" y="46" fontSize="34" fontWeight="700" fill={INK} stroke="none">
                Theirs
              </text>
              {/* Two players: 4 and 3. */}
              <g className="fig-fade" style={d(2.6)}>
                <circle cx="46" cy="238" r="13" />
                <circle cx="82" cy="258" r="12" />
                <g fill={INK} stroke="none" fontSize="19" fontWeight="700" textAnchor="middle">
                  <text x="46" y="244.5">4</text>
                  <text x="82" y="264.5">3</text>
                </g>
              </g>
              {/* The ghost of the end zone. */}
              <g strokeOpacity="0.16">
                <rect x="332" y="60" width="62" height="64" strokeWidth="3.4" />
                <path d={HATCH} strokeWidth="2" />
              </g>
              {/* The route: it starts the same way, then knots. */}
              <path
                d="M59 231 L126 191 C150 176 180 178 180 200 C180 222 148 220 152 198 C156 174 196 166 216 174"
                pathLength={1}
                className="fig-draw"
                style={{ "--t": "2s", "--e": "linear", ...d(2.9) } as Vars}
              />
              {/* Three guesses at where it goes next. */}
              <g strokeDasharray="6 10" strokeWidth="2.8">
                <path d="M224 168 L270 132" strokeOpacity="0.8" className="fig-fade" style={d(4.9)} />
                <path d="M228 178 L286 184" strokeOpacity="0.62" className="fig-fade" style={d(5.2)} />
                <path d="M222 186 L258 232" strokeOpacity="0.45" className="fig-fade" style={d(5.5)} />
              </g>
              <g fill={INK} stroke="none" fontSize="30" fontWeight="700" textAnchor="middle">
                <text x="284" y="130" opacity="0.85" className="fig-fade" style={d(5)}>
                  ?
                </text>
                <text x="302" y="194" opacity="0.65" className="fig-fade" style={d(5.3)}>
                  ?
                </text>
                <text x="268" y="258" opacity="0.5" className="fig-fade" style={d(5.6)}>
                  ?
                </text>
              </g>
              <text x="363" y="116" fontSize="64" fontWeight="700" fill={INK} stroke="none" textAnchor="middle" className="fig-fade" style={d(5.9)}>
                ?
              </text>
            </g>
          </Board>
        </div>
      </div>
    </Shell>
  );
}
