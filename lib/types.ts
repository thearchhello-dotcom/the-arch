// Mirrors the data model in the technical foundation brief:
// products live once, edits/looks reference them rather than duplicating them.

export type Category = "Baby" | "Girls" | "Boys";
export type Retailer = "H&M" | "M&S" | "Next" | "Tu";

/** Clothing first, then the non-clothing types — toys, gifts and nursery bits.
 *  Adding these now means expanding beyond outfits later is a data job, not a
 *  rebuild. Each one has an icon in GarmentIcon. */
export type ItemType = "top" | "bottom" | "foot" | "head" | "toy" | "gift" | "nursery";

export interface Product {
  id: string;
  name: string;
  category: Category;
  retailer: Retailer;
  price: number; // GBP
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

  productIds: string[];
}

export interface Edit {
  slug: string;
  title: string;
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
