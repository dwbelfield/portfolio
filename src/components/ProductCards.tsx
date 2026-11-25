import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./Doors";
import { Reveal } from "./primitives";
import { products } from "@/content/site";

/**
 * The two 2026 products as raised cards. The screenshot and the address open
 * the live platform in a new tab; "Case study" opens the chapter.
 */
export default function ProductCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {products.map((product, i) => (
        <li key={product.name} className="flex">
          <Reveal delay={i * 0.08} className="home-raised home-lift flex w-full flex-col overflow-hidden rounded-[14px] transition-[translate,border-color] duration-300 hover:-translate-y-1">
            <a
              href={product.site}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${product.siteLabel} (opens in a new tab)`}
              className="relative mx-4 mt-4 block h-[220px] overflow-hidden rounded-lg shadow-[inset_0_10px_30px_rgba(0,0,0,0.6)] md:h-[300px]"
            >
              <Image src={product.image} alt={product.alt} fill sizes="(min-width: 768px) 600px, 92vw" className="object-cover object-left-top" />
            </a>
            <div className="flex flex-1 flex-col gap-2 px-6 pb-5 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-x-4">
                <span className="home-display text-[28px] font-semibold">{product.name}</span>
                <a
                  href={product.site}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[13px] text-accent underline-offset-4 hover:underline"
                >
                  {product.siteLabel}
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
              <span className="text-[#9AA6B0]">{product.blurb}</span>
              <Link href={product.caseStudy} className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-2 font-semibold text-fg transition-colors hover:text-accent">
                Case study <Arrow />
              </Link>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
