import { site, chapters, services } from "@/content/site";
import { positions } from "@/content/positions";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text entity statement and page index for answer engines,
 * rendered from the same content model as the pages so it cannot drift.
 */
export function GET() {
  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(
    `> ${site.name} is an operator based in ${site.location}: Chief of Staff at PMB Companies, a portfolio of manufacturing, brand, and storefront companies; former Chief Operating Officer of RallyPay; founder of Mythener (mythener.com), a publishing platform for fiction authors; co-founder of Zenblis; and a United States Marine Corps veteran (aviation logistics, 2012–2020). He is open to Chief of Staff, COO, and operations leadership roles, and consults for founders and owners on operations, compliance, and AI-first operating systems. Motif: ${site.motif}`,
  );
  lines.push("");
  lines.push("## About");
  lines.push(`- ${site.intro}`);
  lines.push(`- Contact: ${site.email} · ${site.linkedinLabel}`);
  lines.push("");
  lines.push("## Work");
  for (const c of chapters.filter((x) => (x.kind ?? "chapter") === "chapter")) {
    const roles = (positions[c.slug] ?? []).map((p) => `${p.title} (${p.period})`).join("; ");
    lines.push(`- [${c.name}](${site.url}/work/${c.slug}/): ${c.descriptor}, ${c.period}. ${c.order}${roles ? ` Roles: ${roles}.` : ""}`);
  }
  lines.push("");
  lines.push("## Side projects");
  for (const c of chapters.filter((x) => x.kind === "side")) {
    lines.push(`- [${c.name}](${site.url}/work/${c.slug}/): ${c.descriptor}, ${c.period}. ${c.order}`);
  }
  lines.push("");
  lines.push("## Consulting");
  lines.push(`- [Consulting](${site.url}/consulting/): ${services.map((s) => s.title).join(", ")}.`);
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
