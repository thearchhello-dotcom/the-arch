import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Prose from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "How The Arch makes money, what an affiliate link is, and why it never changes which pieces are chosen.",
};

export default function DisclosurePage() {
  return (
    <>
      <Header />
      <Prose
        eyebrow="Disclosure"
        title="How this site makes money"
        intro="Plainly, and in full — because you should be able to judge a recommendation knowing exactly what sits behind it."
        updated={site.policiesUpdated}
      >
        <h2>The short version</h2>
        <p>
          Some links on The Arch are <strong>affiliate links</strong>. If you click one and
          buy something, the retailer pays this site a small commission. It costs you nothing extra
          &mdash; the price is exactly the same as it would be going direct.
        </p>
        <p>
          That commission is the only way the site earns anything. There are no ads, no sponsored
          edits, and no paid placements.
        </p>

        <h2>What an affiliate link actually does</h2>
        <p>
          When you click through to a retailer, a small tag on the link tells them you arrived from
          here. If you buy within a set window &mdash; usually somewhere between 24 hours and 30
          days, depending on the shop &mdash; the retailer credits a percentage of the sale back to
          The Arch. The retailer sets that percentage; this site has no say in it and never
          sees your order details, name, or payment information.
        </p>
        <p>
          Affiliate links on this site are marked up as{" "}
          <strong>sponsored</strong> in the page code, which is what Google asks publishers to do,
          and they open in a new tab so you don&apos;t lose your place.
        </p>

        <h2>Why it doesn&apos;t change what gets picked</h2>
        <p>
          It would be easy to say &ldquo;commission doesn&apos;t influence us&rdquo; and leave it
          there, so here is the actual rule this site runs on:
        </p>
        <ul>
          <li>
            <strong>No brand can pay to be in an edit.</strong> Not for a mention, not for a
            placement, not for a link. Nobody has ever been offered that and nobody will be.
          </li>
          <li>
            <strong>Pieces are chosen first, links added afterwards.</strong> An edit is styled from
            what works together. Only once it&apos;s finished is each piece checked for an available
            affiliate link &mdash; and if there isn&apos;t one, the piece stays in anyway.
          </li>
          <li>
            <strong>A higher commission never wins.</strong> Where two pieces would do the same job,
            the better or better-value one goes in, regardless of what either pays.
          </li>
          <li>
            <strong>Nothing gets talked up to make a sale likelier.</strong> This is a styling site,
            so on how something wears or fits, the shop&apos;s own reviews will always tell you more
            than I can &mdash; more on that in{" "}
            <Link href="/how-we-choose">how the edits come together</Link>.
          </li>
        </ul>
        <p>
          More on how the edits are put together is on the{" "}
          <Link href="/how-we-choose">how it works</Link> page.
        </p>

        <h2>Who we work with</h2>
        {site.networks.length > 0 ? (
          <>
            <p>The Arch currently participates in the following affiliate programmes:</p>
            <ul>
              {site.networks.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            The Arch is not yet part of any affiliate programme &mdash; applications are in
            progress. Until one is approved, no link on this site earns anything and nothing here is
            monetised. This page will name every network and retailer programme as soon as that
            changes.
          </p>
        )}

        <h2>Prices</h2>
        <p>
          Prices shown are what the item cost when the edit was written. Retailers change prices and
          sell out of things constantly, so always check the current price on their site before
          buying. The Arch doesn&apos;t hold stock, handle orders, or process payments &mdash;
          your purchase is entirely between you and the retailer, including delivery, returns and
          anything that goes wrong.
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, or you think a link has been missed or mislabelled, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and it&apos;ll be fixed.
        </p>
      </Prose>
      <Footer />
    </>
  );
}
