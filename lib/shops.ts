import type { Retailer } from "@/lib/types";
import { trackedRetailers } from "@/lib/affiliate";

/** Every shop already used on the site, for the admin's shop list. The
 *  type annotation makes the compiler check each name is a real Retailer. */
const OTHER_SHOPS: Retailer[] = [
  "adidas", "Argos", "Debenhams", "F&F", "George", "H&M", "M&S", "Mabel & Fox",
  "My 1st Years", "Matalan", "MandM Direct", "Mountain Warehouse", "Next", "John Lewis",
  "JoJo Maman Bébé", "Tommee Tippee", "schuh", "Tu", "Zara",
];

/** Shops that earn first (Awin and UpPromote), then the rest alphabetically. */
export function shopList(): { name: string; earns: boolean }[] {
  const earns = trackedRetailers();
  const rest = OTHER_SHOPS.filter((s) => !earns.includes(s)).sort((a, b) => a.localeCompare(b));
  return [...earns.map((name) => ({ name, earns: true })), ...rest.map((name) => ({ name, earns: false }))];
}

const key = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");

/** "mamas and papas" and "Mamas & Papas" are the same shop. Tracked links are
 *  keyed on the exact name, so a typed shop is matched to the known spelling:
 *  otherwise a small difference would quietly mean an unpaid link. */
export function canonicalShop(typed: string): string {
  const k = key(typed);
  const hit = shopList().find((s) => key(s.name) === k);
  return hit ? hit.name : typed.trim();
}
