import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Blank mood-board templates, generated at /board-template
 *
 * Size:    ?format=pin (default, 1200×1800) | post (1080×1350) | story (1080×1920)
 * Layout:  ?layout=corner (default) | centred
 * Outfits: ?looks=3 (default) | 4
 * Text:    ?style=blank strips the guide text, leaving furniture only
 *
 * The corner layout is the one to use: wordmark top-left, rainbow peeking out
 * of the bottom-right, everything ranged left. It's the treatment from the
 * original square template — less generic than centring everything, and it
 * leaves the middle of the page genuinely empty for the cut-outs.
 *
 * Each platform crops anything that isn't its own shape, so one file can't
 * serve all three: a 2:3 pin posted to Instagram loses the top and bottom,
 * which is exactly where the title and the call to action live.
 *
 * Dark text is permanent (labels, call to action). Pale text is a guide for
 * what changes each week — with ?style=blank it isn't drawn at all, so
 * anything you add in Canva stays yours to edit.
 */

export const runtime = "nodejs";
export const contentType = "image/png";

const CREAM = "#F7F1E3";
const GUIDE = "#DED2BE";
const INK = "#4A372A";
const TERRA = "#C96849";

const FORMATS = {
  pin: { w: 1200, h: 1800 },
  post: { w: 1080, h: 1350 },
  story: { w: 1080, h: 1920 },
} as const;

