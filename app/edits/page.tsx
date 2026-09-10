import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import EditFilters, { type EditSummary } from "@/components/EditFilters";
import { publishedEdits } from "@/data/edits";
import { getProduct, priceOf } from "@/data/products";
import type { Edit } from "@/lib/types";

export const metadata: Metadata = {
  title: "The edits",
  description:
    "Every edit — complete children's outfits from H&M, M&S and Next, styled together and priced up in full. Browse by what the whole outfit costs.",
};

/** Totals per look, so the cards and the price filter both work from the same
 *  numbers rather than each computing their own. */
function summarise(edit: Edit): EditSummary {
  const totals = edit.looks
    .map((look) =>
      look.productIds.reduce((sum, id) => {
        const p = getProduct(id);
        return sum + (p ? priceOf(p) : 0);
      }, 0)
    )
    .filter((t) => t > 0);

  return {
    slug: edit.slug,
    title: edit.title,
    season: edit.season,
    description: edit.description,
    palette: edit.palette,
    boardImage: edit.boardImage,
    draft: edit.draft,
    plannedFor: edit.plannedFor,
    low: totals.length ? Math.min(...totals) : 0,
    high: totals.length ? Math.max(...totals) : 0,
    looks: edit.looks.length,
    pieces: edit.looks.reduce((n, l) => n + l.productIds.length, 0),
  };
}

export default function EditsIndexPage() {
  const summaries = publishedEdits.map(summarise);

  return (
    <>
      <Header />

      <section className="px-5 pt-12 pb-8 sm:px-8 sm:pt-20 sm:pb-10 md:px-14 flex flex-col gap-5 max-w-2xl">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">
          The edits
        </span>
        <h1 className="font-display text-[30px] sm:text-4xl md:text-[44px] font-semibold leading-tight text-ink">
          Every look, priced up in full.
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft">
          Each edit is a complete outfit &mdash; not a list of ideas &mdash; built from shops you
          already buy from, with the total at the bottom so there are no surprises. Filter by what
          the whole outfit costs.
        </p>
      </section>

      <section className="px-5 pb-8 sm:px-8 md:px-14">
        {summaries.length === 0 ? (
          <div className="max-w-xl rounded-[28px] border-2 border-dashed border-taupe/60 px-10 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink mb-2">
              The first edit is on its way.
            </p>
            <p className="text-sm text-ink-soft">Check back soon.</p>
          </div>
        ) : (
          <EditFilters edits={summaries} />
        )}
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
