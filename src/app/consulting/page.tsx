import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialCarousel from "@/components/CredentialCarousel";
import { Arrow, outline, outlineBase } from "@/components/Doors";
import { Counter, Reveal } from "@/components/primitives";
import { site, services, engagement, products, chapters } from "@/content/site";

const description =
  "AI enablement consulting in Dallas–Fort Worth and remote: readiness walkthroughs, team training, workflow and agent builds, and AI guardrails.";

export const metadata: Metadata = {
  alternates: { canonical: "/consulting/" },
  title: "AI Enablement Consulting",
  description,
  openGraph: { title: `AI Enablement Consulting · ${site.name}`, description, url: `${site.url}/consulting/` },
};

const subject = encodeURIComponent("AI enablement inquiry");
const body = encodeURIComponent(
  "Hi Derek,\n\nHere is what is not working:\n\n\nHere is what we have tried:\n\n\nA good outcome would look like:\n\n",
);
const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

/** One line icon per service, in the order the services are listed in the content model. */
const icons = [
  // Walkthrough: a route between two points
  <>
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="6" r="2" />
    <path d="M7 18h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6" />
  </>,
  // Training: people
  <>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.3c1.8.8 3 2.6 3 4.7" />
  </>,
  // Builds: connected nodes
  <>
    <rect x="3" y="4" width="6" height="6" rx="1" />
    <rect x="15" y="14" width="6" height="6" rx="1" />
    <path d="M9 7h4a2 2 0 0 1 2 2v5" />
  </>,
  // Guardrails: a shield
  <>
    <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </>,
  // Cadence: a calendar
  <>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M9 3v4M15 3v4" />
  </>,
  // Fractional lead: a compass
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" />
  </>,
];

/** The three Mythener figures shown as proof, relabelled for a reader who does not write software. */
const proof = [
  { match: "Pull requests", label: "Changes shipped by AI agents" },
  { match: "Automated tests", label: "Automated tests checking them" },
  { match: "Numbered requirements", label: "Requirements I wrote first" },
];

const heading = "home-display text-4xl font-bold leading-none md:text-5xl";
const icy = "text-[#91C8D9]";

export default function ConsultingPage() {
  const mythener = products.find((p) => p.name === "Mythener")!;
  const mythenerStats = chapters.find((c) => c.slug === "mythener")!.stats;
  const stats = proof.flatMap((p) => {
    const s = mythenerStats.find((x) => x.label.startsWith(p.match));
    return s ? [{ ...s, label: p.label }] : [];
  });
  return (
    <div className="home-surface">
      {/* Hero: the offer in one line, and how to reach him */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-28 md:px-8 md:pt-36">
        <h1 className="home-display text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
          Bring me <span className={icy}>the mess</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#C9D1D8] md:text-[22px]">
          I put AI to work on the office work that eats your week: intake, quoting, scheduling, and follow-up. Dallas–Fort Worth or remote.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={mailto} className="home-button inline-flex min-h-[52px] items-center gap-3 rounded-md px-6 font-semibold">
            Email me <Arrow />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className={outline}>
            LinkedIn
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </section>

      {/* Credentials: the same flat strip as the home page, directly under the hero */}
      <section className="px-6 pt-12 md:px-8 md:pt-16">
        <div className="relative mx-auto w-full max-w-[1216px] py-6 md:py-8">
          <span aria-hidden="true" className="home-rule absolute inset-x-0 top-0" />
          <CredentialCarousel />
          <span aria-hidden="true" className="home-rule absolute inset-x-0 bottom-0" />
        </div>
      </section>

      {/* How an engagement runs: three steps, left to right */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-14 md:px-8 md:pt-20">
        <Reveal>
          <h2 className={heading}>How it works</h2>
        </Reveal>
        <ol className="mt-7 grid gap-3 md:grid-cols-3 md:gap-5">
          {engagement.map((e, i) => (
            <li key={e.step} className="flex">
              <Reveal delay={i * 0.08} className="home-block relative w-full rounded-xl px-6 py-6">
                <span aria-hidden="true" className={`home-display text-5xl font-bold leading-none ${icy}`}>
                  {i + 1}
                </span>
                <h3 className="home-display mt-4 text-2xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#C9D1D8]">{e.body}</p>
                {i < engagement.length - 1 && (
                  <span aria-hidden="true" className={`absolute -right-[26px] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#15191d] md:flex ${icy}`}>
                    <Arrow className="h-4 w-4" />
                  </span>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Services */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <h2 className={heading}>What I take on</h2>
        </Reveal>
        <ul className="mt-7 grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.title} className="flex">
              <Reveal delay={i * 0.05} className="home-raised flex w-full gap-4 rounded-xl px-5 py-5 md:flex-col md:px-6 md:py-6">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/25 ${icy}`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    {icons[i]}
                  </svg>
                </span>
                <div>
                  <h3 className="home-display text-xl font-semibold md:text-2xl">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#C9D1D8]">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Proof: Mythener, built the way he teaches, and the office he automated */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <h2 className={`${heading} max-w-4xl`}>
            I do not teach this from a slide deck. <span className={icy}>I ship with it</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="home-raised mt-7 grid overflow-hidden rounded-2xl md:grid-cols-2">
          <a
            href={mythener.site}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${mythener.siteLabel} (opens in a new tab)`}
            className="relative m-4 block h-[220px] overflow-hidden rounded-lg md:h-auto md:min-h-[320px]"
          >
            <Image src={mythener.image} alt={mythener.alt} fill sizes="(min-width: 768px) 600px, 92vw" className="object-cover object-left-top" />
          </a>
          <div className="flex flex-col gap-5 px-6 pb-7 pt-3 md:px-9 md:py-9">
            <p className="text-lg text-[#C9D1D8]">
              Mythener is a live publishing platform that AI coding agents built from a specification I wrote. The same method scales down to a
              quoting workflow or an intake inbox.
            </p>
            <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end gap-1.5">
                  <dt className="text-[13px] leading-snug text-[#9AA6B0]">{s.label}</dt>
                  <dd className="home-display text-[26px] font-bold leading-none text-accent md:text-4xl">
                    <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} grouped={s.grouped} />
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/work/mythener/" className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-fg transition-colors hover:text-accent">
              Mythener case study <Arrow />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="home-block home-icy-edge mt-4 flex flex-col gap-3 rounded-xl px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-lg text-fg">
            At PMB Companies I automated intake, status reporting, and documentation with AI, so a two-person office could carry the load.
          </p>
          <Link href="/work/pmb-companies/" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-fg transition-colors hover:text-[#91C8D9]">
            PMB chapter <Arrow />
          </Link>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-24 pt-16 md:px-8 md:pt-20">
        <Reveal className="home-raised home-door-icy flex flex-col gap-4 rounded-2xl px-7 py-10 md:px-12 md:py-14">
          <h2 className="home-display text-5xl font-bold leading-none md:text-[56px]">
            Tell me what is not working<span className={icy}>.</span>
          </h2>
          <p className="max-w-xl text-[19px] text-[#C9D1D8]">
            Three lines is enough: what is broken, what you have tried, and what good looks like.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <a href={mailto} className="home-button inline-flex min-h-12 items-center gap-2.5 rounded-md px-5 font-semibold">
              Email me <Arrow />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className={`${outlineBase} min-h-12 px-5`}>
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          {/* The address in full, for anyone whose browser has no mail program to open. */}
          <p className="font-mono text-[15px] text-[#C9D1D8]">
            <a href={`mailto:${site.email}`} className="underline decoration-white/25 underline-offset-4 hover:decoration-[#91C8D9]">
              {site.email}
            </a>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
