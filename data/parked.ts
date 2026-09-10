/**
 * PARKED PIECES
 * =============
 * Things spotted while building one edit that belong to a different one.
 *
 * Gemma works by screenshotting products into Canva, which keeps the picture
 * but loses the link and the price — so this is where those two survive until
 * the edit that wants them gets built.
 *
 * ONLY PARK THINGS THAT AREN'T TIED TO A DATE. A cord pinafore or a teddy coat
 * will still be around in six weeks; anything with a pumpkin or a snowflake on
 * it has to be used in its own season or not at all. Supermarket stock doesn't
 * survive a year either, so "save it for next autumn" never works.
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

export const parked: ParkedPiece[] = [];
