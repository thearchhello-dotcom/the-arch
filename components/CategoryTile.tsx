import Link from "next/link";
import GarmentIcon from "./GarmentIcon";
import type { Category } from "@/lib/types";

const TILES: { category: Category; bg: string; color: string; icon: "top" | "bottom" }[] = [
  { category: "Baby", bg: "bg-tile1", color: "#C96849", icon: "top" },
  { category: "Girls", bg: "bg-tile1", color: "#C96849", icon: "bottom" },
  { category: "Boys", bg: "bg-tile2", color: "#8FA383", icon: "bottom" },
];

export default function CategoryTiles() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {TILES.map((tile) => (
        <Link
          key={tile.category}
          href={`/shop?category=${encodeURIComponent(tile.category)}`}
          className={`${tile.bg} rounded-3xl px-6 py-7 flex flex-col justify-between gap-4 h-[190px] transition-transform hover:-translate-y-1 hover:shadow-lg`}
        >
          <GarmentIcon type={tile.icon} color={tile.color} size={34} />
          <span className="font-display text-lg font-semibold text-ink">{tile.category}</span>
        </Link>
      ))}
    </div>
  );
}
