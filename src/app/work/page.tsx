import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ChapterHero from "@/components/ChapterHero";
import Logo from "@/components/Logo";
import ProductCards from "@/components/ProductCards";
import Doors, { Arrow } from "@/components/Doors";
import { Counter, Reveal } from "@/components/primitives";
import { career, chapters, site } from "@/content/site";

const description =
  "Three employers over fourteen years: the Marine Corps, RallyPay, and PMB Companies. Two products delivered with AI agents: Mythener and Zenblis.";

export const metadata: Metadata = {
  alternates: { canonical: "/work/" },
  title: "Work",
  description,
  openGraph: { title: `Work · ${site.name}`, description, url: `${site.url}/work/` },
};

export default function WorkPage() {
  const employers = career.map((e) => ({ ...e, chapter: chapters.find((c) => c.slug === e.slug)! }));
  return (
    <div className="home-surface">
      {/* The three employers: each card carries its scene, the roles and scope held, and the chapter's figures */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-28 md:px-8 md:pt-36">
        <h1 className="home-display text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
          <span className="text-accent">Three employers</span>. Two products.
        </h1>
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {employers.map(({ chapter: c, ...e }, i) => (
            <li key={e.slug} className="flex">
              {/* The whole card is the link: the heading's link is stretched over it. */}
              <Reveal
                delay={i * 0.08}
                className="home-raised home-lift group relative flex w-full flex-col overflow-hidden rounded-[14px] transition-[translate,border-color] duration-300 hover:-translate-y-1"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: e.color }} />
                <div className="relative mx-4 mt-5 h-[180px] overflow-hidden rounded-lg bg-[#141516] md:h-[260px] lg:h-[200px]">
                  {c.hero ? (
                    // The scenes keep their left third quiet for a chapter title, so a card shows the busy right-hand part.
                    <div className="absolute inset-y-0 right-0 w-[165%]">
                      <ChapterHero scene={c.hero.scene} alt={c.hero.alt} compact />
                    </div>
                  ) : (
                    c.video?.poster && <Image src={c.video.poster} alt="" fill sizes="(min-width: 1024px) 400px, 92vw" className="object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 px-6 pb-5 pt-5">
                  <div className="flex items-center gap-3">
                    {c.logo && <Logo src={c.logo.src} alt="" className="h-9 w-9 shrink-0 text-fg" />}
                    <h2 className="home-display text-[28px] font-semibold leading-tight">
                      <Link href={`/work/${e.slug}/`} className="after:absolute after:inset-0 after:content-['']">
                        {e.name}
                      </Link>
                    </h2>
                  </div>
                  <p className="font-mono text-xs text-[#9AA6B0]">{e.years}</p>
                  <p className="text-sm font-semibold text-fg">{e.roles}</p>
                  <p className="text-sm text-[#C9D1D8]">{e.scope}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-4 md:grid-cols-4 lg:grid-cols-2">
                    {c.stats.map((s) => (
                      <div key={s.label} className="flex flex-col-reverse justify-end gap-1">
                        <dt className="text-[13px] leading-snug text-[#C9D1D8]">
                          {s.label}
                          {s.from && <span className="mt-0.5 block font-mono text-[12px] text-[#9AA6B0]">{s.from}</span>}
                        </dt>
                        <dd className="home-display text-3xl font-bold leading-none text-accent">
                          {s.text ?? <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} grouped={s.grouped} />}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <span aria-hidden="true" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 font-semibold text-fg transition-colors group-hover:text-accent">
                    Read the chapter <Arrow />
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* The two products: the same cards as the home page */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-8 md:pt-20">
        <Reveal>
          <h2 className="home-display text-4xl font-bold leading-none md:text-5xl">Now delivered with AI agents</h2>
        </Reveal>
        <div className="mt-8">
          <ProductCards />
        </div>
      </section>

      <Doors />
    </div>
  );
}
