"use client";

import { useEffect, useMemo, useState } from "react";
import { products } from "@/data/products";
import { normalise, parseQuery, pieceMatches } from "@/lib/editSearch";
import type { Category, Retailer } from "@/lib/types";
import ProductCard from "./ProductCard";

const CATEGORIES: (Category | "All")[] = ["All", "Baby", "Girls", "Boys", "Nursery"];
/* Derived from the products themselves rather than hardcoded, so adding a new
   shop to data/products.ts makes its chip appear, and a shop with nothing in it
   never shows a chip that returns an empty grid. */
const RETAILERS: (Retailer | "All")[] = [
  "All",
  ...([...new Set(products.map((p) => p.retailer))].sort() as Retailer[]),
];

function Chip({
  label,
  active,
  onClick,
  variant,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant: "category" | "retailer";
}) {
  const activeBg = variant === "category" ? "bg-terracotta" : "bg-ink";
  return (
    <button
      onClick={onClick}
      className={`font-body font-semibold text-sm px-5 py-2.5 rounded-pill transition-transform hover:-translate-y-0.5 ${
        active ? `${activeBg} text-card` : "bg-card text-ink border border-line"
      }`}
    >
      {label}
    </button>
  );
}

export default function ShopFilters({ initialCategory }: { initialCategory?: Category | "All" }) {
  const [category, setCategory] = useState<Category | "All">(initialCategory ?? "All");
  const [retailer, setRetailer] = useState<Retailer | "All">("All");
  const [query, setQuery] = useState("");

  // /shop?q=pramsuit, from "See all in the shop" on the edits page.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  // The same rules as the search on /edits, applied to single pieces: every
  // word must match the start of a word in the piece's name, shop or kind, and
  // a price ("under £20") is checked against what the piece costs now, so a
  // sale price counts. An age in the query is ignored, as pieces have none.
  const parsed = useMemo(() => parseQuery(query), [query]);
  const searchable = useMemo(
    () =>
      new Map(
        products.map((p) => [p.id, normalise(`${p.name} ${p.retailer} ${p.category} ${p.type}`).split(" ")])
      ),
    []
  );

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (!((category === "All" || p.category === category) && (retailer === "All" || p.retailer === retailer))) return false;
        if (parsed.words.length === 0 && parsed.maxPrice === null) return true;
        return pieceMatches(parsed, searchable.get(p.id) ?? [], p.onSale && p.salePrice ? p.salePrice : p.price);
      }),
    [category, retailer, parsed, searchable]
  );

  return (
    <>
      <div className="flex flex-col gap-3.5 mb-6">
        <div className="max-w-2xl">
          <label htmlFor="shop-search" className="sr-only">
            Search the pieces
          </label>
          {/* 16px text on purpose, so iPhones don't zoom in when it is tapped. */}
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pieces: wellies under £20, coat, Next…"
            className="w-full rounded-pill bg-card border border-line px-5 py-3.5 text-[16px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
        </div>
        <div className="flex gap-2.5 flex-wrap">
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} active={c === category} onClick={() => setCategory(c)} variant="category" />
          ))}
        </div>
        <div className="flex gap-2.5 flex-wrap">
          {RETAILERS.map((r) => (
            <Chip key={r} label={r} active={r === retailer} onClick={() => setRetailer(r)} variant="retailer" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-ink-soft text-sm py-12 text-center">No pieces match that combination yet.</p>
      )}
    </>
  );
}
