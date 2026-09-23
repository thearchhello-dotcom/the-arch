import Link from "next/link";
import GarmentIcon from "./GarmentIcon";
import type { Category, ItemType } from "@/lib/types";

// Three flat, saturated tiles rather than three shades of oatmeal. The icon
// is drawn in ink on all of them, because a tinted icon on a tinted tile was
// half the reason these used to disappear.
const TILES: { category: Category; bg: string; color: string; icon: ItemType }[] = [
  { category: "Baby", bg: "bg-pop-sun", color: "#4A372A", icon: "top" },
  { category: "Girls", bg: "bg-pop-coral", color: "#4A372A", icon: "bottom" },
  { category: "Boys", bg: "bg-pop-leaf", color: "#4A372A", icon: "bottom" },
  { category: "Nursery", bg: "bg-pop-sky", color: "#4A372A", icon: "nursery" },
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
          {/* Bumped to 20px bold: coral clears the large-text contrast bar,
              not the body-text one, and this label has to work on all three. */}
          <span className="font-display text-xl font-bold text-ink">{tile.category}</span>
        </Link>
      ))}
    </div>
  );
}
