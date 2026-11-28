"use client";

import { Shell, stars, useFigure, useSteps } from "./shell";

/**
 * A house at dusk under a dome. Three dangers come out of the sky and break
 * on the dome. Then AI comes up through the floor: three lines run in from
 * below, named for the friendly jobs it arrives as, and the windows turn from
 * lamp-yellow to screen-blue.
 *
 * Steps: 0 quiet house · 1 the dangers arrive · 2 AI comes in · 3 the
 * finished picture (also what shows with reduced motion or no script).
 */

const W = 816;
const H = 460;
const COPPER = "#E8794A";
const ICY = "#8FD6EE";
const SKY = stars(46, W, 330, 11);

// The dome: centred on the foot of the house.
const CX = 408;
const CY = 366;
const R = 190;
const THREATS = [
  { name: "Photos", angle: 155, tx: 18, ty: 138, anchor: "start" as const },
  { name: "Screens", angle: 90, tx: 428, ty: 62, anchor: "start" as const },
  { name: "Additives", angle: 25, tx: 798, ty: 138, anchor: "end" as const },
].map((t, i) => {
  const a = (t.angle * Math.PI) / 180;
  return {
    ...t,
    i,
    // Where it lands on the dome, and the way it is travelling (toward the house).
    hx: Math.round((CX + R * Math.cos(a)) * 10) / 10,
    hy: Math.round((CY - R * Math.sin(a)) * 10) / 10,
    heading: 180 - t.angle,
  };
});

// AI, under the friendly names it arrives by. Each line runs from its name up into the house.
const WIRES = [
  { name: "Tutor", x: 258, d: "M258 418 C258 394 368 404 368 318" },
  { name: "Companion", x: 408, d: "M408 418 L408 344" },
  { name: "Voice", x: 558, d: "M558 418 C558 394 448 404 448 318" },
];

type Vars = React.CSSProperties & Record<`--${string}`, string>;

