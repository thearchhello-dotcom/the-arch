"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  CATEGORIES,
  PNG_SIGNATURE,
  SECTIONS,
  TYPES,
  parsePrice,
  type CmsProduct,
  type EditInput,
} from "@/lib/cms/shared";
import { deleteEdit, prepareBoardUpload, saveEdit, type Intent } from "./actions";

type Shop = { name: string; earns: boolean };

/** One piece as the form holds it: everything is text until it is saved. */
type Row = {
  key: number;
  name: string;
  shop: string; // a shop name from the list, or OTHER
  shopOther: string;
  price: string;
  priceTo: string;
  salePrice: string;
  url: string;
  image: string;
  type: string;
  category: string;
  group: string;
  open: boolean;
};

const OTHER = "__other";
let nextKey = 1;

function blankRow(): Row {
  return { key: nextKey++, name: "", shop: "", shopOther: "", price: "", priceTo: "", salePrice: "", url: "", image: "", type: "", category: "", group: "", open: false };
}

function rowFrom(p: CmsProduct, shops: Shop[]): Row {
  const known = shops.some((s) => s.name === p.shop);
  return {
    key: nextKey++,
    name: p.name,
    shop: known ? p.shop : p.shop ? OTHER : "",
    shopOther: known ? "" : p.shop,
    price: p.price ? String(p.price) : "",
    priceTo: p.priceTo ? String(p.priceTo) : "",
    salePrice: p.salePrice ? String(p.salePrice) : "",
    url: p.url,
    image: p.image ?? "",
    type: p.type ?? "",
    category: p.category ?? "",
    group: p.group ?? "",
    open: false,
  };
}

const field =
  "w-full rounded-2xl border border-line bg-card px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";
const labelCls = "font-semibold text-ink text-[15px]";
const hintCls = "text-sm text-ink-faint leading-snug";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelCls}>{label}</span>
      {children}
      {hint && <span className={hintCls}>{hint}</span>}
    </label>
  );
}

