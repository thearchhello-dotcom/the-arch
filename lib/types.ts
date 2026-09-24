// Mirrors the data model in the technical foundation brief:
// products live once, edits/looks reference them rather than duplicating them.

/** Who or what a product is for. "Nursery" is the one that is not clothing:
 *  prams, cots, changing, feeding, the room itself. Without it every product
 *  had to be a garment for a child of a stated age, which quietly limited the
 *  site to outfits no matter what the copy said. */
export type Category = "Baby" | "Girls" | "Boys" | "Nursery";
export type Retailer =
  | "adidas"
  | "Debenhams"
  | "George"
  | "H&M"
  | "M&S"
  | "Matalan"
  | "Mamas & Papas"
  | "MandM Direct"
  | "Mountain Warehouse"
  | "Next"
  | "schuh"
  | "Tu"
  | "Zara";

/** Clothing first, then the non-clothing types — toys, gifts and nursery bits.
 *  Adding these now means expanding beyond outfits later is a data job, not a
 *  rebuild. Each one has an icon in GarmentIcon. */
export type ItemType = "top" | "bottom" | "foot" | "head" | "toy" | "gift" | "nursery";

export interface Product {
  id: string;
  name: string;
  category: Category;
  retailer: Retailer;
  price: number; // GBP — the lowest price across sizes

  /** Top of the range when a retailer charges more for bigger sizes, which
   *  Next does on most children's shoes and knitwear. Left off when one price
   *  covers every size, which is how M&S and H&M sell. Its presence is what
   *  turns an outfit total into a "from" figure rather than a flat one. */
  priceTo?: number;
  type: ItemType;
  affiliateUrl?: string; // stubbed until affiliate network feeds are wired in
  imageUrl?: string; // stubbed — use the network's product feed image once live
  onSale?: boolean;
  salePrice?: number;
}

export interface EditLook {
  /** Usually a Category ("Girls"), but any short label works — which is what
   *  lets an edit be a gift guide with sections like "Stocking fillers" or
   *  "Under £15" rather than only ever being an outfit. */
  label: Category | string;

  /** Who the outfit is sized for — "2–4 years", "0–6 months", "18m–3y".
   *  One line per outfit rather than per piece, because that's the question a
   *  reader actually has, and it's four short strings per edit rather than
   *  sixteen. Keep it broad: a range survives a piece selling out in one size.
   *  Optional — the outfit just doesn't show a range if it's missing. */
  ages?: string;

  /** What these pieces are to each other.
   *
   *  "outfit" (the default) — they're worn together, so they get a total.
   *  "shortlist" — they're alternatives to each other, so they get a price
   *  range instead. Three coats aren't an outfit and adding them up would be
   *  a number nobody is ever going to pay. */
  kind?: "outfit" | "shortlist";

  /** What this look IS, for the line above its total — "outfit" by default,
   *  but "set", "bundle" or "pram kit" for a look that is not clothing. The
   *  total is the site's whole promise, so the word above it has to be true:
   *  "The whole outfit" over a cot and a mobile reads as a mistake. */
  noun?: string;

  productIds: string[];
}

/** The part of the site an edit belongs to.
 *
 *  Outfits and prams are different shopping trips: someone buying a pramsuit
 *  is not browsing for a party dress, and mixing them makes the index read as
 *  a jumble. Optional, defaulting to "outfits", so every edit written before
 *  this existed keeps its place without being touched. */
export type EditSection = "outfits" | "nursery" | "gifts";

export interface Edit {
  slug: string;
  title: string;

  /** What the edit is for, in the words a parent would type into Google or
   *  Pinterest: "Bonfire night outfits for babies and kids". The title is a
   *  brand name ("After Dark") that nobody searches for; this sits beside it.
   *
   *  It becomes the page's title in search results, is shown on the page
   *  directly under the edit's name so the two match (search engines prefer a
   *  title that says what the page visibly says), and leads the Pinterest
   *  wording. Keep it true and specific, and never make two nearly the same —
   *  near-identical pages swapping one word is the pattern Mark's playbook
   *  warns gets a whole site marked down. */
  searchTitle?: string;

  /** Defaults to "outfits" when not set. */
  section?: EditSection;

  /** When the edit went live and when its content last changed, as ISO dates
   *  ("2026-09-23"). These feed the sitemap, the Article structured data and
   *  the line under the title, so all three always agree.
   *
   *  Set them by hand and only when something real changes. The sitemap used
   *  to stamp every page with the build time, which Google learns to ignore —
   *  a date that changes on every deploy says nothing, and Mark's playbook is
   *  right that it is worse than no date at all. The dates for the first ten
   *  edits were recovered from the git history: the first commit in which
   *  each existed without draft: true. */
  published?: string;
  updated?: string;
  season: string;
  palette: string[]; // hex values
  description: string;
  looks: EditLook[];
  /** The finished Canva mood-board image for this edit (export as PNG, drop it
   *  in /public/edits/, point this at it). Undefined until one exists — the
   *  edit page shows a placeholder in that case rather than pretending. */
  boardImage?: string;

  /** True while an edit is still being built. Drafts are hidden from the live
   *  site — off /edits, out of the sitemap, 404 in production — but ARE
   *  viewable when running `npm run dev`, so you can see your work in progress.
   *  Delete this line to publish. */
  draft?: boolean;

  /** Which week you intend to publish this. Planning note for you only; never
   *  rendered on the site. */
  plannedFor?: string;

  /** One or two sentences in your own voice, shown at the end of the edit above
   *  your signature — why you put this one together, what you'd wear it for,
   *  what made you pick the coat. This is the bit no competitor can copy, and
   *  it's the cheapest thing on the site to write. Optional: the signature only
   *  appears when there's a note. */
  note?: string;
}
