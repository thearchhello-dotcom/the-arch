import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { getEdit } from "@/data/edits";
import { getProduct, priceOf } from "@/data/products";
import { codeLineFor } from "@/lib/discounts";
import type { Edit } from "@/lib/types";

/**
 * Ready-to-post social images for every edit — one design, three sizes.
 *
 *   /edits/<slug>/pin               Pinterest — 1200 × 1800 (2:3)
 *   /edits/<slug>/pin?format=post   Instagram feed — 1080 × 1350 (4:5)
 *   /edits/<slug>/pin?format=story  Instagram story — 1080 × 1920 (9:16)
 *
 * THE POINT OF THIS: your finished board is 2:3, which is right for Pinterest
 * and wrong for everywhere else — Instagram crops a 2:3 image top and bottom,
 * which is exactly where the title and the web address live. So for an edit
 * that HAS a board, this reframes that board whole onto each canvas and draws
 * nothing over it. One design in Canva, three sizes out, nothing lost.
 *
 * It used to compose the title, total and branding on top, from a board that
 * was meant to be bare cut-outs. Gemma's boards carry all of that themselves,
 * so doing it here printed everything twice. If a board is present it is the
 * whole design; the composed layout below is only for an edit that hasn't got
 * one yet, where the palette is drawn as arches and needs the text to make
 * sense of it.
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
  // Gemma's Instagram grid: 3:4, the board on cream inside a thin solid
  // border in her current grid row's colour, which rotates every three posts
  // (terracotta, then mustard, then sage).
  grid: { w: 1080, h: 1440 },
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

/**
 * One pin picture for one piece: ?piece=<product id>.
 *
 * The shop's own photograph on a white card, the name, the price in the dark pill
 * (and what it was, if it is on offer), the maker's age line where we have one, and
 * the discount code only when it applies to that piece. No shop name on it. Only for
 * a piece that is in this edit and has a stored picture, and the studio only offers
 * it for shops Gemma is approved with.
 */
