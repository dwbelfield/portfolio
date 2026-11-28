import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/primitives";
import { Arrow } from "@/components/Doors";
import { essays, formatDate } from "@/content/writing";
import { site } from "@/content/site";

const description = "Essays by Derek Belfield on AI, work, and raising kids in the age of AI.";

export const metadata: Metadata = {
  alternates: { canonical: "/writing/" },
  title: "Writing",
  description,
  openGraph: { title: `Writing · ${site.name}`, description, url: `${site.url}/writing/` },
};

export default function WritingPage() {
  // Newest first.
  const list = [...essays].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <div className="home-surface">
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-28 md:px-8 md:pt-36">
        <h1 className="home-display text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">Writing</h1>
        <ol className="mt-10 grid gap-5 md:mt-14">
          {list.map((e, i) => (
            <li key={e.slug}>
              <Reveal delay={i * 0.05}>
                <Link
                  href={`/writing/${e.slug}/`}
                  className="home-raised home-lift group grid overflow-hidden rounded-2xl transition-[translate,border-color] duration-300 hover:-translate-y-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export serves images as-is */}
                  <img src={e.cover.src} alt="" width={e.cover.width} height={e.cover.height} className="block h-auto w-full lg:h-full lg:object-cover" />
                  <span className="flex flex-col justify-center gap-2 px-6 py-6 md:px-8">
                    <span className="font-mono text-xs text-[#9AA6B0]">{formatDate(e.published)}</span>
                    <span className="home-display text-3xl font-semibold leading-tight md:text-4xl">{e.title}</span>
                    <span className="text-[15px] text-[#C9D1D8]">{e.description}</span>
                    <Arrow className="mt-2 h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
