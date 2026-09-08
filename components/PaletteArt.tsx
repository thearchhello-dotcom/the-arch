/**
 * PaletteArt — the visual identity for an edit that has no photography.
 *
 * The brand mark is a rainbow arch, and the site is called *The Arch*, so
 * every edit draws itself as a set of nested arches in its own palette. Two
 * edits never look alike because no two palettes are alike, and the whole thing
 * is generated — no photo shoots, no stock imagery, no Canva required.
 *
 * This is deliberately not a placeholder. An edit with no board should look
 * finished, not unfinished.
 */

/** Tiny deterministic hash so a given slug always draws the same composition
 *  on the server and the client. */
function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export default function PaletteArt({
  palette,
  seed = "",
  className = "",
  cream = "#F7F1E3",
}: {
  palette: string[];
  seed?: string;
  className?: string;
  cream?: string;
}) {
  // Deepest tone last reads best as the outermost band, but palettes arrive in
  // no particular order — so just take what's given and pad if it's short.
  const p = palette.length ? palette : ["#B7A695", "#8FA383", "#C96849", "#4A372A"];
  const c = (i: number) => p[i % p.length];

  const h = hash(seed);
  const variant = h % 4;

  // Where the arches spring from, per variant: centred, left corner, right
  // corner, or high and centred for a fuller, more circular composition.
  const anchors = [
    { cx: 200, cy: 500, r0: 210 },
    { cx: 40, cy: 500, r0: 270 },
    { cx: 360, cy: 500, r0: 270 },
    { cx: 200, cy: 430, r0: 185 },
  ];
  const { cx, cy, r0 } = anchors[variant];

  // Four nested bands, each a little smaller, ending in a cream keyhole that
  // echoes the cut-out in the logo.
  const bands = [0, 1, 2, 3].map((i) => ({
    r: r0 * (1 - i * 0.23),
    fill: c(i),
  }));

  const arch = (r: number) =>
    `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`;

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Colour palette for this edit"
    >
      <rect width="400" height="500" fill={cream} />

      {/* A soft wash of the first colour so the ground isn't flat */}
      <circle cx={cx} cy={cy} r={r0 * 1.5} fill={c(0)} opacity="0.07" />

      {bands.map((b, i) => (
        <path key={i} d={arch(b.r)} fill={b.fill} />
      ))}

      {/* The keyhole — same move as the logo's inner cut-out */}
      <path d={arch(r0 * 0.14)} fill={cream} />
    </svg>
  );
}
