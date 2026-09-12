import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GarmentIcon from "@/components/GarmentIcon";
import DisclosureNote from "@/components/DisclosureNote";
import AffiliateLink from "@/components/AffiliateLink";
import Newsletter from "@/components/Newsletter";
import PaletteArt from "@/components/PaletteArt";
import EditNote from "@/components/EditNote";
import { getEdit, publishedEdits } from "@/data/edits";
import { costOf, getProduct } from "@/data/products";

export function generateStaticParams() {
  return publishedEdits.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edit = getEdit(slug);
  if (!edit) return { title: "Edit" };
  return {
    title: edit.title,
    description: edit.description,
    openGraph: {
      title: edit.title,
      description: edit.description,
      images: edit.boardImage ? [edit.boardImage] : ["/logo-the-arch-square-dot.png"],
    },
  };
}


function channels(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Mix towards white, so a strong palette colour can sit behind an icon
 *  without overpowering it. */
function soften(hex: string, amount: number): string {
  const c = channels(hex);
  if (!c) return hex;
  const [r, g, b] = c.map((v) => Math.round(v + (255 - v) * amount));
  return `rgb(${r}, ${g}, ${b})`;
}

/** Mix towards black. Needed because some palette colours are already very
 *  pale — a cream icon on a cream tile would be invisible. */
function deepen(hex: string, amount: number): string {
  const c = channels(hex);
  if (!c) return hex;
  const [r, g, b] = c.map((v) => Math.round(v * (1 - amount)));
  return `rgb(${r}, ${g}, ${b})`;
}

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edit = getEdit(slug);
  if (!edit) notFound();

  return (
    <div className="relative">
      <Header />

      {/* Impossible to see on the live site — drafts 404 there. This is purely
          so you can't mistake a work-in-progress for a published edit. */}
      {edit.draft && (
        <div className="px-5 pt-6 sm:px-8 md:px-14">
          <p className="max-w-2xl text-sm bg-ink text-card rounded-2xl px-5 py-4">
            <strong className="font-semibold">Draft — only visible to you.</strong> Planned for{" "}
            {edit.plannedFor ?? "a future week"}. It won&apos;t appear on the live site, in the
            sitemap, or anywhere else until you delete <code>draft: true</code> from this edit in{" "}
            <code>data/edits.ts</code>.
          </p>
        </div>
      )}

      {/* A wash of this edit's own first colour across the top of the page, so
          each edit feels like its own thing rather than a template with the
          words swapped out. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[520px] -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${soften(edit.palette[0] ?? "#B7A695", 0.82)}, var(--color-cream))`,
        }}
      />

      <section className="px-5 pt-10 pb-8 sm:px-8 sm:pt-16 md:px-14 flex flex-col gap-4 sm:gap-5 max-w-2xl">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">
          <Link href="/edits" className="hover:underline underline-offset-4">
            The Edit
          </Link>{" "}
          &middot; {edit.season}
        </span>
        <h1 className="font-display text-[30px] sm:text-4xl md:text-[44px] font-semibold text-ink">{edit.title}</h1>
        <p className="text-ink-soft leading-relaxed">{edit.description}</p>
        <div className="flex items-center gap-3">
          {edit.palette.map((hex) => (
            <div
              key={hex}
              className="w-10 h-10 rounded-[10px]"
              style={{ background: hex, border: hex === "#F7F1E3" ? "1px solid rgba(91,71,53,0.18)" : "none" }}
            />
          ))}
        </div>
      </section>

      {/* Disclosure sits ABOVE the first affiliate link, not in the footer —
          UK CMA/ASA guidance is that it has to be seen before the click. */}
      <section className="px-5 pb-10 sm:px-8 md:px-14">
        <DisclosureNote className="max-w-2xl" />
      </section>

      {/* The board. A Canva mood board if one exists; otherwise the edit draws
          itself from its own palette — which is a finished look in its own
          right, not a placeholder waiting to be replaced. */}
      <section className="px-5 pb-12 sm:px-8 sm:pb-14 md:px-14">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta block mb-4">
          The Board
        </span>
        {/* A mount, not just an image. The boards are cream and so is the page,
            so without a frame the artwork bleeds into the background and stops
            reading as a thing you could pin. The deeper mount plus a hairline
            and a soft shadow give it an edge to sit against. */}
        <div className="max-w-[480px] rounded-[28px] bg-footer p-3 sm:p-4 border border-line shadow-[0_20px_44px_-26px_rgba(74,55,42,0.5)]">
          {edit.boardImage ? (
            <Image
              src={edit.boardImage}
              alt={`${edit.title} mood board`}
              width={1200}
              height={1800}
              className="w-full h-auto rounded-[18px] border border-line"
            />
          ) : (
            <PaletteArt
              palette={edit.palette}
              seed={edit.slug}
              cream="#FBF6EA"
              className="w-full h-auto aspect-[4/5] rounded-[18px] border border-line"
            />
          )}
        </div>
      </section>

      {edit.looks.map((look) => {
        const items = look.productIds.map(getProduct).filter(Boolean) as NonNullable<
          ReturnType<typeof getProduct>
        >[];
        const cost = costOf(look);
        const shortlist = cost.kind === "shortlist";

        // When a whole outfit comes from one shop it's one delivery charge and
        // one returns slip if the sizing is off, which is the bit a parent
        // actually weighs up. Worked out from the products rather than typed,
        // so it can't drift — and it stays quiet when the outfit is mixed
        // rather than announcing the bad news.
        // Only meaningful for an outfit. On a shortlist you're buying one
        // thing, so "one delivery" says nothing.
        const shops = new Set(items.map((p) => p.retailer));
        const oneShop = !shortlist && items.length > 1 && shops.size === 1 ? items[0].retailer : null;
        const pal = edit.palette.length ? edit.palette : ["#B7A695", "#8FA383", "#C96849"];
        const tint = (i: number) => soften(pal[i % pal.length], 0.74);
        const ink = (i: number) => deepen(pal[i % pal.length], 0.35);

        return (
          <section key={look.label} className="px-5 pt-6 pb-10 sm:px-8 md:px-14">
            <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="font-display text-2xl font-semibold text-ink">{look.label}</h2>
                {look.ages && (
                  <span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-pill bg-card text-ink-soft border border-line">
                    {look.ages}
                  </span>
                )}
              </div>
              <span className="text-sm text-ink-faint">
                {items.length} piece{items.length === 1 ? "" : "s"}
              </span>
            </div>

            {items.length === 0 ? (
              // A scaffolded look with no pieces in it yet. Only reachable
              // locally, since an edit in this state is still a draft.
              <div className="rounded-2xl border-2 border-dashed border-taupe/60 px-8 py-10 text-center">
                <p className="font-display text-base font-semibold text-ink mb-1">
                  No pieces added yet
                </p>
                <p className="text-sm text-ink-soft">
                  Add them to <code className="text-xs">data/products.ts</code>, then list their ids
                  under this look in <code className="text-xs">data/edits.ts</code>.
                </p>
              </div>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="group/item bg-card rounded-2xl p-4 flex flex-col gap-2.5"
                >
                  {/* Tinted from this edit's own palette, cycling through it, so
                      the row of pieces reads as one coordinated outfit rather
                      than a grid of identical grey boxes. */}
                  <div
                    className="h-36 flex items-end justify-center pb-5 transition-transform duration-300 group-hover/item:-translate-y-0.5"
                    style={{ background: tint(i), borderRadius: "999px 999px 14px 14px" }}
                  >
                    <GarmentIcon type={item.type} color={ink(i)} size={38} />
                  </div>
                  <span className="w-fit text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-pill bg-footer text-ink-soft">
                    {item.retailer}
                  </span>
                  <span className="text-sm font-semibold text-ink flex-1">{item.name}</span>
                  <span className="text-sm font-bold text-ink">£{item.price.toFixed(2)}</span>
                  <AffiliateLink href={item.affiliateUrl} retailer={item.retailer} className="mt-1" />
                </div>
              ))}
            </div>
            )}

            {/* The outfit total — the thing no competitor shows, so it gets to
                be a headline rather than a caption. */}
            {items.length > 0 && (
              <div className="mt-5 bg-ink text-card rounded-[22px] px-7 py-5 flex items-center justify-between flex-wrap gap-3">
                <div className="flex flex-col">
                  <span className="font-body font-bold text-[11px] tracking-widest uppercase opacity-70">
                    {shortlist ? "Pick one" : "The whole outfit"}
                  </span>
                  <span className="text-sm opacity-80">
                    {shortlist
                      ? `${look.label} · ${items.length} to choose from`
                      : `${look.label} · everything above, nothing missing`}
                  </span>
                  {oneShop && (
                    <span className="text-sm opacity-80">
                      All from {oneShop} &middot; one delivery
                    </span>
                  )}
                </div>
                <span className="font-display text-3xl font-semibold">
                  {shortlist && cost.to !== cost.from
                    ? `£${cost.from.toFixed(2)} – £${cost.to.toFixed(2)}`
                    : `£${(shortlist ? cost.from : cost.total).toFixed(2)}`}
                </span>
              </div>
            )}
          </section>
        );
      })}

      <p className="px-5 sm:px-8 md:px-14 pt-4 text-xs text-ink-faint max-w-2xl leading-relaxed">
        Prices were correct when this edit was published and change often &mdash; always check on the
        retailer&apos;s site before buying. This is a styling site &mdash; on how something wears or
        sizes up, the shop&apos;s own reviews will tell you more than I can.{" "}
        <Link href="/how-we-choose" className="underline underline-offset-4 hover:text-terracotta">
          How the edits come together
        </Link>
        .
      </p>

      {edit.note && <EditNote note={edit.note} />}

      <Newsletter />
      <Footer />
    </div>
  );
}