export default function EditForm({
  id,
  status,
  slug,
  initial,
  shops,
}: {
  id: string | null;
  status: "draft" | "published";
  slug: string | null;
  initial: EditInput | null;
  shops: Shop[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const topRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [section, setSection] = useState<EditInput["section"]>(initial?.section ?? "outfits");
  const [intro, setIntro] = useState(initial?.intro ?? "");
  const [searchTitle, setSearchTitle] = useState(initial?.searchTitle ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [season, setSeason] = useState(initial?.season ?? "");
  const [note, setNote] = useState(initial?.note ?? "");
  const [instagram, setInstagram] = useState(initial?.instagram ?? "");
  const [lookKind, setLookKind] = useState<EditInput["lookKind"]>(initial?.lookKind ?? "outfit");
  const [boardImage, setBoardImage] = useState<string | null>(initial?.boardImage ?? null);
  const [rows, setRows] = useState<Row[]>(() =>
    initial?.products?.length ? initial.products.map((p) => rowFrom(p, shops)) : [blankRow()]
  );

  const [uploading, setUploading] = useState(false);
  const [boardError, setBoardError] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const live = status === "published";

  // Warn before leaving with unsaved typing: a swipe-back on a phone is easy to do by accident.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const touch = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setDirty(true);
    setNotice(null);
  };

  const patchRow = (key: number, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
    setDirty(true);
    setNotice(null);
  };
  const moveRow = (key: number, by: -1 | 1) => {
    setRows((rs) => {
      const i = rs.findIndex((r) => r.key === key);
      const j = i + by;
      if (i < 0 || j < 0 || j >= rs.length) return rs;
      const copy = [...rs];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
    setDirty(true);
  };
  const removeRow = (key: number) => {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.key !== key) : [blankRow()]));
    setDirty(true);
  };

  // ----- Board upload -----
  async function onBoard(file: File | undefined) {
    if (!file) return;
    setBoardError(null);
    if (file.size > 8 * 1024 * 1024) return setBoardError("That file is over 8 MB. Export a smaller PNG.");
    const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
    if (!PNG_SIGNATURE.every((b, i) => head[i] === b)) {
      return setBoardError("That isn't a PNG. Export the board from Canva as PNG (not JPG or WebP), then pick it again.");
    }
    setUploading(true);
    try {
      const t = await prepareBoardUpload();
      if (!t.ok) throw new Error(t.error);
      const body = new FormData();
      body.append("cacheControl", "31536000");
      body.append("", file);
      const res = await fetch(t.uploadUrl, {
        method: "PUT",
        headers: {
          "x-upsert": "false",
          ...(t.apiKey ? { apikey: t.apiKey, Authorization: `Bearer ${t.apiKey}` } : {}),
        },
        body,
      });
      if (!res.ok) throw new Error(`Upload was refused (${res.status}).`);
      setBoardImage(t.publicUrl);
      setDirty(true);
      setNotice(null);
    } catch (err) {
      setBoardError(err instanceof Error ? err.message : "The upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  // ----- Saving -----
  function toInput(): EditInput {
    return {
      title,
      section,
      intro,
      searchTitle,
      description,
      season,
      note,
      instagram,
      boardImage,
      lookKind,
      products: rows.map((r) => ({
        name: r.name,
        shop: r.shop === OTHER ? r.shopOther : r.shop,
        price: parsePrice(r.price) as number,
        ...(parsePrice(r.priceTo) ? { priceTo: parsePrice(r.priceTo) as number } : {}),
        ...(parsePrice(r.salePrice) ? { salePrice: parsePrice(r.salePrice) as number } : {}),
        url: r.url.trim(),
        ...(r.image.trim() ? { image: r.image.trim() } : {}),
        ...(r.type ? { type: r.type as CmsProduct["type"] } : {}),
        ...(r.category ? { category: r.category as CmsProduct["category"] } : {}),
        ...(r.group.trim() ? { group: r.group.trim() } : {}),
      })),
    };
  }

  function submit(intent: Intent) {
    if (intent === "unpublish" && !window.confirm("Take this edit off the site? It goes back to a draft and nothing is lost.")) return;
    setErrors([]);
    setNotice(null);
    start(async () => {
      const r = await saveEdit(id, toInput(), intent);
      if (!r.ok) {
        setErrors(r.errors);
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      setDirty(false);
      if (!id) {
        router.replace(`/admin/edit/${r.id}?saved=${encodeURIComponent(r.message)}`);
      } else {
        setNotice(r.message);
        router.refresh();
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  async function remove() {
    if (!id) return;
    if (!window.confirm("Delete this edit for good? This can't be undone.")) return;
    start(async () => {
      const r = await deleteEdit(id);
      if (r.ok) {
        setDirty(false);
        router.replace("/admin");
      } else setErrors([r.error ?? "Couldn't delete it."]);
    });
  }

  // A message passed in the address after the first save of a new edit.
  useEffect(() => {
    const saved = new URLSearchParams(window.location.search).get("saved");
    if (saved) {
      setNotice(saved);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // ----- Running total, so a typo in a price shows up before it is published -----
  const totals = (() => {
    const groups = new Map<string, { low: number; high: number; n: number }>();
    for (const r of rows) {
      const price = parsePrice(r.price);
      if (price === null) continue;
      const sale = parsePrice(r.salePrice);
      const now = sale !== null && sale < price ? sale : price;
      const top = sale !== null && sale < price ? sale : Math.max(now, parsePrice(r.priceTo) ?? now);
      const g = groups.get(r.group.trim()) ?? { low: 0, high: 0, n: 0 };
      groups.set(r.group.trim(), { low: g.low + now, high: g.high + top, n: g.n + 1 });
    }
    return [...groups.entries()];
  })();

  const busy = pending || uploading;
  const money = (n: number) => `£${n.toFixed(2)}`;

  return (
    <main className="mx-auto max-w-xl px-5 pt-6 pb-40">
      <div ref={topRef} className="scroll-mt-4" />
      <div className="flex items-center justify-between mb-5">
        <Link href="/admin" className="text-sm font-semibold text-terracotta">
          &larr; All edits
        </Link>
        <span
          className={`rounded-pill px-3 py-1 text-xs font-bold tracking-wide uppercase ${live ? "bg-pop-leaf text-ink" : "bg-footer text-ink-soft"}`}
        >
          {id ? (live ? "Live" : "Draft") : "New"}
        </span>
      </div>
      <h1 className="font-display text-2xl font-semibold text-ink mb-6">{id ? "Edit" : "New edit"}</h1>

      <div aria-live="polite">
        {notice && (
          <div className="rounded-2xl bg-pop-leaf/30 border border-pop-leaf px-4 py-3 mb-5 text-ink flex flex-col gap-2">
            <span className="font-semibold">{notice}</span>
            {slug && (
              <span className="text-sm flex gap-4 flex-wrap">
                {live ? (
                  <Link href={`/edits/${slug}`} className="underline underline-offset-4" target="_blank">
                    View on the site
                  </Link>
                ) : (
                  id && (
                    <Link href={`/admin/preview/${id}`} className="underline underline-offset-4">
                      Preview it
                    </Link>
                  )
                )}
              </span>
            )}
          </div>
        )}
        {errors.length > 0 && (
          <div role="alert" className="rounded-2xl bg-ink px-4 py-3 mb-5 text-card">
            <p className="font-semibold mb-1">Not saved yet:</p>
            <ul className="list-disc pl-5 text-sm flex flex-col gap-1">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <Field label="Title" hint="The name of the edit, like “After Dark”.">
          <input className={field} value={title} onChange={(e) => touch(setTitle)(e.target.value)} maxLength={120} />
        </Field>

        <Field label="Section">
          <select className={field} value={section} onChange={(e) => touch(setSection)(e.target.value as EditInput["section"])}>
            {SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Short intro" hint="A few plain sentences in your voice. Shows under the description.">
          <textarea className={field} rows={4} value={intro} onChange={(e) => touch(setIntro)(e.target.value)} maxLength={1500} />
        </Field>

        <Field
          label="Search title"
          hint="What this edit is for, in the words a parent would search: “Bonfire night outfits for babies and kids”. Keep it different from every other edit."
        >
          <input className={field} value={searchTitle} onChange={(e) => touch(setSearchTitle)(e.target.value)} maxLength={140} />
        </Field>

        <Field label="Search description" hint="One or two sentences for Google. Say what's in it and the price it starts from.">
          <textarea className={field} rows={3} value={description} onChange={(e) => touch(setDescription)(e.target.value)} maxLength={400} />
        </Field>

        {/* ---- Board ---- */}
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold text-ink">Board</h2>
          {boardImage ? (
            <div className="rounded-2xl bg-card border border-line p-3 flex flex-col gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={boardImage} alt="Your board" className="w-full max-w-[280px] mx-auto rounded-xl border border-line" />
              <button
                type="button"
                onClick={() => {
                  setBoardImage(null);
                  setDirty(true);
                }}
                className="self-center text-sm text-ink-faint underline underline-offset-4"
              >
                Remove this board
              </button>
            </div>
          ) : (
            <p className={hintCls}>Optional. Without one, the edit draws itself from its colours.</p>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="rounded-pill bg-ink px-6 py-3.5 text-center font-display font-semibold text-card">
              {uploading ? "Uploading…" : boardImage ? "Choose a different board" : "Choose board picture"}
            </span>
            <input
              type="file"
              accept="image/png"
              className="sr-only"
              disabled={uploading}
              onChange={(e) => {
                void onBoard(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <span className={hintCls}>PNG only, up to 8 MB. Export from Canva as PNG.</span>
          </label>
          {boardError && (
            <p role="alert" className="rounded-2xl bg-ink px-4 py-3 text-sm text-card">
              {boardError}
            </p>
          )}
        </section>

        {/* ---- Pieces ---- */}
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl font-semibold text-ink">Pieces</h2>
          <fieldset className="flex flex-col gap-2">
            <legend className={`${labelCls} mb-1`}>How should the price show?</legend>
            {(
              [
                ["outfit", "One total", "The pieces are worn or bought together, so they add up."],
                ["shortlist", "A price range", "They're options to choose between, so no total."],
              ] as const
            ).map(([val, name, desc]) => (
              <label key={val} className={`flex gap-3 rounded-2xl border px-4 py-3 ${lookKind === val ? "border-terracotta bg-card" : "border-line"}`}>
                <input type="radio" name="kind" checked={lookKind === val} onChange={() => touch(setLookKind)(val)} className="mt-1 accent-terracotta" />
                <span>
                  <span className="block font-semibold text-ink">{name}</span>
                  <span className={hintCls}>{desc}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <ol className="flex flex-col gap-4">
            {rows.map((r, i) => {
              const earns = shops.find((s) => s.name === r.shop)?.earns;
              const wrapped = /awin1\.com/i.test(r.url);
              return (
                <li key={r.key} className="rounded-2xl bg-card border border-line p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">Piece {i + 1}</span>
                    <div className="flex gap-1.5 text-sm">
                      <button type="button" aria-label={`Move piece ${i + 1} up`} disabled={i === 0} onClick={() => moveRow(r.key, -1)} className="rounded-pill border border-line px-3 py-1.5 disabled:opacity-30">
                        Up
                      </button>
                      <button type="button" aria-label={`Move piece ${i + 1} down`} disabled={i === rows.length - 1} onClick={() => moveRow(r.key, 1)} className="rounded-pill border border-line px-3 py-1.5 disabled:opacity-30">
                        Down
                      </button>
                      <button type="button" aria-label={`Remove piece ${i + 1}`} onClick={() => removeRow(r.key)} className="rounded-pill border border-line px-3 py-1.5 text-terracotta">
                        Remove
                      </button>
                    </div>
                  </div>

                  <Field label="Name">
                    <input className={field} value={r.name} onChange={(e) => patchRow(r.key, { name: e.target.value })} placeholder="Orange Little Pumpkin Baby Cardigan" maxLength={200} />
                  </Field>

                  <Field label="Shop">
                    <select className={field} value={r.shop} onChange={(e) => patchRow(r.key, { shop: e.target.value })}>
                      <option value="">Choose a shop</option>
                      <optgroup label="Links that earn">
                        {shops.filter((s) => s.earns).map((s) => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Other shops">
                        {shops.filter((s) => !s.earns).map((s) => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                        <option value={OTHER}>A shop not in the list…</option>
                      </optgroup>
                    </select>
                  </Field>
                  {r.shop === OTHER && (
                    <Field label="Shop name">
                      <input className={field} value={r.shopOther} onChange={(e) => patchRow(r.key, { shopOther: e.target.value })} maxLength={60} />
                    </Field>
                  )}

                  <Field label="Price (£)" hint="The lowest price. Add the top price or a sale price under More.">
                    <input className={field} inputMode="decimal" value={r.price} onChange={(e) => patchRow(r.key, { price: e.target.value })} placeholder="12.50" />
                  </Field>

                  <Field label="Link to the piece" hint="Paste the shop's own address for it.">
                    <input className={field} type="url" inputMode="url" autoCapitalize="none" autoCorrect="off" value={r.url} onChange={(e) => patchRow(r.key, { url: e.target.value })} placeholder="https://" />
                  </Field>
                  {earns && r.url && (
                    <p className="rounded-xl bg-pop-leaf/25 px-3 py-2 text-sm text-ink">
                      {r.shop} links earn: this will be turned into your tracked link automatically
                      {wrapped ? " (it's already a tracking link, so I'll use the shop's own address inside it)" : ""}.
                    </p>
                  )}
                  {!earns && r.shop && r.shop !== OTHER && r.url && (
                    <p className={hintCls}>{r.shop} isn't one of your tracked shops, so this link goes out as it is.</p>
                  )}

                  <button type="button" onClick={() => patchRow(r.key, { open: !r.open })} className="self-start text-sm font-semibold text-terracotta underline underline-offset-4" aria-expanded={r.open}>
                    {r.open ? "Fewer options" : "More: picture, sale, sizes, group"}
                  </button>

                  {r.open && (
                    <div className="flex flex-col gap-4 border-t border-line pt-4">
                      <Field label="Picture address (optional)" hint="A flat picture of the garment on its own, never a child wearing it. It only shows once the shop has approved you.">
                        <input className={field} type="url" inputMode="url" autoCapitalize="none" value={r.image} onChange={(e) => patchRow(r.key, { image: e.target.value })} placeholder="https://" />
                      </Field>
                      <Field label="Top price (optional)" hint="Only if bigger sizes cost more. The total then reads “from”.">
                        <input className={field} inputMode="decimal" value={r.priceTo} onChange={(e) => patchRow(r.key, { priceTo: e.target.value })} />
                      </Field>
                      <Field label="Sale price (optional)" hint="Put the full price above and today's reduced price here. The site says it's in the sale.">
                        <input className={field} inputMode="decimal" value={r.salePrice} onChange={(e) => patchRow(r.key, { salePrice: e.target.value })} />
                      </Field>
                      <Field label="Which look is it in? (optional)" hint="Pieces with the same name here are totalled together, like “Girls” or “Rainy day”. Leave it empty for one look.">
                        <input className={field} value={r.group} onChange={(e) => patchRow(r.key, { group: e.target.value })} maxLength={60} />
                      </Field>
                      <Field label="Icon when there's no picture">
                        <select className={field} value={r.type} onChange={(e) => patchRow(r.key, { type: e.target.value })}>
                          <option value="">Automatic</option>
                          {TYPES.map((t) => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Who it's for">
                        <select className={field} value={r.category} onChange={(e) => patchRow(r.key, { category: e.target.value })}>
                          <option value="">Automatic</option>
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            onClick={() => {
              setRows((rs) => [...rs, blankRow()]);
              setDirty(true);
            }}
            className="rounded-pill border-2 border-dashed border-taupe px-6 py-3.5 font-display font-semibold text-ink"
          >
            + Add a piece
          </button>

          {totals.length > 0 && (
            <div className="rounded-2xl bg-footer px-4 py-3 text-sm text-ink flex flex-col gap-1">
              <span className="font-semibold">Check the numbers</span>
              {totals.map(([g, t]) => (
                <span key={g || "_"}>
                  {g || "All pieces"} ({t.n}): {lookKind === "shortlist" ? "see the cheapest and dearest on the page" : t.high > t.low ? `from ${money(t.low)}` : money(t.low)}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* ---- Optional extras ---- */}
        <details className="rounded-2xl border border-line">
          <summary className="cursor-pointer px-4 py-3.5 font-semibold text-ink">More details (all optional)</summary>
          <div className="flex flex-col gap-6 px-4 pb-5 pt-2">
            <Field label="Season" hint="Like “Christmas 2026”. Left empty, it's worked out from the date.">
              <input className={field} value={season} onChange={(e) => touch(setSeason)(e.target.value)} maxLength={40} />
            </Field>
            <Field label="Your note" hint="One or two sentences in your own voice, shown at the end. Say what you did, never what the product is like.">
              <textarea className={field} rows={3} value={note} onChange={(e) => touch(setNote)(e.target.value)} maxLength={800} />
            </Field>
            <Field label="Instagram caption" hint="Written by you, ending “Styled by me in Cumbria”, five hashtags at most. Kept here for when you post.">
              <textarea className={field} rows={5} value={instagram} onChange={(e) => touch(setInstagram)(e.target.value)} maxLength={2200} />
            </Field>
          </div>
        </details>

        {id && (
          <button type="button" onClick={remove} disabled={busy} className="self-start text-sm text-ink-faint underline underline-offset-4">
            Delete this edit
          </button>
        )}
      </div>

      {/* Always in reach on a phone. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-xl flex gap-3">
          {live ? (
            <>
              <button type="button" disabled={busy} onClick={() => submit("unpublish")} className="flex-1 rounded-pill border border-line bg-card px-4 py-3.5 font-display font-semibold text-ink disabled:opacity-50">
                Unpublish
              </button>
              <button type="button" disabled={busy} onClick={() => submit("update")} className="flex-[1.4] rounded-pill bg-terracotta px-4 py-3.5 font-display font-semibold text-card disabled:opacity-50">
                {pending ? "Saving…" : "Save changes"}
              </button>
            </>
          ) : (
            <>
              <button type="button" disabled={busy} onClick={() => submit("draft")} className="flex-1 rounded-pill border border-line bg-card px-4 py-3.5 font-display font-semibold text-ink disabled:opacity-50">
                {pending ? "Saving…" : "Save as draft"}
              </button>
              <button type="button" disabled={busy} onClick={() => submit("publish")} className="flex-1 rounded-pill bg-terracotta px-4 py-3.5 font-display font-semibold text-card disabled:opacity-50">
                Publish
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
