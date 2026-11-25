import Image from "next/image";
import Link from "next/link";
import CredentialCarousel from "@/components/CredentialCarousel";
import RotatingTitle from "@/components/RotatingTitle";
import OutcomeCard, { type Outcome } from "@/components/OutcomeCard";
import Doors, { Arrow, outline } from "@/components/Doors";
import ProductCards from "@/components/ProductCards";
import { Reveal } from "@/components/primitives";
import { site, author, career } from "@/content/site";
import { programs } from "@/content/positions";

/** The titles that rotate under the portrait: the roles he is after first, then the ones he has held. */
const titles = [
  "Technical Program Manager",
  "AI Enablement",
  "Chief Operating Officer",
  "Chief of Staff",
  "Co-founder, Mythener",
  "Co-founder, Zenblis",
  "Best-selling author",
];

/** Employer marks used as card watermarks: white on transparent, drawn as CSS masks. */
const marks = {
  usmc: { src: "/media/logos/usmc.png" },
  rallypay: { src: "/media/logos/rallypay.png" },
  pmb: { src: "/media/logos/pmb.png", wide: true },
};

/** Eight outcomes as before-and-after pairs, each with the employer and the role he held there. */
const outcomes: Outcome[] = [
  { label: "Parts ready for issue", org: "Marine Corps", role: "Senior Production Manager", logo: marks.usmc, before: "15.1%", beforeWidth: 15.1, afterWidth: 98.3, count: { from: 15.1, to: 98.3, decimals: 1, suffix: "%" }, size: "hero" },
  { label: "Time to replenish", org: "Marine Corps", role: "Senior Production Manager", logo: marks.usmc, before: "36 months", beforeWidth: 100, afterWidth: 8.3, count: { from: 36, to: 3, suffix: " months" } },
  { label: "International purchasing turnaround", org: "Marine Corps", role: "Production Manager", logo: marks.usmc, before: "90 days", beforeWidth: 100, afterWidth: 7.8, count: { from: 90, to: 7, suffix: " days" } },
  { label: "Same-day ticket resolution", org: "RallyPay", role: "Director of Operations", logo: marks.rallypay, before: "3.4%", beforeWidth: 3.4, afterWidth: 44, count: { from: 3, to: 44, suffix: "%" } },
  { label: "Chargebacks", org: "RallyPay", role: "COO", logo: marks.rallypay, before: "Before", beforeWidth: 100, afterWidth: 68, count: { from: 0, to: 32, prefix: "−", suffix: "%" } },
  { label: "Card-testing attacks", org: "RallyPay", role: "COO", logo: marks.rallypay, before: "Before", beforeWidth: 100, afterWidth: 1.5, count: { from: 0, to: 99, prefix: "−", suffix: "%" }, size: "wide" },
  { label: "Projected infrastructure cost", org: "RallyPay", role: "COO", logo: marks.rallypay, before: "Before", beforeWidth: 100, afterWidth: 55, count: { from: 0, to: 45, prefix: "−", suffix: "%" } },
  { label: "Production divisions stood up", org: "PMB Companies", role: "Chief of Staff", logo: marks.pmb, before: "Empty floor", beforeWidth: 0, afterWidth: 100, count: { from: 0, to: 6 } },
];

