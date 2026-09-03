import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import ChapterVideo from "@/components/ChapterVideo";
import Camo from "@/components/Camo";
import { Counter, Reveal, Words } from "@/components/primitives";
import { chapters } from "@/content/site";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = chapters.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.order,
  };
}

export default async function ChapterPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const i = chapters.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const c = chapters[i];
  const prev = chapters[i - 1];
  const next = chapters[i + 1];
  const marpat = c.accent === "marpat";

  return (
    <>
      {/* Header */}
      <section className={c.video ? "relative flex min-h-[80svh] flex-col justify-end overflow-hidden" : "grid-underlay"}>
        {c.video && <ChapterVideo src={c.video.src} alt={c.video.alt} />}
        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
          <Reveal y={0}>
            {marpat ? (
              <Camo width={128} height={10} cell={2} seed={3} className="mb-4 block rounded-[2px]" />
            ) : (
              <span className="rule mb-4" />
            )}
            <p className="label mb-6">
              <span className="mr-3 text-accent">{c.index}</span>
              {c.period} · {c.location}
            </p>
          </Reveal>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1] tracking-tight md:text-8xl">
            <Words text={c.name} delay={0.1} stagger={0.08} />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-6 text-xl text-muted md:text-2xl">
              {c.org !== c.name ? `${c.org} · ` : ""}
              {c.descriptor}
            </p>
            <p className="mt-8 max-w-2xl text-lg text-fg">{c.summary}</p>
          </Reveal>
        </div>
      </section>

      {/* Chaos / Order */}
      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-[1280px] gap-px bg-line md:grid-cols-2">
          <Reveal className="relative bg-bg">
            {marpat && (
              <div className="absolute inset-y-0 left-0 w-1.5 overflow-hidden">
                <Camo width={6} height={480} cell={2} seed={7} className="h-full w-full" />
              </div>
            )}
            <div className="px-6 py-12 md:px-8 md:py-16">
              <p className="label mb-4">Chaos</p>
              <p className="text-2xl leading-snug text-muted md:text-3xl">{c.chaos}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="border-t-2 border-accent bg-panel">
            <div className="px-6 py-12 md:px-8 md:py-16">
              <p className="label mb-4">
                <span className="mr-2 text-accent">●</span>Order
              </p>
              <p className="text-2xl leading-snug text-fg md:text-3xl">{c.order}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-8 md:py-28">
          <dl className={`grid gap-10 ${c.stats.length >= 4 ? "md:grid-cols-4" : c.stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {c.stats.map((s, k) => (
              <Reveal key={s.label} delay={k * 0.08}>
                <dd className="text-5xl font-semibold tracking-tight md:text-6xl">
                  <Counter
                    value={s.value}
                    decimals={s.decimals}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </dd>
                <dt className="mt-3 flex items-center gap-2 text-fg">
                  {marpat && <Camo width={12} height={12} cell={2} seed={20 + k} className="shrink-0 rounded-[2px]" />}
                  {s.label}
                </dt>
                {s.from && <p className="readout mt-1">{s.from}</p>}
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Detail */}
      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label mb-4">Roles</p>
              <ul className="space-y-1 text-fg">
                {c.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {c.link && (
                <div className="mt-8">
                  <p className="label mb-4">Visit</p>
                  <a
                    href={c.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-draw text-fg"
                  >
                    {c.link.label}
                  </a>
                </div>
              )}
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="label mb-6">What happened</p>
            </Reveal>
            <ul className="bullets space-y-5 text-lg text-fg">
              {c.bullets.map((b, k) => (
                <Reveal key={k} delay={k * 0.04}>
                  <li>{b}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Prev / next */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
          <div className="flex gap-10">
            {prev && (
              <Link href={`/work/${prev.slug}/`} className="group">
                <span className="label">Previous</span>
                <span className="link-draw mt-2 block text-fg">
                  {prev.index} {prev.name}
                </span>
              </Link>
            )}
            {next && (
              <Link href={`/work/${next.slug}/`} className="group">
                <span className="label">Next</span>
                <span className="link-draw mt-2 block text-fg">
                  {next.index} {next.name}
                </span>
              </Link>
            )}
          </div>
          <Button href="/consulting/">Start a conversation</Button>
        </div>
      </section>
    </>
  );
}
