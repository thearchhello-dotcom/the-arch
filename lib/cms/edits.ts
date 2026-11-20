import { edits as codeEdits } from "@/data/edits";
import { registerProducts } from "@/data/products";
import type { Edit, EditLook, Product } from "@/lib/types";
import { fetchPublishedRows, type CmsRow } from "./db";

/**
 * Edits made in /admin, turned into the same shapes the rest of the site
 * already understands (Edit and Product), and merged in among the edits that
 * live in data/edits.ts. Nothing else on the site needs to know the
 * difference, which is what keeps old and new edits looking identical.
 */

const DEFAULT_PALETTES = [
  ["#B9855F", "#701C30", "#F1E9D8", "#E3A83B"],
  ["#7C6A82", "#F1E9D8", "#C7B9A4", "#3F3A33"],
  ["#8FA383", "#F1E9D8", "#C96849", "#E3A83B"],
  ["#C98C99", "#F1E9D8", "#701C30", "#B7A695"],
];

function paletteFor(slug: string): string[] {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return DEFAULT_PALETTES[h % DEFAULT_PALETTES.length];
}

/** "Winter 2026" from a date, used when no season label was typed. */
function seasonFor(iso: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  const m = d.getUTCMonth();
  const name = m >= 2 && m <= 4 ? "Spring" : m >= 5 && m <= 7 ? "Summer" : m >= 8 && m <= 10 ? "Autumn" : "Winter";
  return `${name} ${d.getUTCFullYear()}`;
}

function defaultType(section: CmsRow["section"]): Product["type"] {
  return section === "gifts" ? "gift" : section === "nursery" ? "nursery" : "top";
}

function defaultCategory(section: CmsRow["section"]): Product["category"] {
  return section === "nursery" ? "Nursery" : "Baby";
}

/** One saved edit becomes an Edit and its Products. Piece ids come from the
 *  edit's address and the piece's place, so they stay the same on every load. */
export function rowToEdit(row: CmsRow): { edit: Edit; products: Product[] } {
  const products: Product[] = [];
  const groups = new Map<string, string[]>();
  const fallbackLabel = row.section === "outfits" ? "The outfit" : "The pieces";

  (row.products ?? []).forEach((p, i) => {
    const sale = p.salePrice !== undefined && p.salePrice > 0 && p.salePrice < p.price;
    const product: Product = {
      id: `cms-${row.slug}-${i + 1}`,
      name: p.name,
      // The shop is free text in the admin, so it can be a shop the Retailer
      // type has never heard of. Every use of it is a plain string comparison.
      retailer: p.shop as Product["retailer"],
      category: p.category ?? defaultCategory(row.section),
      type: p.type ?? defaultType(row.section),
      price: p.price,
      ...(p.priceTo && p.priceTo > p.price ? { priceTo: p.priceTo } : {}),
      ...(sale ? { onSale: true, salePrice: p.salePrice } : {}),
      affiliateUrl: p.url,
      ...(p.image ? { imageUrl: p.image } : {}),
    };
    products.push(product);
    const label = p.group?.trim() || fallbackLabel;
    groups.set(label, [...(groups.get(label) ?? []), product.id]);
  });

  const looks: EditLook[] = [...groups.entries()].map(([label, productIds]) => ({
    label,
    ...(row.look_kind === "shortlist" ? { kind: "shortlist" as const } : {}),
    ...(row.section !== "outfits" ? { noun: "set" } : {}),
    productIds,
  }));

  const published = row.published_on ?? undefined;
  const edit: Edit = {
    cms: true,
    slug: row.slug,
    title: row.title,
    ...(row.search_title ? { searchTitle: row.search_title } : {}),
    ...(row.instagram ? { instagram: row.instagram } : {}),
    ...(row.note ? { note: row.note } : {}),
    section: row.section,
    season: row.season || seasonFor(row.published_on),
    ...(published ? { published } : {}),
    ...(row.updated_on && row.updated_on !== published ? { updated: row.updated_on } : {}),
    palette: paletteFor(row.slug),
    description: row.description,
    ...(row.intro ? { intro: row.intro } : {}),
    looks,
    ...(row.board_image ? { boardImage: row.board_image } : {}),
    ...(row.status === "draft" ? { draft: true } : {}),
  };
  return { edit, products };
}

/** Where a new edit goes among the existing ones: the list is newest first, so
 *  it goes before the first edit that is not newer than it. */
function mergeNewestFirst(code: Edit[], cms: Edit[]): Edit[] {
  const out = [...code];
  const known = new Set(code.map((e) => e.slug));
  const newest = [...cms].filter((e) => !known.has(e.slug)).sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""));
  for (const e of newest) {
    const at = out.findIndex((x) => (x.published ?? "") <= (e.published ?? ""));
    out.splice(at === -1 ? out.length : at, 0, e);
  }
  return out;
}

const liveCodeEdits = () =>
  codeEdits.filter((e) => process.env.NODE_ENV === "development" || !e.draft);

/** Everything live on the site: edits from code and from /admin, newest first.
 *  Also loads the admin edits' pieces so getProduct() can find them. */
export async function getPublishedEdits(): Promise<Edit[]> {
  const rows = await fetchPublishedRows();
  const made = rows.map(rowToEdit);
  registerProducts(made.flatMap((m) => m.products));
  return mergeNewestFirst(liveCodeEdits(), made.map((m) => m.edit));
}

export async function getPublishedEdit(slug: string): Promise<Edit | undefined> {
  return (await getPublishedEdits()).find((e) => e.slug === slug);
}

/** The pieces from live admin edits, for the shop page. Built from the current
 *  rows rather than the registry, so an unpublished edit's pieces drop out. */
export async function getCmsProducts(): Promise<Product[]> {
  const rows = await fetchPublishedRows();
  return rows.flatMap((r) => rowToEdit(r).products);
}
