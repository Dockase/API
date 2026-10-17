"use client";

import { useState } from "react";

export default function ApiKeyBanner({ apiKey }: { apiKey: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — leave state unchanged
    }
  }

  return (
    <div className="rounded-2xl border border-gold/40 bg-gold-soft p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        Your API key &middot; shown once &mdash; save it now
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <code className="min-w-0 flex-1 break-all rounded-xl border border-gold/30 bg-bg-raised px-4 py-3 font-mono text-sm text-heading">
          {apiKey}
        </code>
        <button
          onClick={copy}
          className="rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-bright"
        >
          {copied ? "Copied" : "Copy key"}
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">
        We never store the full key. If you lose it, generate a new one from
        your dashboard.
      </p>
    </div>
  );
}
