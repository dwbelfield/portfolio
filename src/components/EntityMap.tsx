import type { EntityMap as EntityMapData } from "@/content/positions";
import { Reveal } from "./primitives";

const COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

/**
 * Org map for a portfolio chapter: parent on top, function groups below,
 * entities under each. Connectors are hairlines drawn with borders so the
 * map stays responsive; on small screens the groups stack.
 */
export default function EntityMap({ data }: { data: EntityMapData }) {
  const cols = data.groups.length;
  const colClass = COLS[cols] ?? "md:grid-cols-3";
  return (
    <div>
      {/* Parent */}
      <Reveal>
        <div className="mx-auto max-w-md rounded-lg border border-accent/60 bg-panel px-6 py-5 text-center">
          <p className="label mb-2">Parent</p>
          <p className="text-2xl font-semibold tracking-tight">
            {data.parentHref ? (
              <a href={data.parentHref} target="_blank" rel="noreferrer" className="link-draw">
                {data.parent}
              </a>
            ) : (
              data.parent
            )}
          </p>
          <p className="mt-2 text-sm text-muted">{data.parentBlurb}</p>
        </div>
      </Reveal>

      {/* Connectors (desktop): stem from the parent, a bus across the group
          centres, and one stub down to each group. */}
      <div className="hidden md:block" aria-hidden="true">
        <div className="mx-auto h-10 w-px bg-line" />
        <div
          className="border-t border-line"
          style={{ marginLeft: `${50 / cols}%`, marginRight: `${50 / cols}%` }}
        />
        <div className={`grid ${colClass} md:gap-8`}>
          {data.groups.map((g) => (
            <div key={g.name} className="mx-auto h-8 w-px bg-line" />
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className={`mt-6 grid gap-6 md:mt-0 md:gap-8 ${colClass}`}>
        {data.groups.map((g, i) => (
          <Reveal key={g.name} delay={0.1 + i * 0.08}>
            <div className="flex h-full flex-col rounded-lg border border-line bg-bg">
              <div className="border-b border-line px-5 py-4">
                <p className="label mb-1">
                  <span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {g.name}
                </p>
                <p className="text-sm text-muted">{g.blurb}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-px bg-line">
                {g.entities.map((e) => (
                  <li key={e.name} className="bg-bg px-5 py-3 last:flex-1">
                    <p className={`font-medium ${e.name === "and more" ? "text-muted" : "text-fg"}`}>
                      {e.href ? (
                        <a href={e.href} target="_blank" rel="noreferrer" className="link-draw">
                          {e.name}
                        </a>
                      ) : (
                        e.name
                      )}
                    </p>
                    {e.note && <p className="readout mt-0.5">{e.note}</p>}
                    {e.children && (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${e.name} properties`}>
                        {e.children.map((c) => (
                          <li key={c.name}>
                            {c.href ? (
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noreferrer"
                                className="label inline-block rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] transition-colors hover:border-accent hover:text-fg"
                              >
                                {c.name}
                              </a>
                            ) : (
                              <span className="label inline-block rounded-full border border-line px-2.5 py-0.5 text-[0.65rem]">
                                {c.name}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
