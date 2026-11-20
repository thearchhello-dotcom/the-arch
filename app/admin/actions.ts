"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { updateTag } from "next/cache";
import { endSession, passwordIsSet, passwordMatches, requireAdmin, startSession } from "@/lib/cms/auth";
import {
  CMS_TAG,
  createSignedUpload,
  deleteRow,
  fetchAllRows,
  fetchRow,
  insertRow,
  recentFailedLogins,
  recordFailedLogin,
  slugTaken,
  updateRow,
  boardUrlPrefix,
  type CmsRow,
} from "@/lib/cms/db";
import { pingIndexNow } from "@/lib/cms/indexnow";
import { codeSearchTitles, codeSlugs, validateInput } from "@/lib/cms/validate";
import { slugify, type EditInput } from "@/lib/cms/shared";

// ----- Signing in and out ----------------------------------------------------

const MAX_FAILS = 8; // in the last 15 minutes, across everyone

export async function login(_prev: { error?: string } | undefined, form: FormData): Promise<{ error?: string }> {
  if (!passwordIsSet()) return { error: "ADMIN_PASSWORD hasn't been set in Vercel yet." };

  if ((await recentFailedLogins(15)) >= MAX_FAILS) {
    return { error: "Too many wrong passwords. Wait 15 minutes and try again." };
  }

  const attempt = String(form.get("password") ?? "");
  if (!passwordMatches(attempt)) {
    await recordFailedLogin();
    await new Promise((r) => setTimeout(r, 1000)); // slows guessing down
    return { error: "That isn't the password." };
  }

  await startSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

// ----- Saving edits ------------------------------------------------------------

export type SaveResult =
  | { ok: true; id: string; status: "draft" | "published"; slug: string; message: string }
  | { ok: false; errors: string[] };

export type Intent = "draft" | "publish" | "update" | "unpublish";

/** UK date as 2026-11-20. Dates are set here, by the action you took, never by
 *  a build: "published" is the day you pressed Publish, "updated" the day you
 *  last changed a live edit. They feed the sitemap and the structured data. */
function today(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
}

async function uniqueSlug(title: string, existingId?: string): Promise<string> {
  const base = slugify(title);
  const reserved = codeSlugs();
  for (let n = 1; n < 50; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    if (reserved.has(candidate)) continue;
    if (!(await slugTaken(candidate, existingId))) return candidate;
  }
  return `${base}-${randomUUID().slice(0, 6)}`;
}

function toColumns(v: EditInput) {
  return {
    title: v.title,
    section: v.section,
    intro: v.intro,
    search_title: v.searchTitle,
    description: v.description,
    season: v.season,
    note: v.note,
    instagram: v.instagram,
    board_image: v.boardImage,
    look_kind: v.lookKind,
    products: v.products,
  };
}

export async function saveEdit(id: string | null, input: EditInput, intent: Intent): Promise<SaveResult> {
  await requireAdmin();
  try {
    const existing = id ? await fetchRow(id) : null;
    if (id && !existing) return { ok: false, errors: ["That edit no longer exists. Go back to the list."] };

    const live = intent === "publish" || intent === "update";
    const others = [
      ...codeSearchTitles(),
      ...(await fetchAllRows()).filter((r) => r.id !== id && r.status === "published").map((r) => r.search_title),
    ];
    const checked = validateInput(input, live ? "live" : "draft", others);
    if (!checked.ok) return checked;
    const v = checked.value;

    let row: CmsRow;
    const status: CmsRow["status"] = live ? "published" : "draft";

    if (!existing) {
      row = await insertRow({
        ...toColumns(v),
        slug: await uniqueSlug(v.title),
        status,
        published_on: status === "published" ? today() : null,
        updated_on: null,
      });
    } else {
      // The address never changes once an edit exists, whatever the title becomes,
      // because it may already be linked, pinned and indexed.
      const t = today();
      const wasLive = existing.status === "published";
      row = await updateRow(existing.id, {
        ...toColumns(v),
        status,
        published_on: status === "published" ? existing.published_on ?? t : existing.published_on,
        updated_on: status === "published" && wasLive && t !== (existing.published_on ?? t) ? t : existing.updated_on,
      });
    }

    // Makes the live site fetch fresh data on its next visit: this is what
    // puts a new edit up (or takes one down) without a redeploy.
    updateTag(CMS_TAG);
    if (status === "published") after(() => pingIndexNow(row.slug));

    const message =
      intent === "publish"
        ? "Published. It's live now."
        : intent === "update"
          ? "Changes saved. They're live now."
          : intent === "unpublish"
            ? "Taken down and saved as a draft."
            : "Draft saved.";
    return { ok: true, id: row.id, status: row.status, slug: row.slug, message };
  } catch (err) {
    console.error(err);
    return { ok: false, errors: ["Couldn't save, so nothing has changed. Check your signal and try again."] };
  }
}

export async function deleteEdit(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  try {
    await deleteRow(id);
    updateTag(CMS_TAG);
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Couldn't delete it. Try again." };
  }
}

// ----- Board upload -----------------------------------------------------------

/** Gives the browser a one-off place to send a board PNG directly to storage. */
export async function prepareBoardUpload(): Promise<
  { ok: true; uploadUrl: string; token: string; apiKey: string | null; publicUrl: string } | { ok: false; error: string }
> {
  await requireAdmin();
  const prefix = boardUrlPrefix();
  if (!prefix) return { ok: false, error: "Supabase isn't connected yet." };
  try {
    const name = `boards/${Date.now()}-${randomUUID().slice(0, 8)}.png`;
    const { url, token } = await createSignedUpload(name);
    return {
      ok: true,
      uploadUrl: url,
      token,
      apiKey: process.env.SUPABASE_PUBLISHABLE_KEY?.trim() || null,
      publicUrl: `${prefix}${name}`,
    };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Couldn't get ready to upload. Try again." };
  }
}
