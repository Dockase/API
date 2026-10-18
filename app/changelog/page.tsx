import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in the Dockase API.",
};

const entries = [
  {
    date: "October 1, 2026",
    tag: "Launch",
    title: "The Dockase developer platform is live",
    body: [
      "Public launch of API v1 at api.dockase.com: semantic judgment search over 13,000+ Nigerian judgments, judgment detail, the citation graph with treatment analysis, citation verification, statutes in clean markdown, and the amicus-embed-ng-v1 legal embedding model.",
      "Three plans — Free ($0, 200 calls/mo), Pro ($29, 20,000 calls/mo), and Enterprise ($99, 100,000 calls/mo) — billed in USD via Paystack. API keys are issued instantly on signup at developers.dockase.com/signup and managed from your developer dashboard.",
    ],
  },
  {
    date: "September 15, 2026",
    tag: "Change",
    title: "Citations now use the AELR format",
    body: [
      "All citations returned by the API now use the AELR (Amicus Electronic Law Report) format with court suffixes — for example (2023) 12 AELR 45 (SC).",
      "This replaces the legacy citation strings across every endpoint: search results, judgment detail, the citation graph, and citation verification. If you stored citations from earlier beta builds, re-fetch them through /v1/judgments/{id}.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="max-w-3xl text-3xl font-semibold text-heading sm:text-4xl">
        Changelog
      </h1>
      <p className="mt-3 text-muted">
        New endpoints, improvements, and breaking changes.
      </p>

      <div className="mt-12 max-w-3xl space-y-10">
        {entries.map((e) => (
          <article
            key={e.title}
            className="rounded-2xl border border-border bg-bg-raised/60 p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <time className="font-mono text-xs text-muted">{e.date}</time>
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                  e.tag === "Launch"
                    ? "bg-gold-soft text-gold"
                    : "bg-accent-soft text-accent-hover"
                }`}
              >
                {e.tag}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-heading">
              {e.title}
            </h2>
            {e.body.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
