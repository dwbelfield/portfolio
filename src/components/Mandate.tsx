import type { Mandate as MandateData, Position } from "@/content/positions";
import { Reveal } from "./primitives";

/**
 * For a chapter with one role: the role's header, then the mandate in lanes.
 * Replaces the role selector, which is a tab list with one tab there.
 */
export default function Mandate({
  position,
  lanes,
  eyebrow = "Mandate",
}: {
  position: Position;
  lanes: MandateData[];
  eyebrow?: string;
}) {
  return (
    <div>
      <span className="rule mb-4" />
      <p className="label mb-10">{eyebrow}</p>

      <Reveal>
        <div className="grid gap-4 border-b border-line pb-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{position.title}</h3>
            <p className="readout mt-2">
              {position.period}
              {position.duration ? ` · ${position.duration}` : ""} · {position.location}
            </p>
          </div>
          {position.tags && (
            <ul className="flex flex-wrap content-start items-start gap-2 self-start md:col-span-8 md:justify-end" aria-label="Skills">
              {position.tags.map((t) => (
                <li key={t} className="label rounded-full border border-line px-3 py-1.5 leading-none">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-x-12">
        {lanes.map((l, i) => (
          <Reveal key={l.lane} delay={0.08 * i}>
            <p className="label mb-4">
              <span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
              {l.lane}
            </p>
            <ul className="bullets space-y-3 text-base text-fg md:text-lg md:leading-snug">
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
