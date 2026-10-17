"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/changelog", label: "Changelog" },
  { href: "/status", label: "Status" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-ink">
            D
          </span>
          <span className="text-lg font-semibold text-heading">Dockase</span>
          <span className="rounded-md border border-border bg-fill-subtle px-1.5 py-0.5 font-mono text-[11px] text-muted">
            API
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft text-heading"
                    : "text-muted hover:text-heading"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="https://dockase.com/billing/developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Get API key
          </a>
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-bg px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-fill-subtle hover:text-heading"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://dockase.com/billing/developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-ink"
            >
              Get API key
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
