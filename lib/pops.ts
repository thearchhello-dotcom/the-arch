/** The bright accents, as a list to cycle through.
 *
 *  Defined once here so the homepage, the shop grid and the edit cards all
 *  draw from the same four and a product keeps the same colour wherever it
 *  appears. Contrast against ink is measured in app/globals.css — coral is the
 *  only one that fails body-text contrast, so anything sitting ON these must
 *  be large and bold, or be an image rather than text.
 */
export const POPS = ["bg-pop-sun", "bg-pop-leaf", "bg-pop-sky", "bg-pop-coral"] as const;

/** Christmas edits take a Christmas colour, berry red and holly green taking
 *  turns, whatever the automatic pick would have been (it landed on yellow and
 *  sky blue for some). Add each new Christmas edit here. */
const OVERRIDES: Record<string, string> = {
  "christmas-arch-merry-bright-26": "bg-pop-berry",
  "christmas-arch-berry-christmas-26": "bg-pop-holly",
  "christmas-arch-traditions-26": "bg-pop-holly",
  "christmas-arch-countdown-26": "bg-pop-berry",
  "stocking-fillers-26": "bg-pop-berry",
  "big-christmas-presents-26": "bg-pop-holly",
  "little-christmas-presents-26": "bg-pop-berry",
};

/** Stable per-item colour: the same id always lands on the same pop, so the
 *  grid doesn't reshuffle its colours on every render or route change. */
export function popFor(seed: string): string {
  if (OVERRIDES[seed]) return OVERRIDES[seed];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return POPS[h % POPS.length];
}
