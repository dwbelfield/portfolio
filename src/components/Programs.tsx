import type { Program } from "@/content/positions";
import { Reveal } from "./primitives";

/* Line icons, 24-unit grid, stroke inherits currentColor. */
const icons: Record<Program["icon"], React.ReactNode> = {
  parachute: (
    <>
      <path d="M3 11a9 9 0 0 1 18 0" />
      <path d="M3 11c3-1.5 15-1.5 18 0" />
      <path d="M3 11l9 9 9-9" />
      <path d="M8 11l4 9M16 11l-4 9" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2.5h6V4" />
      <path d="M8.5 13l2.5 2.5 4.5-5" />
    </>
  ),
  respirator: (
    <>
      <path d="M4 9.5C4 6.5 8 4.5 12 4.5s8 2 8 5v2.5c0 4.5-4 7.5-8 7.5s-8-3-8-7.5z" />
      <circle cx="8.5" cy="14" r="2" />
      <circle cx="15.5" cy="14" r="2" />
      <path d="M9.5 8.5h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path d="M13 8l-3 5h4l-3 5" />
    </>
  ),
  sigma: (
    <>
      <path d="M17 6H7l5 6-5 6h10" />
    </>
  ),
};

/** Pointy-top hexagon in a 100-unit box. */
const HEX = "50,3 92,26.5 92,73.5 50,97 8,73.5 8,26.5";

export default function Programs({ programs }: { programs: Program[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {programs.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.08}>
          <li className="group">
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                <polygon
                  points={HEX}
                  fill="var(--bg-panel)"
                  stroke="var(--line)"
                  strokeWidth="1.5"
                  className="transition-[stroke] duration-200 group-hover:[stroke:var(--accent)]"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 m-auto h-10 w-10 text-muted transition-colors duration-200 group-hover:text-fg"
                aria-hidden="true"
              >
                {icons[p.icon]}
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.blurb}</p>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
