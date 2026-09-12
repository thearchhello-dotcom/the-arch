import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RainbowCorner from "@/components/RainbowCorner";
import CategoryTiles from "@/components/CategoryTile";
import Newsletter from "@/components/Newsletter";
import PaletteArt from "@/components/PaletteArt";
import { publishedEdits } from "@/data/edits";
import { costOf } from "@/data/products";

/** What the site does that the editorial kids'-style sites don't: a real,
 *  complete number. Worked out from the actual data rather than written in. */
function cheapestOutfitTotal(): number | null {
  const totals = publishedEdits
    .flatMap((e) => e.looks)
    .map((look) => costOf(look).from)
    .filter((t) => t > 0);
  return totals.length ? Math.min(...totals) : null;
}

export default function HomePage() {
  const featured = publishedEdits[0];
  const rest = publishedEdits.slice(1, 4);
  const fromTotal = cheapestOutfitTotal();

  return (
    <>
      <Header />

      {/* Hero.
          The board goes here, not below the fold. This is a styling site, and
          the first screen used to be a headline, a paragraph, two buttons and
          a rainbow — not a single garment anywhere. The boards are the best
          thing the site owns and they were being kept back for the second
          screen, behind generated artwork at that. */}
      <section className="relative overflow-hidden px-5 pt-10 pb-14 sm:px-8 sm:pt-14 md:px-14 md:pt-20 md:pb-16">
        <RainbowCorner innerColor="#F7F1E3" />
        <div className="relative z-10 flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-14">
          <div className="flex flex-col gap-5 md:gap-6 md:max-w-md md:shrink-0">
            <h1 className="font-display text-[34px] leading-[1.12] sm:text-5xl md:text-[52px] font-semibold md:leading-[1.08] text-ink text-balance">
              Every look,
              <br />
              ready to shop.
            </h1>
            <p className="text-[15px] sm:text-lg leading-relaxed text-ink-soft">
              Complete outfits for babies and children, from the shops you already use &mdash; with
              every piece linked and the whole outfit priced up.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-7">
              <Link
                href={featured ? `/edits/${featured.slug}` : "/edits"}
                className="font-display font-semibold text-[15px] sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 rounded-pill bg-terracotta text-card shadow-lg shadow-terracotta/25 transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                {featured ? "See the latest edit" : "See what's coming"}
              </Link>
              {featured && (
                <Link
                  href="/edits"
                  className="font-semibold text-sm text-ink hover:text-terracotta transition-colors"
                >
                  See all edits &rarr;
                </Link>
              )}
            </div>
          </div>

          {featured && (
            <Link
              href={`/edits/${featured.slug}`}
              /* Deliberately modest on a phone. A 2:3 board at the full column
                 width is 480px tall before padding, which swallows the screen
                 and pushes the headline out of sight — the board should be the
                 first thing you see, not the only thing. */
              className="group block w-full md:flex-1 max-w-[236px] sm:max-w-[320px] md:max-w-[400px] mx-auto md:mx-0"
            >
              <div className="rounded-[26px] bg-footer p-2.5 sm:p-3 border border-line shadow-[0_22px_50px_-28px_rgba(74,55,42,0.55)] transition-transform group-hover:-translate-y-1">
                {featured.boardImage ? (
                  <Image
                    src={featured.boardImage}
                    alt={`${featured.title} mood board`}
                    width={1200}
                    height={1800}
                    priority
                    sizes="(max-width: 768px) 60vw, 400px"
                    className="w-full h-auto rounded-[18px] border border-line"
                  />
                ) : (
                  <PaletteArt
                    palette={featured.palette}
                    seed={featured.slug}
                    cream="#FBF6EA"
                    className="w-full h-auto aspect-[2/3] rounded-[18px] border border-line"
                  />
                )}
              </div>
              <span className="mt-3 block font-body font-bold text-xs tracking-widest uppercase text-terracotta">
                The latest edit
              </span>
              <span className="block font-display text-xl font-semibold text-ink group-hover:text-terracotta transition-colors">
                {featured.title}
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* The rest of the edits, still above the explaining. Someone who's
          landed here wants to see what the site makes, not read about it. */}
      {rest.length > 0 && (
        <section className="px-5 pb-14 sm:px-8 sm:pb-20 md:px-14 flex flex-col gap-6">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h2 className="font-display text-[23px] sm:text-[28px] font-semibold text-ink">
              More edits
            </h2>
            <Link
              href="/edits"
              className="font-semibold text-sm text-ink hover:text-terracotta transition-colors"
            >
              See all &rarr;
            </Link>
          </div>

          {/* Two across on a phone. One per row would be three full screens of
              scrolling for three boards. */}
          <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3">
            {rest.map((edit) => (
              <Link key={edit.slug} href={`/edits/${edit.slug}`} className="group flex flex-col gap-3">
                <div className="rounded-[22px] bg-footer p-2 border border-line transition-transform group-hover:-translate-y-1">
                  {edit.boardImage ? (
                    <Image
                      src={edit.boardImage}
                      alt={`${edit.title} mood board`}
                      width={1200}
                      height={1800}
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 30vw"
                      className="w-full h-auto rounded-[15px] border border-line"
                    />
                  ) : (
                    <PaletteArt
                      palette={edit.palette}
                      seed={edit.slug}
                      cream="#FBF6EA"
                      className="w-full h-auto aspect-[2/3] rounded-[15px] border border-line"
                    />
                  )}
                </div>
                <span className="font-display text-lg font-semibold text-ink group-hover:text-terracotta transition-colors">
                  {edit.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* The difference. The editorial kids'-style sites publish beautiful
          boards with no prices and nothing to click; this says plainly what
          this one does instead. It sits below the work rather than in front
          of it — nobody reads the pitch before they've seen the thing. */}
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
