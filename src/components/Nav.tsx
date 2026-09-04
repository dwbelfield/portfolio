"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/consulting/", label: "Consulting" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 md:px-8">
        <Link href="/" className="label link-draw text-fg">
          {site.name}
        </Link>
        <ul className="flex items-center gap-6 md:gap-8">
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
