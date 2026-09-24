// Tell Bing (and the other IndexNow engines) that pages have changed.
//
// IndexNow is a shared notification system: one POST reaches Bing, Yandex,
// Seznam and Naver, and Bing's index is what ChatGPT search and Copilot read
// from. Google does not take part, which is what Search Console is for.
//
// The key is not a secret. It is published at /<key>.txt on purpose, so the
// engines can confirm the ping really came from whoever controls the site.
//
// Run after a meaningful content change (a new or updated edit), not on every
// deploy:
//
//   node scripts/indexnow-ping.mjs              every URL in the live sitemap
//   node scripts/indexnow-ping.mjs /edits/x     just the paths given
//
// It reads the LIVE sitemap, so run it after the deploy has landed.

import { readdirSync } from "node:fs";

const HOST = "thearchedits.co.uk";
const SITE = `https://${HOST}`;
const key = readdirSync(new URL("../public/", import.meta.url))
  .map((f) => f.match(/^([0-9a-f]{32})\.txt$/)?.[1])
  .find(Boolean);
if (!key) throw new Error("No IndexNow key file (32 hex characters + .txt) found in public/");

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`));
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}
if (!urls.length) throw new Error("Nothing to submit");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList: urls }),
});
// 200 and 202 both mean accepted. 403 means the key file isn't live yet.
console.log(`${res.status} ${res.statusText} — ${urls.length} URL${urls.length === 1 ? "" : "s"} submitted`);
if (res.status !== 200 && res.status !== 202) process.exitCode = 1;
