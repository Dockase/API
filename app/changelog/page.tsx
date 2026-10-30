import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in the Dockase API.",
};

const entries = [
  {
    date: "October 30, 2026",
    tag: "Launch",
    title: "Knowledge stores: your documents, embedded and queryable",
    body: [
      "A new suite for any team with documents: POST /v1/stores creates an isolated store scoped to your API key; POST /v1/stores/{id}/documents ingests PDFs and scans (OCR, chunking, embedding — fully automatic, with per-document status to poll); POST /v1/stores/{id}/query returns cited passages with document, page, and section anchors.",
      "Uploads are content-addressed, so re-sending a file never re-embeds it. Cross-account isolation is by design: another tenant's store ids answer 404, as if they never existed. An LLM-synthesized answer mode is on the roadmap.",
      "The developer portal is now grouped into three suites — Compliance & KYB, Knowledge stores, and Legal data — and the API reference is organized the same way.",
    ],
  },
  {
    date: "October 29, 2026",
    tag: "Launch",
    title: "KYB verification: CAC, TIN, SCUML, and one-call merchant assessments",
    body: [
      "Five new endpoints for fintech onboarding and compliance teams: POST /v1/verify/company (CAC registry check with directors and share capital), POST /v1/verify/tin, POST /v1/verify/scuml, POST /v1/verify/company-search (name to RC number), and the flagship POST /v1/kyb/assess — one call that runs every registry lane and returns a machine-readable PASS, REVIEW, or FAIL with reason codes and lane evidence.",
      "Contract guarantees for compliance workloads: a completed check always returns 200 with a decision value (NOT_VERIFIED is a business answer, not an error), and a degraded registry returns 503 so a provider outage can never masquerade as 'company does not exist'. Keys can now carry endpoint scopes — the KYB surface requires the verify scope.",
      "Registry integration refreshed to the provider's current API: canonical CAC and SCUML paths, the new global TIN-check endpoint, and secret-key-only authentication.",
    ],
  },
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
