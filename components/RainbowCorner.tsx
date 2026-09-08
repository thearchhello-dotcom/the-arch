// The brand's rainbow-arch mark, reinterpreted as a corner peek (matches the
// treatment used on the printed mood-board template) rather than a literal
// copy of the logo lockup. Pure CSS — four concentric circles anchored at one
// corner point of an overflow-hidden box, so only a quarter-arc shows.
//
// The size is a CSS length, not a number, so it can scale with the viewport.
// At a fixed 260px it swallowed most of a phone screen and sat behind the
// buttons; now it shrinks with the screen and stays out of the way.
export default function RainbowCorner({
  size = "clamp(110px, 30vw, 260px)",
  innerColor = "#F7F1E3",
  className = "",
}: {
  size?: string;
  innerColor?: string;
  className?: string;
}) {
  const bands = [
    { scale: 1.77, color: "#DE8468" }, // coral
    { scale: 1.46, color: "#E3A83B" }, // gold
    { scale: 1.15, color: "#8FA383" }, // sage
    { scale: 0.85, color: innerColor }, // matches whatever it sits on
  ];

  return (
    <div
      className={`absolute right-0 bottom-0 overflow-hidden pointer-events-none ${className}`}
      style={{ ["--rc" as string]: size, width: "var(--rc)", height: "var(--rc)" }}
      aria-hidden="true"
    >
      {bands.map((band, i) => {
        const d = `calc(var(--rc) * ${band.scale})`;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: d,
              height: d,
              right: `calc(${d} / -2)`,
              bottom: `calc(${d} / -2)`,
              background: band.color,
            }}
          />
        );
      })}
    </div>
  );
}
