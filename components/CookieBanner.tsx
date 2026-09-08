"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ta-cookie-consent";

export type Consent = "accepted" | "essential";

/** Read the stored choice. Analytics and affiliate trackers should be gated on
 *  this returning "accepted" — see the note in README under Legal. */
export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "essential" ? v : null;
  } catch {
    return null; // private browsing, blocked storage
  }
}

export default function CookieBanner() {
  // Starts hidden and only appears after mount — rendering it during SSR would
  // flash the banner for people who have already answered.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  function choose(value: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* nothing we can do if storage is blocked; just close the banner */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie choices"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl bg-card border border-line rounded-[22px] shadow-xl shadow-ink/10 p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-sm leading-relaxed text-ink-soft flex-1">
          The Arch uses a small number of cookies. The essential ones keep the site working;
          others help us understand which edits are useful and let retailers credit a purchase back
          to us.{" "}
          <Link href="/privacy" className="text-terracotta font-semibold underline underline-offset-4">
            Privacy &amp; cookies
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="font-display text-sm font-semibold px-5 py-2.5 rounded-pill border border-ink/25 text-ink hover:border-ink transition-colors"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="font-display text-sm font-semibold px-5 py-2.5 rounded-pill bg-terracotta text-card hover:brightness-105 transition"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
