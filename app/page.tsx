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
      "Semantic search over 13,000+ Nigerian judgments, with court-level and year filters.",
    href: "/docs#search-judgments",
  },
  {
    method: "GET" as const,
    path: "/v1/judgments/{id}",
    name: "Get a judgment",
    blurb:
      "Citation, court, ratio, summary — Pro plans and above get the full judgment text.",
    href: "/docs#get-judgment",
  },
  {
    method: "GET" as const,
    path: "/v1/judgments/{id}/citations",
    name: "Citation graph",
    blurb:
      "Everything a case cites and everything that cites it — followed, considered, distinguished, overruled.",
    href: "/docs#citation-graph",
  },
  {
    method: "POST" as const,
    path: "/v1/citations/verify",
    name: "Verify a citation",
    blurb:
      "Check a citation or case name against the real record. Built to catch hallucinated authorities.",
    href: "/docs#verify-citation",
  },
  {
    method: "GET" as const,
    path: "/v1/statutes",
    name: "Statutes",
    blurb:
      "Nigerian statutes in clean markdown, filterable by category and jurisdiction.",
    href: "/docs#statutes",
  },
  {
    method: "POST" as const,
    path: "/v1/embeddings",
    name: "Legal embeddings",
    blurb:
      "amicus-embed-ng-v1: an embedding model trained on Nigerian legal text. OpenAI-compatible.",
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
    <div className="mx-auto max-w-6xl px-6">
      {/* Compact hero — left aligned */}
      <section className="pb-12 pt-16 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Dockase Developer API &middot; v1
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-heading sm:text-5xl">
          The Nigerian legal corpus, as an API.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Search 13,000+ Nigerian judgments from the AELR (Amicus Electronic
          Law Report) corpus, traverse a citation graph, verify citations
          against the real record, and embed legal text — over one REST API.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="https://dockase.com/billing/developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Get API key
          </a>
          <Link
            href="/docs"
            className="rounded-xl border border-border bg-bg-raised px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-border-strong"
          >
            Read the docs
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Already have an account? API keys, usage, and billing live in the{" "}
          <a
            href="https://dockase.com/billing/developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            Dockase dashboard
          </a>{" "}
          — this site is just the documentation.
        </p>
      </section>

      {/* Quickstart */}
      <section className="border-t border-border py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Quickstart
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-heading">
          First call in under a minute
        </h2>
        <div className="mt-6 max-w-2xl">
          <CodeBlock code={quickstart} lang="bash" title="curl" />
        </div>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Every response is wrapped in{" "}
          <code className="font-mono text-[13px] text-accent">
            {"{ data, meta }"}
          </code>{" "}
          with a request ID. Full details in{" "}
          <Link href="/docs" className="text-accent hover:text-accent-hover">
            the docs
          </Link>
          .
        </p>
      </section>

      {/* Endpoint cards */}
      <section className="border-t border-border py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Reference
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-heading">
          Six endpoints. The whole corpus.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {endpoints.map((e) => (
            <Link
              key={e.path + e.name}
              href={e.href}
              className="group rounded-2xl border border-border bg-bg-raised p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center gap-2">
                <MethodBadge method={e.method} />
                <code className="truncate font-mono text-xs text-muted">
                  {e.path}
                </code>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-heading group-hover:text-accent">
                {e.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {e.blurb}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Start on the free tier — 1,000 calls a month, no card required.{" "}
          <Link href="/pricing" className="text-accent hover:text-accent-hover">
            See pricing
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
