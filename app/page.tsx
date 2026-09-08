import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RainbowCorner from "@/components/RainbowCorner";
import CategoryTiles from "@/components/CategoryTile";
import Newsletter from "@/components/Newsletter";
import PaletteArt from "@/components/PaletteArt";
import { publishedEdits } from "@/data/edits";
import { getProduct } from "@/data/products";

/** What the site does that the editorial kids'-style sites don't: a real,
 *  complete number. Worked out from the actual data rather than written in. */
function cheapestOutfitTotal(): number | null {
  const totals = publishedEdits
    .flatMap((e) => e.looks)
    .map((look) => look.productIds.reduce((sum, id) => sum + (getProduct(id)?.price ?? 0), 0))
    .filter((t) => t > 0);
  return totals.length ? Math.min(...totals) : null;
}

export default function HomePage() {
  const featured = publishedEdits[0];
  const fromTotal = cheapestOutfitTotal();

  return (
    <>
      <Header />

      {/* Hero */}
      {/* Extra bottom padding on small screens keeps the buttons clear of the
          rainbow, which sits in the bottom-right corner. */}
      <section className="relative overflow-hidden px-5 pt-14 pb-36 sm:px-8 sm:pb-28 md:px-14 md:pt-28 md:pb-20">
        <RainbowCorner innerColor="#F7F1E3" />
        <div className="relative z-10 flex flex-col gap-5 md:gap-6 max-w-2xl">
          <h1 className="font-display text-[34px] leading-[1.12] sm:text-5xl md:text-[56px] font-semibold md:leading-[1.08] text-ink text-balance">
            Every look,
            <br />
            ready to shop.
          </h1>
          <p className="text-[15px] sm:text-lg leading-relaxed text-ink-soft max-w-md">
            Getting your little one dressed shouldn&apos;t mean ten tabs open and an hour lost
            scrolling. That&apos;s where The Arch started.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-7">
            <Link
              href={featured ? `/edits/${featured.slug}` : "/edits"}
              className="font-display font-semibold text-[15px] sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 rounded-pill bg-terracotta text-card shadow-lg shadow-terracotta/25 transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              {featured ? "See this week's edit" : "See what's coming"}
            </Link>
            {featured && (
              <Link href="/edits" className="font-semibold text-sm text-ink hover:text-terracotta transition-colors">
                See all edits &rarr;
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured edit — only once there's something to feature */}
      {featured && (
      <section className="px-5 pb-14 sm:px-8 sm:pb-20 md:px-14">
        <div className="bg-card rounded-[28px] p-7 sm:p-10 md:p-14 flex items-center justify-between gap-8 sm:gap-12 flex-wrap">
          <div className="flex flex-col gap-4 max-w-md">
            <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">
              Featured Edit
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">{featured.title}</h2>
            <p className="text-ink-soft leading-relaxed">{featured.description}</p>
            <Link
              href={`/edits/${featured.slug}`}
              className="w-fit font-display font-semibold text-sm px-6 py-3 rounded-pill bg-terracotta text-card mt-1"
            >
              View the edit
            </Link>
          </div>
          <Link
            href={`/edits/${featured.slug}`}
            className="w-[240px] shrink-0 rounded-[22px] overflow-hidden shadow-lg shadow-ink/5 transition-transform hover:-translate-y-1"
          >
            <PaletteArt
              palette={featured.palette}
              seed={featured.slug}
              cream="#FBF6EA"
              className="w-full h-auto aspect-[4/5]"
            />
          </Link>
        </div>
      </section>
      )}

      {/* The difference. The editorial kids'-style sites publish beautiful
          boards with no prices and nothing to click; this says plainly what
          this one does instead. */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20 md:px-14">
        <div className="flex flex-col gap-3 mb-8 max-w-xl">
          <h2 className="font-display text-[23px] sm:text-[28px] font-semibold text-ink">
            Styled like a lookbook. Priced like a receipt.
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Most children&apos;s style sites show you a beautiful board and leave you to find the
            pieces. This one does the other half of the job.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "The whole outfit, totalled",
              body: fromTotal
                ? `Every look adds up to a real number — complete outfits from £${fromTotal.toFixed(2)} — so you know before you click, not at checkout.`
                : "Every look adds up to a real number, so you know what an outfit costs before you click rather than at checkout.",
            },
            {
              title: "Shops you already use",
              body: "H&M, M&S, Next and similar — high street names that deliver across the UK, so an outfit is a few clicks rather than a hunt.",
            },
            {
              title: "Nobody pays to be here",
              body: "No sponsored edits, no paid placements. Pieces get in by working with the outfit, and nothing else.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-card rounded-[22px] p-7 flex flex-col gap-2.5">
              <h3 className="font-display text-lg font-semibold text-ink">{card.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-soft">
          <Link
            href="/how-we-choose"
            className="font-semibold text-terracotta underline underline-offset-4"
          >
            How pieces get chosen
          </Link>{" "}
          &mdash; the rules every edit follows.
        </p>
      </section>

      {/* Shop by category */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20 md:px-14 flex flex-col gap-6 sm:gap-8">
        <h2 className="font-display text-[23px] sm:text-[28px] font-semibold text-ink">Shop by category</h2>
        <CategoryTiles />
      </section>

      <Newsletter />

      <Footer />
    </>
  );
}
