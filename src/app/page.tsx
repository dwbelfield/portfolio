import Image from "next/image";
import ChaosField from "@/components/ChaosField";
import ChapterVideo from "@/components/ChapterVideo";
import ChapterList from "@/components/ChapterList";
import { Button } from "@/components/Button";
import { Counter, Reveal, Words } from "@/components/primitives";
import { site, proof, principles } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* Hero: chaos resolving onto the grid */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden md:min-h-0">
        <ChaosField className="absolute inset-0" />
        <div className="hero-fade absolute inset-0" />

        {/* Portrait on small screens: top-right, behind the copy. */}
        <Reveal
          delay={0.9}
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
          <Reveal delay={1.2} y={0}>
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
                <Words text={site.motif} delay={1.4} stagger={0.12} accentWord={1} />
              </h1>
              <Reveal delay={2.0}>
                <p className="mt-8 max-w-xl text-lg text-muted md:text-xl">{site.intro}</p>
              </Reveal>
              <Reveal delay={2.2}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="/work/">See the work</Button>
                  <Button href="/consulting/" variant="ghost">
                    Start a conversation
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.9} y={24} className="relative hidden md:block">
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

      {/* Pull quote */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-40">
          <Reveal y={0}>
            <span className="rule mb-8" />
          </Reveal>
          <blockquote className="max-w-4xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            <Words text={site.pullQuote} stagger={0.03} />
          </blockquote>
          <Reveal delay={0.4}>
            <p className="label mt-8">How I operate</p>
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-32">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Four chapters</h2>
              <span className="readout hidden md:block">2012 – present</span>
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
