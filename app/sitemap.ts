import type { MetadataRoute } from "next";
import { publishedEdits } from "@/data/edits";
import { site } from "@/lib/site";

/**
 * Only real dates, and only pages worth ranking.
 *
 * This used to stamp every URL with new Date(), so every deploy told Google
 * that all nineteen pages had just changed. Google learns to ignore a date
 * like that, which is worse than giving none. Now an edit carries the date its
 * content actually last changed, the pages that list edits carry the newest of
 * those, and pages without a trustworthy date simply omit it.
 *
 * Privacy, terms and the disclosure page are left out. They still exist, stay
 * crawlable and are linked from every footer; they just aren't pages anyone
 * should be sent to from a search, so they don't belong in the list of pages
 * put forward for ranking.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dates = publishedEdits
    .map((e) => e.updated ?? e.published)
    .filter((d): d is string => Boolean(d))
    .sort();
  const newest = dates.length ? new Date(dates[dates.length - 1]) : undefined;

  const hubs: MetadataRoute.Sitemap = ["", "/edits", "/shop"].map((path) => ({
    url: `${site.domain}${path}`,
    ...(newest ? { lastModified: newest } : {}),
  }));

  const pages: MetadataRoute.Sitemap = ["/about", "/how-we-choose", "/contact"].map((path) => ({
    url: `${site.domain}${path}`,
  }));

  const edits: MetadataRoute.Sitemap = publishedEdits.map((edit) => {
    const d = edit.updated ?? edit.published;
    return {
      url: `${site.domain}/edits/${edit.slug}`,
      ...(d ? { lastModified: new Date(d) } : {}),
    };
  });

  return [...hubs, ...edits, ...pages];
}
