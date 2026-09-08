import type { ReactNode } from "react";

/** Shared layout for the text-heavy pages (disclosure, privacy, terms, contact)
 *  so they stay visually consistent without repeating Tailwind classes. */
export default function Prose({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="px-5 pt-12 pb-6 sm:px-8 sm:pt-20 md:px-14 flex flex-col gap-5 max-w-2xl">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">
          {eyebrow}
        </span>
        <h1 className="font-display text-[30px] sm:text-4xl md:text-[44px] font-semibold leading-tight text-ink">
          {title}
        </h1>
        {intro && <p className="text-lg leading-relaxed text-ink-soft">{intro}</p>}
        {updated && <p className="text-sm text-ink-faint">Last updated {updated}</p>}
      </section>

      <section className="px-5 pb-12 sm:px-8 sm:pb-16 md:px-14">
        <div
          className="max-w-2xl flex flex-col
            [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3
            [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-7 [&_h3]:mb-2
            [&_p]:leading-loose [&_p]:text-ink-soft [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-ink-soft
            [&_li]:mb-2 [&_li]:leading-relaxed
            [&_strong]:text-ink [&_strong]:font-semibold
            [&_a]:text-terracotta [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4"
        >
          {children}
        </div>
      </section>
    </>
  );
}
