/**
 * PARKED PIECES
 * =============
 * Things spotted while building one edit that belong to a different one.
 *
 * Gemma works by screenshotting products into Canva, which keeps the picture
 * but loses the link and the price — so this is where those two survive until
 * the edit that wants them gets built.
 *
 * Nothing here is imported by the site. It has no effect on anything until a
 * piece is moved into `data/products.ts` with a real id and listed in a look.
 *
 * Prices are what they were on the day they were saved — always re-check
 * before publishing, because sale prices move.
 */

export interface ParkedPiece {
  name: string;
  retailer: string;
  /** What it cost when it was saved, and the date it was checked. */
  price: string;
  savedOn: string;
  url: string;
  /** The edit this is being kept for. */
  forEdit: string;
  note?: string;
}

export const parked: ParkedPiece[] = [
  {
    name: "Boys Cream Pumpkin Knit Jumper (1–8yrs)",
    retailer: "Matalan",
    price: "£12.60, down from £14.00",
    savedOn: "10 September 2026",
    url: "https://www.matalan.co.uk/p/childrens-clothing/boys-cream-pumpkin-knit-jumper-1-8yrs/",
    forEdit: "the-knitwear-edit-26",
    note:
      "Too close to the girls' Pumpkin Picker knit to sit on the same board as it — cream chunky knit, script, embroidered pumpkin, near enough the same garment. Lovely on its own though, and it carries a knitwear board easily.",
  },
];
