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
  // "The Delphi Engine: language models raise…" reads as a short heading and a lead line.
  const cut = data.title.indexOf(": ");
  const title = cut < 0 ? data.title : data.title.slice(0, cut);
  const lead = cut < 0 ? "" : data.title.slice(cut + 2);
  return (
    <div>
      <Reveal>
        <h2 className="home-display max-w-4xl text-4xl font-bold leading-none md:text-5xl">{title}</h2>
        {lead && <p className="mt-3 max-w-2xl text-lg font-semibold text-accent md:text-xl">{lead.charAt(0).toUpperCase() + lead.slice(1)}.</p>}
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">{data.intro}</p>
      </Reveal>

      <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:gap-8">
        {/* Pipeline */}
        <div className="home-raised rounded-2xl px-6 py-7 md:px-9 md:py-9 lg:col-span-7">
          <h3 className="home-display mb-6 text-2xl font-semibold">{data.pipelineLabel ?? "The pipeline"}</h3>
          <div className="relative">
            {/* The rail the steps hang from. */}
            <span className="absolute bottom-3 left-[5px] top-3 w-px bg-line" aria-hidden="true" />
            <ol className="relative">
            {data.steps.map((s, i) => (
              <li key={s.name} className="relative pb-8 pl-8 last:pb-0 md:pl-10">
                <Reveal delay={i * 0.05}>
                  <span
                    className={`absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full ${kinds[s.kind].dot}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="readout text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h4 className="text-lg font-semibold tracking-tight md:text-xl">{s.name}</h4>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-wider ${kinds[s.kind].chip}`}>
                      {kinds[s.kind].label}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm text-muted md:text-base">{s.body}</p>
                </Reveal>
              </li>
            ))}
            </ol>
          </div>
        </div>

        {/* Guardrails */}
        <div className="lg:col-span-5">
          <h3 className="home-display mb-6 text-2xl font-semibold lg:mt-9">Guardrails</h3>
          <ul className="grid gap-3">
            {data.guardrails.map((g, i) => (
              <li key={g.name} className="home-block rounded-xl border-l-[3px] border-[#91C8D9]">
                <Reveal delay={i * 0.05} className="p-5">
                  <h4 className="text-base font-semibold tracking-tight md:text-lg">{g.name}</h4>
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
