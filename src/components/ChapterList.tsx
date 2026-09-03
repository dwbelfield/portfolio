import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/site";
import { Reveal } from "./primitives";

type Heading = { lead: string; rest: string; meta?: string };

/**
 * Chapter rows. On desktop the optional heading shares the rows' grid via
 * subgrid: the first column is sized to the heading's first word, so the
 * logo-and-name column below starts exactly under the second word.
 */
export default function ChapterList({ heading }: { heading?: Heading }) {
  const sub = "md:col-span-3 md:grid md:grid-cols-subgrid";
  return (
    <div className="md:grid md:grid-cols-[auto_minmax(0,5fr)_minmax(0,5fr)] md:gap-x-4">
      {heading && (
        <div className={`mb-12 ${sub} md:items-end`}>
          <h2 className="contents text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="md:col-start-1 md:whitespace-nowrap">{heading.lead} </span>
            <span className="md:col-start-2">{heading.rest}</span>
          </h2>
          {heading.meta && (
            <span className="readout hidden md:col-start-3 md:block md:text-right">
              {heading.meta}
            </span>
          )}
        </div>
      )}

      <ol className={`border-t border-line ${sub}`}>
        {chapters.map((c, i) => (
          <li key={c.slug} className={`border-b border-line ${sub}`}>
            <Reveal delay={i * 0.05} className={sub}>
              <Link
                href={`/work/${c.slug}/`}
                className={`group grid gap-4 py-8 transition-colors md:py-10 ${sub}`}
              >
                <div className="flex items-baseline justify-between md:block md:pr-6">
                  <span className="text-3xl font-semibold tracking-tight text-accent md:text-4xl">
                    {c.index}
                  </span>
                  <span className="readout md:mt-3 md:block">{c.period}</span>
                </div>
                <div className="flex items-start gap-4 md:pr-8">
                  {c.logo && (
                    <Image
                      src={c.logo.src}
                      alt={c.logo.alt}
                      width={c.logo.width}
                      height={c.logo.height}
                      className="mt-1 h-9 w-9 shrink-0 object-contain opacity-90 md:h-10 md:w-10"
                    />
                  )}
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{c.name}</h3>
                    <p className="mt-1 text-muted">
                      {c.org !== c.name ? `${c.org} · ` : ""}
                      {c.descriptor}
                    </p>
                  </div>
                </div>
                <div>
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
    </div>
  );
}