type Font = { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" };
let fontCache: Font[] | null = null;

async function loadFonts(): Promise<Font[]> {
  if (fontCache) return fontCache;
  const UA = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko";
  const wanted: { css: string; name: string; weight: 400 | 600 }[] = [
    { css: "Fredoka:wght@600", name: "Fredoka", weight: 600 },
    { css: "Karla:wght@400", name: "Karla", weight: 400 },
  ];
  const out: Font[] = [];
  for (const w of wanted) {
    try {
      const css = await fetch(`https://fonts.googleapis.com/css2?family=${w.css}`, {
        headers: { "User-Agent": UA },
      }).then((r) => r.text());
      const m = css.match(/src:\s*url\(([^)]+)\)\s*format\('(woff|truetype|opentype)'\)/);
      if (!m) continue;
      const data = await fetch(m[1]).then((r) => r.arrayBuffer());
      out.push({ name: w.name, data, weight: w.weight, style: "normal" });
    } catch {
      /* fall back to the built-in font */
    }
  }
  if (out.length) fontCache = out;
  return out;
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const key = params.get("format");
  const four = params.get("looks") === "4";
  const blank = params.get("style") === "blank";
  const centred = params.get("layout") === "centred";

  const { w: W, h: H } = FORMATS[(key ?? "pin") as keyof typeof FORMATS] ?? FORMATS.pin;

  const fx = (n: number) => Math.round(W * n);
  const fy = (n: number) => Math.round(H * n);
  const fs = (n: number) => Math.round(W * n);

  const M = fx(0.062);
  const COL = fx(0.417);
  const LEFT = M;
  const RIGHT = W - M - COL;

  const fonts = await loadFonts();

  let logo = "";
  try {
    const buf = readFileSync(join(process.cwd(), "public", "logo-the-arch-horizontal-dot.png"));
    logo = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    /* template still works without it */
  }

  const cta =
    key === "post" || key === "story"
      ? "Shop every piece — link in bio"
      : `Shop every piece — ${site.displayDomain}`;

  const logoW = fx(centred ? 0.217 : 0.3);
  const logoH = Math.round(logoW * 0.283);
  const logoY = fy(0.038);
  const logoX = centred ? (W - logoW) / 2 : M;

  const titleSize = fs(0.075);
  const hookSize = fs(0.034);
  const titleY = logoY + logoH + Math.round(titleSize * 0.55);
  const hookY = titleY + Math.round(titleSize * 1.3);

  // The rainbow peeking out of the bottom-right corner, as on the original
  // square template. Quarter-circles clipped by the page edge.
  const RC = fx(centred ? 0 : 0.3);
  const bands = [
    { s: 1.77, c: "#DE8468" },
    { s: 1.46, c: "#E3A83B" },
    { s: 1.15, c: "#8FA383" },
    { s: 0.85, c: "#EBD7CB" },
  ];

  const align = centred ? "center" : "flex-start";

  const label = (text: string, x: number, y: number) => (
    <div
      key={text}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: COL,
        display: "flex",
        justifyContent: "center",
        fontFamily: "Fredoka",
        fontWeight: 600,
        fontSize: fs(0.04),
        color: INK,
      }}
    >
      {text}
    </div>
  );

  const price = (x: number, y: number, k: string) => (
    <div
      key={k}
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontFamily: "Fredoka",
        fontWeight: 600,
        fontSize: fs(0.034),
        color: GUIDE,
      }}
    >
      £00.00
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, background: CREAM, display: "flex", position: "relative" }}>
        {/* ---- the corner rainbow ---- */}
        {RC > 0 ? (
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: RC,
              height: RC,
              overflow: "hidden",
              display: "flex",
            }}
          >
            {bands.map((b, i) => {
              const d = RC * b.s;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: d,
                    height: d,
                    right: -d / 2,
                    bottom: -d / 2,
                    borderRadius: d,
                    background: b.c,
                  }}
                />
              );
            })}
          </div>
        ) : null}

        {/* ---- wordmark ---- */}
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            width={logoW}
            height={logoH}
            alt=""
            style={{ position: "absolute", left: logoX, top: logoY }}
          />
        ) : null}

        {/* ---- title + hook ---- */}
        {blank ? null : (
          <div
            style={{
              position: "absolute",
              left: M,
              top: titleY,
              width: W - M * 2,
              display: "flex",
              justifyContent: align,
              fontFamily: "Fredoka",
              fontWeight: 600,
              fontSize: titleSize,
              letterSpacing: -1,
              color: GUIDE,
            }}
          >
            Your Edit Title
          </div>
        )}

        {blank ? null : (
          <div
            style={{
              position: "absolute",
              left: M,
              top: hookY,
              width: W - M * 2,
              display: "flex",
              justifyContent: align,
              fontFamily: "Fredoka",
              fontWeight: 600,
              fontSize: hookSize,
              color: TERRA,
            }}
          >
            {four ? "Four" : "Three"} complete outfits · from £00.00
          </div>
        )}

        {/* ---- the outfits, staggered so nothing lines up ---- */}
        {blank ? null : four ? (
          <>
            {label("Baby Girl", LEFT, fy(0.28))}
            {label("Baby Boy", RIGHT, fy(0.265))}
            {price(fx(0.11), fy(0.49), "p1")}
            {price(fx(0.83), fy(0.468), "p2")}
            {label("Girls", LEFT, fy(0.545))}
            {label("Boys", RIGHT, fy(0.561))}
            {price(fx(0.215), fy(0.75), "p3")}
            {price(fx(0.78), fy(0.726), "p4")}
          </>
        ) : (
          <>
            {label("Baby", LEFT, fy(0.27))}
            {price(fx(0.115), fy(0.415), "p1")}
            {label("Girls", RIGHT, fy(0.44))}
            {price(fx(0.78), fy(0.585), "p2")}
            {label("Boys", LEFT, fy(0.61))}
            {price(fx(0.2), fy(0.755), "p3")}
          </>
        )}

        {/* ---- call to action, kept clear of the rainbow ---- */}
        <div
          style={{
            position: "absolute",
            left: M,
            top: fy(0.9),
            width: centred ? W - M * 2 : fx(0.62),
            display: "flex",
            justifyContent: align,
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: fs(0.036),
            color: INK,
          }}
        >
          {cta}
        </div>
      </div>
    ),
    { width: W, height: H, fonts: fonts.length ? fonts : undefined }
  );
}
