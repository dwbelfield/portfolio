import type { MetadataRoute } from "next";
import { site, chapters } from "@/content/site";

export const dynamic = "force-static";

/** Built from the route list and the content model so it cannot drift from the site. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const top = ["/", "/work/", "/about/", "/consulting/"].map((path, i) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: i === 0 ? 1 : 0.8,
  }));
  const work = chapters.map((c) => ({
    url: `${site.url}/work/${c.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...top, ...work];
}
