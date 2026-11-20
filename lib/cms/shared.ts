// Things the admin form (in the browser) and the server both need. Nothing
// secret in here, and nothing that touches the database.

export const BOARD_BUCKET = "edit-images";

/** One piece as typed into the admin form. */
export type CmsProduct = {
  name: string;
  /** Exactly a shop name. Shops The Arch is approved with are converted to
   *  tracked links by lib/affiliate.ts, which keys on this name. */
  shop: string;
  /** The lowest price, in pounds. */
  price: number;
  /** Top of the range when bigger sizes cost more. Makes a total a "from" figure. */
  priceTo?: number;
  /** Today's price when it is reduced. `price` stays the full price. */
  salePrice?: number;
  /** The shop's own address for the piece, never a tracked link. */
  url: string;
  /** A laydown photo address. Optional. Only shows once the shop has approved The Arch. */
  image?: string;
  /** What the garment icon looks like when there is no photo. */
  type?: "top" | "bottom" | "foot" | "head" | "toy" | "gift" | "nursery";
  category?: "Baby" | "Girls" | "Boys" | "Nursery";
  /** Optional name of the look this piece belongs to ("Girls", "Rainy day").
   *  Pieces sharing a name become one look with its own total. */
  group?: string;
};

export type EditStatus = "draft" | "published";

/** One edit as typed into the admin form. */
export type EditInput = {
  title: string;
  section: "outfits" | "nursery" | "gifts";
  intro: string;
  searchTitle: string;
  description: string;
  season: string;
  note: string;
  instagram: string;
  boardImage: string | null;
  lookKind: "outfit" | "shortlist";
  products: CmsProduct[];
};

export const SECTIONS: { id: EditInput["section"]; label: string }[] = [
  { id: "outfits", label: "Outfits" },
  { id: "gifts", label: "Gifts" },
  { id: "nursery", label: "Prams & nursery" },
];

export const TYPES: { id: NonNullable<CmsProduct["type"]>; label: string }[] = [
  { id: "top", label: "Top or dress" },
  { id: "bottom", label: "Trousers or skirt" },
  { id: "foot", label: "Shoes or socks" },
  { id: "head", label: "Hat or hair" },
  { id: "toy", label: "Toy" },
  { id: "gift", label: "Gift" },
  { id: "nursery", label: "Nursery" },
];

export const CATEGORIES: NonNullable<CmsProduct["category"]>[] = ["Baby", "Girls", "Boys", "Nursery"];

/** "£12.50", "12.5" and "12" all work. Returns null for anything that is not a
 *  sensible price, so a typo is caught rather than silently becoming 0. */
export function parsePrice(raw: string | number | undefined | null): number | null {
  if (raw === undefined || raw === null || raw === "") return null;
  const n = typeof raw === "number" ? raw : Number(String(raw).replace(/[£,\s]/g, ""));
  if (!Number.isFinite(n) || n <= 0 || n > 10000) return null;
  return Math.round(n * 100) / 100;
}

export function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/g, "") || "edit"
  );
}

/** http or https only, so a pasted "javascript:" can never become a link. */
export function isWebUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** PNG files start with these eight bytes. Checked in the browser before an
 *  upload, because a renamed JPEG or WebP gives a blank social image. */
export const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
