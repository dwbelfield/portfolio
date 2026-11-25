"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { training } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * AI credentials as a horizontal, snap-scrolling strip of badges. Each badge
 * is one link to the issuer's public verification page; there is no card or
 * caption. The arrows only appear once there are more badges than fit.
 */
export default function CredentialCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft > 4,
        end: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    el.addEventListener("scroll", update, { passive: true });
    // Fires once on observe, so it also sets the initial state.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const width = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: dir * width, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-line disabled:hover:text-fg";

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <span className="rule mb-4" />
        <h2 className="label">AI credentials</h2>
        <p className="mt-4 max-w-xs text-sm text-muted md:text-base">
          Select a badge to see its proof on the issuer&apos;s site.
        </p>
        {(edges.start || edges.end) && (
          <div className="mt-6 flex gap-2">
            <button type="button" className={arrow} onClick={() => step(-1)} disabled={!edges.start} aria-label="Previous credential">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className={arrow} onClick={() => step(1)} disabled={!edges.end} aria-label="Next credential">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>

      <ul
        ref={track}
        aria-label="AI credentials"
        className="flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-1 py-2 [scrollbar-width:none] md:col-span-8 md:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {training.map(
          (t) =>
            t.image && (
              <li key={t.href} className="w-[150px] shrink-0 snap-start md:w-[170px]">
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${t.name} · ${t.issuer} · ${t.date}`}
                  aria-label={`${t.name}, ${t.issuer}, ${t.date}. See the proof (opens in a new tab)`}
                  className="group block rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <Image
                    src={t.image.src}
                    alt=""
                    width={t.image.width}
                    height={t.image.height}
                    className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </a>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
