import Link from "next/link";
import { requireAdmin } from "@/lib/cms/auth";
import { fetchAllRows, supabaseConfig, type CmsRow } from "@/lib/cms/db";
import { logout } from "./actions";

const SECTION: Record<CmsRow["section"], string> = { outfits: "Outfits", gifts: "Gifts", nursery: "Prams & nursery" };

function Card({ row }: { row: CmsRow }) {
  const live = row.status === "published";
  return (
    <li className="rounded-2xl bg-card border border-line p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold text-ink leading-snug break-words">{row.title || "Untitled"}</p>
          <p className="text-sm text-ink-faint">
            {SECTION[row.section]} &middot; {row.products?.length ?? 0} pieces
            {live && row.published_on ? <> &middot; live since {row.published_on}</> : null}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-pill px-3 py-1 text-xs font-bold tracking-wide uppercase ${
            live ? "bg-pop-leaf text-ink" : "bg-footer text-ink-soft"
          }`}
        >
          {live ? "Live" : "Draft"}
        </span>
      </div>
      <div className="flex gap-2.5 flex-wrap">
        <Link href={`/admin/edit/${row.id}`} className="rounded-pill bg-ink px-5 py-2.5 text-sm font-semibold text-card">
          Edit
        </Link>
        <Link
          href={live ? `/edits/${row.slug}` : `/admin/preview/${row.id}`}
          className="rounded-pill border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink"
        >
          {live ? "View live" : "Preview"}
        </Link>
      </div>
    </li>
  );
}

export default async function AdminHome() {
  await requireAdmin();

  if (!supabaseConfig()) {
    return (
      <main className="mx-auto max-w-xl px-5 py-12">
        <h1 className="font-display text-2xl font-semibold text-ink mb-3">Supabase isn&apos;t connected yet</h1>
        <p>
          The site needs <code>SUPABASE_URL</code> and <code>SUPABASE_SECRET_KEY</code> in Vercel before
          edits can be saved. The setup steps are in <code>docs/admin-setup.md</code>.
        </p>
      </main>
    );
  }

  let rows: CmsRow[] = [];
  let failed = false;
  try {
    rows = await fetchAllRows();
  } catch (err) {
    console.error(err);
    failed = true;
  }
  const live = rows.filter((r) => r.status === "published");
  const drafts = rows.filter((r) => r.status === "draft");

  return (
    <main className="mx-auto max-w-xl px-5 py-8 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Your edits</h1>
        <form action={logout}>
          <button className="text-sm text-ink-faint underline underline-offset-4">Sign out</button>
        </form>
      </div>

      <Link
        href="/admin/new"
        className="block rounded-pill bg-terracotta px-6 py-4 text-center font-display text-lg font-semibold text-card mb-8"
      >
        + New edit
      </Link>

      {failed && (
        <p role="alert" className="rounded-2xl bg-ink px-4 py-3 text-sm text-card mb-6">
          Couldn&apos;t load your edits. Check the Supabase settings in Vercel, or try again.
        </p>
      )}

      <h2 className="font-body font-bold text-xs tracking-widest uppercase text-terracotta mb-3">Drafts</h2>
      <ul className="flex flex-col gap-3 mb-8">
        {drafts.length ? drafts.map((r) => <Card key={r.id} row={r} />) : <li className="text-sm text-ink-faint">No drafts.</li>}
      </ul>

      <h2 className="font-body font-bold text-xs tracking-widest uppercase text-terracotta mb-3">Live from here</h2>
      <ul className="flex flex-col gap-3 mb-8">
        {live.length ? live.map((r) => <Card key={r.id} row={r} />) : <li className="text-sm text-ink-faint">Nothing published from here yet.</li>}
      </ul>
      <p className="text-sm text-ink-faint">
        Edits that were already on the site before this admin existed aren&apos;t listed here, and stay as they are.
      </p>
    </main>
  );
}
