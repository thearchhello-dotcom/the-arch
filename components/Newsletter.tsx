"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Email signup.
 *
 * Neither of the closest competitors has one, and it's the only audience you
 * actually own — traffic from search or social can be taken away, a list can't.
 *
 * Until `site.newsletterEndpoint` is set this renders an honest "opening soon"
 * state rather than a form that accepts an address and discards it.
 */
export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const endpoint = site.newsletterEndpoint as string;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-5 py-10 sm:px-8 sm:py-14 md:px-14">
      <div className="bg-card rounded-[28px] p-7 sm:p-10 md:p-14 flex flex-col gap-5 max-w-2xl">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-terracotta">
          The weekly edit
        </span>
        <h2 className="font-display text-[25px] sm:text-[30px] font-semibold leading-tight text-ink">
          One edit a week, straight to you.
        </h2>
        <p className="leading-relaxed text-ink-soft">
          A new board every Sunday &mdash; the full outfit, what it costs, and what to know before
          you buy. No daily emails, no cross-promotion, and you can leave whenever you like.
        </p>

        {!endpoint ? (
          <p className="text-sm text-ink-faint italic">
            Signups open shortly &mdash; the list is being set up.
          </p>
        ) : status === "done" ? (
          <p className="text-sm font-semibold text-sage">
            Thank you &mdash; check your inbox to confirm.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              className="flex-1 rounded-pill border border-line bg-cream px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-terracotta"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="font-display text-sm font-semibold px-6 py-3 rounded-pill bg-terracotta text-card disabled:opacity-60 transition hover:brightness-105"
            >
              {status === "sending" ? "Sending…" : "Sign up"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-sm text-terracotta">
            That didn&apos;t go through. Please try again, or email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
