import type { ReactNode } from "react";

/**
 * The single place every outbound retailer link goes through.
 *
 * Two things matter here and both are easy to get wrong by hand:
 *
 *  - rel="sponsored nofollow noopener" — Google requires monetised links to be
 *    marked as sponsored. Getting this wrong across a whole site is the kind of
 *    thing that quietly suppresses rankings, so it lives in one component
 *    rather than being retyped on every card.
 *  - Until an affiliate network is approved there is no URL to link to. Rather
 *    than render a button that looks live and goes nowhere, this falls back to
 *    a plainly inert state.
 */
export default function AffiliateLink({
  href,
  retailer,
  children,
  className = "",
}: {
  href?: string;
  retailer: string;
  children?: ReactNode;
  className?: string;
}) {
  const label = children ?? `View at ${retailer}`;

  if (!href) {
    return (
      <span
        className={`block font-display text-sm font-semibold rounded-pill bg-taupe/25 text-ink-faint text-center py-2.5 cursor-not-allowed ${className}`}
        title="Affiliate link not connected yet"
        aria-disabled="true"
      >
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={`block font-display text-sm font-semibold rounded-pill bg-ink text-card text-center py-2.5 transition-colors hover:bg-terracotta ${className}`}
    >
      {label}
      <span className="sr-only"> (affiliate link, opens in a new tab)</span>
    </a>
  );
}
