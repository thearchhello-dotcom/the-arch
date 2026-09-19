// The logo's three bands, flattened into a rule.
//
// The homepage redesign took every decoration off the page on purpose, and it
// worked — but it left the site reading more serious than it is. This is the
// one thing added back, and it earns its place by being structural rather than
// ornamental: it marks where a section starts, and it is the brand mark rather
// than a graphic invented for the occasion.
//
// The three colours are the logo's, turned up. The muted originals were the
// reason the site read tasteful rather than fun, which is the note Gemma kept
// giving and I kept missing.
const BANDS = ["#ff6a45", "#ffc233", "#4fbe86"]; // coral, sun, leaf

export default function RainbowRule({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-[3px] ${className}`} aria-hidden="true">
      {BANDS.map((color) => (
        <span key={color} className="block h-[5px] w-7 rounded-pill" style={{ background: color }} />
      ))}
    </span>
  );
}
