import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { getEdit } from "@/data/edits";
import { getProduct } from "@/data/products";

/**
 * Ready-to-post social images for every edit — one design, three sizes.
 *
 *   /edits/<slug>/pin               Pinterest — 1200 × 1800 (2:3)
 *   /edits/<slug>/pin?format=post   Instagram feed — 1080 × 1350 (4:5)
 *   /edits/<slug>/pin?format=story  Instagram story — 1080 × 1920 (9:16)
 *
 * THE POINT OF THIS: you build the collage once in Canva — just the product
 * cut-outs on cream, no text — save it into /public/edits/ and set `boardImage`
 * on the edit. Everything else is drawn here from the edit's own data: the
 * title, the real outfit total, the branding and a call to action that changes
 * per platform. Three posts, one board, no retyping, and the prices can never
 * disagree with the website because they come from the same file.
 *
 * With no boardImage yet it falls back to the edit's palette drawn as arches,
 * so the pin still looks finished.
 */

export const runtime = "nodejs";
export const contentType = "image/png";

const CREAM = "#F7F1E3";
const INK = "#23201D";
const TERRA = "#B65F45";
const MUTED = "#7A7167";

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

/** Read a file out of /public and return it as a data URI. */
function asDataUri(publicPath: string): string {
  try {
    const clean = publicPath.replace(/^\//, "");
    const buf = readFileSync(join(process.cwd(), "public", clean));
    const ext = clean.split(".").pop()?.toLowerCase();
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return "";
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edit = getEdit(slug);
  if (!edit) return new Response("Not found", { status: 404 });

  const key = new URL(req.url).searchParams.get("format") ?? "pin";
  const { w: W, h: H } = FORMATS[key as keyof typeof FORMATS] ?? FORMATS.pin;

  const fx = (n: number) => Math.round(W * n);
  const fy = (n: number) => Math.round(H * n);
  const fs = (n: number) => Math.round(W * n);
  const M = fx(0.058);

  const fonts = await loadFonts();
  const logo = asDataUri("/logo-the-arch-horizontal-dot.png");
  const board = edit.boardImage ? asDataUri(edit.boardImage) : "";

  // The hook comes from the real data, so it can never drift from the site.
  const totals = edit.looks
    .map((l) => l.productIds.reduce((s, id) => s + (getProduct(id)?.price ?? 0), 0))
    .filter((t) => t > 0);
  const low = totals.length ? Math.min(...totals) : 0;
  const outfits = edit.looks.length;

  const cta =
    key === "post" || key === "story"
      ? "Shop every piece — link in bio"
      : `Shop every piece — ${site.domain.replace("https://", "")}`;

  const logoW = fx(0.217);
  const logoH = Math.round(logoW * 0.283);
  const logoY = fy(0.028);
  const titleSize = fs(0.077);
  const titleY = logoY + logoH + Math.round(titleSize * 0.38);
  const hookY = titleY + Math.round(titleSize * 1.34);

  // Whatever is left between the header and the footer belongs to the board.
  const artTop = hookY + Math.round(fs(0.035) * 2.1);
  const ctaY = H - fy(0.075);
  const artH = ctaY - artTop - Math.round(H * 0.03);

  const pal = edit.palette.length ? edit.palette : ["#B7A695", "#8FA383", "#C96849", "#4A372A"];

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, background: CREAM, display: "flex", position: "relative" }}>
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            width={logoW}
            height={logoH}
            alt=""
            style={{ position: "absolute", left: (W - logoW) / 2, top: logoY }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            left: M,
            top: titleY,
            width: W - M * 2,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: titleSize,
            lineHeight: 1.05,
            letterSpacing: -1,
            color: INK,
          }}
        >
          {edit.title}
        </div>

        <div
          style={{
            position: "absolute",
            left: M,
            top: hookY,
            width: W - M * 2,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: fs(0.035),
            color: TERRA,
          }}
        >
          {low > 0
            ? `${outfits} complete outfits · from £${low.toFixed(2)}`
            : `${outfits} complete outfits`}
        </div>

        {/* The board itself, or the palette drawn as arches until there is one */}
        {board ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={board}
            alt=""
            style={{
              position: "absolute",
              left: M,
              top: artTop,
              width: W - M * 2,
              height: artH,
              objectFit: "contain",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: artTop,
              width: W,
              height: artH,
              display: "flex",
              overflow: "hidden",
            }}
          >
            {[0, 1, 2, 3].map((i) => {
              const d = Math.min(W * 0.86, artH * 1.7) * (1 - i * 0.23);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: (W - d) / 2,
                    top: artH - d / 2,
                    width: d,
                    height: d,
                    borderRadius: d,
                    background: i === 3 ? CREAM : pal[i % pal.length],
                  }}
                />
              );
            })}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            left: M,
            top: ctaY,
            width: W - M * 2,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: fs(0.038),
            color: MUTED,
          }}
        >
          {cta}
        </div>
      </div>
    ),
    { width: W, height: H, fonts: fonts.length ? fonts : undefined }
  );
}
