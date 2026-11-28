import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Words } from "@/components/primitives";
import EssayFigure from "@/components/essay/Figures";
import { essays, formatDate } from "@/content/blog";
import { site } from "@/content/site";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const e = essays.find((x) => x.slug === slug);
  if (!e) return {};
  const url = `${site.url}/blog/${e.slug}/`;
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/blog/${e.slug}/` },
    openGraph: {
      type: "article",
      title: `${e.title} · ${site.name}`,
      description: e.description,
      url,
      publishedTime: e.published,
      authors: [site.name],
      images: [{ url: e.ogImage, width: 1200, height: 630, alt: e.cover.alt }],
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

export default async function EssayPage(props: PageProps<"/blog/[slug]">) {
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
    url: `${site.url}/blog/${e.slug}/`,
    author: { "@id": `${site.url}/#person` },
  };

  const titled = e.cover.titled;
  const cover = (
    <Reveal
      delay={titled ? 0 : 0.4}
      className={
        titled
          ? "-mx-6 overflow-hidden border-y border-white/[0.07] md:mx-0 md:rounded-2xl md:border"
          : "mt-10 overflow-hidden rounded-2xl border border-white/[0.07] md:mt-14"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export serves images as-is */}
      <img src={e.cover.src} alt={e.cover.alt} width={e.cover.width} height={e.cover.height} className="block h-auto w-full" />
    </Reveal>
  );

  return (
    <div className="home-surface">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Without script nothing sets the figures going, so show them finished. */}
      <noscript>
        <style>{".essay-fig *{animation:none!important}"}</style>
      </noscript>
      <div className="essay-progress" aria-hidden="true" />
      <article>
        {/*
          Header. A plain cover follows the title. A cover that carries the
          title leads instead, edge to edge on a phone; the typed title stays
          below it for phones, where the lettering in the image is too small,
          and for screen readers at every width.
        */}
        <header className={`mx-auto w-full max-w-[1280px] px-6 md:px-8 ${titled ? "pt-[68px] md:pt-28" : "pt-28 md:pt-36"}`}>
          {titled && cover}
          <h1 className={`home-display max-w-5xl text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem] ${titled ? "mt-8 md:sr-only" : ""}`}>
            <Words text={e.title} delay={0.05} stagger={0.08} />
          </h1>
          <Reveal delay={0.3}>
            <p className={`mt-5 text-lg text-[#C9D1D8] md:text-2xl ${titled ? "md:sr-only" : ""}`}>{e.subtitle}</p>
            <p className={`font-mono text-[13px] text-[#9AA6B0] ${titled ? "mt-3 md:mt-6" : "mt-3"}`}>
              <time dateTime={e.published}>{formatDate(e.published)}</time> · {site.name}
            </p>
          </Reveal>
          {!titled && cover}
        </header>

        {/* Body: one readable column */}
        <div className="mx-auto w-full max-w-[720px] px-6 pb-20 pt-12 md:px-8 md:pt-16">
          {e.sections.map((s) => (
            <section key={s.heading} className="mt-12 first:mt-0 md:mt-16">
              <h2 className="home-display text-3xl font-bold leading-tight md:text-4xl">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <Fragment key={i}>
                  <p className="mt-5 text-[17px] leading-[1.75] text-[#D5DCE2] md:text-lg">
                    <Rich text={p} />
                  </p>
                  {s.figures?.filter((f) => f.after === i).map((f) => <EssayFigure key={f.id} id={f.id} />)}
                </Fragment>
              ))}
            </section>
          ))}
          <p className="mt-16">
            <Link href="/blog/" className="label link-draw text-fg">
              ← All posts
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
