"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — leave state unchanged
    }
  }

  return (
    <button
      onClick={copy}
      className="rounded-md border border-code-border px-2 py-1 font-mono text-[11px] text-code-muted transition-colors hover:bg-white/10 hover:text-code-text"
      aria-label="Copy to clipboard"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
