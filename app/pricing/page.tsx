import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Dockase API pricing — Free, Pro, and Enterprise plans. Billed in USD via Paystack.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Prove the concept.",
    highlighted: false,
    features: [
      "1,000 API calls / month",
      "30 requests / minute",
      "Judgment search with snippets (~300 chars)",
      "Citation graph & citation verification",
      "Statutes in clean markdown",
      "amicus-embed-ng-v1 embeddings",
      "Community support",
    ],
    cta: "Start for free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    tagline: "Ship the product.",
    highlighted: true,
    features: [
      "20,000 API calls / month",
      "120 requests / minute",
      "Full judgment text (no snippets)",
      "Citation graph & citation verification",
      "Statutes in clean markdown",
      "Embeddings overage: $0.25 / 1M tokens",
      "Email support",
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    tagline: "Run the firm on it.",
    highlighted: false,
    features: [
      "100,000 API calls / month",
      "600 requests / minute",
      "Full judgment text (no snippets)",
      "Citation graph & citation verification",
      "Statutes in clean markdown",
      "Embeddings overage: $0.20 / 1M tokens",
      "Priority support",
    ],
    cta: "Go Enterprise",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Pricing
        </p>
        <h1 className="mt-3 max-w-xl text-3xl font-semibold text-heading sm:text-4xl">
          Pricing that scales with your docket
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Every plan includes every endpoint. Higher tiers raise the volume,
          the rate limit, and unlock full judgment text. Billed in USD via
          Paystack.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              p.highlighted
                ? "border-accent/50 bg-bg-raised shadow-[0_8px_40px_rgba(35,104,234,0.12)]"
                : "border-border bg-bg-raised/60"
            }`}
          >
            {p.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-heading">{p.name}</h2>
            <p className="mt-1 text-sm text-muted">{p.tagline}</p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-heading">
                {p.price}
              </span>
              <span className="text-sm text-muted">{p.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-muted">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://dockase.com/billing/developer/"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors ${
                p.highlighted
                  ? "bg-accent text-accent-ink hover:bg-accent-hover"
                  : "border border-border text-heading hover:border-border-strong"
              }`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-6 rounded-2xl border border-border bg-bg-raised/60 p-8 text-sm leading-relaxed text-muted">
        <h2 className="text-lg font-semibold text-heading">Notes on billing</h2>
        <p>
          Plans are billed monthly in USD through Paystack. Your call allowance
          resets on the first of each month; unused calls do not roll over.
        </p>
        <p>
          Embeddings are token-metered. Embedding usage draws on your monthly
          allowance first, then bills as overage —{" "}
          <span className="text-heading">$0.25 per 1M tokens on Pro</span>,{" "}
          <span className="text-heading">$0.20 per 1M tokens on Enterprise</span>.
        </p>
        <p>
          API keys, usage metrics, plans, and invoices all live in the Dockase
          dashboard at{" "}
          <a
            href="https://dockase.com/billing/developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            dockase.com/billing/developer
          </a>{" "}
          — this portal is documentation only; the dashboard is your account.
        </p>
      </div>
    </div>
  );
}
