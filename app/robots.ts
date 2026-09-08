import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // While the site is private, tell every crawler to stay out entirely and
  // don't advertise a sitemap. Flip site.isPublic when you're ready.
  if (!site.isPublic) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
