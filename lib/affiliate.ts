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

/** Gemma's Awin publisher id. Empty until read off a real generated link. */
const AWIN_PUBLISHER_ID = "";

/** Advertiser ids, per retailer, for programmes that are approved and live.
 *  A retailer missing from here links out plainly — which is the correct
 *  behaviour for one that is pending, rejected, or handled by Skimlinks. */
const PROGRAMMES: Partial<Record<Retailer, { network: "awin"; merchantId: string }>> = {};

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
