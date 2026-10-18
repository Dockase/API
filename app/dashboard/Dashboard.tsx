"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ApiKeyBanner from "@/components/ApiKeyBanner";
import {
  type Account,
  ApiError,
  buyPrepaidPack,
  clearToken,
  getAccount,
  getToken,
  type PrepaidPack,
  regenerateKey,
  toggleOverage,
  upgradePlan,
} from "@/lib/api";

const PLAN_ORDER = ["FREE", "PRO", "ENTERPRISE"];
const PLAN_PRICES: Record<string, number> = { FREE: 0, PRO: 29, ENTERPRISE: 99 };
// Fallback pack catalog; the account payload carries the authoritative
// prepaid_packs catalog, so this is only used when the field is absent.
const PREPAID_PACKS: Record<PrepaidPack, { usd: number; calls: number }> = {
  STARTER: { usd: 10, calls: 2000 },
  GROWTH: { usd: 25, calls: 6000 },
  SCALE: { usd: 50, calls: 15000 },
};
// Overage rates per 1M tokens, from /pricing. The account payload has no cost
// field, so the est. USD figure is computed client-side from overage_tokens.
const OVERAGE_RATE_PER_1M: Record<string, number | null> = {
  FREE: null,
  PRO: 0.25,
  ENTERPRISE: 0.2,
};

function fmt(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n.toLocaleString("en-US");
}

