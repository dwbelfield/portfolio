import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { notFound } from "next/navigation";
import ChapterVideo from "@/components/ChapterVideo";
import ChapterHero from "@/components/ChapterHero";
import RoleSelector from "@/components/RoleSelector";
import Programs from "@/components/Programs";
import EntityMap from "@/components/EntityMap";
import Mandate from "@/components/Mandate";
import Architecture from "@/components/Architecture";
import StatCard from "@/components/StatCard";
import Doors, { Arrow } from "@/components/Doors";
import { Reveal, Words } from "@/components/primitives";
import { chapters, site } from "@/content/site";
import { positions, highlights, programs, programLabels, entityMaps, mandates, architectures } from "@/content/positions";

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
    alternates: { canonical: `/work/${c.slug}/` },
    openGraph: { title: `${c.name} · ${site.name}`, description: c.order, url: `${site.url}/work/${c.slug}/` },
  };
}

export default async function ChapterPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const c = chapters.find((x) => x.slug === slug);
  if (!c) notFound();
  // Previous and next stay within the same list: employers, or the AI-built companies.
  const siblings = chapters.filter((x) => (x.kind ?? "chapter") === (c.kind ?? "chapter"));
  const i = siblings.indexOf(c);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];
  const roles = positions[c.slug];
  const notes = highlights[c.slug];
  // Only a real story earns the block; short notes are folded into roles instead.
  const story = !!notes && notes.some((n) => n.length > 160);
  const progs = programs[c.slug];
  const map = entityMaps[c.slug];
  const mandate = mandates[c.slug];
  const architecture = architectures[c.slug];

  const side = c.kind === "side";
  const heading = "home-display text-4xl font-bold leading-none md:text-5xl";

  return (
    <div className="home-surface">
      {/* Header: the live scene or the footage, the name, one line, and where it happened */}
      <section className="relative flex flex-col justify-end overflow-hidden md:min-h-[58svh]">
        {c.hero ? (
          <ChapterHero scene={c.hero.scene} alt={c.hero.alt} />
        ) : (
          c.video && <ChapterVideo src={c.video.src} alt={c.video.alt} rate={c.video.rate} opacity={c.video.opacity} poster={c.video.poster} />
        )}
        <div className={`relative mx-auto w-full max-w-[1280px] px-6 pb-10 md:px-8 md:pb-16 md:pt-32 ${c.video?.poster && !c.hero ? "pt-64" : "pt-28"}`}>
          <div className="flex items-center gap-5 md:gap-8">
            {c.logo && (
              <Reveal y={0} delay={0.05} className="shrink-0 text-fg">
                <Logo src={c.logo.src} alt={c.logo.alt} className="h-14 w-14 md:h-24 md:w-24" />
              </Reveal>
            )}
            <h1 className="home-display max-w-5xl text-[11vw] font-bold leading-[0.98] sm:text-6xl lg:text-[5.5rem]">
              <Words text={c.name} delay={0.1} stagger={0.08} />
            </h1>
          </div>
          <Reveal delay={0.4}>
            <p className="mt-4 text-lg text-[#C9D1D8] md:mt-6 md:text-2xl">{c.descriptor}</p>
            {c.credit && <p className="mt-2 max-w-2xl text-base text-[#C9D1D8] md:text-lg">{c.credit}</p>}
            <p className="mt-2 font-mono text-[13px] text-[#9AA6B0]">
              {c.period} · {c.location}
              {c.link && !side && (
                <>
                  {" · "}
                  <a href={c.link.href} target="_blank" rel="noreferrer" className="text-[#C9D1D8] underline underline-offset-4 transition-colors hover:text-accent">
                    {c.link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </>
              )}
            </p>
            {c.link && side && (
              <div className="mt-6">
                <a
                  href={c.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="home-button inline-flex min-h-[52px] items-center gap-3 rounded-md px-6 font-semibold"
                >
                  Open {c.link.label}
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* The figures, on raised cards watermarked with the organisation's mark */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-10 md:px-8 md:pt-14">
        <h2 className="sr-only">{side ? "By the numbers" : "Outcomes"}</h2>
        <dl className={`grid grid-cols-2 gap-3 md:gap-5 ${c.stats.length >= 4 ? "lg:grid-cols-4" : "md:grid-cols-3"}`}>
          {c.stats.map((s, k) => (
            <StatCard key={s.label} stat={s} index={k} mark={c.logo?.src} className={c.stats.length === 3 && k === 2 ? "col-span-2 md:col-span-1" : ""} />
          ))}
        </dl>
      </section>

      {/* Before and after: what was there, and what was left behind */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-5 md:px-8">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-5">
          <Reveal className="rounded-xl border border-white/[0.07] bg-black/20 px-6 py-6 md:px-8 md:py-8">
            <h2 className="home-display text-xl font-semibold text-[#9AA6B0]">{side ? "The problem" : "Before"}</h2>
            <p className="mt-3 text-base leading-relaxed text-[#9AA6B0] md:text-lg">{c.chaos}</p>
          </Reveal>
          <span aria-hidden="true" className="hidden items-center text-accent md:flex">
            <Arrow className="h-7 w-7" />
          </span>
          <Reveal delay={0.12} className="home-raised home-door-amber home-after rounded-xl px-6 py-6 md:px-8 md:py-8">
            <h2 className="home-display text-xl font-semibold text-accent">{side ? "What I built" : "After"}</h2>
            <p className="mt-3 text-base leading-relaxed text-fg md:text-lg">{c.order}</p>
          </Reveal>
        </div>
      </section>

      {/* Roles: what he owned, role by role, with the longer story folded away */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <h2 className={`${heading} mb-7`}>{roles && roles.length > 1 ? "Roles" : side ? "My part" : "The role"}</h2>
        </Reveal>
        <Reveal className="home-raised rounded-2xl px-6 py-7 md:px-10 md:py-10">
          {roles && mandate && roles.length === 1 ? (
            <Mandate position={roles[0]} lanes={mandate} />
          ) : (
            roles && <RoleSelector positions={roles} />
          )}
        </Reveal>
        {story && (
          <details className="home-details mt-4 rounded-xl border border-white/[0.07] bg-black/20">
            <summary className="flex min-h-14 items-center justify-between gap-4 px-6 font-semibold text-fg transition-colors hover:text-accent md:px-8">
              The story, in my words
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="home-details-chevron h-5 w-5 shrink-0 transition-[rotate] duration-200">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="max-w-3xl space-y-4 px-6 pb-7 text-base leading-relaxed text-[#C9D1D8] md:px-8 md:text-lg">
              {notes!.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>
          </details>
        )}
      </section>

      {/* Entity map: how the portfolio fits together */}
      {map && (
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
          <Reveal>
            <h2 className={`${heading} mb-8 md:mb-10`}>How the pieces fit together</h2>
          </Reveal>
          <EntityMap data={map} />
        </section>
      )}

      {/* Architecture: how the AI system works, step by step */}
      {architecture && (
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
          <Architecture data={architecture} />
        </section>
      )}

      {/* Programs */}
      {progs && (
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
          <Reveal>
            <h2 className={`${heading} mb-7`}>{programLabels[c.slug] ?? "Programs owned"}</h2>
          </Reveal>
          <Programs programs={progs} />
        </section>
      )}

      {/* Previous and next, within the same list */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-5 pt-16 md:px-8 md:pt-24">
        <span aria-hidden="true" className="home-rule mb-10 md:mb-14" />
        <nav aria-label={side ? "More built with AI" : "More chapters"} className="grid gap-3 md:grid-cols-2 md:gap-5">
          {[prev, next].map((x, k) =>
            x ? (
              <Link
                key={x.slug}
                href={`/work/${x.slug}/`}
                className={`home-block home-lift flex min-h-20 items-center gap-4 rounded-xl border border-transparent px-6 py-5 transition-[translate,border-color] duration-300 hover:-translate-y-1 ${
                  k === 1 ? "justify-between md:col-start-2" : ""
                }`}
              >
                {k === 0 && <Arrow className="h-5 w-5 shrink-0 rotate-180 text-accent" />}
                <span>
                  <span className="block text-sm text-[#9AA6B0]">{k === 0 ? "Previous" : "Next"}</span>
                  <span className="home-display block text-2xl font-semibold">{x.name}</span>
                </span>
                {k === 1 && <Arrow className="h-5 w-5 shrink-0 text-accent" />}
              </Link>
            ) : null,
          )}
        </nav>
      </section>

      <Doors />
    </div>
  );
}
