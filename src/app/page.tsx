import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import ChapterHero from "@/components/ChapterHero";
import CredentialCarousel from "@/components/CredentialCarousel";
import { Reveal } from "@/components/primitives";
import { site, author } from "@/content/site";

// A variable font: one file covers every weight the page uses.
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

/** Four results as before-and-after pairs. Bar widths are percentages of the card. */
const results = [
  { label: "Parts ready for issue", org: "Marine Corps", before: "15.1%", after: "98.3%", beforeWidth: 15.1, afterWidth: 98.3 },
  { label: "Time to replenish", org: "Marine Corps", before: "36 months", after: "3 months", beforeWidth: 100, afterWidth: 8.3 },
  { label: "Same-day ticket resolution", org: "RallyPay", before: "3.4%", after: "44%", beforeWidth: 3.4, afterWidth: 44 },
  { label: "Card-testing attacks", org: "RallyPay", before: "Before", after: "−99%", beforeWidth: 100, afterWidth: 1.5 },
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

function Arrow({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const outline =
  "inline-flex min-h-[52px] items-center gap-3 rounded-md border border-[#5B6772] px-6 font-semibold text-fg transition-colors hover:border-accent hover:text-accent";

export default function Home() {
  return (
    <div className={`home-surface ${display.variable}`}>
      {/* Hero: portrait, one headline, one line, two buttons */}
      <section className="overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pt-24 md:flex-row md:items-center md:gap-10 md:px-8 md:pb-14 md:pt-28">
          <div className="flex flex-col gap-6 md:flex-1">
            <h1 className="home-display text-[13vw] font-bold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
              Programs that ship. <span className="text-accent">AI built in</span>.
            </h1>
            <p className="max-w-xl text-lg text-[#C9D1D8] md:text-[22px]">
              I lead the people, run the plan, and build the AI that carries the load.
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
          </div>
        </div>
      </section>

      {/* Credentials: a flat strip, set off from the hero and the results by a rule above and below */}
      <section className="border-y border-[#2A3239]">
        <div className="mx-auto w-full max-w-[1280px] px-2 py-6 md:px-8 md:py-8">
          <CredentialCarousel />
        </div>
      </section>

      {/* Results: the starting point and the outcome side by side, readable without animation */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-2 pt-10 md:px-8 md:pt-12">
        <h2 className="sr-only">Results</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <li key={r.label}>
              <Reveal delay={i * 0.06} className="home-raised flex h-full flex-col gap-3 rounded-xl p-6">
                <div>
                  <p className="font-semibold">{r.label}</p>
                  <p className="text-[13px] text-[#9AA6B0]">{r.org}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 min-w-1 rounded-sm bg-[#5B6772]" style={{ width: `${r.beforeWidth}%` }} />
                  <span className="shrink-0 font-mono text-[13px] text-[#9AA6B0]">
                    <span className="sr-only">From </span>
                    {r.before}
                  </span>
                </div>
                <span className="h-3.5 min-w-1 rounded-sm bg-accent" style={{ width: `${r.afterWidth}%` }} />
                <p className="home-display text-4xl font-bold leading-none text-accent">
                  <span className="sr-only">to </span>
                  {r.after}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Career as one timeline: fourteen years inside teams */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-6 pt-16 md:px-8 md:pt-20">
        <Reveal>
          <h2 className="home-display text-4xl font-bold leading-none md:text-5xl">Fourteen years inside teams</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-7 flex flex-col gap-2.5">
          <div className="hidden justify-between font-mono text-xs text-[#9AA6B0] md:flex" aria-hidden="true">
            {["2012", "2014", "2016", "2018", "2020", "2022", "2024", "2026"].map((y) => (
              <span key={y}>{y}</span>
            ))}
          </div>
          <div className="flex flex-col gap-1 md:flex-row">
            <Link href="/work/marine-corps/" className="home-block flex flex-col gap-1.5 border-t-[3px] border-[#8E9AA4] px-5 py-[18px] md:flex-[8_1_0%]">
              <span className="home-display text-[22px] font-semibold">Marine Corps</span>
              <span className="text-sm text-[#9AA6B0]">Production Manager → Senior Operations Manager</span>
              <span className="font-mono text-[13px] text-accent">Led 60 people · parts ready 15.1% → 98.3%</span>
            </Link>
            <Link href="/work/rallypay/" className="home-block flex flex-col gap-1.5 border-t-[3px] border-[#CF7954] px-5 py-[18px] md:flex-[5.8_1_0%]">
              <span className="home-display text-[22px] font-semibold">RallyPay</span>
              <span className="text-sm text-[#9AA6B0]">Director of Operations → COO → Consultant</span>
              <span className="font-mono text-[13px] text-accent">Ran two engineering teams · 99% fewer card-testing attacks</span>
            </Link>
            <Link
              href="/work/pmb-companies/"
              aria-label="PMB Companies, Chief of Staff, April to October 2026"
              className="home-block flex flex-col gap-1.5 border-t-[3px] border-[#91C8D9] px-5 py-[18px] md:min-w-11 md:flex-[0.7_1_0%] md:p-0"
            >
              <span className="home-display text-[22px] font-semibold md:hidden">PMB Companies</span>
              <span className="text-sm text-[#9AA6B0] md:hidden">Chief of Staff · Apr–Oct 2026</span>
              <span className="font-mono text-[13px] text-accent md:hidden">6 production divisions from an empty floor</span>
            </Link>
          </div>
          <div className="flex flex-wrap justify-end gap-x-7 gap-y-1 text-sm text-[#9AA6B0]">
            <span className="hidden md:inline">
              <span className="text-[#91C8D9]">▍</span> PMB Companies · Chief of Staff · Apr–Oct 2026 · 6 production divisions
            </span>
            <span>
              <span className="text-accent">▍</span> 2026: co-founded Mythener and Zenblis
            </span>
          </div>
        </Reveal>
      </section>

      {/* The two products, shown as how he delivers now */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-14 md:px-8">
        <Reveal>
          <h2 className="home-display text-4xl font-bold leading-none md:text-5xl">Now delivered with AI agents</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Reveal>
            <Link href="/work/mythener/" className="home-raised group flex h-full flex-col overflow-hidden rounded-[14px]">
              <div className="relative mx-4 mt-4 h-[220px] overflow-hidden rounded-lg shadow-[inset_0_10px_30px_rgba(0,0,0,0.6)] md:h-[300px]">
                <ChapterHero scene="oracle" alt="A sphere of linked story facts, read by a sweeping ring" compact />
              </div>
              <div className="flex flex-col gap-2 px-6 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <span className="home-display text-[28px] font-semibold">Mythener</span>
                  <Arrow className="h-[22px] w-[22px] text-accent transition-transform group-hover:translate-x-1" />
                </div>
                <span className="text-[#9AA6B0]">A publishing platform AI agents built from my spec. 705 pull requests, 1,754 tests.</span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/work/zenblis/" className="home-raised group flex h-full flex-col overflow-hidden rounded-[14px]">
              <div className="relative mx-4 mt-4 h-[220px] overflow-hidden rounded-lg shadow-[inset_0_10px_30px_rgba(0,0,0,0.6)] md:h-[300px]">
                <Image
                  src="/media/screens/zenblis-home.jpg"
                  alt="The Zenblis home page: a search for senior living over a map of rated communities"
                  fill
                  sizes="(min-width: 768px) 600px, 92vw"
                  className="object-cover object-left-top"
                />
              </div>
              <div className="flex flex-col gap-2 px-6 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <span className="home-display text-[28px] font-semibold">Zenblis</span>
                  <Arrow className="h-[22px] w-[22px] text-accent transition-transform group-hover:translate-x-1" />
                </div>
                <span className="text-[#9AA6B0]">Built with a co-founder: he writes the software, I run go-to-market with an agent team.</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Two doors: one per audience */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-24 md:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="home-raised home-door-amber flex flex-col gap-4 rounded-2xl px-7 py-10 md:px-12 md:py-14">
            <h2 className="home-display text-5xl font-bold leading-none md:text-[56px]">
              Hiring<span className="text-accent">?</span>
            </h2>
            <p className="text-[19px] text-[#C9D1D8]">AI enablement or technical program roles.</p>
            <div className="mt-1 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="home-button inline-flex min-h-12 items-center rounded-md px-5 font-semibold">
                Email
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className={`${outline} min-h-12 px-5`}>
                LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="home-raised home-door-icy flex flex-col gap-4 rounded-2xl px-7 py-10 md:px-12 md:py-14">
            <h2 className="home-display text-5xl font-bold leading-none md:text-[56px]">
              Own a business in DFW<span className="text-[#91C8D9]">?</span>
            </h2>
            <p className="text-[19px] text-[#C9D1D8]">Bring me the mess.</p>
            <div className="mt-1 flex flex-wrap gap-3">
              <Link
                href="/consulting/"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-md border border-[#91C8D9] px-5 font-semibold text-[#91C8D9] transition-colors hover:bg-[#91C8D9] hover:text-[#111315]"
              >
                See consulting <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
