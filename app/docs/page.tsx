import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import CodeTabs from "@/components/CodeTabs";
import FieldTable, { type Field } from "@/components/FieldTable";
import MethodBadge from "@/components/MethodBadge";
import ScopeBadge from "@/components/ScopeBadge";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Dockase API reference — authentication, errors, rate limits, and every v1 endpoint with curl, Python, and JavaScript examples.",
};

const sidebar = [
  { id: "getting-started", label: "Getting started" },
  { id: "search-judgments", label: "Search judgments" },
  { id: "get-judgment", label: "Get a judgment" },
  { id: "citation-graph", label: "Citation graph" },
  { id: "verify-citation", label: "Verify a citation" },
  { id: "statutes", label: "List statutes" },
  { id: "get-statute", label: "Get a statute" },
  { id: "embeddings", label: "Embeddings" },
];

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-12 first:border-0 first:pt-0">
      {children}
    </section>
  );
}

function EndpointHeading({
  method,
  path,
  title,
  scope,
  planGate,
}: {
  method: "GET" | "POST";
  path: string;
  title: string;
  scope: "Nigeria" | "Global";
  planGate?: string;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <MethodBadge method={method} />
        <code className="font-mono text-sm text-accent-hover">{path}</code>
        <ScopeBadge scope={scope} />
        {planGate && (
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
            {planGate}
          </span>
        )}
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-heading">{title}</h2>
    </>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-lg font-semibold text-heading">{children}</h3>
  );
}

function TierNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-gold/30 bg-gold-soft p-4 text-sm leading-relaxed text-foreground">
      <span className="font-semibold text-gold">Plan note. </span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Code examples                                                       */
/* ------------------------------------------------------------------ */

const searchTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/judgments/search \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "locus standi in election petitions",
    "limit": 5,
    "court_level": "SC",
    "year_from": 2015
  }'`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.post(
    "https://api.dockase.com/v1/judgments/search",
    headers={"Authorization": "Bearer dk_live_..."},
    json={
        "query": "locus standi in election petitions",
        "limit": 5,
        "court_level": "SC",
        "year_from": 2015,
    },
)
resp.raise_for_status()
results = resp.json()["data"]

for hit in results:
    print(hit["citation"], "-", hit["case_name"])`,
  },
  {
    label: "JavaScript",
    lang: "javascript",
    code: `const resp = await fetch("https://api.dockase.com/v1/judgments/search", {
  method: "POST",
  headers: {
    Authorization: "Bearer dk_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: "locus standi in election petitions",
    limit: 5,
    court_level: "SC",
    year_from: 2015,
  }),
});

const { data, meta } = await resp.json();
console.log(meta.request_id, data.length);`,
  },
];

const searchResponse = `{
  "data": [
    {
      "id": "jd_8f3k2m1x",
      "case_name": "Adeyemi v. INEC",
      "citation": "(2023) 12 AELR 45 (SC)",
      "court": "Supreme Court",
      "judgment_date": "2023-09-14",
      "ratio": "A petitioner who seeks to nullify an election must show that the alleged non-compliance substantially affected the result...",
      "summary": "The Supreme Court restated the test for locus standi in election petitions and held that...",
      "authority_score": 0.94,
      "confidence": 0.98,
      "snippet": "...the question of locus standi is a threshold issue that goes to the jurisdiction of the tribunal..."
    }
  ],
  "meta": {
    "request_id": "req_9u2h1k",
    "plan": "FREE"
  }
}`;

const getJudgmentTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/judgments/jd_8f3k2m1x \\
  -H "Authorization: Bearer dk_live_..."`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.get(
    "https://api.dockase.com/v1/judgments/jd_8f3k2m1x",
    headers={"Authorization": "Bearer dk_live_..."},
)
judgment = resp.json()["data"]
print(judgment["citation"], judgment["court"])`,
  },
  {
    label: "JavaScript",
    lang: "javascript",
    code: `const resp = await fetch(
  "https://api.dockase.com/v1/judgments/jd_8f3k2m1x",
  { headers: { Authorization: "Bearer dk_live_..." } }
);
const { data: judgment } = await resp.json();`,
  },
];

const citationsTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/judgments/jd_8f3k2m1x/citations \\
  -H "Authorization: Bearer dk_live_..."`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.get(
    "https://api.dockase.com/v1/judgments/jd_8f3k2m1x/citations",
    headers={"Authorization": "Bearer dk_live_..."},
)
graph = resp.json()["data"]

