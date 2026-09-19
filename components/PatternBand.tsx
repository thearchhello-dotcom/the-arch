/**
 * The rainbow pattern, as a band across the top of a page.
 *
 * It is a positioned element rather than a background on the section it
 * decorates, because several pages set a max-width on that section — a
 * background there would stop dead at the end of the text column on a wide
 * screen and look like a mistake. Absolutely positioned with no `top`, it
 * lands at its static position, which is wherever it sits in the markup, and
 * `left: 0; right: 0` resolves against the page rather than the column.
 *
 * Drop it immediately after <Header /> and give it a height that roughly
 * covers the page's intro. It is decorative and hidden from screen readers.
 */
export default function PatternBand({ className = "h-[340px]" }: { className?: string }) {
  return <div aria-hidden="true" className={`pattern-band ${className}`} />;
}
