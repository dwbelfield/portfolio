import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 py-10 md:grid-cols-3 md:px-8">
        <div>
          <span className="label">Contact</span>
          <a href={`mailto:${site.email}`} className="link-draw mt-3 block w-fit text-fg">
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-draw mt-1 block w-fit text-fg"
          >
            {site.linkedinLabel}
          </a>
        </div>
        <div>
          <span className="label">Based in</span>
          <p className="mt-3 text-fg">{site.location}</p>
          <p className="text-muted">Available for consulting and advisory work.</p>
        </div>
        <div className="md:text-right">
          <span className="readout">© {new Date().getFullYear()} {site.name}</span>
          <p className="readout mt-1">{site.motif}</p>
        </div>
      </div>
    </footer>
  );
}