export default function Door() {
  const [frame, on] = useFigure(W);
  const step = useSteps(on, [900, 3300, 3600, 5200]);

  return (
    <Shell
      frame={frame}
      on={on}
      step={step}
      className="bg-[#070A10]"
      label="A house at dusk under a protective dome. Photos, screens and additives fall from the sky and break on the dome. From underneath, three lines labelled Tutor, Companion and Voice run up into the house, and its windows turn from warm yellow to screen blue."
    >
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <linearGradient id="door-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#05080F" />
            <stop offset="0.55" stopColor="#0D1626" />
            <stop offset="0.8" stopColor="#2A1C22" />
            <stop offset="0.9" stopColor="#6B3718" />
          </linearGradient>
          <radialGradient id="door-sun" cx="0.5" cy="1" r="1">
            <stop offset="0" stopColor="#F39A2E" stopOpacity="0.75" />
            <stop offset="0.5" stopColor="#E0621C" stopOpacity="0.22" />
            <stop offset="1" stopColor="#E0621C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="door-dome" cx="0.5" cy="1" r="1">
            <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.09" />
          </radialGradient>
          <radialGradient id="door-warm">
            <stop offset="0" stopColor="#F5B63A" stopOpacity="0.55" />
            <stop offset="1" stopColor="#F5B63A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="door-cold">
            <stop offset="0" stopColor={ICY} stopOpacity="0.6" />
            <stop offset="1" stopColor={ICY} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="door-tail" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor={COPPER} stopOpacity="0" />
            <stop offset="1" stopColor={COPPER} />
          </linearGradient>
          <filter id="door-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Dusk */}
        <rect width={W} height={H} fill="url(#door-sky)" />
        <rect x="0" y="230" width={W} height="170" fill="url(#door-sun)" />
        {SKY.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} className="fig-twinkle" style={{ "--d": `${-(i % 9) * 0.6}s`, "--t": `${4 + (i % 5)}s` } as Vars} />
        ))}
        {/* Far ridge, then the hill the house stands on. */}
        <path d="M0 372 L70 352 L150 366 L240 344 L330 362 L470 350 L560 364 L660 342 L740 360 L816 348 V460 H0 Z" fill="#111019" />
        <path d="M0 388 Q408 340 816 388 V460 H0 Z" fill="#06080B" />
        <path d="M0 388 Q408 340 816 388" fill="none" stroke="#F39A2E" strokeOpacity="0.45" className="fig-s1" />

        {/* The light the house throws: lamp-warm, then screen-cold. */}
        <circle cx={CX} cy="324" r="120" fill="url(#door-warm)" className="door-warm" />
        <circle cx={CX} cy="324" r="132" fill="url(#door-cold)" className="door-cold" />

        {/* The dome */}
        <path d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY} Z`} fill="url(#door-dome)" />
        <path d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeLinecap="round" className="fig-s2" />

        {/* The dangers: each streaks in, breaks on the dome and leaves a mark. */}
        {THREATS.map((t) => (
          <g key={t.name} style={{ "--d": `${t.i * 0.55}s` } as Vars}>
            <g transform={`translate(${t.hx} ${t.hy}) rotate(${t.heading})`}>
              <g className="door-comet">
                <line x1="-150" x2="0" y1="0" y2="0" stroke="url(#door-tail)" strokeLinecap="round" strokeWidth="5" />
                <circle r="16" fill={COPPER} opacity="0.5" filter="url(#door-soft)" />
                <circle r="6" fill="#FFE2D2" />
              </g>
            </g>
            <circle cx={t.hx} cy={t.hy} r="22" fill="none" stroke={COPPER} className="fig-s2 door-ripple" />
            <circle cx={t.hx} cy={t.hy} r="4" fill={COPPER} className="door-scar" />
          </g>
        ))}

        {/* A tree, and the house. */}
        <g fill="#06080B">
          <rect x="262" y="330" width="7" height="42" />
          <circle cx="266" cy="318" r="24" />
          <circle cx="248" cy="332" r="16" />
          <circle cx="284" cy="334" r="15" />
          <path d="M322 288 L408 224 L494 288 Z" />
          <rect x="446" y="238" width="18" height="36" />
          <rect x="338" y="284" width="140" height="86" />
        </g>
        <path d="M322 288 L408 224 L494 288" fill="none" stroke="#fff" strokeOpacity="0.22" strokeLinejoin="round" className="fig-s1" />

        {/* AI: three lines up through the floor. */}
        {WIRES.map((w, i) => (
          <g key={w.name} style={{ "--d": `${i * 0.5}s` } as Vars}>
            <path d={w.d} fill="none" stroke={ICY} strokeOpacity="0.55" strokeLinecap="round" pathLength={1} className="fig-s2 door-wire" />
            <path d={w.d} fill="none" stroke="#fff" strokeLinecap="round" pathLength={1} className="fig-s2 door-pulse" />
          </g>
        ))}

        {/* Windows and the door. */}
        <g>
          <rect x="354" y="304" width="28" height="26" rx="2" className="door-win" style={{ "--d": "0s" } as Vars} />
          <rect x="397" y="322" width="22" height="48" rx="2" className="door-win" style={{ "--d": "0.5s" } as Vars} />
          <circle cx="408" cy="264" r="9" className="door-win" style={{ "--d": "0.75s" } as Vars} />
          <rect x="434" y="304" width="28" height="26" rx="2" className="door-win" style={{ "--d": "1s" } as Vars} />
          <path d="M368 304 V330 M354 317 H382 M448 304 V330 M434 317 H462" stroke="#06080B" className="fig-s2" />
        </g>

        {/* Names */}
        {THREATS.map((t) => (
          <text key={t.name} x={t.tx} y={t.ty} textAnchor={t.anchor} className="fig-t fig-strong" fill="#F2C3AD">
            {t.name}
          </text>
        ))}
        {WIRES.map((w, i) => (
          <text key={w.name} x={w.x} y="440" textAnchor="middle" className="fig-t fig-strong door-name" fill="#CDEBF6" style={{ "--d": `${i * 0.5}s` } as Vars}>
            {w.name}
          </text>
        ))}
      </svg>
    </Shell>
  );
}