for c in graph["cited_by"]:
    if c["treatment"] == "overruled":
        print("OVERRULED by", c["citation"])`,
  },
  {
    label: "JavaScript",
    lang: "javascript",
    code: `const resp = await fetch(
  "https://api.dockase.com/v1/judgments/jd_8f3k2m1x/citations",
  { headers: { Authorization: "Bearer dk_live_..." } }
);
const { data: graph } = await resp.json();

const overruled = graph.cited_by.filter(
  (c) => c.treatment === "overruled"
);`,
  },
];

const citationsResponse = `{
  "data": {
    "id": "jd_8f3k2m1x",
    "cites": [
      {
        "id": "jd_2p9q4r7w",
        "case_name": "Okafor v. Attorney-General of Lagos State",
        "citation": "(2019) 4 AELR 112 (SC)",
        "treatment": "followed",
        "confidence": 0.97,
        "context_snippet": "...as this Court held in Okafor v. A-G Lagos State, the threshold question of standing must be resolved..."
      }
    ],
    "cited_by": [
      {
        "id": "jd_5t8y1u3i",
        "case_name": "Bello v. Zamfara State Electoral Commission",
        "citation": "(2025) 2 AELR 88 (CA)",
        "treatment": "distinguished",
        "confidence": 0.91,
        "context_snippet": "...the facts before us differ materially from Adeyemi v. INEC, and we accordingly distinguish..."
      }
    ]
  },
  "meta": {
    "request_id": "req_3f7j0a",
    "plan": "PRO"
  }
}`;

const verifyTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/citations/verify \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"citation": "(2023) 12 AELR 45 (SC)"}'`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

def citation_is_real(citation: str) -> bool:
    resp = requests.post(
        "https://api.dockase.com/v1/citations/verify",
        headers={"Authorization": "Bearer dk_live_..."},
        json={"citation": citation},
    )
    return resp.json()["data"]["status"] == "VERIFIED"

# Verify what your LLM drafted before it reaches a filing.
assert citation_is_real("(2023) 12 AELR 45 (SC)")`,
  },
  {
    label: "JavaScript",
    lang: "javascript",
    code: `const resp = await fetch("https://api.dockase.com/v1/citations/verify", {
  method: "POST",
  headers: {
    Authorization: "Bearer dk_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ citation: "(2023) 12 AELR 45 (SC)" }),
});

const { data } = await resp.json();
if (data.status !== "VERIFIED") {
  throw new Error("Citation not found in the record: " + data.status);
}`,
  },
];

const verifyResponse = `{
  "data": {
    "status": "VERIFIED",
    "matched": {
      "id": "jd_8f3k2m1x",
      "case_name": "Adeyemi v. INEC",
      "citation": "(2023) 12 AELR 45 (SC)",
      "court": "Supreme Court",
      "judgment_date": "2023-09-14"
    }
  },
  "meta": {
    "request_id": "req_6m1z8q",
    "plan": "PRO"
  }
}`;

const statutesTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl "https://api.dockase.com/v1/statutes?category=electoral&jurisdiction=federal" \\
  -H "Authorization: Bearer dk_live_..."`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.get(
    "https://api.dockase.com/v1/statutes",
    headers={"Authorization": "Bearer dk_live_..."},
    params={"category": "electoral", "jurisdiction": "federal"},
)
statutes = resp.json()["data"]`,
  },
  {
    label: "JavaScript",
    lang: "javascript",
    code: `const params = new URLSearchParams({
  category: "electoral",
  jurisdiction: "federal",
});
const resp = await fetch(\`https://api.dockase.com/v1/statutes?\${params}\`, {
  headers: { Authorization: "Bearer dk_live_..." },
});
const { data: statutes } = await resp.json();`,
  },
];

const statutesResponse = `{
  "data": [
    {
      "id": "st_electoral_act_2022",
      "title": "Electoral Act, 2022",
      "category": "electoral",
      "jurisdiction": "federal",
      "year": 2022,
      "updated_at": "2026-08-30"
    }
  ],
  "meta": {
    "request_id": "req_1x4v7n",
    "plan": "FREE"
  }
}`;

