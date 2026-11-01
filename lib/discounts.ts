import type { Product, Retailer } from "@/lib/types";
import { priceOf } from "@/data/products";

/**
 * Discount codes Gemma has from the shops she works with, and the rules the shop
 * set. A code is only ever shown on a piece it applies to: over the minimum spend
 * and not in the sale. Say the rules every time, never "5% off everything".
 *
 * Add a shop here when it gives her a code. Mabel & Fox: THEARCH, 5%, minimum
 * spend £30, one use per customer, no sale or dropship items (email from Jess
 * Davis, 16 Oct 2026).
 */
const CODES: Partial<Record<Retailer, { code: string; minSpend: number; line: string }>> = {
  "Mabel & Fox": {
    code: "THEARCH",
    minSpend: 30,
    line: "Use code THEARCH for 5% off at Mabel & Fox. Orders over £30, one use per customer, not on sale items.",
  },
};

/** The line to print for this piece, or undefined when no code applies. */
export function codeLineFor(product: Product): string | undefined {
  const c = CODES[product.retailer];
  if (!c) return undefined;
  if (product.onSale) return undefined;
  if (priceOf(product) < c.minSpend) return undefined;
  return c.line;
}
