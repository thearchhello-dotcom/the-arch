"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import type { Category, Retailer } from "@/lib/types";
import ProductCard from "./ProductCard";

const CATEGORIES: (Category | "All")[] = ["All", "Baby", "Girls", "Boys"];
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

  const filtered = useMemo(
    () =>
      products.filter(
        (p) => (category === "All" || p.category === category) && (retailer === "All" || p.retailer === retailer)
      ),
    [category, retailer]
  );

  return (
    <>
      <div className="flex flex-col gap-3.5 mb-6">
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
