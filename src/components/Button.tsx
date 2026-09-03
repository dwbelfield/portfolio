import Link from "next/link";
import { Magnetic } from "./primitives";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants = {
  primary: "bg-fg text-panel hover:bg-accent",
  ghost: "border border-line text-fg hover:border-accent hover:text-accent",
};

export function Button({ href, children, variant = "primary", external, className }: Props) {
  const cls = `${base} ${variants[variant]}`;
  return (
    <Magnetic className={`inline-block ${className ?? ""}`}>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </Magnetic>
  );
}
