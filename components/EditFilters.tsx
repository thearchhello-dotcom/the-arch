"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { matches, parseQuery } from "@/lib/editSearch";
import type { EditSection } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { popFor } from "@/lib/pops";
import PaletteArt from "./PaletteArt";
import type { Edit } from "@/lib/types";

/**
 * Browse edits by what the outfit actually costs.
 *
 * This is the one search no competitor can answer, because none of them
 * publish totals. "Complete outfits under £40" is a real thing people look
 * for, and the site already has the numbers — they just weren't reachable.
 */

export type EditSummary = {
  slug: string;
  title: string;
  section: EditSection;
  /** normalise()d text of everything in the edit, for the search box. */
  searchText: string;
  /** Each look's age range in months. */
  ages: [number, number][];
  season: string;
  description: string;
  palette: string[];
  boardImage?: string;
  draft?: boolean;
  plannedFor?: string;
  /** Lowest and highest outfit total in this edit; 0 when nothing is priced. */
  low: number;
  high: number;
  looks: number;
  pieces: number;
};

const SECTIONS = [
  { id: "outfits", label: "Outfits" },
  { id: "nursery", label: "Prams & nursery" },
  { id: "gifts", label: "Gifts" },
] as const;

const BANDS = [
  { id: "all", label: "All edits", test: () => true },
  { id: "u40", label: "Under £40", test: (e: EditSummary) => e.low > 0 && e.low < 40 },
  { id: "40-60", label: "£40 – £60", test: (e: EditSummary) => e.low >= 40 && e.low < 60 },
  { id: "60-100", label: "£60 – £100", test: (e: EditSummary) => e.low >= 60 && e.low < 100 },
  { id: "100", label: "£100+", test: (e: EditSummary) => e.low >= 100 },
] as const;

function money(n: number) {
  return `£${n.toFixed(2)}`;
}

/** Starting points under the box. Each only appears if it finds something,
 *  so a suggestion is never a dead end, and they update themselves as edits
 *  are added. */
const SUGGESTIONS = ["Halloween", "Coats", "Pramsuits", "Wellies", "Knitwear", "Newborn", "2 year old", "Next", "M&S"];

