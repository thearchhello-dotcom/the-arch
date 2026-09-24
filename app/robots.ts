import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // While the site is private, tell every crawler to stay out entirely and
  // don't advertise a sitemap. Flip site.isPublic when you're ready.
  if (!site.isPublic) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // Everyone is welcome, search engines and AI assistants alike. The "*" rule
  // already covers GPTBot, ClaudeBot, PerplexityBot and the rest, so they are
  // not listed one by one. Being cited by an assistant is now a real way for a
  // parent to find the site, and blocking Google-Extended would not remove the
  // site from Google's AI answers anyway — it only affects model training.
  //
  // The two exclusions are tools rather than pages: the studio is Gemma's back
  // room, and the board template is an image generator. Neither should spend
  // crawl time, and neither is ever a page someone should land on.
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/board-template"] },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
