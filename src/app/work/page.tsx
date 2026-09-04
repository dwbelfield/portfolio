import type { Metadata } from "next";
import ChapterList from "@/components/ChapterList";
import { Reveal, Words } from "@/components/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/work/" },
  title: "Work",
  description:
    "Four chapters: the Marine Corps, RallyPay, Wholesale Distributor at PMB Companies, and co-founding Zenblis.",
};

export default function WorkPage() {
  return (
    <section className="grid-underlay">
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
        <Reveal y={0}>
          <span className="rule mb-4" />
            <p className="label mb-6">Work</p>
        </Reveal>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1] tracking-tight md:text-8xl">
          <Words text="Four chapters. One pattern." delay={0.1} stagger={0.08} />
        </h1>
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Each one started with something that was not working and ended with a system that
            still is. Different industries, same job.
          </p>
        </Reveal>
        <div className="mt-20">
          <ChapterList />
        </div>
      </div>
    </section>
  );
}