/** Where to find him elsewhere. Icons are drawn inline; each link is named for screen readers. */
const profiles = [
  {
    label: "LinkedIn",
    href: site.linkedin,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/dwbelfield",
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  { label: "X", href: "https://x.com/derekbelfield", icon: <path d="M4 4l16 16M20 4L4 20" /> },
  {
    label: "Author site: the books",
    href: author.site,
    icon: (
      <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </>
    ),
  },
];

export default function Home() {
  return (
    <div className="home-surface">
      {/* Hero: portrait, one headline, one line, two buttons */}
      <section className="overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pt-24 md:flex-row md:items-center md:gap-10 md:px-8 md:pb-14 md:pt-28">
          <div className="flex flex-col gap-6 md:flex-1">
            <h1 className="home-display text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
              Programs that ship. <span className="text-accent">AI built in</span>.
            </h1>
            <p className="max-w-xl text-lg text-[#C9D1D8] md:text-[22px]">
              I lead the people, run the plan, and build the AI that provides real ROI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/work/" className="home-button inline-flex min-h-[52px] items-center gap-3 rounded-md px-6 font-semibold">
                See the work <Arrow />
              </Link>
              <a href={`mailto:${site.email}`} className={outline}>
                Get in touch
              </a>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {profiles.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={p.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A3239] text-[#C9D1D8] transition-colors hover:border-accent hover:text-accent"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      {p.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* The portrait stands off the page: a shadow below it and a thin rim of light, nothing over it. */}
          <div className="relative mx-auto mb-4 mt-6 aspect-[48/52] w-[84%] max-w-[480px] md:mx-0 md:my-0 md:w-[42%]">
            <div className="absolute -inset-x-[8%] -top-[4%] bottom-[30%] bg-[radial-gradient(closest-side,rgba(245,246,247,0.07),transparent_72%)] blur-xl" />
            <Image
              src="/media/derek.png"
              alt="Derek Belfield"
              fill
              priority
              sizes="(min-width: 768px) 42vw, 84vw"
              className="object-contain object-bottom"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, #000 66%, rgba(0,0,0,0) 97%)",
                maskImage: "linear-gradient(to bottom, #000 66%, rgba(0,0,0,0) 97%)",
                filter:
                  "drop-shadow(0 34px 44px rgba(0,0,0,0.78)) drop-shadow(-5px 0 10px rgba(227,160,8,0.3)) drop-shadow(5px 0 10px rgba(145,200,217,0.22))",
              }}
            />
            {/* His name and a rotating title, over the fade at the foot of the portrait. */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center md:justify-end">
              <div className="text-center md:text-right">
                <p className="text-lg font-semibold text-fg">{site.name}</p>
                <RotatingTitle titles={titles} className="text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials: a flat strip between two rules that fade out toward the page edges */}
      <section className="px-6 md:px-8">
        <div className="relative mx-auto w-full max-w-[1216px] py-6 md:py-8">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,#3A444D_20%,#3A444D_80%,transparent)]" />
          <CredentialCarousel />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,#3A444D_20%,#3A444D_80%,transparent)]" />
        </div>
      </section>

      {/* Outcomes: eight animated before-and-after cards in a bento grid, watermarked with the employer's mark */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-2 pt-14 md:px-8 md:pt-20">
        <Reveal>
          <h2 className="home-display text-4xl font-bold leading-none md:text-5xl">Successful outcomes</h2>
        </Reveal>
        <ul className="mt-7 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {outcomes.map((o, i) => (
            <li key={o.label} className={o.size === "hero" ? "col-span-2 lg:row-span-2" : o.size === "wide" ? "col-span-2" : undefined}>
              <OutcomeCard outcome={o} index={i} />
            </li>
          ))}
        </ul>
      </section>

      {/* Career: one proportional bar for the fourteen years, then the programs owned at each employer */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-6 pt-16 md:px-8 md:pt-20">
        <Reveal>
          <h2 className="home-display text-4xl font-bold leading-none md:text-5xl">14 years inside highly regulated industries</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-7 flex flex-col gap-2.5">
          <div className="flex justify-between font-mono text-xs text-[#9AA6B0]" aria-hidden="true">
            {["2012", "2014", "2016", "2018", "2020", "2022", "2024", "2026"].map((y, i) => (
              <span key={y} className={i > 0 && i < 7 ? "hidden md:inline" : undefined}>
                {y}
              </span>
            ))}
          </div>
          <div className="flex h-1.5 gap-1" aria-hidden="true">
            {career.map((c) => (
              <span key={c.slug} className="min-w-2 rounded-full" style={{ flex: `${c.span} 1 0%`, background: c.color }} />
            ))}
          </div>
        </Reveal>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {career.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={0.1 + i * 0.06} className="h-full">
                <Link
                  href={`/work/${c.slug}/`}
                  className="home-block flex h-full flex-col gap-1.5 rounded-xl border-t-[3px] px-6 py-6"
                  style={{ borderTopColor: c.color }}
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="home-display text-2xl font-semibold">{c.name}</span>
                    <span className="font-mono text-xs text-[#9AA6B0]">{c.years}</span>
                  </span>
                  <span className="text-sm text-[#9AA6B0]">{c.roles}</span>
                  <ul className="mt-3 flex flex-col gap-2">
                    {(programs[c.slug] ?? []).map((program) => (
                      <li key={program.name} className="flex items-center gap-3 text-[15px]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-[1px]" style={{ background: c.color }} aria-hidden="true" />
                        {program.name}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* The two products, shown as how he delivers now. The screenshot and the address open the live platform; "Case study" opens the chapter. */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-14 md:px-8">
        <Reveal>
          <h2 className="home-display text-4xl font-bold leading-none md:text-5xl">Now delivered with AI agents</h2>
        </Reveal>
        <div className="mt-8">
          <ProductCards />
        </div>
      </section>

      {/* Two doors: one per audience */}
      <Doors />
    </div>
  );
}
