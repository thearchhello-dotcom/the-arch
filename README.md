# Theo & Arch

A Next.js site publishing weekly children's outfit edits, built to be approved by
affiliate networks and then monetised.

Written by Gemma, Cumbria.

## Getting started

Node 20 or later is required (currently running v24).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

> On this machine Node isn't on the PATH, so if `npm` isn't found, use the full
> path instead: `& "$env:ProgramFiles\nodejs\npm.cmd" run dev`

---

## Your weekly routine

This is the loop that gets you to ten edits.

1. **Design the board in Canva.** Duplicate `public/edits/board-template.png`,
   lay out the outfit, export as PNG.
2. **Save it** into `public/edits/`, e.g. `public/edits/autumn-edit-26-board.png`.
3. **Add the products** to `data/products.ts` — one row per piece, with a unique
   `id`, the retailer, and the real price.
4. **Add the edit** to `data/edits.ts` — give it a `slug`, list the `looks`
   referencing those product ids, and set `boardImage` to the PNG you saved.
5. **Refresh.** The page at `/edits/<slug>` builds itself, appears on `/edits`,
   and enters the sitemap. No new files to create.

Every product id referenced in a look must already exist in `data/products.ts`,
or that piece is silently skipped.

### Drafts

`data/edits.ts` contains **nine scaffolded edits**, taking you from one published
edit to ten. They are all publishable *now* — only three are tied to a date
(school, half term, bonfire night) and all three fall within the next two
months. The other six are angles rather than seasons — a price point, a problem,
a category — so you can publish them in any order, as fast as you can build the
boards.

Seasonal ideas for later in the year (Christmas, January, Easter) are parked in
**`data/future-edits.ts`**. That file isn't imported by the site and has no
effect on anything — when its month comes round, cut the entry and paste it into
the `edits` array.

Each draft is marked `draft: true`, which means:

- **Visible** when you run `npm run dev`, with a "Draft" badge, so you can see
  work in progress.
- **Invisible** on the live site — off `/edits`, out of the sitemap, 404 on its
  own URL. Verified: a production build generates only the published edit.

**To publish one, delete its `draft: true` line.** That's the whole mechanism.

Everything in a draft is a suggestion — retitle it, rewrite the description,
change the palette, reorder the weeks, or delete any you don't want. Nothing is
load-bearing.

---

## What's here

### Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage — hero, featured edit, the three-point difference, categories |
| `/edits` | Index of every edit, with price ranges. This is your shop window |
| `/edits/[slug]` | A single edit — board, looks, outfit totals |
| `/shop` | Filterable catalogue of every piece |
| `/about` | The approved About copy, plus who's behind it |
| `/how-we-choose` | Editorial standards — the five tests every piece passes |
| `/contact` | Email, plus the terms brands need to know upfront |
| `/disclosure` | Full affiliate disclosure |
| `/privacy` | Privacy & cookies |
| `/terms` | Terms of use |

### Key files

- **`lib/site.ts`** — your name, email, domain, newsletter endpoint, and the list
  of affiliate networks. Change details here, not in individual pages.
- **`data/products.ts`** / **`data/edits.ts`** — all content.
- **`lib/types.ts`** — the data model. Products live once; edits reference them.
- **`app/globals.css`** — brand palette and fonts as Tailwind v4 tokens.

### Components worth knowing about

- **`AffiliateLink`** — every outbound retailer link goes through this. It adds
  `rel="sponsored nofollow noopener"`, which Google requires on monetised links,
  and renders an inert button when there's no URL yet. Don't hand-write
  retailer links; use this.
- **`DisclosureNote`** — the disclosure banner. It sits *above* the first
  affiliate link on edit and shop pages, because UK CMA/ASA guidance is that a
  disclosure has to be seen before the click, not buried in the footer.
- **`CookieBanner`** — stores the choice in `localStorage` under
  `ta-cookie-consent`. Exports `getConsent()`; gate any analytics script on it
  returning `"accepted"`.
- **`Newsletter`** — shows an honest "opening soon" message until
  `site.newsletterEndpoint` is set.

---

## Before you apply to affiliate networks

Both Awin and Sovrn review sites by hand. This is what they look for.

### Done

- [x] Real About page with a named, contactable human behind it
- [x] Affiliate disclosure page, plus upfront disclosure above the links
- [x] Privacy & cookies policy covering affiliate tracking
- [x] Terms of use
- [x] Working contact route
- [x] Editorial standards page
- [x] Cookie consent banner
- [x] `rel="sponsored"` on every outbound link
- [x] Sitemap, robots.txt, structured data, social preview tags

### Still to do

- [ ] **Ten published edits.** The single biggest factor. A site with two edits
      reads as unfinished no matter how good the policies are.
- [ ] **A real domain**, then update `site.domain` in `lib/site.ts`.
- [ ] **Deploy it.** Vercel is free and made by the people who make Next.js —
      connect a repo and it deploys on every push.
- [ ] **A newsletter provider** — Buttondown or Kit both have free tiers. Paste
      the form action into `site.newsletterEndpoint`.
- [ ] **Analytics**, gated behind cookie consent. Plausible or Vercel Analytics
      avoid most of the cookie problem entirely.
- [ ] Once approved, add each network to `site.networks` — the disclosure page
      names them automatically.

### Then

- Awin charges a **refundable £5** at signup to deter bots. Network approval
  comes first, then you apply to each retailer (H&M, M&S, Next) separately —
  each sets its own criteria.
- Sovrn has **no traffic minimum** but reviews manually, and needs live links on
  the site generating at least one click before its automated review triggers.

---

## What's still a placeholder

- **Product data is hand-written sample data.** `data/products.ts` has no
  `affiliateUrl` or real `imageUrl`. Once a network is approved, replace it with
  data from their product feeds.
- **"View at [Retailer]" buttons are inert** until `affiliateUrl` is populated —
  deliberately, so nothing looks live before it is.
- **No database.** Everything reads from `data/`. Postgres via Supabase is the
  suggested next step once hand-editing weekly edits stops being practical.
- **Icons are line-drawn placeholders**, not product photography — swap
  `GarmentIcon` for real images once feed photos are available.
- **The legal pages are written for this site as it currently works.** They're
  solid and accurate, but they aren't legal advice — worth a read-through before
  you go live, and an update when you add analytics.
