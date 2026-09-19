import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { publishedEdits } from "@/data/edits";

/**
 * A private page for choosing a background pattern.
 *
 * Two guesses at this went out to the live site and both missed — too loud,
 * then too quiet — which is a slow way to make a decision that is entirely
 * about how something looks. Every candidate is here on real cream, at the
 * real hero size, with the real board, so it can be picked in one go.
 *
 * Not linked from anywhere and explicitly noindex. Delete the route once the
 * pattern is chosen.
 */
export const metadata: Metadata = {
  title: "Pattern options",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  { key: "A", cls: "pat-gingham", name: "Gingham", note: "The kidswear check. Familiar — which cuts both ways." },
  { key: "B", cls: "pat-scallop", name: "Scallops", note: "Rows of your arch, touching, so it reads as fabric." },
  { key: "C", cls: "pat-dots", name: "Dots", note: "The quietest. Hardest to get wrong." },
  { key: "D", cls: "pat-ticking", name: "Ticking stripe", note: "Pyjama fabric. Vertical, so it works with the tall title." },
  { key: "E", cls: "pat-confetti", name: "Confetti", note: "All four brights as little dashes. The most playful." },
  { key: "F", cls: "", name: "Nothing at all", note: "Plain cream, for comparison." },
];

export default function PatternsPage() {
  const featured = publishedEdits[0];

  return (
    <>
      <Header />
      <div className="px-5 py-10 sm:px-8 md:px-14 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink mb-3">Pick a pattern</h1>
        <p className="leading-relaxed text-ink-soft">
          Each block below is the top of the homepage with a different pattern behind it. Tell me
          a letter &mdash; and whether it wants to be stronger or fainter than it is here.
        </p>
      </div>

      <div className="flex flex-col gap-12 pb-20">
        {OPTIONS.map((opt) => (
          <section key={opt.key}>
            <div className="px-5 sm:px-8 md:px-14 mb-3 flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold text-terracotta">{opt.key}</span>
              <span className="font-display text-lg font-semibold text-ink">{opt.name}</span>
              <span className="text-sm text-ink-faint">{opt.note}</span>
            </div>

            <div className={`pat ${opt.cls} border-y border-line px-5 pt-8 pb-12 sm:px-8 md:px-14`}>
              <div className="mx-auto max-w-5xl flex flex-col items-center gap-5 text-center">
                <span className="font-body font-bold text-[11px] tracking-[0.22em] uppercase text-terracotta">
                  Edit no. 08
                </span>
                <h2 className="font-display font-semibold text-ink leading-[0.95] text-[clamp(38px,10vw,76px)] tracking-[-0.02em]">
                  {featured ? featured.title : "Halloween at Next"}
                </h2>
                {featured?.boardImage && (
                  <Image
                    src={featured.boardImage}
                    alt=""
                    width={1200}
                    height={1800}
                    sizes="(max-width: 768px) 55vw, 260px"
                    className="w-full max-w-[210px] sm:max-w-[260px] h-auto rounded-[4px] shadow-[0_20px_50px_-30px_rgba(74,55,42,0.6)]"
                  />
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
