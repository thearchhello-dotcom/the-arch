import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { edits } from "@/data/edits";
import { getProduct } from "@/data/products";

/**
 * Your own back room. Every edit, with its three ready-made social images one
 * click away, so you never have to know or type a URL.
 *
 * Hidden from search engines and not in the navigation — it's a tool for you,
 * not a page for readers.
 */

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

const SIZES = [
  { q: "", label: "Pinterest", note: "1200 × 1800" },
  { q: "?format=post", label: "Instagram post", note: "1080 × 1350" },
  { q: "?format=story", label: "Instagram story", note: "1080 × 1920" },
];

export default function StudioPage() {
  return (
    <>
      <Header />

      <section className="px-5 pt-12 pb-6 sm:px-8 sm:pt-20 md:px-14 flex flex-col gap-5 max-w-2xl">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">
          Studio
        </span>
        <h1 className="font-display text-[30px] sm:text-4xl font-semibold leading-tight text-ink">
          Your social images
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft">
          Every edit, ready to post. Click a size, then right-click the image and
          &ldquo;Save image as&rdquo;. The title, the outfit price and the branding are all filled
          in from the edit itself &mdash; you never type them.
        </p>
        <p className="text-sm text-ink-faint">
          This page is just for you. It isn&apos;t linked from the site and search engines are told
          to ignore it.
        </p>
      </section>

      <section className="px-5 pb-16 sm:px-8 md:px-14 flex flex-col gap-4 max-w-3xl">
        {edits.map((edit) => {
          const totals = edit.looks
            .map((l) => l.productIds.reduce((s, id) => s + (getProduct(id)?.price ?? 0), 0))
            .filter((t) => t > 0);
          const low = totals.length ? Math.min(...totals) : 0;

          return (
            <div key={edit.slug} className="bg-card rounded-2xl p-5 sm:p-6 flex flex-col gap-3.5">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {edit.title}
                  {edit.draft && (
                    <span className="ml-2 align-middle text-[10px] font-body font-bold tracking-widest uppercase px-2 py-1 rounded-pill bg-ink text-card">
                      Draft
                    </span>
                  )}
                </h2>
                <span className="text-sm text-ink-faint">
                  {low > 0 ? `from £${low.toFixed(2)}` : "no prices yet"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {SIZES.map((s) => (
                  <a
                    key={s.label}
                    href={`/edits/${edit.slug}/pin${s.q}`}
                    target="_blank"
                    rel="noopener"
                    className="font-body font-semibold text-sm px-4 py-2.5 rounded-pill bg-cream border border-line text-ink hover:border-terracotta hover:text-terracotta transition-colors"
                  >
                    {s.label} <span className="text-ink-faint font-normal">{s.note}</span>
                  </a>
                ))}
                <Link
                  href={`/edits/${edit.slug}`}
                  className="font-body font-semibold text-sm px-4 py-2.5 rounded-pill text-ink-soft hover:text-terracotta transition-colors"
                >
                  View the edit &rarr;
                </Link>
              </div>

              {!edit.boardImage && (
                <p className="text-xs text-ink-faint leading-relaxed">
                  No Canva board yet &mdash; these use the edit&apos;s colours instead. Save your
                  board into <code>public/edits/</code> and set <code>boardImage</code> to use it.
                </p>
              )}
            </div>
          );
        })}
      </section>

      <Footer />
    </>
  );
}
