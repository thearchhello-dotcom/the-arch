import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Prose from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Arch — suggestions, corrections, and brand enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <Prose
        eyebrow="Contact"
        title="Say hello"
        intro="One inbox, read by one person. Everything gets a reply — usually within a few days."
      >
        <p>
          <a
            href={`mailto:${site.email}`}
            className="!no-underline font-display !text-card inline-block bg-terracotta px-7 py-3.5 rounded-pill"
          >
            {site.email}
          </a>
        </p>

        <h2>Suggestions and corrections</h2>
        <p>
          If you&apos;ve found something that belongs in an edit, or spotted a price that&apos;s
          gone out of date, please do say. Prices move constantly and this site would rather be
          corrected than wrong &mdash; corrections are made the same week.
        </p>

        <h2>Brands and PR</h2>
        <p>
          Genuinely happy to hear what you&apos;re making. Two things worth knowing before you
          write, so neither of us wastes an afternoon:
        </p>
        <ul>
          <li>
            <strong>Placements aren&apos;t for sale.</strong> No amount of commission, gifting or
            fee gets a piece into an edit. Pieces get in by being right for the outfit.
          </li>
          <li>
            <strong>Nothing is guaranteed coverage.</strong> Samples are welcome but never create an
            obligation, and anything that does appear having been gifted is labelled as such in the
            edit itself.
          </li>
        </ul>
        <p>
          If that still sounds workable, send details of the range, sizing, and where it&apos;s sold.
        </p>

        <h2>Where we are</h2>
        <p>
          The Arch is written and published from {site.location} by {site.owner}. It is a
          personal publication rather than a company &mdash; there is no office, no team, and no
          switchboard, just the address above.
        </p>
      </Prose>
      <Footer />
    </>
  );
}
