"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { Shell, stars, useFigure } from "./shell";

/**
 * How far the last frontier is, to scale. It opens on the Earth and the Moon
 * filling the frame, then pulls back, counting in Moon-distances, until Mars
 * comes into view: at its closest, about 142 times as far.
 *
 * The distances are to scale along the line. The discs are not (to scale,
 * every one of them would be smaller than a pixel).
 */

const W = 816;
const H = 330;
const MOON_KM = 384_400; // average distance to the Moon
const MARS_KM = 54_600_000; // Mars at its closest approach
const RATIO = MARS_KM / MOON_KM; // 142.04
const EARTH_X = 64;
const SPAN = 664; // one Moon-distance fills this much of the frame when fully zoomed in
const Y = 184;
const FAR = 1 / RATIO;
const SKY = stars(60, W, H, 23);

// One round: hold on the Moon, pull back, hold on Mars, fade.
const HOLD_NEAR = 2.4;
const PULL = 6.5;
const HOLD_FAR = 7;
const FADE = 0.7;
const ROUND = HOLD_NEAR + PULL + HOLD_FAR + FADE;

const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/** At `t` seconds into a round: the zoom (1 = Moon fills the frame) and how visible the scene is. */
function at(t: number): { k: number; show: number } {
  if (t < HOLD_NEAR) return { k: 1, show: Math.min(1, t / 0.5) };
  if (t < HOLD_NEAR + PULL) return { k: Math.exp(Math.log(FAR) * ease((t - HOLD_NEAR) / PULL)), show: 1 };
  if (t < ROUND - FADE) return { k: FAR, show: 1 };
  return { k: FAR, show: Math.max(0, (ROUND - t) / FADE) };
}

const STEPS = [1, 2, 5, 10, 20, 50];

export default function Distance() {
  const [frame, on] = useFigure(W);
  const reduced = useReducedMotion();
  const [state, setState] = useState({ k: FAR, show: 1 });

  useEffect(() => {
    if (!on || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setState(at(((now - start) / 1000) % ROUND));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, reduced]);

  const { k, show } = state;
  const x = (moons: number) => EARTH_X + SPAN * k * moons;
  const grow = Math.pow(k, 0.6);
  const earthR = 2.6 + 25.4 * grow;
  const moonR = 1.3 + 6.7 * grow;
  const marsX = x(RATIO);
  const times = Math.round(1 / k);

  // The ruler: a tick every so many Moon-distances, kept comfortably apart.
  const every = STEPS.find((s) => SPAN * k * s >= 30) ?? 50;
  const ticks: number[] = [];
  for (let n = every; x(n) < W - 8 && n < RATIO; n += every) ticks.push(n);

  const near = Math.max(0, Math.min(1, (k - 0.25) / 0.4)); // the Moon's own label
  const far = Math.max(0, Math.min(1, (0.012 - k) / 0.004)); // Mars's label and the speck's

  return (
    <Shell
      frame={frame}
      on={on}
      className="bg-[#05070C]"
      label={`A scale drawing. The Moon is ${MOON_KM.toLocaleString("en-US")} kilometres from Earth. The view pulls back until Mars appears: at its closest it is 54.6 million kilometres away, about 142 times as far as the Moon.`}
    >
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <radialGradient id="dist-earth" cx="0.35" cy="0.32" r="0.8">
            <stop offset="0" stopColor="#9FD3FF" />
            <stop offset="0.55" stopColor="#2F7DD6" />
            <stop offset="1" stopColor="#0C2C5E" />
          </radialGradient>
          <radialGradient id="dist-moon" cx="0.35" cy="0.32" r="0.8">
            <stop offset="0" stopColor="#F4F4F0" />
            <stop offset="1" stopColor="#8D9299" />
          </radialGradient>
          <radialGradient id="dist-mars" cx="0.35" cy="0.32" r="0.8">
            <stop offset="0" stopColor="#F3B08C" />
            <stop offset="0.55" stopColor="#CF6A3E" />
            <stop offset="1" stopColor="#5E2A14" />
          </radialGradient>
          <radialGradient id="dist-glow">
            <stop offset="0" stopColor="#E8794A" stopOpacity="0.5" />
            <stop offset="1" stopColor="#E8794A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {SKY.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.8} fill="#fff" opacity={s.o * 0.6} />
        ))}

        <g opacity={show}>
          {/* The count, top right. */}
          <text x={W - 24} y="66" textAnchor="end" className="fig-t fig-hero" fill="#F5F6F7">
            {times.toLocaleString("en-US")}×
          </text>
          <text x={W - 24} y="66" dy="1.6em" textAnchor="end" className="fig-t" fill="#9AA6B0">
            the distance to the Moon
          </text>

          {/* The line out from Earth, ticked in Moon-distances. */}
          <line x1={EARTH_X} x2={W} y1={Y} y2={Y} stroke="rgba(255,255,255,0.2)" className="fig-s1" />
          {ticks.map((n) => (
            <line key={n} x1={x(n)} x2={x(n)} y1={Y - 6} y2={Y + 6} stroke="rgba(255,255,255,0.35)" className="fig-s1" />
          ))}
          {every >= 10 &&
            ticks
              .filter((n) => n % 50 === 0)
              .map((n) => (
                <text key={n} x={x(n)} y={Y} dy="-1.1em" textAnchor="middle" className="fig-t fig-t-sm fig-num" fill="#7F8B95" opacity={far}>
                  {n}×
                </text>
              ))}

          {/* Mars */}
          {marsX < W + 80 && (
            <g>
              <circle cx={marsX} cy={Y} r="46" fill="url(#dist-glow)" />
              <circle cx={marsX} cy={Y} r="17" fill="url(#dist-mars)" />
              <g opacity={far}>
                <text x={marsX + 20} y={Y} dy="3.3em" textAnchor="end" className="fig-t fig-strong" fill="#F5F6F7">
                  Mars, at its closest
                </text>
                <text x={marsX + 20} y={Y} dy="4.8em" textAnchor="end" className="fig-t fig-num" fill="#9AA6B0">
                  54.6 million km
                </text>
              </g>
            </g>
          )}

          {/* The Moon, then Earth on top. */}
          <circle cx={x(1)} cy={Y} r={moonR} fill="url(#dist-moon)" />
          <g opacity={near}>
            <text x={x(1)} y={Y} dy="3.3em" textAnchor="middle" className="fig-t fig-strong" fill="#F5F6F7">
              The Moon
            </text>
            <text x={x(1)} y={Y} dy="4.8em" textAnchor="middle" className="fig-t fig-num" fill="#9AA6B0">
              {MOON_KM.toLocaleString("en-US")} km
            </text>
          </g>
          <circle cx={EARTH_X} cy={Y} r={earthR} fill="url(#dist-earth)" />
          <text x={EARTH_X - 8} y={Y} dy="3.3em" className="fig-t fig-strong" fill="#F5F6F7" opacity={near}>
            Earth
          </text>
          <g opacity={far}>
            <text x={EARTH_X - 8} y={Y} dy="3.3em" className="fig-t fig-strong" fill="#F5F6F7">
              Earth and Moon
            </text>
            <text x={EARTH_X - 8} y={Y} dy="4.8em" className="fig-t fig-num" fill="#9AA6B0">
              {MOON_KM.toLocaleString("en-US")} km apart
            </text>
          </g>
        </g>
      </svg>
    </Shell>
  );
}
