"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export default function EditFilters({ edits }: { edits: EditSummary[] }) {
  const [band, setBand] = useState<string>("all");

  const shown = useMemo(() => {
    const b = BANDS.find((x) => x.id === band) ?? BANDS[0];
    return edits.filter((e) => b.test(e));
  }, [band, edits]);

  // A band with nothing in it is a dead end, so hide the ones that would be
  // empty rather than letting someone click into nothing.
  const usable = BANDS.filter(
    (b) => b.id === "all" || edits.some((e) => b.test(e))
  );

  return (
    <>
      {usable.length > 1 && (
        <div className="flex flex-wrap gap-2.5 mb-9" role="group" aria-label="Filter edits by outfit price">
          {usable.map((b) => {
            const active = b.id === band;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBand(b.id)}
                aria-pressed={active}
                className={`font-body font-semibold text-sm px-5 py-2.5 rounded-pill transition-transform hover:-translate-y-0.5 ${
                  active ? "bg-terracotta text-card" : "bg-card text-ink border border-line"
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
          <p className="font-display text-lg font-semibold text-ink mb-2">
            Nothing in that range yet.
          </p>
          <p className="text-sm text-ink-soft">More edits are on the way.</p>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((edit) => (
            <Link
              key={edit.slug}
              href={`/edits/${edit.slug}`}
              className="group bg-card rounded-[24px] overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
            >
              <div className="aspect-[4/5] relative bg-tile1">
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
                <span className="absolute top-4 left-4 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-pill bg-cream/95 text-ink">
                  {edit.season}
                </span>
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
