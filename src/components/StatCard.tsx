import type { Stat } from "@/content/site";
import { Counter, Reveal } from "./primitives";

/**
 * One figure, on a raised card with the organisation's mark behind it: the
 * same surface as the outcome cards on the home page. It renders one group of
 * a definition list (term, then value), so it belongs directly inside a <dl>;
 * the value is drawn above its label.
 */
export default function StatCard({
  stat: s,
  index,
  mark,
  className = "",
}: {
  stat: Stat;
  index: number;
  /** The organisation's square mark, white on transparent (path under /public). */
  mark?: string;
  className?: string;
}) {
  return (
    <Reveal
      delay={index * 0.06}
      className={`home-raised home-lift group relative flex flex-col-reverse justify-end gap-3 overflow-hidden rounded-xl p-4 transition-[translate,border-color] duration-300 hover:-translate-y-1 md:p-6 ${className}`}
    >
      <dt className="relative text-[15px] font-semibold leading-snug md:text-lg">
        {s.label}
        {s.from && <span className="mt-1 block font-mono text-[12px] font-normal text-[#9AA6B0] md:text-[13px]">{s.from}</span>}
      </dt>
      <dd className="home-display relative text-[34px] font-bold leading-none text-accent md:text-6xl">
        {s.text ?? <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} grouped={s.grouped} />}
      </dd>
      {mark && (
        <span
          aria-hidden="true"
          className="logo-mask pointer-events-none absolute -right-[7%] top-1/2 aspect-square h-[82%] -translate-y-1/2 text-white/[0.055] group-hover:text-white/[0.11]"
          style={{ maskImage: `url(${mark})`, WebkitMaskImage: `url(${mark})` }}
        />
      )}
    </Reveal>
  );
}
