import Image from "next/image";
import ChapterVideo from "@/components/ChapterVideo";
import RotatingTitle from "@/components/RotatingTitle";
import ChapterList from "@/components/ChapterList";
import { Button } from "@/components/Button";
import { Counter, Reveal, Words } from "@/components/primitives";
import { site, proof, principles } from "@/content/site";

const titles = [
  "Best-selling author",
  "Program Manager",
  "Chief of Staff",
  "Chief Operating Officer",
  "Co-founder & CEO",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden md:min-h-0">
        <div className="grid-underlay pointer-events-none absolute inset-0" aria-hidden="true" />

        {/* Portrait on small screens: top-right, behind the copy. */}
        <Reveal
          delay={0.4}
          y={24}
          className="pointer-events-none absolute right-0 top-20 w-[58vw] max-w-[360px] md:hidden"
        >
          <Image
            src="/media/derek.png"
            alt=""
            width={1069}
            height={999}
            className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
          />
        </Reveal>

        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 md:px-8 md:pb-20 md:pt-28">
          <Reveal delay={0.1} y={0}>
            <p className="label mb-6">
              <span className="mr-2 text-accent">●</span>
              Available for consulting · {site.location}
            </p>
          </Reveal>

          {/* Copy left, portrait right. The portrait cell stretches to the copy's
              height, so its top meets the headline and its bottom meets the buttons. */}
          <div className="md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-stretch md:gap-8">
            <div>
              <h1 className="text-[13vw] font-semibold leading-[0.95] tracking-tight md:text-[6.5rem] lg:text-[7.5rem]">
                <Words text={site.motif} delay={0.2} stagger={0.1} accentWord={1} />
              </h1>
              <Reveal delay={0.6}>
                <p className="mt-8 max-w-xl text-lg text-muted md:text-xl">{site.intro}</p>
              </Reveal>
              <Reveal delay={0.75}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="/work/">See the work</Button>
                  <Button href="/consulting/" variant="ghost">
                    Start a conversation
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} y={24} className="relative hidden md:block">
              {/* Chaos-to-order ring centred behind the portrait, screen-blended so only
                  the lines show. Slightly larger than the cell so it frames the photo. */}
              <div
                className="pointer-events-none absolute -inset-[12%] mix-blend-screen"
                style={{
                  // Circular fade on every edge, intersected with a bottom cut-off so the
                  // ring never shows below the portrait. Blend lives here, not on the
                  // video: a mask isolates its element, which would defeat the blend.
                  maskImage:
                    "radial-gradient(closest-side, black 55%, transparent 100%), linear-gradient(to bottom, black 50%, transparent 86%)",
                  WebkitMaskImage:
                    "radial-gradient(closest-side, black 55%, transparent 100%), linear-gradient(to bottom, black 50%, transparent 86%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              >
                <ChapterVideo
                  src="/media/hero.mp4"
                  alt="A tangled ring of lines resolving into an ordered one, and back"
                  fit="contain"
                  overlay={false}
                  opacity={28}
                  rate={0.35}
                />
              </div>
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

      {/* Proof */}
      <section className="grid-underlay">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-32">
          <Reveal>
            <span className="rule mb-4" />
            <p className="label mb-10">Proof</p>
          </Reveal>
          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
            {proof.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-bg">
                <div className="p-6 md:p-8">
                  <dd className="text-5xl font-semibold tracking-tight md:text-6xl">
                    <Counter
                      value={s.value}
                      decimals={s.decimals}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </dd>
                  <dt className="mt-3 text-fg">{s.label}</dt>
                  {s.from && <p className="readout mt-1">{s.from}</p>}
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Chapters */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-32">
          <Reveal>
            {/* Heading shares the row grid: "chapters" starts in the name column,
                so the logos below line up with its first letter. */}
            <div className="mb-12 md:grid md:grid-cols-12 md:items-end md:gap-8">
              <h2 className="contents text-4xl font-semibold tracking-tight md:text-6xl">
                <span className="md:col-span-2">Four</span>
                <span className="md:col-span-8">chapters</span>
              </h2>
              <span className="readout hidden md:col-span-2 md:block md:text-right">2012 – present</span>
            </div>
          </Reveal>
          <ChapterList />
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line bg-panel">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-32">
          <Reveal>
            <span className="rule mb-4" />
            <p className="label mb-10">Principles</p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-40">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            <Words text="Have a mess that needs a system?" stagger={0.05} />
          </h2>
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Founders and owners bring me the part of the business that is not turning
              decisions into outcomes. I build the thing that fixes it, and it keeps running
              after I leave.
            </p>
            <div className="mt-10">
              <Button href="/consulting/">Start a conversation</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
