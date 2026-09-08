import Link from "next/link";

/**
 * The affiliate disclosure, shown ABOVE the first affiliate link on a page.
 *
 * UK guidance (CMA and ASA) is that the disclosure has to be upfront and
 * obvious — a line in the footer isn't enough, because a reader can click a
 * link without ever scrolling that far. Networks check for this at review.
 */
export default function DisclosureNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-sm leading-relaxed text-ink-soft bg-card border border-line rounded-2xl px-5 py-4 ${className}`}
    >
      <strong className="text-ink font-semibold">A note on links:</strong> some links in this edit
      are affiliate links, which means The Arch may earn a small commission if you buy
      through one &mdash; at no extra cost to you. It never affects which pieces are chosen or
      what&apos;s said about them.{" "}
      <Link href="/disclosure" className="text-terracotta font-semibold underline underline-offset-4">
        Full disclosure
      </Link>
      .
    </p>
  );
}
