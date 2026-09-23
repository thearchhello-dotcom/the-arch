import type { Edit } from "@/lib/types";
import { costOf, getProduct } from "@/data/products";
import { site } from "@/lib/site";

/**
 * Pinterest copy for an edit, worked out from the edit itself.
 *
 * Gemma was writing this by hand each time from a scratch file that went stale
 * the moment a price changed. Generating it means the figure in the pin always
 * matches the figure on the board and on the page — which is the one thing
 * that has to be true, because the whole promise of the site is that the
 * number is real.
 *
 * Pinterest is a search engine before it is a social network, so the title
 * front-loads what someone types: what it is, who it is for, what it costs.
 */
export function pinCopy(edit: Edit) {
  const url = `${site.domain}/edits/${edit.slug}`;
  const items = edit.looks.flatMap((l) => l.productIds.map(getProduct)).filter(Boolean);
  const shops = [...new Set(items.map((p) => p!.retailer))];
  const costs = edit.looks.map(costOf).filter((c) => c.from > 0);
  const low = costs.length ? Math.min(...costs.map((c) => c.from)) : 0;
  // "From" if any look is size priced, so the pin never promises a flat figure
  // the page then qualifies.
  const sized = costs.some((c) => c.to !== c.from);
  const money = low > 0 ? `${sized ? "from " : ""}£${low.toFixed(2)}` : "";

  const shopList =
    shops.length <= 3
      ? shops.join(", ")
      : `${shops.slice(0, 3).join(", ")} and ${shops.length - 3} more`;

  const title = money
    ? `${edit.title} — ${edit.looks.length} for babies and children, ${money}`
    : `${edit.title} — ${edit.looks.length} for babies and children`;

  const description = [
    edit.description,
    money && `The whole thing, added up — ${money}.`,
    shops.length && `From ${shopList}.`,
    "Shop every piece at thearchedits.co.uk",
  ]
    .filter(Boolean)
    .join(" ");

  const tags = [
    "#kidsfashion",
    "#kidsstyle",
    "#babyclothes",
    "#kidsoutfits",
    "#ukmum",
    ...(edit.season?.toLowerCase().includes("autumn") ? ["#autumnoutfits"] : []),
  ].join(" ");

  // `full` ends with the URL as well, since pasting the lot into a pin and
  // then hunting for the link separately is the fiddly bit on a phone.
  return { title, description, tags, url, full: `${title}\n\n${description}\n\n${tags}\n\n${url}` };
}

/**
 * Pin copy for a single look, so one edit can be four pins rather than one.
 *
 * Pinterest rewards volume of distinct pins far more than it rewards one
 * perfect one, and each of these lands on the same edit page — so four pins
 * is four chances to be found for the price of one piece of work.
 *
 * The title leads with who it is for and what it costs, because that is what
 * someone types. The description names the actual garments, which is what
 * makes it findable for "checkerboard jumper" rather than only for "knitwear".
 */
export function pinCopyForLook(edit: Edit, look: Edit["looks"][number]) {
  const url = `${site.domain}/edits/${edit.slug}`;
  const items = look.productIds.map(getProduct).filter(Boolean) as ReturnType<
    typeof getProduct
  >[];
  const cost = costOf(look);
  const sized = cost.to !== cost.from;
  const money = cost.from > 0 ? `${sized ? "from " : ""}£${cost.from.toFixed(2)}` : "";

  const shops = [...new Set(items.map((p) => p!.retailer))];
  const pieces = items.map((p) => p!.name.toLowerCase());
  const ages = look.ages ? ` (${look.ages})` : "";

  const title = money
    ? `${look.label} — the whole ${look.noun ?? "outfit"}, ${money}`
    : `${look.label} — ${edit.title}`;

  const description = [
    `${look.label}${ages}: ${listOf(pieces)}.`,
    money && `The whole ${look.noun ?? "outfit"}${sized ? ", from" : ","} ${money.replace(/^from /, "")}.`,
    shops.length === 1 ? `All from ${shops[0]} — one delivery.` : `From ${listOf(shops)}.`,
    `Part of ${edit.title}. Every piece linked at thearchedits.co.uk`,
  ]
    .filter(Boolean)
    .join(" ");

  const tags = [
    "#kidsfashion",
    "#kidsoutfits",
    look.label.toLowerCase().includes("baby") ? "#babyclothes" : "#kidsstyle",
    "#ukmum",
  ].join(" ");

  return { title, description, tags, url, full: `${title}\n\n${description}\n\n${tags}\n\n${url}` };
}

/** "a, b and c" — Pinterest descriptions read as prose, not as a list. */
function listOf(xs: string[]): string {
  if (xs.length <= 1) return xs[0] ?? "";
  return `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
}
