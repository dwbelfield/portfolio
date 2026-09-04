import { transformations, range } from "@/content/site";
import { Counter, Reveal } from "./primitives";

/**
 * The home proof strip as before-and-after pairs: the chaos value in steel,
 * an amber rule, then the order value counting up (or down) from it.
 */
export default function Transformations() {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
        {transformations.map((t, i) => (
          <Reveal key={t.label} delay={i * 0.06} className="bg-bg">
            <div className="flex h-full flex-col p-4 md:p-8">
              <dt className="label">{t.label}</dt>
              <p className="readout mt-3 text-muted md:mt-4">
                {t.fromText ?? `${t.prefix ?? ""}${t.from?.toFixed(t.decimals ?? 0)}${t.suffix ?? ""}`}
              </p>
              <span className="rule my-2 md:my-3" />
              <dd className="text-3xl font-semibold tracking-tight md:text-6xl">
                <Counter
                  value={t.to}
                  from={t.from ?? 0}
                  decimals={t.decimals}
                  prefix={t.prefix}
                  suffix={t.suffix}
                />
              </dd>
              {t.note && <p className="readout mt-2">{t.note}</p>}
            </div>
          </Reveal>
        ))}
      </dl>
      <Reveal delay={0.4}>
        <p className="mt-6 max-w-3xl text-sm text-muted md:mt-8 md:text-base">{range}</p>
      </Reveal>
    </div>
  );
}
