"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="font-semibold text-ink">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="rounded-2xl border border-line bg-card px-4 py-3.5 text-[16px] text-ink focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        />
      </label>
      {state?.error && (
        <p role="alert" className="rounded-2xl bg-ink px-4 py-3 text-sm text-card">
          {state.error}
        </p>
      )}
      <button
        disabled={pending}
        className="rounded-pill bg-terracotta px-6 py-3.5 font-display font-semibold text-card disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
