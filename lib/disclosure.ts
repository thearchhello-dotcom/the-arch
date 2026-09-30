/**
 * The "Ad" label for social posts.
 *
 * A post that leads to links which could earn Gemma commission is advertising,
 * and UK rules (the ASA and CMA guidance on affiliate marketing) want that said
 * plainly and upfront, at the start of the post where it is seen, not among
 * the hashtags or behind a "more". So every caption and pin the studio hands
 * over starts with it already on, which means it cannot be forgotten.
 *
 * Words rather than a hashtag, so it does not use up one of her five.
 * This is guidance, not legal advice; the ASA's own pages are the reference.
 */

/** First line of an Instagram or TikTok caption. */
export const AD_CAPTION = "Ad | contains affiliate links";

/** Start of a Pinterest pin description. Pins show the description's first
 *  words, so the label goes first there too. */
export const AD_PIN = "Ad: ";

export function adCaption(text: string): string {
  return `${AD_CAPTION}\n\n${text}`;
}

export function adPin(text: string): string {
  return text.startsWith(AD_PIN) ? text : `${AD_PIN}${text}`;
}
