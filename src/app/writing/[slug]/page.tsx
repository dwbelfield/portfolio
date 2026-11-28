import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Words } from "@/components/primitives";
import { essays, formatDate } from "@/content/writing";
import { site } from "@/content/site";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const e = essays.find((x) => x.slug === slug);
  if (!e) return {};
  const url = `${site.url}/writing/${e.slug}/`;
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/writing/${e.slug}/` },
    openGraph: {
      type: "article",
      title: `${e.title} · ${site.name}`,
      description: e.description,
      url,
      publishedTime: e.published,
      authors: [site.name],
      images: [{ url: e.ogImage, width: e.cover.width, height: e.cover.height, alt: e.cover.alt }],
    },
    twitter: { card: "summary_large_image", images: [e.ogImage] },
  };
}

/** A paragraph with [text](https://…) links turned into anchors that open in a new tab. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/.exec(p);
        if (!m) return p;
        return (
          <a
            key={i}
            href={m[2]}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-[#91C8D9]/50 underline-offset-4 transition-colors hover:decoration-[#91C8D9]"
          >
            {m[1]}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        );
      })}
    </>
  );
}

export default async function EssayPage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const e = essays.find((x) => x.slug === slug);
  if (!e) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.title,
    alternativeHeadline: e.subtitle,
    description: e.description,
    datePublished: e.published,
    image: `${site.url}${e.ogImage}`,
    url: `${site.url}/writing/${e.slug}/`,
    author: { "@id": `${site.url}/#person` },
  };

  return (
    <div className="home-surface">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        {/* Header: the title, the line under it, the date, then the cover */}
        <header className="mx-auto w-full max-w-[1280px] px-6 pt-28 md:px-8 md:pt-36">
          <h1 className="home-display max-w-5xl text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
            <Words text={e.title} delay={0.05} stagger={0.08} />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-5 text-lg text-[#C9D1D8] md:text-2xl">{e.subtitle}</p>
            <p className="mt-3 font-mono text-[13px] text-[#9AA6B0]">
              <time dateTime={e.published}>{formatDate(e.published)}</time> · {site.name}
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-10 overflow-hidden rounded-2xl border border-white/[0.07] md:mt-14">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export serves images as-is */}
            <img src={e.cover.src} alt={e.cover.alt} width={e.cover.width} height={e.cover.height} className="block h-auto w-full" />
          </Reveal>
        </header>

        {/* Body: one readable column */}
        <div className="mx-auto w-full max-w-[720px] px-6 pb-20 pt-12 md:px-8 md:pt-16">
          {e.sections.map((s) => (
            <section key={s.heading} className="mt-12 first:mt-0 md:mt-16">
              <h2 className="home-display text-3xl font-bold leading-tight md:text-4xl">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-5 text-[17px] leading-[1.75] text-[#D5DCE2] md:text-lg">
                  <Rich text={p} />
                </p>
              ))}
            </section>
          ))}
          <p className="mt-16">
            <Link href="/writing/" className="label link-draw text-fg">
              ← All writing
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
