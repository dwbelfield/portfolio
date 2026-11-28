"use client";

import { Shell, stars, useFigure } from "./shell";

/**
 * The wall they build themselves: a course of brick for every small habit,
 * laid from the bottom up under a night sky. The top course is unfinished;
 * the next brick hangs over the gap.
 */

type Brick = { name?: string; span: 1 | 2; kind?: "open" | "gap" };
// Top course first, as it is drawn.
const COURSES: Brick[][] = [
  [{ span: 1, kind: "gap" }, { name: "Get back up", span: 2 }, { span: 2, kind: "open" }, { span: 1, kind: "gap" }],
  [{ name: "Family dinner", span: 2 }, { name: "Kindness", span: 2 }, { name: "Respect", span: 2 }],
  [{ span: 1 }, { name: "Books", span: 2 }, { name: "Puzzles", span: 2 }, { span: 1 }],
  [{ name: "Dishes", span: 2 }, { name: "Toys", span: 2 }, { name: "Beds", span: 2 }],
];
const laid = (course: Brick[]) => course.filter((b) => !b.kind).length;
/** A brick's place in the order they land: bottom course first, left to right. */
const landing = (r: number, i: number) => COURSES.slice(r + 1).reduce((n, c) => n + laid(c), 0) + laid(COURSES[r].slice(0, i));
const TOTAL = COURSES.reduce((n, c) => n + laid(c), 0);
const SKY = stars(70, 816, 190, 5);

type Vars = React.CSSProperties & Record<`--${string}`, string>;
const BEAT = 0.17; // seconds between bricks

export default function Wall() {
  const [frame, on] = useFigure(816);
  return (
    <Shell
      frame={frame}
      on={on}
      className="wall-sky"
      label="A brick wall going up under a night sky with Mars in it. Each brick is a habit: dishes, toys, beds, books, puzzles, family dinner, kindness, respect, get back up. The top course is unfinished and the next brick hangs over the gap."
    >
      <svg viewBox="0 0 816 190" className="absolute inset-x-0 top-0" aria-hidden="true" preserveAspectRatio="xMidYMin slice">
        <defs>
          <radialGradient id="wall-mars" cx="0.35" cy="0.32" r="0.8">
            <stop offset="0" stopColor="#F3B08C" />
            <stop offset="0.55" stopColor="#CF6A3E" />
            <stop offset="1" stopColor="#5E2A14" />
          </radialGradient>
          <radialGradient id="wall-glow">
            <stop offset="0" stopColor="#E8794A" stopOpacity="0.45" />
            <stop offset="1" stopColor="#E8794A" stopOpacity="0" />
          </radialGradient>
        </defs>
        {SKY.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * 0.8} className="fig-twinkle" style={{ "--d": `${-(i % 9) * 0.6}s`, "--t": `${4 + (i % 5)}s` } as Vars} />
        ))}
        <circle cx="708" cy="52" r="44" fill="url(#wall-glow)" />
        <circle cx="708" cy="52" r="15" fill="url(#wall-mars)" />
      </svg>

      <div className="relative mx-auto grid max-w-[640px] gap-[5px] px-4 pb-0 pt-24 md:gap-[7px] md:pt-28" aria-hidden="true">
        {COURSES.map((course, r) => (
          <div key={r} className="grid grid-cols-6 gap-[5px] md:gap-[7px]">
            {course.map((b, i) => {
              const span = b.span === 2 ? "col-span-2" : "col-span-1";
              if (b.kind === "gap") return <span key={i} className={span} />;
              if (b.kind === "open")
                return (
                  <span key={i} className={`${span} relative block h-11 rounded-[5px] border-2 border-dashed border-white/25 md:h-[52px]`}>
                    <span className="wall-next absolute inset-x-0 -top-[150%] block h-11 md:h-[52px]" style={{ "--d": `${0.2 + TOTAL * BEAT}s` } as Vars}>
                      <span className="wall-brick wall-brick-3 wall-hover block h-full" />
                    </span>
                  </span>
                );
              return (
                <span
                  key={i}
                  className={`${span} wall-brick wall-brick-${(r * 2 + i) % 4} wall-land home-display flex h-11 items-center justify-center px-1 text-center text-[12.5px] font-semibold leading-none md:h-[52px] md:text-[15px]`}
                  style={{ "--d": `${0.2 + landing(r, i) * BEAT}s` } as Vars}
                >
                  {b.name}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      {/* The ground the wall stands on. */}
      <div className="relative h-5 bg-[#06080B] shadow-[0_-10px_24px_rgba(0,0,0,0.6)] md:h-6" aria-hidden="true" />
    </Shell>
  );
}
