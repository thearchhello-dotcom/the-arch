import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * One password, for one person.
 *
 * The password is ADMIN_PASSWORD in Vercel's settings. Signing in sets a cookie
 * that holds an expiry time and a signature made from the password, so the
 * server can check it without storing anything. Changing the password signs
 * every device out at once.
 *
 * Every admin page and every admin action calls requireAdmin() itself. Hiding
 * a page behind a menu or a layout is not protection, because actions can be
 * called directly.
 */

const COOKIE = process.env.NODE_ENV === "production" ? "__Host-arch_admin" : "arch_admin";
const DAYS = 30;

function secret(): Buffer | null {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) return null;
  return createHash("sha256").update(`the-arch-admin-session:${p}`).digest();
}

function sign(expires: number, key: Buffer): string {
  return createHmac("sha256", key).update(`v1.${expires}`).digest("base64url");
}

function same(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordIsSet(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function passwordMatches(attempt: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  return same(attempt, real);
}

export async function startSession(): Promise<void> {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD is not set");
  const expires = Date.now() + DAYS * 86_400_000;
  (await cookies()).set(COOKIE, `${expires}.${sign(expires, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DAYS * 86_400,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  // Read the cookie before anything else, so a page that calls this is always
  // rendered per request. Returning early without touching cookies() would let
  // a build with no password set bake a "please sign in" page into the site.
  const value = (await cookies()).get(COOKIE)?.value;
  const key = secret();
  if (!key) return false;
  if (!value) return false;
  const [expiresRaw, sig] = value.split(".");
  const expires = Number(expiresRaw);
  if (!sig || !Number.isFinite(expires) || expires < Date.now()) return false;
  return same(sig, sign(expires, key));
}

/** Call first thing in every admin page and action. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
