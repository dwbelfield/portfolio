import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import ChapterVideo from "@/components/ChapterVideo";
import CamoTiles from "@/components/CamoTiles";
import RoleSelector from "@/components/RoleSelector";
import Programs from "@/components/Programs";
import { Counter, Reveal, Words } from "@/components/primitives";
import { chapters } from "@/content/site";
import { positions, highlights, programs } from "@/content/positions";

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
  const roles = positions[c.slug];
  const notes = highlights[c.slug];
  const progs = programs[c.slug];

  return (
    <>
      {/* Header */}
      <section className={c.video ? "relative flex min-h-[80svh] flex-col justify-end overflow-hidden" : "grid-underlay"}>
        {c.video && <ChapterVideo src={c.video.src} alt={c.video.alt} />}
        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
          <Reveal y={0}>
            <span className="rule mb-4" />
            <p className="label mb-6">
              <span className="mr-3 text-accent">{c.index}</span>
              {c.period} · {c.location}
            </p>
          </Reveal>
          <div className="flex items-center gap-5 md:gap-8">
            {c.logo && (
              <Reveal y={0} delay={0.05} className="shrink-0">
                <Image
                  src={c.logo.src}
                  alt={c.logo.alt}
                  width={c.logo.width}
                  height={c.logo.height}
                  className="h-14 w-14 object-contain opacity-90 md:h-24 md:w-24"
                />
              </Reveal>
            )}
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1] tracking-tight md:text-8xl">
              <Words text={c.name} delay={0.1} stagger={0.08} />
            </h1>
          </div>
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
          <Reveal className="bg-bg">
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
        {marpat && <CamoTiles clusters={6} seed={3} />}
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
                <dt className="mt-3 text-fg">{s.label}</dt>
                {s.from && <p className="readout mt-1">{s.from}</p>}
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Detail */}
      <section className="grid-underlay border-t border-line">
        {marpat && <CamoTiles clusters={5} seed={5} />}
        <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-8 md:py-28">
          <Reveal>
            {roles ? (
              <RoleSelector positions={roles} />
            ) : (
              <>
                <span className="rule mb-4" />
                <p className="label mb-10">What happened</p>
                <ul className="bullets space-y-5 text-lg text-fg">
                  {c.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
          {(notes || c.link) && (
            <Reveal delay={0.2}>
              <div className="mt-16 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
                <p className="label md:col-span-4">Across the chapter</p>
                <ul className="space-y-2 text-muted md:col-span-8">
                  {notes?.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                  {c.link && (
                    <li>
                      <a href={c.link.href} target="_blank" rel="noreferrer" className="link-draw text-fg">
                        Visit {c.link.label}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Programs */}
      {progs && (
        <section className="grid-underlay border-t border-line">
          {marpat && <CamoTiles clusters={4} seed={11} />}
          <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-8 md:py-28">
            <Reveal>
              <span className="rule mb-4" />
              <p className="label mb-12">Programs owned</p>
            </Reveal>
            <Programs programs={progs} />
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section className="grid-underlay border-t border-line">
        {marpat && <CamoTiles clusters={4} seed={9} />}
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
