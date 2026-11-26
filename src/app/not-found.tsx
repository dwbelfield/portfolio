import Link from "next/link";
import { Arrow } from "@/components/Doors";

export default function NotFound() {
  return (
    <section className="home-surface flex flex-1 items-center">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-32 md:px-8">
        <p className="font-mono text-[13px] text-[#9AA6B0]">404</p>
        <h1 className="home-display mt-4 text-[13vw] font-bold leading-[0.98] sm:text-7xl">
          Nothing here<span className="text-accent">.</span>
        </h1>
        <div className="mt-8">
          <Link href="/" className="home-button inline-flex min-h-[52px] items-center gap-3 rounded-md px-6 font-semibold">
            Back to the start <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
