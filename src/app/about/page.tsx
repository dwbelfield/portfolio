import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Reveal, Words } from "@/components/primitives";
import { site, chapters, principles, credentials, alongside, author } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about/" },
  title: "About",
  description: site.intro,
};

export default function AboutPage() {
  const timeline = [...chapters].reverse();
  return (
    <>
      <section className="grid-underlay">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-14 pt-24 md:px-8 md:pb-28 md:pt-40">
          <Reveal y={0}>
            <span className="rule mb-4" />
            <p className="label mb-6">About</p>
          </Reveal>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[1] tracking-tight md:text-8xl">
            <Words text="The person who watches the date." delay={0.1} stagger={0.07} />
          </h1>
          <Reveal delay={0.5}>
            <div className="mt-10 grid gap-10 md:grid-cols-12">
              <div className="space-y-4 text-base text-fg md:col-span-7 md:space-y-5 md:text-lg">
                <p>
                  I am a program manager with a decade of ownership over safety-critical
                  technical programs: aviation life support systems, CBRN protective equipment,
                  ammunition and explosives certification, and aviation maintenance production
                  control. Two of the systems I built outlived my tenure and were adopted across
                  the Navy and Marine Corps.
                </p>
                <p>
                  Since then I have run operations at a payments company through a period of
                  rapid scale, and served as Chief of Staff to the owner of a 16-brand consumer
                  products group with two manufacturing facilities. The job in every case was
                  the same: find the constraint holding the schedule and remove it.
                </p>
                <p>
                  I have never failed an audit or a regulatory examination, in aviation safety
                  or in payments. I am equally at home on a production floor and in a software
                  engineering standup, and the operating systems I build now are AI-first: the
                  tracking, the documentation, and the first pass on analysis run on AI-assisted
                  workflows, with people accountable for every decision.
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <p className="label mb-4">Credentials</p>
                <ul className="space-y-3 text-fg">
                  {credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-8 md:py-28">
          <Reveal>
            <p className="label mb-8 md:mb-10">Experience</p>
          </Reveal>
          <ol className="border-t border-line">
            {timeline.map((c, i) => (
              <li key={c.slug} className="border-b border-line">
                <Reveal delay={i * 0.05}>
                  <div className="grid gap-3 py-6 md:grid-cols-12 md:gap-8 md:py-8">
                    <div className="md:col-span-3">
                      <span className="readout">{c.period}</span>
                      <p className="readout">{c.location}</p>
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {c.org !== c.name ? `${c.name} · ${c.org}` : c.name}
                      </h3>
                      <p className="text-muted">{c.descriptor}</p>
                      <ul className="mt-3 space-y-0.5 text-fg">
                        {c.roles.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-muted">{c.summary}</p>
                      <Link href={`/work/${c.slug}/`} className="link-draw mt-4 inline-block text-sm text-fg">
                        Read the chapter
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How I operate */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-8 md:py-28">
          <Reveal>
            <p className="label mb-8 md:mb-10">How I operate</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 max-w-lg text-muted">{p.body}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <h3 className="text-2xl font-semibold tracking-tight">Method</h3>
              <p className="mt-3 max-w-lg text-muted">
                Lean Six Sigma Green Belt. Agile delivery. AI-first operating workflows.
                Process design, trend analysis, repair-versus-replace, vendor negotiation,
                compliance program build, safety program build.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The author journey */}
      <section className="grid-underlay border-t border-line bg-panel">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-8 md:py-28">
          <Reveal>
            <span className="rule mb-4" />
            <p className="label mb-3">The author journey</p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-4xl">
              {author.series}, written as {author.penName}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="text-base text-fg md:text-lg">{author.intro}</p>
              <p className="mt-4 text-sm text-muted md:text-base">{author.seriesBlurb}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {author.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="link-draw text-sm text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="md:col-span-7">
              <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
                {author.books.map((b, i) => (
                  <Reveal key={b.title} delay={i * 0.05} className="bg-bg">
                    <li className="flex h-full flex-col p-4 md:p-5">
                      <span className="label">{b.number}</span>
                      <span className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                        {b.href ? (
                          <a href={b.href} target="_blank" rel="noreferrer" className="link-draw">
                            {b.title}
                          </a>
                        ) : (
                          b.title
                        )}
                      </span>
                      <span className="rule my-3" />
                      <span className="readout">{b.status}</span>
                      {b.blurb && <span className="mt-1 text-xs text-accent">{b.blurb}</span>}
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Alongside */}
      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label">Alongside</p>
            </Reveal>
          </div>
          <div className="space-y-4 text-lg text-fg md:col-span-8">
            {alongside.map((a, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p>{a}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="pt-6">
                <Button href="/consulting/">Work with me</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
