@AGENTS.md

# The Arch — project notes

Read these before changing anything. Gemma runs this site through Claude Code
and does not edit code herself, so explain changes in plain English.

## What the site is

The Arch (thearchedits.co.uk) is a UK children's style site. Gemma styles
complete outfits and curated selections from high street shops, links every
piece and prices the whole thing up. It holds no stock and earns affiliate
commission. The total is the whole point of the site: no competitor publishes
one, so it has to be right, and anything that makes it less exact (a size
priced item, a sale) is said out loud rather than smoothed over.

## Stack and where things live

- Next.js 16 App Router, TypeScript, Tailwind v4, deployed on Vercel from GitHub
  (push to `main` deploys, usually within a minute).
- There is no database and no Supabase. Content is TypeScript:
  - `data/edits.ts` — every edit, newest first. `draft: true` hides one.
  - `data/products.ts` — every product. `price` is the lowest price;
    `priceTo` is the top of a size priced range; `onSale` + `salePrice` for
    sales.
  - `lib/site.ts` — site-wide facts (name, domain, socials). Change a fact
    here once, never in two places.
  - `lib/affiliate.ts` — tracked links and which shops' photos may show.
  - `lib/pinCopy.ts` — Pinterest wording, shown with copy buttons at `/studio`.
- Node is at `C:\Program Files\nodejs\` and is not on PATH. Call `npm.cmd`
  and `npx.cmd` by full path.
- Check a change on a local production build (`npm run build` then
  `npx next start -p <port>`) before pushing. Vercel previews sit behind
  Gemma's login, so they can't be used for checking.

## Rules

- British English. No emoji in files, commits or page copy. Plain voice.
- Styling only. Never claim a product was tested, or anything about quality or
  durability. Never write a review.
- Clothes, never children. Product images are laydowns only; no photograph
  of a child, ever.
- A shop's photographs show only once that shop has approved her on an
  affiliate programme. Prefer the Awin feed image (`images2.productserve.com`)
  over the shop's own website.
- Building an edit: Gemma sends the board first for styling feedback, then the
  links, then gets the real totals back for Canva. The prices on a draft board
  are placeholders; never comment on them.
- Themed edits use one hero piece per look, styled into a real outfit, never
  head to toe of the theme.

## Search (from Mark's playbook, applied 24 September 2026)

- Every published edit needs a `searchTitle`: what it is for, in the words a
  parent would search ("Bonfire night outfits for babies and kids"). It is the
  search result title, shows under the edit name, and leads the Pinterest pin.
  Keep each one distinct; never two that differ by a single word.
- When an edit is published, set its `published` date. When its content
  changes, set `updated`. These drive the sitemap, the structured data and the
  date under the title. Never set them automatically from the build time.
- After publishing or meaningfully changing an edit, once the deploy is live:
  `node scripts/indexnow-ping.mjs /edits/<slug>` (tells Bing and others).
  In Search Console, use URL Inspection and Request Indexing on the new edit.
- Never make near duplicate pages that swap one word ("christmas outfit for
  toddler girl" / "...baby boy"). One strong page instead.
- Every edit page links to four others in a rotating ring. Keep it that way;
  a "most similar" module starves most pages of links.
- Mark's full playbook, the AI search playbook and the content quality reset
  are in `docs/seo/` on Gemma's laptop. That folder is gitignored because the
  repository is public and the playbooks are his agency's internal documents.
