import { edits as codeEdits } from "@/data/edits";
import { plainShopUrl } from "@/lib/affiliate";
import { canonicalShop } from "@/lib/shops";
import { boardUrlPrefix } from "./db";
import { CATEGORIES, TYPES, isWebUrl, parsePrice, type CmsProduct, type EditInput } from "./shared";

/** Turns what the form sent into something safe to store, or a list of plain
 *  sentences saying what to fix. Never trusts the browser: the same checks run
 *  here whatever the form did.
 *
 *  A draft only needs a title, so a half-finished edit can be saved from a
 *  phone and finished later. Going live needs everything the page promises. */
export function validateInput(
  raw: EditInput,
  mode: "draft" | "live",
  otherSearchTitles: string[]
): { ok: true; value: EditInput } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const clip = (s: unknown, max: number, label: string) => {
    const t = typeof s === "string" ? s.trim() : "";
    if (t.length > max) errors.push(`${label} is too long (most ${max} characters).`);
    return t;
  };

  const title = clip(raw.title, 120, "The title");
  const intro = clip(raw.intro, 1500, "The intro");
  const searchTitle = clip(raw.searchTitle, 140, "The search title");
  const description = clip(raw.description, 400, "The description");
  const season = clip(raw.season, 40, "The season");
  const note = clip(raw.note, 800, "Your note");
  const instagram = clip(raw.instagram, 2200, "The Instagram caption");
  const section = (["outfits", "gifts", "nursery"] as const).includes(raw.section) ? raw.section : "outfits";
  const lookKind = raw.lookKind === "shortlist" ? "shortlist" : "outfit";

  if (!title) errors.push("Add a title.");

  let boardImage: string | null = null;
  if (raw.boardImage) {
    const prefix = boardUrlPrefix();
    if (prefix && raw.boardImage.startsWith(prefix) && raw.boardImage.toLowerCase().endsWith(".png")) {
      boardImage = raw.boardImage;
    } else {
      errors.push("The board picture isn't one that was uploaded here. Upload it again.");
    }
  }

  const products: CmsProduct[] = [];
  (Array.isArray(raw.products) ? raw.products : []).forEach((p, i) => {
    const n = i + 1;
    const name = clip(p?.name, 200, `Piece ${n}'s name`);
    const shop = canonicalShop(clip(p?.shop, 60, `Piece ${n}'s shop`));
    const urlTyped = clip(p?.url, 2000, `Piece ${n}'s link`);
    const priceTyped = p?.price as unknown;
    const price = parsePrice(priceTyped as string | number);
    const priceTo = parsePrice(p?.priceTo as unknown as string | number);
    const salePrice = parsePrice(p?.salePrice as unknown as string | number);
    const imageTyped = clip(p?.image, 2000, `Piece ${n}'s picture address`);
    const group = clip(p?.group, 60, `Piece ${n}'s look name`);

    // A row nobody has touched is just skipped, so an extra blank row is harmless.
    if (!name && !shop && !urlTyped && price === null && !imageTyped) return;

    const url = urlTyped ? plainShopUrl(urlTyped) : "";
    if (url && !isWebUrl(url)) errors.push(`Piece ${n}: the link must start with https://`);
    if (imageTyped && !isWebUrl(imageTyped)) errors.push(`Piece ${n}: the picture address must start with https://`);
    if (priceTo !== null && price !== null && priceTo <= price) errors.push(`Piece ${n}: the top price must be more than the price.`);
    if (salePrice !== null && price !== null && salePrice >= price) errors.push(`Piece ${n}: the sale price must be less than the full price.`);

    if (mode === "live") {
      const who = name || `Piece ${n}`;
      if (!name) errors.push(`Piece ${n} needs a name.`);
      if (!shop) errors.push(`${who} needs a shop.`);
      if (price === null) errors.push(`${who} needs a price, like 12.50.`);
      if (!url) errors.push(`${who} needs a link.`);
    }

    products.push({
      name,
      shop,
      price: price ?? 0,
      ...(priceTo !== null ? { priceTo } : {}),
      ...(salePrice !== null ? { salePrice } : {}),
      url,
      ...(imageTyped ? { image: imageTyped } : {}),
      ...(TYPES.some((t) => t.id === p?.type) ? { type: p.type } : {}),
      ...(CATEGORIES.includes(p?.category as never) ? { category: p.category } : {}),
      ...(group ? { group } : {}),
    });
  });

  if (mode === "live") {
    if (!searchTitle) errors.push("Add a search title: what parents would type into Google, like \"Bonfire night outfits for babies and kids\".");
    if (!description) errors.push("Add a description: one or two sentences for search results.");
    if (!products.length) errors.push("Add at least one piece.");
    if (searchTitle && otherSearchTitles.some((t) => t.trim().toLowerCase() === searchTitle.toLowerCase())) {
      errors.push("Another edit already has exactly this search title. Make it different.");
    }
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    value: { title, section, intro, searchTitle, description, season, note, instagram, boardImage, lookKind, products },
  };
}

/** Slugs and search titles already used by edits written in code. */
export const codeSlugs = () => new Set(codeEdits.map((e) => e.slug));
export const codeSearchTitles = () => codeEdits.map((e) => e.searchTitle).filter((t): t is string => Boolean(t));
