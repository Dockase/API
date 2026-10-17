"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

export type CodeTab = {
  label: string;
  lang: string;
  code: string;
};

export default function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-code-bg">
      <div className="flex items-center justify-between border-b border-border pr-3">
        <div className="flex">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 font-mono text-xs transition-colors ${
                i === active
                  ? "border-b-2 border-accent text-heading"
                  : "text-muted hover:text-heading"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={tab.code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code>{tab.code}</code>
      </pre>
    </div>
  );
}
