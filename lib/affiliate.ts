import type { Product, Retailer } from "@/lib/types";

/**
 * Turning a plain retailer link into one that actually earns.
 *
 * Approval alone pays nothing: a link to mamasandpapas.com is worth the same
 * after approval as before it. The network only credits a sale when the click
 * arrives through a tracked URL carrying the publisher's id and the
 * advertiser's id. That conversion is what this file does.
 *
 * Products keep their plain, human URL in `affiliateUrl`. It stays readable,
 * it survives a network change, and it is what gets checked when a product
 * goes out of stock. The tracking is applied at render time instead, in one
 * place, so a new programme is a line in PROGRAMMES rather than an edit to
 * every product from that shop.
 *
 * Skimlinks needs none of this — its script rewrites links in the browser
 * after the page loads, which is why Next and H&M links are left alone here.
 */

/** Gemma's Awin publisher id, read off a link generated in Awin's own deep
 *  link tool on 23 September 2026. Not a secret — it travels in the query
 *  string of every outbound link, which is how the network knows the click
 *  came from here. */
const AWIN_PUBLISHER_ID = "3098383";

/** Advertiser ids, per retailer, for programmes that are approved and live.
 *  A retailer missing from here links out plainly — which is the correct
 *  behaviour for one that is pending, rejected, or handled by Skimlinks. */
const PROGRAMMES: Partial<Record<Retailer, { network: "awin"; merchantId: string }>> = {
  "Mamas & Papas": { network: "awin", merchantId: "6526" },
  // M&S, adidas and Debenhams go here as they are approved. schuh declined.
};

/**
 * The URL a product's button should point at.
 *
 * Falls back to the plain link whenever anything is missing, so a half-set-up
 * programme sends readers to the right page and simply earns nothing, rather
 * than producing a broken link that earns nothing AND loses the sale.
 */
export function affiliateHref(product: Product): string | undefined {
  const plain = product.affiliateUrl;
  if (!plain) return undefined;

  const programme = PROGRAMMES[product.retailer];
  if (!programme || !AWIN_PUBLISHER_ID) return plain;

  if (programme.network === "awin") {
    const params = new URLSearchParams({
      awinmid: programme.merchantId,
      awinaffid: AWIN_PUBLISHER_ID,
      ued: plain,
    });
    return `https://www.awin1.com/cread.php?${params.toString()}`;
  }

  return plain;
}

/** Whether a retailer's links are currently tracked, for the disclosure page
 *  and for checking at a glance which programmes are actually wired up. */
export function isTracked(retailer: Retailer): boolean {
  return Boolean(AWIN_PUBLISHER_ID && PROGRAMMES[retailer]);
}

/**
 * Whether this retailer's photographs may be shown.
 *
 * Gemma's rule: the pictures go on for a shop at the moment that shop
 * approves her, and not before.
 *
 * Be straight about what that rests on. Approval plainly helps — before it
 * there is no relationship at all — but it is NOT the same as an explicit
 * licence to reuse a retailer's photography. Most affiliate terms do not
 * spell downstream image reuse out, and where it is not spelled out the
 * careful reading is that it has not been granted. I previously wrote here
 * that Awin's terms licence advertiser materials to publishers on the
 * programme; I had inferred that rather than read it, and it should not have
 * been stated as settled.
 *
 * Gemma knows this and has decided to run with it for approved retailers
 * while she asks them directly, which is hers to decide. The safeguards are
 * that it is one retailer at a time, that site.showProductImages turns every
 * photograph off everywhere in one word if anyone objects, and that a single
 * product's imageUrl can be deleted on its own.
 *
 * The larger version of this question is the Canva boards, which composite
 * several retailers' photographs into one branded graphic. Nothing here
 * touches that.
 *
 * Deliberately the same list that drives the tracked links, so the two can
 * never disagree: a shop whose links earn is a shop whose pictures show, and
 * when M&S is approved both switch on together from one line.
 *
 * This does not relax the other rule. Feeds and product pages both carry
 * model shots, and The Arch shows clothes, never children — so a photograph
 * still has to be a laydown before its address is stored at all.
 */
export function canShowImage(retailer: Retailer): boolean {
  return isTracked(retailer);
}
