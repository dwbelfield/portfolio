import type { Metadata } from "next";
import Link from "next/link";
import CredentialCarousel from "@/components/CredentialCarousel";
import StatCard from "@/components/StatCard";
import Doors, { Arrow } from "@/components/Doors";
import { Reveal } from "@/components/primitives";
import { site, chapters, career, facts, principles, credentials, tools, author } from "@/content/site";

const description =
  "Derek Belfield: fourteen years of programs in Marine aviation, payments, and manufacturing. No failed audits. Now delivering with AI agents.";

export const metadata: Metadata = {
  alternates: { canonical: "/about/" },
  title: "About",
  description,
  openGraph: { title: `About · ${site.name}`, description, url: `${site.url}/about/` },
};

const heading = "home-display text-4xl font-bold leading-none md:text-5xl";

export default function AboutPage() {
  // Employers first, newest to oldest, then the two products: the fourteen years inside teams lead.
  const employers = chapters.filter((c) => c.kind !== "side").reverse();
  const timeline = [...employers, ...chapters.filter((c) => c.kind === "side")];
  return (
    <div className="home-surface">
      {/* One headline, one line, then the career in six figures */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-28 md:px-8 md:pt-36">
        <h1 className="home-display max-w-5xl text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
          The person who <span className="text-accent">watches the date</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#C9D1D8] md:text-[22px]">
          I find the constraint holding the schedule, remove it, and leave a team that can run the tooling without me.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
          {facts.map((f, i) => (
            <StatCard key={f.label} stat={f} index={i} />
          ))}
        </dl>
      </section>

      {/* Credentials: the four on paper, then the course badges between two fading rules */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <h2 className={heading}>Credentials</h2>
        </Reveal>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {credentials.map((c, i) => (
            <li key={c} className="flex">
              <Reveal delay={i * 0.06} className="home-block home-accent-edge w-full rounded-xl px-5 py-5 text-[15px] font-semibold leading-snug md:text-base">
                {c}
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="relative mx-auto mt-8 w-full max-w-[1216px] py-6 md:py-8">
          <span aria-hidden="true" className="home-rule absolute inset-x-0 top-0" />
          <CredentialCarousel level="h3" />
          <span aria-hidden="true" className="home-rule absolute inset-x-0 bottom-0" />
        </div>
      </section>

      {/* Experience: the three employers, then the two products, each a link */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <h2 className={heading}>Experience</h2>
        </Reveal>
        <ol className="mt-7 grid gap-3">
          {timeline.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.05}>
                <Link
                  href={`/work/${c.slug}/`}
                  className="home-raised home-lift group grid items-center gap-x-6 gap-y-1 rounded-xl px-6 py-5 transition-[translate,border-color] duration-300 hover:-translate-y-1 md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1.4fr)_auto]"
                >
                  <span className="font-mono text-xs text-[#9AA6B0]">{c.period}</span>
                  <span className="home-display text-2xl font-semibold leading-tight">{c.name}</span>
                  {/* The employers show the progression, oldest role to newest, as on the home page. */}
                  <span className="text-sm text-[#C9D1D8]">{career.find((e) => e.slug === c.slug)?.roles ?? c.roles.join(" · ")}</span>
                  <Arrow className="hidden h-5 w-5 text-accent transition-transform group-hover:translate-x-1 md:block" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* How I operate: five principles and the method, then the tools */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <h2 className={heading}>How I operate</h2>
        </Reveal>
        <ul className="mt-7 grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="flex">
              <Reveal delay={i * 0.05} className="home-raised w-full rounded-xl px-6 py-6">
                <h3 className="home-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#C9D1D8]">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <h3 className="sr-only">Tools</h3>
        <ul className="mt-6 flex flex-wrap gap-2">
          {tools.map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-black/20 px-3.5 py-1.5 font-mono text-[13px] text-[#C9D1D8]">
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* The books */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-8 md:pt-24">
        <Reveal className="home-raised home-door-icy grid gap-8 rounded-2xl px-6 py-8 md:px-10 md:py-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className={heading}>{author.series}</h2>
            <p className="mt-2 font-mono text-[13px] text-[#91C8D9]">
              {author.penName} · {author.claim}
            </p>
            <p className="mt-5 text-base text-[#C9D1D8]">{author.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
              {author.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center font-semibold text-fg underline-offset-4 transition-colors hover:text-[#91C8D9] hover:underline">
                    {l.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid grid-cols-2 gap-3 self-start sm:grid-cols-3 lg:col-span-7">
            {author.books.map((b) => (
              <li key={b.title} className="relative flex flex-col rounded-xl border border-white/[0.07] bg-black/25 p-4 transition-colors hover:border-white/20 md:p-5">
                <span className="font-mono text-xs text-[#9AA6B0]">{b.number}</span>
                <span className="home-display mt-1 text-2xl font-semibold">
                  {b.href ? (
                    // The whole tile opens the book's store page.
                    <a href={b.href} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:decoration-[#91C8D9]">
                      {b.title}
                      <span className="sr-only"> on Amazon (opens in a new tab)</span>
                    </a>
                  ) : (
                    b.title
                  )}
                </span>
                <span className="mt-2 text-[13px] text-[#C9D1D8]">{b.status}</span>
                {b.blurb && <span className="mt-1 text-xs text-accent">{b.blurb}</span>}
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <Doors />
    </div>
  );
}
