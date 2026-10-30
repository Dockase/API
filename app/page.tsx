import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import MethodBadge from "@/components/MethodBadge";
import ScopeBadge from "@/components/ScopeBadge";
import Typewriter from "@/components/Typewriter";

export const metadata: Metadata = {
  title: "Dockase API — Nigerian legal data, KYB verification, and legal AI, as an API",
};

const endpointGroups = [
  {
    label: "Compliance & KYB",
    tagline: "Registry-verified onboarding and merchant checks for fintechs.",
    uses: [
      "Merchant onboarding",
      "Seller vetting",
      "Lender underwriting",
      "Agent networks",
      "Procurement",
      "B2B account opening",
    ],
    endpoints: [
      {
        method: "POST" as const,
        path: "/v1/kyb/assess",
        name: "KYB assessment",
        scope: "Nigeria" as const,
        blurb:
          "One call, one decision: CAC + TIN + SCUML checked against the merchant's claims — PASS, REVIEW, or FAIL with reason codes. Built for fintech onboarding.",
        href: "/docs#kyb-assess",
      },
      {
        method: "POST" as const,
        path: "/v1/verify/company",
        name: "Verify a company",
        scope: "Nigeria" as const,
        blurb:
          "Live CAC registry check by RC number — status, directors, share capital. Company-name search included.",
        href: "/docs#verify-company",
      },
      {
        method: "POST" as const,
        path: "/v1/verify/tin",
        name: "Verify a TIN",
        scope: "Nigeria" as const,
        blurb:
          "Tax Identification Number verification against the tax registry — auto-routes RC/BN/IT numbers.",
        href: "/docs#verify-tin",
      },
      {
        method: "POST" as const,
        path: "/v1/verify/scuml",
        name: "Verify SCUML",
        scope: "Nigeria" as const,
        blurb:
          "SCUML certification status for reporting entities — the AML check your compliance team asks for.",
        href: "/docs#verify-scuml",
      },
    ],
  },
  {
    label: "Knowledge stores",
    tagline: "Your documents, embedded and queryable — S3-shaped, RAG-ready.",
    uses: [
      "Support chatbots",
      "Contract Q&A",
      "Underwriting review",
      "Policy assistants",
      "Data-room Q&A",
      "Onboarding bases",
    ],
    endpoints: [
      {
        method: "POST" as const,
        path: "/v1/stores",
        name: "Create a store",
        scope: "Global" as const,
        blurb:
          "An isolated knowledge bucket for your account. Everything you put in is OCR'd, chunked, and embedded automatically.",
        href: "/docs#stores-create",
      },
      {
        method: "POST" as const,
        path: "/v1/stores/{id}/documents",
        name: "Upload documents",
        scope: "Global" as const,
        blurb:
          "PDFs and scans in, embedded passages out — with per-document ingestion status you can poll.",
        href: "/docs#stores-documents",
      },
      {
        method: "POST" as const,
        path: "/v1/stores/{id}/query",
        name: "Query a store",
        scope: "Global" as const,
        blurb:
          "Semantic search scoped to one store: cited passages with document, page, and section anchors.",
        href: "/docs#stores-query",
      },
    ],
  },
  {
    label: "Legal data",
    tagline: "The Nigerian case-law corpus, statutes, and legal embeddings.",
    uses: [
      "Research copilots",
      "Litigation risk",
      "Hallucination guards",
      "Precedent alerts",
      "Legal analytics",
      "RAG pipelines",
    ],
    endpoints: [
      {
        method: "POST" as const,
        path: "/v1/judgments/search",
        name: "Search judgments",
        scope: "Nigeria" as const,
        blurb:
          "Semantic search over 13,000+ Nigerian judgments, with court-level and year filters.",
        href: "/docs#search-judgments",
      },
      {
        method: "GET" as const,
        path: "/v1/judgments/{id}",
        name: "Get a judgment",
        scope: "Nigeria" as const,
        blurb:
          "Citation, court, ratio, summary — Pro plans and above get the full judgment text.",
        href: "/docs#get-judgment",
      },
      {
        method: "GET" as const,
        path: "/v1/judgments/{id}/citations",
        name: "Citation graph",
        scope: "Nigeria" as const,
        blurb:
          "Everything a case cites and everything that cites it — followed, considered, distinguished, overruled.",
        href: "/docs#citation-graph",
      },
      {
        method: "POST" as const,
        path: "/v1/citations/verify",
        name: "Verify a citation",
        scope: "Nigeria" as const,
        blurb:
          "Check a citation or case name against the real record. Built to catch hallucinated authorities.",
        href: "/docs#verify-citation",
      },
      {
        method: "GET" as const,
        path: "/v1/statutes",
        name: "Statutes",
        scope: "Nigeria" as const,
        blurb:
          "Nigerian statutes in clean markdown, filterable by category and jurisdiction.",
        href: "/docs#statutes",
      },
      {
        method: "POST" as const,
        path: "/v1/embeddings",
        name: "Legal embeddings",
        scope: "Global" as const,
        blurb:
          "amicus-embed-ng-v1: a legal-domain embedding model anyone can build on, from anywhere. OpenAI-compatible.",
        href: "/docs#embeddings",
      },
    ],
  },
];

