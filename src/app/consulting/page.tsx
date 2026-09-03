import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Reveal, Words } from "@/components/primitives";
import { site, services, engagement } from "@/content/site";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Operating cadence, compliance and safety programs, standing up new lines, and process improvement for founders and owners.",
};

const subject = encodeURIComponent("Consulting inquiry");
const body = encodeURIComponent(
  "Hi Derek,\n\nHere is what is not working:\n\n\nHere is what we have tried:\n\n\nA good outcome would look like:\n\n",
);
const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

export default function ConsultingPage() {
  return (
    <>
      <section className="grid-underlay">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
          <Reveal y={0}>
            <p className="label mb-6">
              <span className="mr-2 text-accent">●</span>Consulting
            </p>
          </Reveal>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1] tracking-tight md:text-8xl">
            <Words text="Bring me the mess." delay={0.1} stagger={0.1} />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-lg text-muted md:text-xl">
              Founders and owners hire me for the part of the business that is not turning
              decisions into outcomes. Advisory, project, or fractional. The deliverable is a
              system that is still running in month six.
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
        <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="label mb-10">What I take on</p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="bg-panel">
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="grid-underlay border-t border-line">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="label mb-10">How it works</p>
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
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-40">
          <h2 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
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
