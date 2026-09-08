import type { MetadataRoute } from "next";
import { publishedEdits } from "@/data/edits";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/edits",
    "/about",
    "/how-we-choose",
    "/contact",
    "/disclosure",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: new Date(),
  }));

  const editRoutes = publishedEdits.map((edit) => ({
    url: `${site.domain}/edits/${edit.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...editRoutes];
}
