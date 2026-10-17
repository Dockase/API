import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import MethodBadge from "@/components/MethodBadge";

export const metadata: Metadata = {
  title: "Dockase API — The Nigerian legal corpus, as an API",
};

const endpoints = [
  {
    method: "POST" as const,
    path: "/v1/judgments/search",
    name: "Search judgments",
    blurb:
      "Semantic search over 13,000+ Nigerian judgments. Filter by court level and year; ranked by relevance and authority score.",
    href: "/docs#search-judgments",
  },
  {
    method: "GET" as const,
    path: "/v1/judgments/{id}",
    name: "Get a judgment",
    blurb:
      "Full judgment detail — citation, court, ratio, and summary. Pro plans and above return the complete judgment text.",
    href: "/docs#get-judgment",
  },
  {
    method: "GET" as const,
    path: "/v1/judgments/{id}/citations",
    name: "Citation graph",
    blurb:
      "Everything a judgment cites and everything that cites it — with treatment: followed, considered, distinguished, or overruled.",
    href: "/docs#citation-graph",
  },
  {
    method: "POST" as const,
    path: "/v1/citations/verify",
    name: "Verify a citation",
    blurb:
      "Check a citation or case name against the real record before it goes in a filing. Built to catch hallucinated authorities.",
    href: "/docs#verify-citation",
  },
  {
    method: "GET" as const,
    path: "/v1/statutes",
    name: "Statutes",
    blurb:
      "Nigerian statutes in clean markdown, filterable by category and jurisdiction. Always current, always structured.",
    href: "/docs#statutes",
  },
  {
    method: "POST" as const,
    path: "/v1/embeddings",
    name: "Legal embeddings",
    blurb:
      "amicus-embed-ng-v1: an embedding model trained on Nigerian legal text. OpenAI-compatible request shape, token-metered.",
    href: "/docs#embeddings",
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
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 text-center sm:pt-32">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-fill-subtle px-4 py-1.5 text-sm text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Dockase Developer API &middot; v1
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-heading sm:text-6xl">
          The Nigerian legal corpus,{" "}
          <span className="text-accent">as an API.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Search 13,000+ Nigerian judgments from the AELR (Amicus Electronic
          Law Report) corpus, traverse a citation graph with treatment
          analysis, verify citations against the real record, and embed legal
          text with a domain-trained model — all over one REST API.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://app.dockase.com/billing/developer"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            Get an API key
          </a>
          <Link
            href="/docs"
            className="rounded-xl border border-border bg-fill-subtle px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
          >
            Read the docs
          </Link>
        </div>
        <div className="mx-auto mt-12 max-w-2xl text-left">
          <CodeBlock code={quickstart} lang="bash" title="Quickstart" />
        </div>
      </section>

      {/* Endpoint cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
          Six endpoints. The whole corpus.
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Every endpoint returns a consistent envelope, uses the same API key,
          and respects the same rate limits. Start on the free tier, scale to
          enterprise.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {endpoints.map((e) => (
            <Link
              key={e.path + e.name}
              href={e.href}
              className="group rounded-2xl border border-border bg-bg-raised/60 p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center gap-2">
                <MethodBadge method={e.method} />
                <code className="truncate font-mono text-xs text-muted">
                  {e.path}
                </code>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-heading group-hover:text-accent-hover">
                {e.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {e.blurb}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-bg-raised/60 p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">
                AELR citations
              </p>
              <h3 className="mt-3 text-xl font-semibold text-heading">
                Real citations, real courts
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Every result carries its AELR citation with court suffix —{" "}
                <code className="font-mono text-[13px] text-accent-hover">
                  (2023) 12 AELR 45 (SC)
                </code>{" "}
                — ready to drop into a brief.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-bg-raised/60 p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">
                Citation graph
              </p>
              <h3 className="mt-3 text-xl font-semibold text-heading">
                Know how a case has been treated
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Followed, considered, distinguished, or overruled — with
                confidence scores and the passage where the treatment appears.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-bg-raised/60 p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">
                Anti-hallucination
              </p>
              <h3 className="mt-3 text-xl font-semibold text-heading">
                Verify before you file
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Pipe LLM-generated citations through{" "}
                <code className="font-mono text-[13px] text-accent-hover">
                  /v1/citations/verify
                </code>{" "}
                and catch invented authorities before a judge does.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-bg-raised/60 p-10 text-center">
            <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
              Start building on the free tier
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              1,000 calls a month, no card required. Upgrade to Pro for full
              judgment text and 20,000 calls.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://app.dockase.com/billing/developer"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
              >
                Get an API key
              </a>
              <Link
                href="/pricing"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
