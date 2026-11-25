"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { training } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * AI credentials as a horizontal, snap-scrolling strip. Each card is one link
 * to the issuer's public verification page. The arrows only appear once there
 * are more cards than fit, so a single badge reads as a card, not a carousel.
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
    const width = card ? card.getBoundingClientRect().width + 16 : el.clientWidth;
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
          Every badge links to its proof on the issuer&apos;s site.
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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] md:col-span-8 [&::-webkit-scrollbar]:hidden"
      >
        {training.map((t) => (
          <li key={t.href} className="w-[85%] shrink-0 snap-start sm:w-[340px]">
            <a
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-bg transition-colors hover:border-accent focus-visible:border-accent"
            >
              {t.image && (
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  width={t.image.width}
                  height={t.image.height}
                  className="h-auto w-full"
                />
              )}
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <p className="label">{t.kind}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{t.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {t.issuer} · {t.date}
                </p>
                <span className="link-draw mt-4 w-fit text-sm text-fg">
                  Verify this badge <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
