import Image from "next/image";
import type { CSSProperties } from "react";
import { training, type Training } from "@/content/site";

type Badge = Training & { image: NonNullable<Training["image"]> };

/** Enough badges per row to out-span the widest container, so the loop never shows a gap. */
const MIN_PER_ROW = 8;
/** Seconds each badge takes to pass: keeps the speed steady as badges are added. */
const SECONDS_PER_BADGE = 5;

/**
 * AI credentials as an auto-scrolling strip of badges, nothing else. Each
 * badge is one link to the issuer's public verification page. The row is
 * rendered twice and the track slides one row-width, so it loops seamlessly;
 * it pauses on hover or keyboard focus. With reduced motion it becomes a
 * plain row you scroll by hand (see .marquee in globals.css).
 */
export default function CredentialCarousel() {
  const badges = training.filter((t): t is Badge => Boolean(t.image));
  if (badges.length === 0) return null;

  const repeats = Math.ceil(MIN_PER_ROW / badges.length);
  const row = Array.from({ length: repeats }, () => badges).flat();
  const track = [...row, ...row];
  const style = { "--marquee-dur": `${row.length * SECONDS_PER_BADGE}s` } as CSSProperties;

  return (
    <div className="marquee">
      <h2 className="sr-only">AI credentials</h2>
      <ul className="marquee-track py-2" style={style}>
        {track.map((t, i) => {
          // Only the first copy of each badge is exposed to keyboards and screen readers.
          const copy = i >= badges.length;
          return (
            <li
              key={i}
              aria-hidden={copy || undefined}
              className={`w-[142px] shrink-0 pr-6 md:w-[202px] md:pr-8 ${copy ? "marquee-copy" : ""}`}
            >
              <a
                href={t.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={copy ? -1 : undefined}
                title={`${t.name} · ${t.issuer} · ${t.date}`}
                className="group relative block rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <Image
                  src={t.image.src}
                  alt=""
                  width={t.image.width}
                  height={t.image.height}
                  className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.04]"
                />
                {/* The badge's name as real text, for screen readers and anything reading the markup. */}
                {!copy && (
                  <span className="sr-only">
                    {t.name}, {t.issuer}, {t.kind.toLowerCase()}, {t.date}. See the proof (opens in a new tab).
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
