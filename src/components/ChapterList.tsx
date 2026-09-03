import Link from "next/link";
import { chapters } from "@/content/site";
import { Reveal } from "./primitives";

export default function ChapterList() {
  return (
    <ol className="border-t border-line">
      {chapters.map((c, i) => (
        <li key={c.slug} className="border-b border-line">
          <Reveal delay={i * 0.05}>
            <Link
              href={`/work/${c.slug}/`}
              className="group grid gap-4 py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="flex items-baseline justify-between md:col-span-2 md:block">
                <span className="readout text-2xl text-accent">
                  {c.index}
                </span>
                <span className="readout md:mt-2 md:block">{c.period}</span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{c.name}</h3>
                <p className="mt-1 text-muted">
                  {c.org !== c.name ? `${c.org} · ` : ""}
                  {c.descriptor}
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="label mb-2">Chaos</p>
                <p className="text-muted">{c.chaos}</p>
                <p className="label mb-2 mt-4">Order</p>
                <p className="text-fg">{c.order}</p>
                <span className="link-draw mt-5 inline-block text-sm text-fg">Read the chapter</span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
