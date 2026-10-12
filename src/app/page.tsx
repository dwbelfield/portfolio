import Image from "next/image";
import RotatingTitle from "@/components/RotatingTitle";
import ChapterList from "@/components/ChapterList";
import { Button } from "@/components/Button";
import { Reveal, Words } from "@/components/primitives";
import Transformations from "@/components/Transformations";
import { site, principles } from "@/content/site";

const titles = [
  "Technical Program Manager",
  "Chief Operating Officer",
  "Chief of Staff",
  "Co-founder, Mythener",
  "Co-founder, Zenblis",
  "Best-selling author",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col justify-end overflow-hidden">
        <div className="grid-underlay pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-12 pt-20 md:px-8 md:pb-20 md:pt-28">
          <Reveal delay={0.1} y={0}>
            <p className="label mb-6">
              <span className="mr-2 text-accent">●</span>
              Open to Technical Program Manager roles · {site.location}
            </p>
          </Reveal>

          {/* Copy left, portrait right. The portrait cell stretches to the copy's
              height, so its top meets the headline and its bottom meets the buttons. */}
          <div className="md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-stretch md:gap-8">
            <div>
              <h1 className="text-[12vw] font-semibold leading-[0.95] tracking-tight md:text-[6.5rem] lg:text-[7.5rem]">
                <Words text={site.motif} delay={0.2} stagger={0.1} accentWord={1} />
              </h1>
              <Reveal delay={0.6}>
                <p className="mt-6 max-w-xl text-base text-muted md:mt-8 md:text-xl">{site.intro}</p>
              </Reveal>
              <Reveal delay={0.75}>
                <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
                  <Button href="/work/">See the work</Button>
                  <Button href={`mailto:${site.email}`} external variant="ghost">
                    Get in touch
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} y={24} className="relative hidden md:block">
              <Image
                src="/media/derek.png"
                alt="Derek Belfield"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 0px"
                className="object-contain object-right-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
              />
              {/* Caption over the fade at the bottom of the portrait. */}
              <div className="absolute inset-x-0 bottom-0 flex justify-end bg-[linear-gradient(to_top,var(--bg)_0%,transparent_100%)] px-2 pb-1 pt-10">
                <div className="text-right">
                  <p className="text-lg font-semibold text-fg">{site.name}</p>
                  <RotatingTitle titles={titles} className="text-accent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What order looks like: before-and-after pairs */}
      <section className="grid-underlay">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-32">
          <Reveal>
            <span className="rule mb-4" />
            <p className="label mb-8 md:mb-10">What order looks like</p>
          </Reveal>
          <Transformations />
        </div>
      </section>

      {/* Chapters */}
      <section className="border-t border-line bg-panel">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-32">
          <ChapterList heading={{ lead: "Three", rest: "chapters", meta: "2012 – 2026" }} />
        </div>
      </section>

      {/* Side projects */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-32">
          <ChapterList kind="side" heading={{ lead: "Side", rest: "projects", meta: "founded 2026" }} />
        </div>
      </section>

      {/* Principles */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-32">
          <Reveal>
            <span className="rule mb-4" />
            <p className="label mb-8 md:mb-10">Principles</p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-5">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted md:mt-3 md:text-base">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-panel">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-40">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-6xl">
            <Words text="Looking for a program manager?" stagger={0.05} />
          </h2>
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              I am looking for a Technical Program Manager role in safety-critical or
              infrastructure programs, and I still take consulting engagements. Either way, the
              deliverable is the same: a schedule that holds, decisions that turn into shipped
              outcomes, and systems that keep running after I leave.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 md:gap-4">
              <Button href={`mailto:${site.email}`} external>
                Get in touch
              </Button>
              <Button href="/consulting/" variant="ghost">
                Consulting
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