export default function EditFilters({ edits }: { edits: EditSummary[] }) {
  const [band, setBand] = useState<string>("all");
  const [section, setSection] = useState<string>("all");
  const [query, setQuery] = useState("");
  const box = useRef<HTMLInputElement>(null);

  // Arriving from the search icon in the header (/edits#search) or from a
  // shared link (/edits?q=pramsuit) puts the cursor straight in the box.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
    if (q || window.location.hash === "#search") box.current?.focus();
  }, []);

  // Keep the search in the address bar, so a result can be shared or come
  // back to, without adding a history entry for every letter typed. The page
  // itself never changes, and its canonical stays /edits, so these addresses
  // don't become extra pages for Google.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.pathname + url.search);
  }, [query]);

  const parsed = useMemo(() => parseQuery(query), [query]);
  const suggestions = useMemo(
    () => SUGGESTIONS.filter((s) => edits.some((e) => matches(parseQuery(s), e))),
    [edits]
  );

  // Only worth showing the split once there is something to split. While every
  // edit is an outfit a section switcher is just a button that does nothing.
  const usableSections = SECTIONS.filter((s) => edits.some((e) => e.section === s.id));

  const shown = useMemo(() => {
    const b = BANDS.find((x) => x.id === band) ?? BANDS[0];
    return edits.filter(
      (e) => b.test(e) && (section === "all" || e.section === section) && matches(parsed, e)
    );
  }, [band, section, edits, parsed]);

  // A band with nothing in it is a dead end, so hide the ones that would be
  // empty rather than letting someone click into nothing.
  const usable = BANDS.filter(
    (b) => b.id === "all" || edits.some((e) => b.test(e))
  );

  return (
    <>
      <div id="search" className="scroll-mt-28 mb-7 max-w-2xl">
        <label htmlFor="edit-search" className="sr-only">
          Search the edits
        </label>
        <div className="relative">
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          {/* 16px text on purpose: anything smaller and iPhones zoom the whole
              page in when the box is tapped. */}
          <input
            ref={box}
            id="edit-search"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: pramsuit, Halloween, 2 year old…"
            className="w-full rounded-pill bg-card border border-line pl-13 pr-12 py-3.5 text-[16px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                box.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:bg-footer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>

        {!query && suggestions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3.5">
            <span className="text-sm text-ink-faint mr-1">Try</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="text-sm font-semibold px-3.5 py-1.5 rounded-pill bg-footer text-ink-soft hover:text-ink transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {query && !parsed.empty && shown.length > 0 && (
          <p className="mt-3.5 text-sm text-ink-soft" aria-live="polite">
            {shown.length} edit{shown.length === 1 ? "" : "s"} for &ldquo;{query.trim()}&rdquo;
          </p>
        )}
      </div>

      {usableSections.length > 1 && (
        <div className="flex flex-wrap gap-2.5 mb-5" role="group" aria-label="Filter edits by section">
          {[{ id: "all", label: "Everything" }, ...usableSections].map((s) => {
            const active = s.id === section;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                className={`font-display text-sm font-semibold px-5 py-2.5 rounded-pill transition-colors ${
                  active ? "bg-ink text-cream" : "bg-card text-ink border border-line"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      )}

      {usable.length > 1 && (
        <div className="flex flex-wrap gap-2.5 mb-9" role="group" aria-label="Filter edits by price">
          {usable.map((b) => {
            const active = b.id === band;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBand(b.id)}
                aria-pressed={active}
                className={`font-body font-semibold text-sm px-5 py-2.5 rounded-pill transition-transform hover:-translate-y-0.5 ${
                  active ? "bg-pop-sun text-ink font-bold" : "bg-card text-ink border border-line"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      )}

      {shown.length === 0 ? (
        <div className="max-w-xl rounded-[28px] border-2 border-dashed border-taupe/60 px-10 py-16 text-center">
          {query && !parsed.empty ? (
            <>
              <p className="font-display text-lg font-semibold text-ink mb-2">
                Nothing for &ldquo;{query.trim()}&rdquo; yet.
              </p>
              <p className="text-sm text-ink-soft mb-5">
                Try a piece like &ldquo;coat&rdquo;, an occasion like &ldquo;Halloween&rdquo;, or an age
                like &ldquo;2 year old&rdquo;. New edits go up every week.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="font-display text-sm font-semibold px-5 py-2.5 rounded-pill bg-ink text-cream"
              >
                Show all edits
              </button>
            </>
          ) : (
            <>
              <p className="font-display text-lg font-semibold text-ink mb-2">
                Nothing in that range yet.
              </p>
              <p className="text-sm text-ink-soft">More edits are on the way.</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((edit) => (
            <Link
              key={edit.slug}
              href={`/edits/${edit.slug}`}
              className="group bg-card rounded-[24px] overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
            >
              {/* 2:3, because that's the shape the boards are exported at for
                  Pinterest. A 4:5 card cropped the logo and title off the top
                  and the web address off the bottom, leaving the middle of the
                  board looking like a jumble. */}
              <div className={`aspect-[2/3] relative ${popFor(edit.slug)}`}>
                {edit.boardImage ? (
                  <Image
                    src={edit.boardImage}
                    alt={`${edit.title} mood board`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <PaletteArt
                    palette={edit.palette}
                    seed={edit.slug}
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                {/* Nothing sits on top of the board. Every board puts the
                    wordmark in one corner and the web address in another, so a
                    badge floated over the image will always land on something —
                    the season and the draft flag live in the card below it. */}
                {edit.draft && (
                  <span
                    className="absolute top-4 right-4 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-pill bg-ink text-card"
                    title={edit.plannedFor ?? undefined}
                  >
                    Draft
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col gap-2.5 flex-1">
                <span className="text-[11px] font-bold tracking-widest uppercase text-terracotta">
                  {edit.season}
                </span>
                <h2 className="font-display text-xl font-semibold text-ink group-hover:text-terracotta transition-colors">
                  {edit.title}
                </h2>
                <p className="text-sm leading-relaxed text-ink-soft line-clamp-3 flex-1">
                  {edit.description}
                </p>
                <div className="flex items-baseline justify-between pt-2 border-t border-line mt-1">
                  <span className="text-xs font-semibold text-ink-faint">
                    {edit.looks} look{edit.looks === 1 ? "" : "s"} &middot; {edit.pieces} piece
                    {edit.pieces === 1 ? "" : "s"}
                  </span>
                  {edit.low > 0 && (
                    <span className="text-sm font-bold text-ink">
                      {edit.low === edit.high
                        ? money(edit.low)
                        : `${money(edit.low)} – ${money(edit.high)}`}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
