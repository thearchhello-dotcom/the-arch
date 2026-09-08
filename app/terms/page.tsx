import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Prose from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms on which The Arch is published.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <Prose
        eyebrow="Terms"
        title="Terms of use"
        intro="Short, and in plain English."
        updated={site.policiesUpdated}
      >
        <h2>What this site is</h2>
        <p>
          The Arch is a personal publication written by {site.owner} in {site.location}. It
          publishes styling suggestions for children&apos;s clothing and links out to the retailers
          selling them. It is not a shop: it holds no stock, takes no orders and processes no
          payments.
        </p>

        <h2>Buying through a link</h2>
        <p>
          When you follow a link to a retailer, any purchase is a contract between you and that
          retailer alone. Delivery, sizing, faults, refunds and returns are all theirs to handle
          under their own terms and your statutory rights. The Arch is not a party to that
          sale and can&apos;t intervene in it &mdash; though if a retailer has treated you badly,
          it&apos;s worth telling me, because it affects whether they stay in future edits.
        </p>

        <h2>Accuracy</h2>
        <p>
          Prices, availability and product details are correct as far as can be established on the
          day an edit is published, and go out of date quickly. Always check the current details on
          the retailer&apos;s own site before buying. Styling suggestions are opinions, offered in
          good faith &mdash; they aren&apos;t safety advice, and sizing in particular varies between
          brands more than anyone would like.
        </p>

        <h2>Copyright</h2>
        <p>
          The words, edits, boards and photography on this site belong to {site.name}. You&apos;re
          very welcome to link to any page, quote a short passage with credit, or share an edit.
          Please don&apos;t republish whole edits, or reproduce the site&apos;s content as your own.
          Brand names, logos and product images belong to their respective owners and appear here
          for identification.
        </p>

        <h2>Liability</h2>
        <p>
          This site is offered as it is. Reasonable care goes into it, but no promise is made that
          it will be uninterrupted, error-free, or that every detail is current. Nothing in these
          terms limits liability for death or personal injury caused by negligence, or for fraud
          &mdash; because the law doesn&apos;t allow that, and rightly so.
        </p>

        <h2>Changes</h2>
        <p>
          These terms may change; the date at the top shows when they last did. Continuing to use
          the site means the current version applies.
        </p>

        <h2>Law</h2>
        <p>
          These terms are governed by the law of England and Wales, and its courts have
          jurisdiction.
        </p>

        <h2>Getting in touch</h2>
        <p>
          Questions about any of this go to <a href={`mailto:${site.email}`}>{site.email}</a>. See
          also the <Link href="/disclosure">affiliate disclosure</Link> and{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </Prose>
      <Footer />
    </>
  );
}
