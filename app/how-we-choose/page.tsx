import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Prose from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How the edits work",
  description:
    "What The Arch does — styling complete children's outfits from high-street shops — and what it deliberately doesn't claim.",
};

export default function HowWeChoosePage() {
  return (
    <>
      <Header />
      <Prose
        eyebrow="How it works"
        title="How the edits come together"
        intro="I put the outfits together, add up what they cost, and link every piece. Here's a little more on how — and on the bits I happily leave to the shops."
        updated={site.policiesUpdated}
      >
        <h2>The outfits</h2>
        <p>
          Each edit is a complete outfit &mdash; the top, the bottom, the shoes, the bits in between
          &mdash; put together so the pieces look right with each other rather than just looking
          nice on their own. Then every piece is linked and the whole lot is added up, so you can
          see what it comes to before you start.
        </p>

        <h2>What makes it into an edit</h2>
        <ul>
          <li>
            <strong>Whether it works as an outfit.</strong> Colours that sit together, shapes that
            balance, layers that make sense with each other.
          </li>
          <li>
            <strong>Whether you can actually buy it.</strong> Everything comes from shops that
            deliver across the UK, in stock in a decent range of sizes when the edit goes out.
          </li>
          <li>
            <strong>Whether the outfit adds up to something reasonable.</strong> Every look is
            totalled, and I try to keep a spread so there&apos;s something at different budgets.
          </li>
        </ul>

        <h2>What I leave to the shops</h2>
        <p>
          I&apos;m here for the styling rather than the reviewing &mdash; so on how something wears,
          washes or sizes up, the shop&apos;s own reviews will tell you far more than I can. Always
          worth a read before you buy.
        </p>

        <h2>Why the total matters</h2>
        <p>
          Most children&apos;s style sites show you a beautiful board and leave you to work out what
          it costs. That seems like the least useful place to stop. Adding it up is the one genuinely
          practical thing this site can do for you, so it&apos;s the thing it does properly.
        </p>

        <h2>Gifted items and sponsorship</h2>
        <p>
          No brand pays to appear in an edit, and no edit is sponsored. If a piece was gifted by a
          brand, it&apos;s labelled as gifted in the edit itself. A gift buys consideration, not a
          place.
        </p>

        <h2>Money</h2>
        <p>
          Affiliate commission never influences what goes into an edit. The order of operations is
          always: style the outfit first, add links second. How that works in full is set out on the{" "}
          <Link href="/disclosure">disclosure page</Link>.
        </p>

        <h2>Prices</h2>
        <p>
          Prices are what the item cost when the edit was published, and retailers change them
          constantly. Always check the current price on their site. If you spot one that&apos;s gone
          stale, <Link href="/contact">tell me</Link> and I&apos;ll fix it that week.
        </p>
      </Prose>
      <Footer />
    </>
  );
}
