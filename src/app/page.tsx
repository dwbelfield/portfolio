export default function Home() {
  return (
    <main className="grid-underlay flex flex-1 flex-col justify-between px-8 py-8">
      <header className="flex items-center justify-between">
        <span className="label">Portfolio</span>
        <span className="readout">2026</span>
      </header>

      <section className="max-w-3xl">
        <p className="label mb-4">
          <span className="text-accent">●</span> Available for work
        </p>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Design system is wired.
          <br />
          <span className="text-muted">Pages come next.</span>
        </h1>
      </section>

      <footer className="flex items-center justify-between border-t border-line pt-4">
        <span className="readout">graphite / cool white / steel / amber</span>
        <span className="label">Scroll</span>
      </footer>
    </main>
  );
}
