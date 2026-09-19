/** The bright accents, as a list to cycle through.
 *
 *  Defined once here so the homepage, the shop grid and the edit cards all
 *  draw from the same four and a product keeps the same colour wherever it
 *  appears. Contrast against ink is measured in app/globals.css — coral is the
 *  only one that fails body-text contrast, so anything sitting ON these must
 *  be large and bold, or be an image rather than text.
 */
export const POPS = ["bg-pop-sun", "bg-pop-leaf", "bg-pop-sky", "bg-pop-coral"] as const;

/** Stable per-item colour: the same id always lands on the same pop, so the
 *  grid doesn't reshuffle its colours on every render or route change. */
export function popFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return POPS[h % POPS.length];
}