const getStatuteResponse = `{
  "data": {
    "id": "st_electoral_act_2022",
    "title": "Electoral Act, 2022",
    "category": "electoral",
    "jurisdiction": "federal",
    "year": 2022,
    "updated_at": "2026-08-30",
    "body_markdown": "# Electoral Act, 2022\\n\\n## Part I – Establishment and Functions of INEC\\n\\n**1.** (1) The Independent National Electoral Commission..."
  },
  "meta": {
    "request_id": "req_8b2c5d",
    "plan": "FREE"
  }
}`;

const embeddingsTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/embeddings \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "amicus-embed-ng-v1",
    "input": "The ratio decidendi of the judgment concerns locus standi..."
  }'`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.post(
    "https://api.dockase.com/v1/embeddings",
    headers={"Authorization": "Bearer dk_live_..."},
    json={
        "model": "amicus-embed-ng-v1",
        "input": "The ratio decidendi of the judgment concerns locus standi...",
    },
)
payload = resp.json()["data"]
vector = payload["data"][0]["embedding"]
print(len(vector), "dims,", payload["usage"]["total_tokens"], "tokens")`,
  },
  {
    label: "JavaScript",
    lang: "javascript",
    code: `const resp = await fetch("https://api.dockase.com/v1/embeddings", {
  method: "POST",
  headers: {
    Authorization: "Bearer dk_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "amicus-embed-ng-v1",
    input: "The ratio decidendi of the judgment concerns locus standi...",
  }),
});
const { data: payload } = await resp.json();
const vector = payload.data[0].embedding;`,
  },
];

const embeddingsResponse = `{
  "data": {
    "object": "list",
    "data": [
      {
        "object": "embedding",
        "index": 0,
        "embedding": [0.0124, -0.0871, 0.0442, "..."]
      }
    ],
    "model": "amicus-embed-ng-v1",
    "usage": {
      "prompt_tokens": 14,
      "total_tokens": 14
    }
  },
  "meta": {
    "request_id": "req_5k9p2t",
    "plan": "PRO"
  }
}`;

/* ------------------------------------------------------------------ */
/* Field tables                                                        */
/* ------------------------------------------------------------------ */

const searchRequestFields: Field[] = [
  {
    name: "query",
    type: "string",
    required: true,
    description:
      "Natural-language legal question or fact pattern. Semantic — describe the issue, not just keywords.",
  },
  {
    name: "limit",
    type: "integer",
    description: "Max results to return. Default 10, maximum 20.",
  },
  {
    name: "court_level",
    type: "string",
    description:
      'Filter by court level, e.g. "SC" (Supreme Court), "CA" (Court of Appeal), "HC" (High Courts).',
  },
  {
    name: "year_from",
    type: "integer",
    description: "Only judgments delivered on or after this year.",
  },
  {
    name: "year_to",
    type: "integer",
    description: "Only judgments delivered on or before this year.",
  },
];

const judgmentResponseFields: Field[] = [
  { name: "id", type: "string", description: "Stable judgment identifier (jd_...)." },
  { name: "case_name", type: "string", description: "Party names as reported." },
  {
    name: "citation",
    type: "string",
    description: 'AELR citation with court suffix, e.g. "(2023) 12 AELR 45 (SC)".',
  },
  { name: "court", type: "string", description: "Court that delivered the judgment." },
  { name: "judgment_date", type: "string", description: "ISO 8601 date (YYYY-MM-DD)." },
  {
    name: "ratio",
    type: "string",
    description: "The ratio decidendi — the binding legal principle of the decision.",
  },
  {
    name: "summary",
    type: "string",
    description: "Editorial summary of the facts and holding.",
  },
  {
    name: "authority_score",
    type: "number",
    description: "0–1. How authoritative this judgment is, from court level and subsequent treatment.",
  },
  {
    name: "confidence",
    type: "number",
    description: "0–1. Relevance confidence for this result against your query.",
  },
  {
    name: "snippet",
    type: "string",
    description: "FREE plan: a ~300-character excerpt around the most relevant passage.",
  },
  {
    name: "full_text",
    type: "string",
    description: "PRO and ENTERPRISE: the complete judgment text. Replaces snippet.",
  },
];

const citationEdgeFields: Field[] = [
  { name: "id", type: "string", description: "Judgment identifier for the related case." },
  { name: "case_name", type: "string", description: "Party names of the related case." },
  { name: "citation", type: "string", description: "AELR citation of the related case." },
  {
    name: "treatment",
    type: "string",
    description: "One of followed, considered, distinguished, overruled.",
  },
  {
    name: "confidence",
    type: "number",
    description: "0–1. Confidence in the treatment classification.",
  },
  {
    name: "context_snippet",
    type: "string",
    description: "The passage in which the citation and treatment appear.",
  },
];

/* ------------------------------------------------------------------ */

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <nav className="sticky top-24">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            API reference
          </p>
          <ul className="mt-4 space-y-1">
            {sidebar.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-fill-subtle hover:text-heading"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-border bg-bg-raised/60 p-4 text-sm">
            <p className="text-muted">Base URL</p>
            <code className="mt-1 block font-mono text-xs text-accent-hover">
              https://api.dockase.com
            </code>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <div className="min-w-0 space-y-16">
        {/* Getting started */}
        <Section id="getting-started">
          <h1 className="text-3xl font-semibold text-heading">Getting started</h1>
          <p className="mt-4 leading-relaxed text-muted">
            The Dockase API is a REST API over{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              https://api.dockase.com
            </code>
            . It speaks JSON, versioned under{" "}
            <code className="font-mono text-[13px] text-accent-hover">/v1</code>.
            Create an account at{" "}
            <Link href="/signup" className="text-accent hover:text-accent-hover">
              /signup
            </Link>{" "}
            — your first API key is issued instantly — and you can make your
            first call in under a minute. Keys, usage, and billing all live in
            your{" "}
            <Link href="/dashboard" className="text-accent hover:text-accent-hover">
              developer dashboard
            </Link>{" "}
            right here on this site.
          </p>

          <Sub>Authentication</Sub>
          <p className="mt-3 leading-relaxed text-muted">
            Every request needs an API key in the{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              Authorization
            </code>{" "}
            header. Keys are prefixed{" "}
            <code className="font-mono text-[13px] text-accent-hover">dk_</code>{" "}
            and are created at{" "}
            <Link href="/signup" className="text-accent hover:text-accent-hover">
              /signup
            </Link>{" "}
            and revoked or regenerated from your{" "}
            <Link href="/dashboard" className="text-accent hover:text-accent-hover">
              dashboard
            </Link>
            . Keep keys server-side — never ship them in a browser or mobile
            client.
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`Authorization: Bearer dk_live_...`}
              lang="http"
              title="Header"
            />
          </div>

          <Sub>Response envelope</Sub>
          <p className="mt-3 leading-relaxed text-muted">
            Every successful response wraps its payload in{" "}
            <code className="font-mono text-[13px] text-accent-hover">data</code>,
            with request metadata in{" "}
            <code className="font-mono text-[13px] text-accent-hover">meta</code>.
            All responses are sent with{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              Cache-Control: no-store
            </code>
            .
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`{
  "data": { "..." : "..." },
  "meta": {
    "request_id": "req_9u2h1k",
    "plan": "PRO"
  }
}`}
              lang="json"
              title="Success envelope"
            />
          </div>

          <Sub>Errors</Sub>
          <p className="mt-3 leading-relaxed text-muted">
            Errors are Stripe-style: a single{" "}
            <code className="font-mono text-[13px] text-accent-hover">error</code>{" "}
            object with a machine-readable{" "}
            <code className="font-mono text-[13px] text-accent-hover">type</code>{" "}
            and a human-readable{" "}
            <code className="font-mono text-[13px] text-accent-hover">message</code>.
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`{
  "error": {
    "type": "rate_limited",
    "message": "Rate limit exceeded: 30 requests per minute on the FREE plan."
  }
}`}
              lang="json"
              title="Error envelope"
            />
          </div>
          <div className="mt-4">
            <FieldTable
              fields={[
                { name: "400", type: "invalid_request", description: "Malformed JSON, missing required fields, or invalid parameters." },
                { name: "401", type: "authentication_error", description: "Missing, revoked, or invalid API key." },
                { name: "403", type: "tier_required", description: "The resource requires a higher plan (e.g. full_text on FREE)." },
                { name: "404", type: "not_found", description: "No judgment, statute, or resource with that ID." },
                { name: "429", type: "rate_limited", description: "Per-minute rate limit exceeded. Back off and retry." },
                { name: "500", type: "api_error", description: "Something went wrong on our side. Retry with the request_id if it persists." },
              ]}
            />
          </div>

          <Sub>Rate limits</Sub>
          <p className="mt-3 leading-relaxed text-muted">
            Limits are per API key, per minute. Every response carries{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              X-RateLimit-Limit
            </code>
            ,{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              X-RateLimit-Remaining
            </code>
            , and{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              X-RateLimit-Reset
            </code>{" "}
            (Unix timestamp for the next window).
          </p>
          <div className="mt-4">
            <FieldTable
              fields={[
                { name: "FREE", type: "30 req/min", description: "200 calls/month. Snippet-length judgment text." },
                { name: "PRO", type: "120 req/min", description: "20,000 calls/month. Full judgment text." },
                { name: "ENTERPRISE", type: "600 req/min", description: "100,000 calls/month. Full judgment text, priority support." },
              ]}
            />
          </div>
          <p className="mt-4 leading-relaxed text-muted">
            Need more calls without a subscription?{" "}
            <span className="text-heading">Prepaid packs</span> are one-off
            pay-as-you-go top-ups that never expire and are consumed only after
            your monthly quota runs out — on any plan, including Free. Buy them
            from your{" "}
            <Link href="/dashboard" className="text-accent hover:text-accent-hover">
              dashboard
            </Link>
            .
          </p>
        </Section>

        {/* Search judgments */}
        <Section id="search-judgments">
          <EndpointHeading
            method="POST"
            path="/v1/judgments/search"
            title="Search judgments"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Semantic search over 13,000+ Nigerian judgments. Send a
            natural-language description of the legal issue; get back ranked
            authorities with citations, ratios, and relevance scores.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={searchTabs} />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable fields={searchRequestFields} />
          </div>
          <Sub>Response</Sub>
          <p className="mt-3 text-muted">
            <code className="font-mono text-[13px] text-accent-hover">data</code>{" "}
            is an array of judgment results, ranked by relevance:
          </p>
          <div className="mt-3">
            <FieldTable fields={judgmentResponseFields} />
          </div>
          <div className="mt-4">
            <CodeBlock code={searchResponse} lang="json" title="200 OK" />
          </div>
          <TierNote>
            On the FREE plan each result includes a{" "}
            <code className="font-mono text-[13px]">snippet</code> (~300
            characters). On PRO and ENTERPRISE, results include the complete{" "}
            <code className="font-mono text-[13px]">full_text</code> instead.
          </TierNote>
        </Section>

        {/* Get judgment */}
        <Section id="get-judgment">
          <EndpointHeading
            method="GET"
            path="/v1/judgments/{id}"
            title="Get a judgment"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Fetch a single judgment by ID. Same shape as a search result, with
            the same plan-based text tiering.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={getJudgmentTabs} />
          </div>
          <Sub>Response</Sub>
          <p className="mt-3 text-muted">
            <code className="font-mono text-[13px] text-accent-hover">data</code>{" "}
            is a single judgment object with the fields listed under{" "}
            <a href="#search-judgments" className="text-accent hover:text-accent-hover">
              Search judgments
            </a>
            .
          </p>
          <TierNote>
            FREE returns metadata, ratio, summary, and a{" "}
            <code className="font-mono text-[13px]">snippet</code>. PRO and
            ENTERPRISE return{" "}
            <code className="font-mono text-[13px]">full_text</code>. Tiering
            never fails the request — FREE simply returns the snippet shape
            rather than an error.
          </TierNote>
        </Section>

        {/* Citation graph */}
        <Section id="citation-graph">
          <EndpointHeading
            method="GET"
            path="/v1/judgments/{id}/citations"
            title="Citation graph"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            The citation neighbourhood of a judgment: everything it cites, and
            everything that cites it. Each edge carries a{" "}
            <span className="text-heading">treatment</span> — followed,
            considered, distinguished, or overruled — with a confidence score
            and the passage it was extracted from.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={citationsTabs} />
          </div>
          <Sub>Response</Sub>
          <p className="mt-3 text-muted">
            <code className="font-mono text-[13px] text-accent-hover">
              data.cites
            </code>{" "}
            and{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              data.cited_by
            </code>{" "}
            are arrays of edges:
          </p>
          <div className="mt-3">
            <FieldTable fields={citationEdgeFields} />
          </div>
          <div className="mt-4">
            <CodeBlock code={citationsResponse} lang="json" title="200 OK" />
          </div>
          <TierNote>
            Always check{" "}
            <code className="font-mono text-[13px]">cited_by</code> for{" "}
            <code className="font-mono text-[13px]">overruled</code> treatments
            before relying on an authority — that is the whole point.
          </TierNote>
        </Section>

        {/* Verify citation */}
        <Section id="verify-citation">
          <EndpointHeading
            method="POST"
            path="/v1/citations/verify"
            title="Verify a citation"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Check whether a citation or case name exists in the record. Built
            for the anti-hallucination workflow: run every authority an LLM
            drafts through this endpoint before it reaches a brief, an opinion,
            or a filing.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={verifyTabs} />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                {
                  name: "citation",
                  type: "string",
                  description: 'An AELR-style citation, e.g. "(2023) 12 AELR 45 (SC)". At least one of citation or case_name is required.',
                },
                {
                  name: "case_name",
                  type: "string",
                  description: "Party names, e.g. \"Adeyemi v. INEC\". At least one of citation or case_name is required.",
                },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                {
                  name: "status",
                  type: "string",
                  description: "VERIFIED when a matching judgment exists; NOT_VERIFIED otherwise.",
                },
                {
                  name: "matched",
                  type: "object | null",
                  description: "The matched judgment (id, case_name, citation, court, judgment_date), or null when status is NOT_VERIFIED.",
                },
              ]}
            />
          </div>
          <div className="mt-4">
            <CodeBlock code={verifyResponse} lang="json" title="200 OK" />
          </div>
        </Section>

        {/* Statutes */}
        <Section id="statutes">
          <EndpointHeading
            method="GET"
            path="/v1/statutes"
            title="List statutes"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Nigerian statutes as structured records. Filter by{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              category
            </code>{" "}
            and{" "}
            <code className="font-mono text-[13px] text-accent-hover">
              jurisdiction
            </code>{" "}
            (federal or a state).
          </p>
          <div className="mt-6">
            <CodeTabs tabs={statutesTabs} />
          </div>
          <Sub>Query parameters</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "category", type: "string", description: "Subject category, e.g. electoral, criminal, corporate, land." },
                { name: "jurisdiction", type: "string", description: "federal or a state name, e.g. lagos." },
              ]}
            />
          </div>
          <div className="mt-4">
            <CodeBlock code={statutesResponse} lang="json" title="200 OK" />
          </div>
        </Section>

        {/* Get statute */}
        <Section id="get-statute">
          <EndpointHeading
            method="GET"
            path="/v1/statutes/{id}"
            title="Get a statute"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            The full statute, formatted as clean markdown — headings, sections,
            and subsections preserved. Ready to render or index.
          </p>
          <div className="mt-6">
            <CodeBlock
              code={`curl https://api.dockase.com/v1/statutes/st_electoral_act_2022 \\
  -H "Authorization: Bearer dk_live_..."`}
              lang="bash"
              title="curl"
            />
          </div>
          <div className="mt-4">
            <CodeBlock code={getStatuteResponse} lang="json" title="200 OK" />
          </div>
        </Section>

        {/* Embeddings */}
        <Section id="embeddings">
          <EndpointHeading
            method="POST"
            path="/v1/embeddings"
            title="Embeddings"
            scope="Global"
            planGate="Pro & Enterprise only"
          />
          <p className="mt-4 leading-relaxed text-muted">
            <code className="font-mono text-[13px] text-accent-hover">
              amicus-embed-ng-v1
            </code>{" "}
            is a legal-domain embedding model, trained on judgments, statutes,
            and legal commentary. It is a global primitive — use it to build
            retrieval over your own documents, contracts, briefs, or knowledge
            bases, in any jurisdiction. The request shape is
            OpenAI-compatible.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={embeddingsTabs} />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                {
                  name: "input",
                  type: "string | string[]",
                  required: true,
                  description: "Text to embed. Pass an array to batch.",
                },
                {
                  name: "model",
                  type: "string",
                  required: true,
                  description: 'Must be "amicus-embed-ng-v1".',
                },
              ]}
            />
          </div>
          <div className="mt-4">
            <CodeBlock code={embeddingsResponse} lang="json" title="200 OK" />
          </div>
          <TierNote>
            PRO and ENTERPRISE only. FREE keys get{" "}
            <code className="font-mono text-[13px]">402 payment_required</code>{" "}
            — the error body points you to{" "}
            <Link
              href="/dashboard"
              className="text-accent hover:text-accent-hover"
            >
              /dashboard
            </Link>{" "}
            to upgrade. Embeddings are token-metered: included usage comes from
            your plan&apos;s monthly call allowance; overage is billed per
            million tokens — $0.25/1M on PRO, $0.20/1M on ENTERPRISE.
          </TierNote>
        </Section>
      </div>
    </div>
  );
}
