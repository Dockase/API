"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "@/lib/api";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/changelog", label: "Changelog" },
  { href: "/status", label: "Status" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // null = not mounted yet (SSR / first paint) — render a neutral placeholder
  // to avoid a hydration mismatch; boolean = token presence.
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setLoggedIn(Boolean(getToken()));
  }, [pathname]);

  function signOut() {
    clearToken();
    setLoggedIn(false);
    window.location.href = "/";
  }

  const authItems = (
    <>
      {loggedIn === null ? (
        <span className="ml-3 inline-block h-9 w-24 rounded-lg bg-fill-subtle" aria-hidden />
      ) : loggedIn ? (
        <>
          <Link
            href="/dashboard"
            className={`ml-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              pathname.startsWith("/dashboard")
                ? "bg-accent-soft text-heading"
                : "text-muted hover:text-heading"
            }`}
          >
            Dashboard
          </Link>
          <button
            onClick={signOut}
            className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-heading"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="ml-3 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-heading"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Get API key
          </Link>
        </>
      )}
    </>
  );

  const mobileAuthItems = (
    <>
      {loggedIn === null ? null : loggedIn ? (
        <>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-fill-subtle hover:text-heading"
          >
            Dashboard
          </Link>
          <button
            onClick={signOut}
            className="rounded-lg px-3 py-2 text-left text-sm text-muted hover:bg-fill-subtle hover:text-heading"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-fill-subtle hover:text-heading"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-ink"
          >
            Get API key
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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
          {authItems}
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
            {mobileAuthItems}
          </div>
        </nav>
      )}
    </header>
  );
}
