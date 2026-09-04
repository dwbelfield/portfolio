import type { Program } from "@/content/positions";
import { Reveal } from "./primitives";

/* Raster icons applied as a mask so they take currentColor like the line icons. */
const masks: Partial<Record<Program["icon"], string>> = {
  ordnance: "/media/icons/flaming-bomb.png",
};

/* Line icons, 24-unit grid, stroke inherits currentColor. */
const icons: Partial<Record<Program["icon"], React.ReactNode>> = {
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
  sigma: (
    <>
      <path d="M17 6H7l5 6-5 6h10" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="M9.5 10l1.75 1.75L14.5 8.5" />
      <path d="M8.5 15.5L7 21l5-2 5 2-1.5-5.5" />
    </>
  ),
  funnel: (
    <>
      <path d="M4 5h16l-6 7v6l-4 2v-8z" />
    </>
  ),
  nodes: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <circle cx="12" cy="13" r="2" />
      <path d="M12 7v4M10.5 14.5L6.5 16.5M13.5 14.5l4 2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M5 15l4-4 3 3 7-7" />
      <path d="M15 7h4v4" />
    </>
  ),
  hazard: (
    <>
      <path d="M12 4l9 16H3z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <path d="M12 15v2" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
      <path d="M10 21h4" />
    </>
  ),
  hardhat: (
    <>
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M3 16h18v2H3z" />
      <path d="M10 8V5h4v3" />
    </>
  ),
};

/** Pointy-top hexagon in a 100-unit box. */
const HEX = "50,3 92,26.5 92,73.5 50,97 8,73.5 8,26.5";

export default function Programs({ programs }: { programs: Program[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-5">
      {programs.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.08}>
          <li className="group">
            <div className="relative h-20 w-20 md:h-28 md:w-28">
              <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                <polygon
                  points={HEX}
                  fill="var(--bg-panel)"
                  stroke="var(--line)"
                  strokeWidth="1.5"
                  className="transition-[stroke] duration-200 group-hover:[stroke:var(--accent)]"
                />
              </svg>
              {masks[p.icon] ? (
                <span
                  className="absolute inset-0 m-auto block h-10 w-10 bg-current text-muted transition-colors duration-200 group-hover:text-fg md:h-14 md:w-14"
                  style={{
                    maskImage: `url(${masks[p.icon]})`,
                    WebkitMaskImage: `url(${masks[p.icon]})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                  }}
                  aria-hidden="true"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute inset-0 m-auto h-8 w-8 text-muted transition-colors duration-200 group-hover:text-fg md:h-10 md:w-10"
                  aria-hidden="true"
                >
                  {icons[p.icon]}
                </svg>
              )}
            </div>
            <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight md:mt-5 md:text-lg">{p.name}</h3>
            <p className="mt-1.5 text-xs text-muted md:mt-2 md:text-sm">{p.blurb}</p>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
