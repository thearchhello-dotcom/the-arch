import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTiles from "@/components/CategoryTile";
import Newsletter from "@/components/Newsletter";
import PaletteArt from "@/components/PaletteArt";
import RainbowRule from "@/components/RainbowRule";
import Marquee from "@/components/Marquee";
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

/** Colour behind each previous board, cycled so no two neighbours match. */
const PADS = ["bg-pop-sun", "bg-pop-leaf", "bg-pop-coral", "bg-pop-sky"];

export default function HomePage() {
  const featured = publishedEdits[0];
  const rest = publishedEdits.slice(1, 5);
  const fromTotal = cheapestOutfitTotal();
  const editNo = String(publishedEdits.length).padStart(2, "0");

  return (
    <>
      <Header />

      {/* THE COVER.
          Kinfolk put one object on the page — an issue number, a title, and a
          single cover image — and nothing else. That is exactly the shape of
          this site: an edit is an edition and a board is its cover.

          Three rules taken from the sites worth copying, and they are all
          subtractive. Type is either very large or very small, never the
          medium weight that made this page feel polite. There is one thing to
          look at per screen. And there is no decoration: the rainbow that used
          to sit in this corner was competing with the board for attention, so
          it has gone. */}
      <section className="pattern-arches px-5 pt-10 pb-16 sm:px-8 sm:pt-14 md:px-14 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-7 md:gap-10">
          <div className="hero-copy flex flex-col items-center gap-3 text-center">
            <span className="font-body font-bold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-terracotta">
              Edit no. {editNo}
            </span>
            <h1 className="font-display font-semibold text-ink text-balance leading-[0.95] text-[clamp(44px,12vw,104px)] tracking-[-0.02em]">
              {featured ? featured.title : "Every look, ready to shop."}
            </h1>
            {/* Kinfolk can open on a title alone because everyone already knows
                what Kinfolk is. Nobody knows what this is yet, so one small
                line has to say it before the board does. It is the quiet half
                of the large/small pairing rather than a paragraph — and it
                stays clear of the word "outfit", because the edits already run
                wider than that. */}
            <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft text-balance">
              Complete looks for babies and children, every piece linked and the whole thing
              priced up.
            </p>
          </div>

          {featured && (
            <Link
              href={`/edits/${featured.slug}`}
              className="group block w-full max-w-[300px] sm:max-w-[380px] md:max-w-[440px]"
            >
              <div className="overflow-hidden rounded-[4px] shadow-[0_30px_70px_-34px_rgba(74,55,42,0.6)] transition-transform duration-300 group-hover:-translate-y-1.5">
                {featured.boardImage ? (
                  <Image
                    src={featured.boardImage}
                    alt={`${featured.title} mood board`}
                    width={1200}
                    height={1800}
                    priority
                    sizes="(max-width: 768px) 80vw, 440px"
                    className="w-full h-auto"
                  />
                ) : (
                  <PaletteArt
                    palette={featured.palette}
                    seed={featured.slug}
                    cream="#FBF6EA"
                    className="w-full h-auto aspect-[2/3]"
                  />
                )}
              </div>
            </Link>
          )}

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            <Link
              href={featured ? `/edits/${featured.slug}` : "/edits"}
              className="font-display font-semibold text-[15px] sm:text-base px-7 py-3.5 rounded-pill bg-ink text-cream transition-transform hover:-translate-y-0.5"
            >
              {featured ? "Shop this edit" : "See what's coming"}
            </Link>
            <Link
              href="/edits"
              className="font-body font-bold text-[11px] tracking-[0.18em] uppercase text-ink-soft hover:text-terracotta transition-colors"
            >
              All {publishedEdits.length} edits
            </Link>
          </div>
        </div>
      </section>

      {/* THE DARK BAND.
          The single biggest thing wrong with this site was that it was cream
          on cream on cream — and the boards are cream too, so the best thing
          it owns sank into its own background. One deep section turns the rest
          of the page into paper. It also gives the one claim nobody else in
          this category makes somewhere to be said loudly. */}
      <Marquee />

      <section className="bg-pop-sky text-ink px-5 py-16 sm:px-8 sm:py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 text-center">
          <span className="font-body font-bold text-[11px] tracking-[0.22em] uppercase text-ink/60">
            What nobody else does
          </span>
          <p className="font-display font-semibold leading-[1.08] text-balance text-[clamp(28px,5.5vw,52px)]">
            Styled like a lookbook.
            <br />
            Priced like a receipt.
          </p>
          <RainbowRule />
          <p className="max-w-lg leading-relaxed text-ink/80">
            {/* Deliberately not "outfit". The edits already run wider than
                that — coats, wellies, pramsuits — and there is no reason the
                site cannot cover toys, gifts or nursery later. The promise is
                that everything carries its price, whatever it is. */}
            {fromTotal
              ? `Every piece is linked and everything carries its price, so you know what you are spending — from £${fromTotal.toFixed(2)} — before you click, rather than at the checkout.`
              : "Every piece is linked and everything carries its price, so you know what you are spending before you click, rather than at the checkout."}
          </p>
        </div>
      </section>

      {/* The rest of the editions. Plain, small labels, no cards — the boards
          are the only thing here that needs to be looked at. */}
      {rest.length > 0 && (
        <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-14 md:py-24 flex flex-col gap-9">
          <div className="relative flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <RainbowRule className="absolute left-0 -bottom-[2px]" />
            <h2 className="font-body font-bold text-[11px] tracking-[0.22em] uppercase text-ink-soft">
              Previously
            </h2>
            <Link
              href="/edits"
              className="font-body font-bold text-[11px] tracking-[0.18em] uppercase text-ink-soft hover:text-terracotta transition-colors"
            >
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {rest.map((edit, i) => (
              <Link key={edit.slug} href={`/edits/${edit.slug}`} className="group flex flex-col gap-3.5">
                <div
                  className={`${PADS[i % PADS.length]} rounded-[14px] p-2.5 sm:p-3.5 transition-transform duration-300 group-hover:-translate-y-1`}
                >
                  <div className="overflow-hidden rounded-[3px] shadow-[0_14px_34px_-22px_rgba(74,55,42,0.55)]">
                  {edit.boardImage ? (
                    <Image
                      src={edit.boardImage}
                      alt={`${edit.title} mood board`}
                      width={1200}
                      height={1800}
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 23vw"
                      className="w-full h-auto"
                    />
                  ) : (
                    <PaletteArt
                      palette={edit.palette}
                      seed={edit.slug}
                      cream="#FBF6EA"
                      className="w-full h-auto aspect-[2/3]"
                    />
                  )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-body font-bold text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                    No. {String(publishedEdits.length - 1 - i).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[17px] leading-tight font-semibold text-ink group-hover:text-terracotta transition-colors text-balance">
                    {edit.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Shop by category */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 md:px-14 flex flex-col gap-7">
        <div className="relative border-b border-line pb-4">
          <RainbowRule className="absolute left-0 -bottom-[2px]" />
          <h2 className="font-body font-bold text-[11px] tracking-[0.22em] uppercase text-ink-soft">
            Shop by category
          </h2>
        </div>
        <CategoryTiles />
      </section>

      <Newsletter />

      <Footer />
    </>
  );
}
