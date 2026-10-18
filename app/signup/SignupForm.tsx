"use client";

import Link from "next/link";
import { useState } from "react";
import ApiKeyBanner from "@/components/ApiKeyBanner";
import { ApiError, setToken, signup } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border border-border bg-bg-raised px-4 py-3 text-sm text-heading placeholder:text-muted/60 transition-colors focus:border-accent";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  function validate() {
    const errors: { email?: string; password?: string } = {};
    if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
    if (password.length < 8) errors.password = "Password must be at least 8 characters.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await signup({
        email,
        password,
        ...(fullName.trim() ? { full_name: fullName.trim() } : {}),
      });
      setToken(res.session_token);
      setApiKey(res.api_key ?? null);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.status === 409
            ? "An account with this email already exists. Log in instead."
            : err.message
          : "Something went wrong — please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (apiKey) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Account created
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-heading">
          You&rsquo;re in.
        </h1>
        <div className="mt-8">
          <ApiKeyBanner apiKey={apiKey} />
        </div>
        <Link
          href="/dashboard"
          className="mt-8 block rounded-xl bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Developer account
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-heading">
        Get your API key
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Free tier included — 200 calls a month, no card required. Your first
        key is issued instantly.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-border bg-bg-raised p-8"
      >
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-heading">
            Full name <span className="text-muted">(optional)</span>
          </label>
          <input
            id="full_name"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-heading">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="you@company.com"
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-rose-600">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-heading">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="At least 8 characters"
          />
          {fieldErrors.password && (
            <p className="mt-1.5 text-xs text-rose-600">{fieldErrors.password}</p>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}{" "}
            {error.includes("Log in") && (
              <Link href="/login" className="font-semibold underline">
                Log in
              </Link>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:text-accent-hover">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
