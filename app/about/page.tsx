import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RainbowCorner from "@/components/RainbowCorner";
import Newsletter from "@/components/Newsletter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Arch is written by Gemma in Cumbria — curated children's outfits from the shops parents already use, styled properly and priced up in full.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <section className="px-5 pt-12 pb-5 sm:px-8 sm:pt-20 md:px-14 flex flex-col gap-6 sm:gap-7 max-w-2xl">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">About</span>
        <p className="text-lg md:text-[19px] leading-relaxed text-ink font-medium">
          Getting your little one dressed shouldn&apos;t mean ten tabs open and an hour lost
          scrolling. That&apos;s where The Arch started.
        </p>
        <p className="leading-loose text-ink-soft">
          When we began looking for children&apos;s style inspiration, we found plenty of beautiful
          boards and lookbooks &mdash; but most were built around pieces that were hard to actually
          buy: limited runs, long waits, or styles that don&apos;t really suit everyday life. What we couldn&apos;t find was somewhere that did the styling and kept it
          real &mdash; outfits built mainly from the shops parents already use and trust, put
          together properly, and ready to shop in one place.
        </p>
        <p className="font-display text-xl font-semibold text-ink">So we built it ourselves.</p>
        <p className="leading-loose text-ink-soft">
          Every look on The Arch is curated from familiar, everyday retailers &mdash; H&amp;M,
          M&amp;S, Next and more &mdash; styled with the same care you&apos;d put into your own
          wardrobe: proper knitwear, considered colour palettes, pieces that layer and last. No
          guesswork, no need to hunt across a dozen sites. Just easy, elevated style for everyday
          life.
        </p>
      </section>

      {/* Who's behind it — the part affiliate networks and readers both actually
          read. Keeps the site a person rather than a page of links. */}
      <section className="px-5 py-9 sm:px-8 sm:py-12 md:px-14">
        <div className="bg-card rounded-[28px] p-7 sm:p-10 md:p-14 max-w-3xl flex flex-col gap-5 sm:gap-6">
          <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">
            Who&apos;s behind it
          </span>
          <h2 className="font-display text-[25px] sm:text-[30px] md:text-[34px] font-semibold leading-tight text-ink">
            Hello &mdash; I&apos;m {site.owner}.
          </h2>
          <p className="leading-loose text-ink-soft">
            I live in {site.location} with my two boys. Between them they&apos;ve taught me why a
            button fastening is a bad idea on a school morning, and how quickly a beautiful outfit
            stops being beautiful when it can&apos;t be climbed in.
          </p>
          <p className="leading-loose text-ink-soft">
            The Arch is the site I kept looking for and never found. Every edit is styled by
            me, from shops most of us already use, with the full outfit priced up so you can see
            what it comes to before you commit.
          </p>
          <p className="leading-loose text-ink-soft">
            No brand pays to appear in an edit, and nothing here is sponsored. If you&apos;d like to
            suggest a piece, correct me on something, or just say hello, I&apos;d genuinely like to
            hear from you &mdash;{" "}
            <Link href="/contact" className="text-terracotta font-semibold underline underline-offset-4">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-5 py-5 sm:px-8 md:px-14">
        <div className="relative overflow-hidden bg-card rounded-[28px] min-h-[200px] sm:min-h-[260px] p-7 sm:p-12 flex items-end">
          <RainbowCorner size="clamp(100px, 28vw, 230px)" innerColor="#FBF6EA" />
          <h2 className="relative z-10 font-display text-[26px] sm:text-[34px] font-semibold leading-tight max-w-sm">
            Little finds for little people.
          </h2>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </>
  );
}
