import { site } from "@/content/site";

/** The site footer: the copyright notice and nothing else. Contact and profile links live in the pages. */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <p className="readout mx-auto w-full max-w-[1280px] px-6 py-8 text-center md:px-8">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
