import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Reveal, Words } from "@/components/primitives";
import { site, services, engagement } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/consulting/" },
  title: "AI Enablement Consulting",
  description:
    "AI enablement consulting in Dallas–Fort Worth and remote: readiness walkthroughs, team training, workflow and agent builds, and AI guardrails.",
};

const subject = encodeURIComponent("AI enablement inquiry");
const body = encodeURIComponent(
  "Hi Derek,\n\nHere is what is not working:\n\n\nHere is what we have tried:\n\n\nA good outcome would look like:\n\n",
);
const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

export default function ConsultingPage() {
  return (
    <>
      <section className="grid-underlay">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-14 pt-24 md:px-8 md:pb-28 md:pt-40">
          <Reveal y={0}>
            <p className="label mb-6">
              <span className="mr-2 text-accent">●</span>AI enablement consulting · {site.location}
            </p>
          </Reveal>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[1] tracking-tight md:text-8xl">
            <Words text="Bring me the mess." delay={0.1} stagger={0.1} />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-6 max-w-xl text-base text-muted md:mt-8 md:text-xl">
              Owners and founders hire me to put AI to work in the part of the business that
              is not turning decisions into outcomes. Training, builds, or a fractional lead,
              in Dallas–Fort Worth or remote. The deliverable is a team that uses the tooling
              and a system that is still running in month six, with people still accountable
              for it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={mailto} external>
                Email {site.email}
              </Button>
              <Button href={site.linkedin} external variant="ghost">
                LinkedIn
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-8 md:py-28">
          <Reveal>
            <span className="rule mb-4" />
            <p className="label mb-8 md:mb-10">What I take on</p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="bg-panel">
                <div className="p-6 md:p-10">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted md:mt-3 md:text-base">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof: the Mythener case study */}
      <section className="border-t border-line bg-panel">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 py-14 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal className="md:col-span-4">
            <span className="rule mb-4" />
            <p className="label">The case study</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-8">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-4xl">
              I do not teach this from a slide deck. I ship with it.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted md:mt-6 md:text-lg">
              Mythener is a production publishing platform that AI coding agents built from a
              specification I wrote: 74 numbered requirements, 705 pull requests, and 1,754
              automated tests, live at mythener.com. The same method scales down to a quoting
              workflow or an intake inbox.
            </p>
            <div className="mt-8">
              <Button href="/work/mythener/" variant="ghost">
                Read the Mythener case study
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engagement */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-8 md:py-28">
          <Reveal>
            <p className="label mb-8 md:mb-10">How it works</p>
          </Reveal>
          <ol className="grid gap-10 md:grid-cols-3">
            {engagement.map((e, i) => (
              <Reveal key={e.step} delay={i * 0.1}>
                <li>
                  <span className="readout text-2xl">{e.step}</span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{e.title}</h3>
                  <p className="mt-3 text-muted">{e.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-line bg-panel">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-40">
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight md:text-6xl">
            <Words text="Tell me what is not working." stagger={0.05} />
          </h2>
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Three lines is enough: what is broken, what you have tried, and what good looks
              like. I reply to every message.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href={mailto} external>
                Write to me
              </Button>
              <a href={`mailto:${site.email}`} className="link-draw readout text-fg">
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
