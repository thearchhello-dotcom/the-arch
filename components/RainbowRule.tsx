// The logo's three bands, flattened into a rule.
//
// The homepage redesign took every decoration off the page on purpose, and it
// worked — but it left the site reading more serious than it is. This is the
// one thing added back, and it earns its place by being structural rather than
// ornamental: it marks where a section starts, and it is the brand mark rather
// than a graphic invented for the occasion.
//
// Same three colours, in the same order, as RainbowCorner and the printed
// board template, so the arch stays one idea wherever it turns up.
const BANDS = ["#DE8468", "#E3A83B", "#8FA383"]; // coral, gold, sage

export default function RainbowRule({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-[3px] ${className}`} aria-hidden="true">
      {BANDS.map((color) => (
        <span key={color} className="block h-[5px] w-7 rounded-pill" style={{ background: color }} />
      ))}
    </span>
  );
}
