import { site } from "@/lib/site";

/**
 * The personal aside at the end of an edit.
 *
 * This is the one thing on the site a competitor genuinely can't copy, and it
 * costs a sentence to write. It's set inside an arch — the same shape as the
 * logo and the palette art — so it reads as a signed note rather than another
 * content block.
 */
export default function EditNote({ note }: { note: string }) {
  return (
    <section className="px-5 py-10 sm:px-8 sm:py-12 md:px-14">
      <div className="relative max-w-xl">
        {/* The arch outline, drawn behind the note */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full text-taupe/35"
        >
          <path
            d="M2,100 L2,42 A48,40 0 0 1 98,42 L98,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative px-6 pt-12 pb-9 sm:px-12 sm:pt-14 sm:pb-10 text-center flex flex-col items-center gap-5">
          <span className="font-body font-bold text-[11px] tracking-widest uppercase text-terracotta">
            A note from me
          </span>
          <p className="font-display text-lg sm:text-xl leading-relaxed text-ink max-w-md">
            {note}
          </p>
          <p className="font-display text-2xl italic text-terracotta" aria-label={site.owner}>
            {site.owner.split(" ")[0]}
          </p>
        </div>
      </div>
    </section>
  );
}
