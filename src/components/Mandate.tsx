import type { Mandate as MandateData, Position } from "@/content/positions";
import { Reveal } from "./primitives";

/**
 * For a chapter with one role: the role's header, then the mandate in lanes.
 * Replaces the role selector, which is a tab list with one tab there.
 */
export default function Mandate({
  position,
  lanes,
}: {
  position: Position;
  lanes: MandateData[];
}) {
  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-6">
          <h3 className="home-display text-2xl font-semibold md:text-3xl">{position.title}</h3>
          <p className="readout">
            {position.period}
            {position.duration ? ` · ${position.duration}` : ""} · {position.location}
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-10 md:gap-x-12">
        {lanes.map((l, i) => (
          <Reveal key={l.lane} delay={0.08 * i}>
            <h4 className="mb-3 flex items-center gap-3 text-lg font-semibold text-accent">
              <span className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-accent" aria-hidden="true" />
              {l.lane}
            </h4>
            <ul className="bullets space-y-2.5 text-sm text-[#C9D1D8] md:space-y-3 md:text-base md:leading-snug">
              {l.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
