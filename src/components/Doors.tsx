import Link from "next/link";
import { Reveal } from "./primitives";
import { site } from "@/content/site";

export function Arrow({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** The outlined button that sits beside the amber one: `outlineBase` leaves the size to the caller. */
export const outlineBase =
  "inline-flex items-center gap-3 rounded-md border border-[#5B6772] font-semibold text-fg transition-colors hover:border-accent hover:text-accent";
export const outline = `${outlineBase} min-h-[52px] px-6`;

/**
 * The two panels that close a page, one per audience: someone hiring, and a
 * business owner in Dallas–Fort Worth. With the footer reduced to the
 * copyright line, this is where every page carries its contact links.
 */
export default function Doors({ consulting = true }: { consulting?: boolean }) {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-24 md:px-8">
      <div className={`grid gap-5 ${consulting ? "md:grid-cols-2" : ""}`}>
        <Reveal className="home-raised home-door-amber flex flex-col gap-4 rounded-2xl px-7 py-10 md:px-12 md:py-14">
          <h2 className="home-display text-5xl font-bold leading-none md:text-[56px]">
            Hiring<span className="text-accent">?</span>
          </h2>
          <p className="text-[19px] text-[#C9D1D8]">Looking for program management or AI-related roles.</p>
          <div className="mt-1 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="home-button inline-flex min-h-12 items-center rounded-md px-5 font-semibold">
              Email
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className={`${outlineBase} min-h-12 px-5`}>
              LinkedIn
            </a>
          </div>
        </Reveal>
        {consulting && (
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
        )}
      </div>
    </section>
  );
}