function UsageBar({
  label,
  used,
  limit,
}: {
  label: string;
  used: number;
  limit: number;
}) {
  const pct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
  const hot = limit > 0 && used / limit >= 0.8;
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-heading">{label}</span>
        <span className="font-mono text-xs text-muted">
          {fmt(used)} / {fmt(limit)}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-fill-subtle">
        <div
          className={`h-full rounded-full transition-all ${hot ? "bg-rose-500" : "bg-accent"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {hot && (
        <p className="mt-1.5 text-xs text-rose-600">
          Over 80% of your monthly allowance used.
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-32">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-border-strong border-t-accent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [confirmRegen, setConfirmRegen] = useState(false);
  const [regenBusy, setRegenBusy] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const [toggleBusy, setToggleBusy] = useState(false);
  const [upgradeBusy, setUpgradeBusy] = useState<string | null>(null);
  const [prepaidBusy, setPrepaidBusy] = useState<PrepaidPack | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setAccount(await getAccount());
    } catch (err) {
      setLoadError(
        err instanceof ApiError ? err.message : "Couldn't load your account.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    load();
  }, [load, router]);

  async function onRegenerate() {
    setRegenBusy(true);
    setActionError(null);
    try {
      const res = await regenerateKey();
      setNewKey(res.api_key ?? null);
      setConfirmRegen(false);
      await load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Regeneration failed.");
      setConfirmRegen(false);
    } finally {
      setRegenBusy(false);
    }
  }

  async function onToggleOverage() {
    setToggleBusy(true);
    setActionError(null);
    try {
      const res = await toggleOverage();
      setAccount((a) => (a ? { ...a, overage_enabled: res.overage_enabled } : a));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Couldn't update overage.");
    } finally {
      setToggleBusy(false);
    }
  }

  async function onUpgrade(plan: "PRO" | "ENTERPRISE") {
    setUpgradeBusy(plan);
    setActionError(null);
    try {
      const res = await upgradePlan(plan);
      if (res.authorization_url) {
        window.location.href = res.authorization_url;
      } else {
        setActionError("No checkout URL returned — please try again.");
      }
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Upgrade failed.");
    } finally {
      setUpgradeBusy(null);
    }
  }

  async function onBuyPrepaid(pack: PrepaidPack) {
    setPrepaidBusy(pack);
    setActionError(null);
    try {
      const res = await buyPrepaidPack(pack);
      if (res.authorization_url) {
        window.location.href = res.authorization_url;
      } else {
        setActionError("No checkout URL returned — please try again.");
      }
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Purchase failed.");
    } finally {
      setPrepaidBusy(null);
    }
  }

  function signOut() {
    clearToken();
    window.location.href = "/";
  }

  if (loading) return <Spinner />;

  if (loadError || !account) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-2xl border border-rose-300 bg-rose-50 p-8 text-center">
          <h1 className="text-lg font-semibold text-heading">
            Couldn&rsquo;t load your dashboard
          </h1>
          <p className="mt-2 text-sm text-rose-700">{loadError ?? "Unknown error."}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={load}
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
            >
              Try again
            </button>
            <button
              onClick={signOut}
              className="rounded-xl border border-border bg-bg-raised px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const plan = (account.plan_type ?? "FREE").toUpperCase();
  const planIdx = PLAN_ORDER.indexOf(plan);
  const planPrice = account.plan_price_usd ?? PLAN_PRICES[plan] ?? null;
  const overageRate = OVERAGE_RATE_PER_1M[plan] ?? null;
  const overageCost =
    overageRate !== null && typeof account.overage_tokens === "number"
      ? (account.overage_tokens / 1_000_000) * overageRate
      : null;
  const upgrades = (["PRO", "ENTERPRISE"] as const).filter(
    (p) => PLAN_ORDER.indexOf(p) > planIdx,
  );
  const prepaidPacks =
    account.prepaid_packs && Object.keys(account.prepaid_packs).length > 0
      ? account.prepaid_packs
      : PREPAID_PACKS;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Developer dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-heading">
            Your account
          </h1>
        </div>
        <button
          onClick={signOut}
          className="rounded-xl border border-border bg-bg-raised px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
        >
          Sign out
        </button>
      </div>

      {newKey && (
        <div className="mt-8">
          <ApiKeyBanner apiKey={newKey} />
        </div>
      )}

      {actionError && (
        <div className="mt-6 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {actionError}
        </div>
      )}

      <div className="mt-8 space-y-6">
        {/* API key */}
        <section className="rounded-2xl border border-border bg-bg-raised p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-heading">API key</h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                account.is_active
                  ? "bg-accent-soft text-accent-hover"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {account.is_active ? "Active" : "Suspended"}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <code className="rounded-xl border border-border bg-fill-subtle px-4 py-2.5 font-mono text-sm text-heading">
              {account.key_prefix ?? "dk_"}&hellip;
            </code>
            <CopyPrefix prefix={account.key_prefix ?? ""} />
          </div>
          <p className="mt-3 text-sm text-muted">
            Only the prefix is stored here. The full key was shown once at
            creation — keep it server-side.
          </p>
          <div className="mt-5">
            <button
              onClick={() => setConfirmRegen(true)}
              className="rounded-xl border border-border bg-bg-raised px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
            >
              Regenerate key
            </button>
          </div>
        </section>

        {/* Usage */}
        <section className="rounded-2xl border border-border bg-bg-raised p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-heading">Usage</h2>
            {account.last_reset_date && (
              <span className="font-mono text-xs text-muted">
                Metering since {account.last_reset_date}
              </span>
            )}
          </div>
          <div className="mt-6 space-y-6">
            <UsageBar
              label="Queries this month"
              used={account.queries_used ?? 0}
              limit={account.query_limit ?? 0}
            />
            <UsageBar
              label="Embedding tokens this month"
              used={account.tokens_used ?? 0}
              limit={account.token_limit ?? 0}
            />
          </div>

          <div className="mt-8 rounded-xl border border-border bg-fill-subtle p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-heading">Overage</p>
                <p className="mt-1 text-sm text-muted">
                  {fmt(account.overage_tokens)} tokens accrued
                  {overageCost !== null && (
                    <>
                      {" "}
                      &middot; est.{" "}
                      <span className="font-semibold text-heading">
                        ${overageCost.toFixed(2)}
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Overage is billed in $5 blocks on your next invoice.
                </p>
              </div>
              <button
                onClick={onToggleOverage}
                disabled={toggleBusy}
                role="switch"
                aria-checked={!!account.overage_enabled}
                aria-label="Toggle overage billing"
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-60 ${
                  account.overage_enabled ? "bg-accent" : "bg-border-strong"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
                    account.overage_enabled ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-xs text-muted">
              {account.overage_enabled
                ? "Overage is on — usage beyond your allowance keeps working and bills as overage."
                : "Overage is off — requests stop at your plan limit."}
            </p>
          </div>
        </section>

        {/* Prepaid packs */}
        <section className="rounded-2xl border border-border bg-bg-raised p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-heading">Prepaid packs</h2>
            <span className="rounded-full border border-gold/40 bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">
              Never expire
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-heading">
              {fmt(account.prepaid_calls ?? 0)}
            </span>
            <span className="text-sm text-muted">prepaid calls remaining</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            Pay-as-you-go top-ups on any plan, including Free. Packs are
            consumed only after your monthly quota runs out and never expire.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {(Object.keys(PREPAID_PACKS) as PrepaidPack[]).map((name) => {
              const pack = prepaidPacks[name] ?? PREPAID_PACKS[name];
              return (
                <button
                  key={name}
                  onClick={() => onBuyPrepaid(name)}
                  disabled={prepaidBusy !== null}
                  className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                  {prepaidBusy === name
                    ? "Redirecting…"
                    : `${name.charAt(0)}${name.slice(1).toLowerCase()} — ${fmt(pack.calls)} calls · $${pack.usd}`}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted">
            You&rsquo;ll be sent to Paystack checkout to complete payment.
          </p>
        </section>

        {/* Plan */}
        <section className="rounded-2xl border border-border bg-bg-raised p-8">
          <h2 className="text-lg font-semibold text-heading">Plan</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold/40 bg-gold-soft px-4 py-1.5 text-sm font-semibold text-gold">
              {plan}
            </span>
            {planPrice !== null && (
              <span className="text-sm text-muted">
                ${planPrice}/month
              </span>
            )}
            <span className="font-mono text-xs text-muted">
              {fmt(account.rate_limit_per_minute)} req/min
            </span>
          </div>
          {upgrades.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {upgrades.map((p) => (
                <button
                  key={p}
                  onClick={() => onUpgrade(p)}
                  disabled={upgradeBusy !== null}
                  className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                  {upgradeBusy === p
                    ? "Redirecting…"
                    : `Upgrade to ${p.charAt(0)}${p.slice(1).toLowerCase()} — $${PLAN_PRICES[p]}/mo`}
                </button>
              ))}
              <p className="w-full text-xs text-muted">
                You&rsquo;ll be sent to Paystack checkout to complete payment.
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">
              You&rsquo;re on the highest plan. Questions?{" "}
              <a
                href="mailto:support@dockase.com"
                className="text-accent hover:text-accent-hover"
              >
                support@dockase.com
              </a>
            </p>
          )}
        </section>
      </div>

      {/* Regenerate confirm modal */}
      {confirmRegen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-heading/40 px-6 backdrop-blur-sm"
          onClick={() => !regenBusy && setConfirmRegen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-bg-raised p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="regen-title"
          >
            <h3 id="regen-title" className="text-lg font-semibold text-heading">
              Regenerate API key?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Your current key stops working the moment a new one is issued —
              existing integrations break immediately. The new key is shown
              once.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmRegen(false)}
                disabled={regenBusy}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-border-strong disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={onRegenerate}
                disabled={regenBusy}
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:opacity-60"
              >
                {regenBusy ? "Regenerating…" : "Regenerate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CopyPrefix({ prefix }: { prefix: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prefix);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — leave state unchanged
    }
  }

  return (
    <button
      onClick={copy}
      className="rounded-xl border border-border bg-bg-raised px-4 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
    >
      {copied ? "Copied" : "Copy prefix"}
    </button>
  );
}
