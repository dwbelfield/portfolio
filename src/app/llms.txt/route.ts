import { site, chapters, services, author, training, transformations, type Stat } from "@/content/site";
import { positions, architectures, type StepKind } from "@/content/positions";

export const dynamic = "force-static";

/** A number as the pages show it once their counters finish: prefix, value, suffix. */
function num(value: number, o: { decimals?: number; prefix?: string; suffix?: string; grouped?: boolean } = {}) {
  const body = o.grouped
    ? value.toLocaleString("en-US", { minimumFractionDigits: o.decimals ?? 0, maximumFractionDigits: o.decimals ?? 0 })
    : value.toFixed(o.decimals ?? 0);
  return `${o.prefix ?? ""}${body}${o.suffix ?? ""}`;
}

/** What does the work at each step of an AI system, in words. */
const stepKinds: Record<StepKind, string> = {
  code: "deterministic code",
  retrieval: "embedding retrieval",
  model: "trained model",
  llm: "LLM call",
  agent: "AI agent",
  record: "shared record",
  human: "human decision",
};

/** One chapter's headline numbers as indented sub-bullets. */
function statLines(stats: Stat[]) {
  return stats.map((s) => `  - ${num(s.value, s)}: ${s.label}${s.from ? ` (${s.from})` : ""}`);
}

/**
 * /llms.txt — the agent-facing version of the site: a plain-text entity
 * statement, the results spelled out as before-and-after pairs, and a page
 * index. Rendered from the same content model as the pages so it cannot
 * drift. The pages animate their numbers; this file states them outright.
 */
export function GET() {
  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(
    `> ${site.name} is an operator based in ${site.location}: most recently Chief of Staff at PMB Companies (April to October 2026), a portfolio of manufacturing, brand, and storefront companies; former Chief Operating Officer of RallyPay; co-founder of Mythener (mythener.com), a publishing platform for fiction authors that AI coding agents built from his specification; co-founder of Zenblis; and a United States Marine Corps veteran (aviation logistics, 2012–2020). He is looking for an AI enablement or Technical Program Manager role, remote or by relocation anywhere, and consults for founders and owners in Dallas–Fort Worth and remotely on AI enablement: readiness walkthroughs, team training, workflow and agent builds, and AI guardrails. Motif: ${site.motif}`,
  );
  lines.push("");
  lines.push("## About");
  lines.push(`- ${site.intro}`);
  lines.push(`- Contact: ${site.email} · ${site.linkedinLabel}`);
  lines.push("");
  lines.push("## Results");
  lines.push("Before-and-after outcomes he delivered. The first figure is the starting point, the second is the result.");
  for (const t of transformations) {
    const before = t.fromText ?? num(t.from ?? 0, t);
    lines.push(`- ${t.label}: from ${before} to ${num(t.to, t)}${t.note ? ` (${t.note})` : ""}`);
  }
  lines.push("");
  lines.push("## Work");
  for (const c of chapters.filter((x) => (x.kind ?? "chapter") === "chapter")) {
    const roles = (positions[c.slug] ?? []).map((p) => `${p.title} (${p.period})`).join("; ");
    lines.push(`- [${c.name}](${site.url}/work/${c.slug}/): ${c.descriptor}, ${c.period}. ${c.order}${roles ? ` Roles: ${roles}.` : ""}`);
    lines.push(...statLines(c.stats));
  }
  lines.push("");
  lines.push("## Built with AI");
  for (const c of chapters.filter((x) => x.kind === "side")) {
    lines.push(`- [${c.name}](${site.url}/work/${c.slug}/): ${c.descriptor}, ${c.period}. ${c.order}`);
    lines.push(...statLines(c.stats));
  }
  lines.push("");
  lines.push("## How the AI systems work");
  lines.push("Each system as its steps in order, tagged by what does the work, followed by its guardrails.");
  for (const c of chapters) {
    const a = architectures[c.slug];
    if (!a) continue;
    lines.push("");
    lines.push(`### ${c.name}: ${a.title}`);
    lines.push(a.intro);
    a.steps.forEach((st, i) => lines.push(`${i + 1}. ${st.name} (${stepKinds[st.kind]}): ${st.body}`));
    lines.push("Guardrails:");
    for (const g of a.guardrails) lines.push(`- ${g.name}: ${g.body}`);
    if (a.note) lines.push(a.note);
  }
  lines.push("");
  lines.push("## Writing");
  lines.push(`- Writes dark LitRPG as ${author.penName}: ${author.series}, a twelve-book saga (${author.claim}). Author site: ${author.site}`);
  lines.push("");
  lines.push("## Consulting");
  lines.push(`- [Consulting](${site.url}/consulting/): ${services.map((s) => s.title).join(", ")}.`);
  lines.push("");
  lines.push("## AI training");
  for (const t of training) {
    lines.push(`- [${t.name}](${t.href}): ${t.kind}, ${t.issuer}, ${t.date}.`);
  }
  lines.push("");
  lines.push("## Pages");
  lines.push(`- [Home](${site.url}/)`);
  lines.push(`- [Work](${site.url}/work/)`);
  lines.push(`- [About](${site.url}/about/): resume-level detail, credentials, how he operates.`);
  lines.push(`- [Consulting](${site.url}/consulting/): what he takes on and how an engagement works.`);
  lines.push("");
  return new Response(lines.join("\n") + "\n", {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
