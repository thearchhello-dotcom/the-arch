import type { ItemType } from "@/lib/types";

// One simple line-icon per garment type, matching the design mockups —
// swap for real photography once product image feeds are connected.
const PATHS: Record<ItemType, string[]> = {
  top: [
    "M16 10c0-3 3.5-5 8-5s8 2 8 5v3c3 1 5 3.5 5 7v18a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V20c0-3.5 2-6 5-7v-3Z",
    "M16 13c2 2 4.5 3 8 3s6-1 8-3",
  ],
  bottom: ["M14 6h20l1 14 4 22h-8l-3-19-3 19h-8l-4-22 1-14Z"],
  foot: [
    "M12 20c0-4 2-9 6-9s5 4 8 4 5-2 8-1 4 4 4 9v10c0 3-2 5-5 5H16c-3 0-6-2-6-5v-13Z",
    "M12 27h26",
  ],
  head: [
    "M8 30c0-11 7-19 16-19s16 8 16 19",
    "M6 30h36v3a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-3Z",
  ],
  // Non-clothing types, for when the site expands past outfits.
  toy: ["M16 10h14v12H16z", "M9 26h15v14H9z", "M26 26h13v14H26z"],
  gift: [
    "M8 21h32v19a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V21Z",
    "M6 14h36v7H6z",
    "M24 14v28",
    "M24 14c-5 0-9-1.5-9-4.5S20 6 24 14Z",
    "M24 14c5 0 9-1.5 9-4.5S28 6 24 14Z",
  ],
  nursery: ["M24 7l4.7 9.9 10.8 1.6-7.8 7.7 1.8 11L24 32l-9.5 5.2 1.8-11-7.8-7.7 10.8-1.6L24 7Z"],
};

export default function GarmentIcon({
  type,
  color,
  size = 38,
}: {
  type: ItemType;
  color: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[type].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