async function pieceImage(edit: Edit, pieceId: string) {
  const product = getProduct(pieceId);
  if (!product || !product.imageUrl || !edit.looks.some((l) => l.productIds.includes(pieceId))) {
    return new Response("Not found", { status: 404 });
  }
  const christmas = (edit.season ?? "").toLowerCase().includes("christmas");
  const frame = asDataUri(christmas ? "/pin-frames/christmas.png" : "/pin-frames/ecru.png");
  const fonts = await loadFonts();

  let photo = "";
  try {
    const r = await fetch(product.imageUrl);
    const type = r.headers.get("content-type") ?? "image/jpeg";
    photo = `data:${type};base64,${Buffer.from(await r.arrayBuffer()).toString("base64")}`;
  } catch {
    /* no photograph: the card stays white */
  }

  const money = (n: number) => `£${Number.isInteger(n) ? n.toFixed(0) : n.toFixed(2)}`;
  const now = priceOf(product);
  const price = product.priceTo && product.priceTo > now ? `from ${money(now)}` : money(now);
  const was = product.onSale && product.salePrice ? `was ${money(product.price)}` : null;
  const [main, ...rest] = product.name.split(", ");
  const heading = (edit.title.split(": ").pop() ?? edit.title).toUpperCase();
  const notes = [product.ageNote, product.onSale ? "On offer at the moment" : undefined].filter(Boolean) as string[];
  const code = codeLineFor(product);

  const BROWN = "#9A8573";
  const text = { fontFamily: "Fredoka", display: "flex", justifyContent: "center", textAlign: "center" as const };

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 1800, display: "flex", position: "relative", background: "#FBF6EA" }}>
        {frame ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={frame} alt="" width={1200} height={1800} style={{ position: "absolute", left: 0, top: 0 }} />
        ) : null}
        <div style={{ ...text, position: "absolute", left: 0, top: 330, width: 1200, fontSize: 36, color: BROWN }}>{heading}</div>
        <div
          style={{
            position: "absolute", left: 210, top: 395, width: 780, height: 780, display: "flex",
            alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 36, border: "4px solid #E2D4B8",
          }}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" width={720} height={720} style={{ objectFit: "contain" }} />
          ) : null}
        </div>
        <div
          style={{
            position: "absolute", left: 0, top: 1195, width: 1080, display: "flex", flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ ...text, fontSize: 52, lineHeight: 1.1, color: "#684858", maxWidth: 940 }}>{main}</div>
          {rest.length > 0 ? <div style={{ ...text, fontSize: 32, color: BROWN, marginTop: 8 }}>{rest.join(", ")}</div> : null}
          <div style={{ display: "flex", alignItems: "center", marginTop: 22 }}>
            <div style={{ ...text, background: "#262420", color: "#fff", fontSize: 52, padding: "6px 40px", borderRadius: 999 }}>{price}</div>
            {was ? <div style={{ ...text, fontSize: 34, color: BROWN, marginLeft: 22 }}>{was}</div> : null}
          </div>
          {notes.map((n) => (
            <div key={n} style={{ ...text, fontSize: 30, color: BROWN, marginTop: 14, maxWidth: 700 }}>{n}</div>
          ))}
          {code ? <div style={{ ...text, fontSize: 29, color: "#B3303F", marginTop: 14, maxWidth: 680 }}>{code}</div> : null}
        </div>
      </div>
    ),
    { width: 1200, height: 1800, fonts: fonts.length ? fonts : undefined }
  );
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edit = getEdit(slug);
  if (!edit) return new Response("Not found", { status: 404 });

  const piece = new URL(req.url).searchParams.get("piece");
  if (piece) return pieceImage(edit, piece);

  const key = new URL(req.url).searchParams.get("format") ?? "pin";
  const { w: W, h: H } = FORMATS[key as keyof typeof FORMATS] ?? FORMATS.pin;

  const fx = (n: number) => Math.round(W * n);
  const fy = (n: number) => Math.round(H * n);
  const fs = (n: number) => Math.round(W * n);
  const M = fx(0.058);

  const fonts = await loadFonts();
  const logo = asDataUri("/logo-the-arch-horizontal-dot.png");
  // ?board=2 picks the edit's second board, 3 the third, and so on.
  const which = Number(new URL(req.url).searchParams.get("board") ?? "1");
  const boardPath = which > 1 ? edit.moreBoards?.[which - 2] : edit.boardImage;
  const board = boardPath ? asDataUri(boardPath) : "";

  // The hook comes from the real data, so it can never drift from the site.
  const totals = edit.looks
    .map((l) => l.productIds.reduce((s, id) => s + (getProduct(id)?.price ?? 0), 0))
    .filter((t) => t > 0);
  const low = totals.length ? Math.min(...totals) : 0;
  const outfits = edit.looks.length;

  const cta =
    key === "post" || key === "story"
      ? "Shop every piece — link in bio"
      : `Shop every piece — ${site.displayDomain}`;

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

  const BORDERS: Record<string, string> = {
    terracotta: "#C96849",
    mustard: "#E3A83B",
    sage: "#8FA383",
  };
  const border = BORDERS[new URL(req.url).searchParams.get("border") ?? ""] ?? null;
  // Medium: about 44px at 1080 wide. Gemma tried thin and chunky and settled on
  // this (2 Oct 2026).
  const edge = key === "grid" && border ? 44 : 0;

  // A board with a gingham border: the side bars are that board's own gingham carried sideways,
  // with its rainbow carried across, made ahead of time (public/pin-frames/gram-<slug>-<size>.png).
  // Remake them when the board changes.
  if (board && (key === "grid" || key === "post") && edit.ginghamSides) {
    try {
      const finished = readFileSync(join(process.cwd(), "public", "pin-frames", `gram-${slug}-${key}.png`));
      return new Response(new Uint8Array(finished), {
        headers: { "content-type": "image/png", "cache-control": "public, max-age=60" },
      });
    } catch {
      /* none made yet: fall through to the plain version */
    }
  }

  // The Christmas frame, for the festive edits: berry red, a thin gold rounded
  // outline round the board, and gold sparkles and dots in the margin, matching
  // Gemma's Christmas carousels. Chosen with ?border=christmas.
  const christmasFrame = key === "grid" && new URL(req.url).searchParams.get("border") === "christmas";
  if (board && christmasFrame) {
    const m = 54;
    const GOLD = "#E3A83B";
    const star = (x: number, y: number, r: number) => (
      <svg key={`s${x}-${y}`} width={r * 2} height={r * 2} viewBox="-10 -10 20 20" style={{ position: "absolute", left: x - r, top: y - r }}>
        <path d="M0 -10 Q1.2 -1.2 10 0 Q1.2 1.2 0 10 Q-1.2 1.2 -10 0 Q-1.2 -1.2 0 -10Z" fill={GOLD} />
      </svg>
    );
    const dot = (x: number, y: number, r: number) => (
      <div key={`d${x}-${y}`} style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: GOLD, opacity: 0.9 }} />
    );
    return new ImageResponse(
      (
        <div style={{ width: W, height: H, background: "#8E2438", display: "flex", position: "relative" }}>
          {[
            star(150, 28, 17), star(540, 24, 13), star(930, 30, 18), star(26, 360, 13), star(1054, 700, 15), star(28, 1040, 17),
            star(300, 1414, 14), star(760, 1412, 17), star(1052, 1100, 12), star(1050, 300, 13),
            dot(340, 26, 5), dot(740, 28, 6), dot(1040, 20, 5), dot(24, 180, 6), dot(1056, 480, 5), dot(24, 700, 5),
            dot(30, 1240, 6), dot(1050, 1300, 6), dot(520, 1416, 6), dot(160, 1410, 5), dot(920, 1418, 5), dot(1040, 900, 5),
          ]}
          <div
            style={{
              position: "absolute",
              left: m,
              top: m,
              width: W - m * 2,
              height: H - m * 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: CREAM,
              border: `5px solid ${GOLD}`,
              borderRadius: 38,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={board} alt="" style={{ width: W - m * 2 - 10, height: H - m * 2 - 10, objectFit: "contain" }} />
          </div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // A finished board already carries the wordmark, the title, every outfit
  // total and the web address. Reframe it, add nothing.
  if (board) {
    return new ImageResponse(
      (
        <div
          style={{
            width: W,
            height: H,
            background: CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...(edge ? { border: `${edge}px solid ${border}` } : {}),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={board}
            alt=""
            style={{ width: W - edge * 2, height: H - edge * 2, objectFit: "contain" }}
          />
        </div>
      ),
      { width: W, height: H }
    );
  }

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
