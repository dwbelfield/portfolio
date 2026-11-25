import type { Architecture as ArchitectureData, StepKind } from "@/content/positions";
import { Reveal } from "./primitives";

/** How each kind of step is labelled and coloured: amber marks where a model is trusted to judge. */
const kinds: Record<StepKind, { label: string; chip: string; dot: string }> = {
  code: { label: "Deterministic code", chip: "border-line text-muted", dot: "bg-muted" },
  retrieval: { label: "Embedding retrieval", chip: "border-line text-muted", dot: "bg-muted" },
  model: { label: "Trained model", chip: "border-line text-fg", dot: "bg-fg" },
  llm: { label: "LLM call", chip: "border-accent text-accent", dot: "bg-accent" },
  agent: { label: "AI agent", chip: "border-accent text-accent", dot: "bg-accent" },
  record: { label: "Shared record", chip: "border-line text-muted", dot: "bg-muted" },
  human: { label: "Human decision", chip: "border-fg bg-fg text-bg", dot: "bg-fg ring-2 ring-fg/30" },
};

/**
 * A system drawn as its pipeline: each step in order, tagged by what does the
 * work (code, retrieval, a model, an LLM, a person), beside the guardrails
 * that keep it honest. Plain markup, so it reads the same to an agent as to a person.
 */
export default function Architecture({ data }: { data: ArchitectureData }) {
  const used = [...new Set(data.steps.map((s) => s.kind))];
  return (
    <div>
      <Reveal>
        <span className="rule mb-4" />
        <p className="label mb-3">How it works</p>
        <h2 className="max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">{data.title}</h2>
        <p className="mt-4 max-w-2xl text-base text-muted md:mt-6 md:text-lg">{data.intro}</p>
      </Reveal>

      <div className="mt-10 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
        {/* Pipeline */}
        <div className="lg:col-span-7">
          <p className="label mb-6">{data.pipelineLabel ?? "The pipeline"}</p>
          <ol className="relative">
            {/* The rail the steps hang from. */}
            <span className="absolute bottom-3 left-[5px] top-3 w-px bg-line" aria-hidden="true" />
            {data.steps.map((s, i) => (
              <li key={s.name} className="relative pb-8 pl-8 last:pb-0 md:pl-10">
                <Reveal delay={i * 0.05}>
                  <span
                    className={`absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full ${kinds[s.kind].dot}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="readout text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">{s.name}</h3>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-wider ${kinds[s.kind].chip}`}>
                      {kinds[s.kind].label}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm text-muted md:text-base">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5" aria-label="Key">
            {used.map((k) => (
              <li key={k} className="readout flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${kinds[k].dot}`} aria-hidden="true" />
                {kinds[k].label}
              </li>
            ))}
          </ul>
        </div>

        {/* Guardrails */}
        <div className="lg:col-span-5">
          <p className="label mb-6">Guardrails</p>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
            {data.guardrails.map((g, i) => (
              <li key={g.name} className="bg-bg">
                <Reveal delay={i * 0.05} className="p-5 md:p-6">
                  <h3 className="text-base font-semibold tracking-tight md:text-lg">{g.name}</h3>
                  <p className="mt-2 text-sm text-muted">{g.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          {data.note && <p className="readout mt-5">{data.note}</p>}
        </div>
      </div>
    </div>
  );
}
