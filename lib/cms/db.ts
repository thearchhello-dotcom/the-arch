import type { CmsProduct, EditInput, EditStatus } from "./shared";
import { BOARD_BUCKET } from "./shared";

/**
 * The only file that talks to Supabase. It uses plain fetch against Supabase's
 * REST API rather than a library, so the public pages can cache what they read
 * (Next tags the request) and the admin actions can empty that cache the moment
 * something is saved: that is what makes a new edit live with no redeploy.
 *
 * Server only. The secret key it uses can read and write everything, so it must
 * never be imported from a "use client" file.
 */

/** Tag on every public read. updateTag(CMS_TAG) in an admin action makes the
 *  site fetch fresh data on the next visit. */
export const CMS_TAG = "cms-edits";

export type CmsRow = {
  id: string;
  slug: string;
  status: EditStatus;
  title: string;
  section: EditInput["section"];
  intro: string;
  search_title: string;
  description: string;
  season: string;
  note: string;
  instagram: string;
  board_image: string | null;
  look_kind: EditInput["lookKind"];
  products: CmsProduct[];
  published_on: string | null;
  updated_on: string | null;
  created_at: string;
  modified_at: string;
};

export function supabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.SUPABASE_SECRET_KEY?.trim();
  return url && key ? { url, key } : null;
}

/** Where uploaded boards are served from. A board address is only trusted if it starts with this. */
export function boardUrlPrefix(): string | null {
  const c = supabaseConfig();
  return c ? `${c.url}/storage/v1/object/public/${BOARD_BUCKET}/` : null;
}

type Opts = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  prefer?: string;
  /** Public pages: cache with the tag, and re-check after five minutes anyway. */
  cached?: boolean;
  /** Extra headers, for the storage calls. */
  headers?: Record<string, string>;
};

async function call(path: string, o: Opts = {}): Promise<Response> {
  const c = supabaseConfig();
  if (!c) throw new Error("Supabase is not set up: SUPABASE_URL and SUPABASE_SECRET_KEY are missing");
  return fetch(`${c.url}${path}`, {
    method: o.method ?? "GET",
    headers: {
      apikey: c.key,
      Authorization: `Bearer ${c.key}`,
      ...(o.body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(o.prefer ? { Prefer: o.prefer } : {}),
      ...o.headers,
    },
    body: o.body !== undefined ? JSON.stringify(o.body) : undefined,
    ...(o.cached ? { next: { tags: [CMS_TAG], revalidate: 300 } } : { cache: "no-store" as const }),
  });
}

async function json<T>(res: Response, what: string): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${what} failed (${res.status}): ${text.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

/** Every live edit, for the public site. Returns nothing when Supabase isn't
 *  set up, so the site still works from the edits in code alone.
 *
 *  A failed read throws rather than returning an empty list, on purpose: when a
 *  page is rebuilt in the background, Next keeps showing the last good copy if
 *  the rebuild throws, whereas an empty list would quietly publish a version of
 *  the page with every admin edit missing. The one exception is during
 *  `next build`, where a blip in Supabase should not stop a deploy. */
export async function fetchPublishedRows(): Promise<CmsRow[]> {
  if (!supabaseConfig()) return [];
  try {
    return await json<CmsRow[]>(
      await call("/rest/v1/cms_edits?status=eq.published&select=*&order=published_on.desc.nullslast", { cached: true }),
      "Reading published edits"
    );
  } catch (err) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.error(err);
      return [];
    }
    throw err;
  }
}

// ----- Admin reads: never cached -------------------------------------------

export async function fetchAllRows(): Promise<CmsRow[]> {
  return json<CmsRow[]>(
    await call("/rest/v1/cms_edits?select=*&order=modified_at.desc"),
    "Reading edits"
  );
}

export async function fetchRow(id: string): Promise<CmsRow | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const rows = await json<CmsRow[]>(
    await call(`/rest/v1/cms_edits?id=eq.${id}&select=*`),
    "Reading an edit"
  );
  return rows[0] ?? null;
}

export async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const rows = await json<{ id: string }[]>(
    await call(`/rest/v1/cms_edits?slug=eq.${encodeURIComponent(slug)}&select=id`),
    "Checking the address"
  );
  return rows.some((r) => r.id !== exceptId);
}

// ----- Writes ---------------------------------------------------------------

export async function insertRow(row: Partial<CmsRow>): Promise<CmsRow> {
  const rows = await json<CmsRow[]>(
    await call("/rest/v1/cms_edits", { method: "POST", body: row, prefer: "return=representation" }),
    "Saving the edit"
  );
  return rows[0];
}

export async function updateRow(id: string, patch: Partial<CmsRow>): Promise<CmsRow> {
  const rows = await json<CmsRow[]>(
    await call(`/rest/v1/cms_edits?id=eq.${id}`, {
      method: "PATCH",
      body: { ...patch, modified_at: new Date().toISOString() },
      prefer: "return=representation",
    }),
    "Saving the edit"
  );
  if (!rows[0]) throw new Error("That edit no longer exists");
  return rows[0];
}

export async function deleteRow(id: string): Promise<void> {
  const res = await call(`/rest/v1/cms_edits?id=eq.${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Deleting failed (${res.status})`);
}

// ----- Login attempts -------------------------------------------------------

export async function recentFailedLogins(minutes: number): Promise<number> {
  try {
    const since = new Date(Date.now() - minutes * 60_000).toISOString();
    const res = await call(`/rest/v1/admin_attempts?at=gte.${encodeURIComponent(since)}&select=id`);
    if (!res.ok) return 0;
    return ((await res.json()) as unknown[]).length;
  } catch {
    return 0;
  }
}

export async function recordFailedLogin(): Promise<void> {
  try {
    await call("/rest/v1/admin_attempts", { method: "POST", body: {} });
  } catch {
    /* best effort */
  }
}

// ----- Storage: board uploads ------------------------------------------------

/** A one-off upload address for the browser to send a board straight to
 *  Supabase, so a large PNG never has to pass through the website's own
 *  servers, which cap the size of what they accept. */
export async function createSignedUpload(path: string): Promise<{ url: string; token: string }> {
  const c = supabaseConfig()!;
  const res = await call(`/storage/v1/object/upload/sign/${BOARD_BUCKET}/${path}`, {
    method: "POST",
    body: {},
    headers: { "x-upsert": "false" },
  });
  const data = await json<{ url: string; token?: string }>(res, "Preparing the upload");
  // `url` is a path like /object/upload/sign/edit-images/x.png?token=...
  const full = new URL(data.url.startsWith("http") ? data.url : `${c.url}/storage/v1${data.url}`);
  const token = data.token ?? full.searchParams.get("token");
  if (!token) throw new Error("Supabase gave no upload token");
  return { url: full.toString(), token };
}
