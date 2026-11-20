import { site } from "@/lib/site";

/** Tells Bing and the other IndexNow engines about a new or changed edit (the
 *  step CLAUDE.md asks for after publishing). Best effort: a failure here must
 *  never stop a publish, and it only runs on the live site, not previews. */
export async function pingIndexNow(slug: string): Promise<void> {
  if (process.env.VERCEL_ENV !== "production") return;
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: site.displayDomain,
        key: site.indexNowKey,
        keyLocation: `${site.domain}/${site.indexNowKey}.txt`,
        urlList: [`${site.domain}/edits/${slug}`],
      }),
    });
  } catch (err) {
    console.error("IndexNow ping failed", err);
  }
}
