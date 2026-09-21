"use client";

import { useState } from "react";

/** Copy to clipboard with a moment of confirmation, because a button that
 *  looks identical after you press it leaves you pressing it again. */
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      // Clipboard access can be refused; the text is on screen to select by hand.
      setDone(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="font-body font-semibold text-sm px-4 py-2.5 rounded-pill bg-ink text-cream hover:brightness-110 transition"
    >
      {done ? "Copied" : label}
    </button>
  );
}
