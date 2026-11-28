"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/writing/", label: "Writing" },
  { href: "/consulting/", label: "Consulting" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[rgba(17,19,21,0.72)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-6 md:px-8">
        {/* Initials on phones, where the full name and four links do not fit on one line. */}
        <Link href="/" className="label link-draw shrink-0 whitespace-nowrap text-fg" aria-label={site.name}>
          <span className="sm:hidden" aria-hidden="true">DB</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {links.map((l) => {
            const active = path?.startsWith(l.href.replace(/\/$/, ""));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="label link-draw text-fg"
                  aria-current={active ? "page" : undefined}
                >
                  {active && <span className="mr-2 text-accent">●</span>}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