const quickstart = `curl https://api.dockase.com/v1/judgments/search \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "locus standi in election petitions",
    "limit": 5
  }'`;

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Hero — two-column split on desktop */}
      <section className="grid gap-12 pb-16 pt-16 sm:pt-20 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Dockase Developer API &middot; v1
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-heading sm:text-5xl">
            The legal data bank.{" "}
            <span className="text-accent">
              <Typewriter />
            </span>
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Is this company real? What does the law actually say — and can you
            prove it? One API for the answers you can&apos;t afford to get
            wrong: live CAC, TIN and SCUML checks with one-call KYB decisions,
            13,000+ Nigerian judgments with citations that actually verify,
            and stores that turn your own documents into answers.
            Bank the data. Build on it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
            >
              Get API key
            </Link>
            <Link
              href="/docs"
              className="rounded-xl border border-border bg-bg-raised px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
            >
              Read the docs
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Already have an account? API keys, usage, and billing live in your{" "}
            <Link href="/dashboard" className="text-accent hover:text-accent-hover">
              developer dashboard
            </Link>{" "}
            — this site is the whole platform.
          </p>
        </div>

        <div className="min-w-0 lg:pl-4">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
            Quickstart — first call in under a minute
          </p>
          <CodeBlock code={quickstart} lang="bash" title="curl" />
          <p className="mt-3 text-sm text-muted">
            Every response is wrapped in{" "}
            <code className="font-mono text-[13px] text-accent">
              {"{ data, meta }"}
            </code>{" "}
            with a request ID.
          </p>
        </div>
      </section>

      {/* Endpoint cards — grouped by suite */}
      <section className="border-t border-border py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Reference
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-heading">
          Three suites, one API key. Specialized models next.
        </h2>
        {endpointGroups.map((group) => (
          <div key={group.label} className="mt-10">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold text-heading">{group.label}</h3>
              <p className="text-sm text-muted">{group.tagline}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {group.uses.map((u) => (
                <span
                  key={u}
                  className="rounded-full border border-border bg-bg-raised/60 px-2.5 py-0.5 text-[11px] text-muted"
                >
                  {u}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.endpoints.map((e) => (
                <Link
                  key={e.path + e.name}
                  href={e.href}
                  className="group rounded-2xl border border-border bg-bg-raised p-6 transition-colors hover:border-accent/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <MethodBadge method={e.method} />
                    <ScopeBadge scope={e.scope} />
                  </div>
                  <code className="mt-3 block truncate font-mono text-xs text-muted">
                    {e.path}
                  </code>
                  <h3 className="mt-3 text-lg font-semibold text-heading group-hover:text-accent">
                    {e.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {e.blurb}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Coming soon teaser */}
        <div className="mt-10 rounded-2xl border border-dashed border-border-strong p-6 lg:w-1/3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide text-muted">
              SOON
            </span>
            <ScopeBadge scope="Coming soon" />
          </div>
          <code className="mt-3 block truncate font-mono text-xs text-muted">
            /v1/models/*
          </code>
          <h3 className="mt-3 text-lg font-semibold text-heading">
            Specialized contract models
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Small, purpose-trained models for contract review, clause
            extraction, and drafting.{" "}
            <a
              href="mailto:support@dockase.com"
              className="text-accent hover:text-accent-hover"
            >
              Talk to us about early access
            </a>
            .
          </p>
        </div>
        <p className="mt-8 text-sm text-muted">
          Start on the free tier — 200 calls a month, no card required.{" "}
          <Link href="/pricing" className="text-accent hover:text-accent-hover">
            See pricing
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
