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

const sidebar: ({ id: string; label: string } | { group: string })[] = [
  { id: "getting-started", label: "Getting started" },
  { group: "Compliance & KYB" },
  { id: "kyb-assess", label: "KYB assessment" },
  { id: "verify-company", label: "Verify a company" },
  { id: "verify-tin", label: "Verify a TIN" },
  { id: "verify-scuml", label: "Verify SCUML" },
  { id: "company-search", label: "Company search" },
  { group: "Knowledge stores" },
  { id: "stores-create", label: "Create a store" },
  { id: "stores-documents", label: "Documents & ingestion" },
  { id: "stores-query", label: "Query a store" },
  { group: "Legal data" },
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

const kybAssessTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/kyb/assess \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "rc_number": "RC123456",
    "company_name": "Acme Payment Services Ltd",
    "tin": "12345678-0001",
    "scuml_number": "SC251011526"
  }'`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.post(
    "https://api.dockase.com/v1/kyb/assess",
    headers={"Authorization": "Bearer dk_live_..."},
    json={
        "rc_number": "RC123456",
        "company_name": "Acme Payment Services Ltd",
        "tin": "12345678-0001",
        "scuml_number": "SC251011526",
    },
)
resp.raise_for_status()
result = resp.json()["data"]

if result["decision"] == "PASS":
    onboard(merchant)
elif result["decision"] == "REVIEW":
    route_to_compliance(merchant, result["flags"])
else:
    decline(merchant, result["flags"])`,
  },
  {
    label: "JavaScript",
    lang: "javascript",
    code: `const resp = await fetch("https://api.dockase.com/v1/kyb/assess", {
  method: "POST",
  headers: {
    Authorization: "Bearer dk_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    rc_number: "RC123456",
    company_name: "Acme Payment Services Ltd",
    tin: "12345678-0001",
    scuml_number: "SC251011526",
  }),
});
const { data } = await resp.json();
console.log(data.decision, data.flags);`,
  },
];

const kybAssessResponse = `{
  "data": {
    "decision": "REVIEW",
    "flags": [
      {
        "code": "NAME_PARTIAL_MATCH",
        "severity": "low",
        "detail": "Submitted name partially matches registry name 'ACME PAYMENT SERVICES LTD'."
      },
      {
        "code": "TIN_NOT_VERIFIED",
        "severity": "medium",
        "detail": "The supplied TIN could not be verified."
      }
    ],
    "evidence": {
      "cac": {
        "verified": true,
        "name": "ACME PAYMENT SERVICES LTD",
        "status": "ACTIVE",
        "directors_count": 2,
        "registration_date": "2019-04-01"
      },
      "tin": { "verified": false, "reason": "TIN/RC invalid or not found" },
      "scuml": null
    }
  },
  "meta": { "request_id": "req_7k2p9x", "plan": "PRO" }
}`;

const verifyCompanyTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/verify/company \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "rc_number": "RC123456", "company_type": "RC" }'`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.post(
    "https://api.dockase.com/v1/verify/company",
    headers={"Authorization": "Bearer dk_live_..."},
    json={"rc_number": "RC123456", "company_type": "RC"},
)
company = resp.json()["data"]
print(company["status"], company.get("name"))`,
  },
];

const verifyCompanyResponse = `{
  "data": {
    "status": "VERIFIED",
    "verified": true,
    "name": "ACME PAYMENT SERVICES LTD",
    "company_status": "ACTIVE",
    "address": "12 Marina, Lagos",
    "directors": [
      { "firstname": "Ada", "surname": "Lovelace" }
    ],
    "directors_count": 1,
    "share_capital": "1000000",
    "registration_date": "2019-04-01",
    "entity_type": "LTD"
  },
  "meta": { "request_id": "req_3f8q2m", "plan": "FREE" }
}`;

const verifyTinResponse = `{
  "data": {
    "status": "VERIFIED",
    "verified": true,
    "taxpayer_name": "ACME PAYMENT SERVICES LTD",
    "tax_office": "Ikoyi",
    "email": "tax@acme.ng",
    "tin": "12345678-0001"
  },
  "meta": { "request_id": "req_9h4w1t", "plan": "PRO" }
}`;

const verifyScumlResponse = `{
  "data": {
    "status": "VERIFIED",
    "verified": true,
    "number": "SC251011526",
    "details": { "regime": "SCUML certified" }
  },
  "meta": { "request_id": "req_5t6r8y", "plan": "PRO" }
}`;

const companySearchResponse = `{
  "data": {
    "status": "FOUND",
    "count": 2,
    "matches": [
      { "name": "ACME PAYMENT SERVICES LTD", "rc_number": "RC123456", "country_code": "NG" },
      { "name": "ACME PAYMENT SYSTEMS LTD", "rc_number": "RC998877", "country_code": "NG" }
    ]
  },
  "meta": { "request_id": "req_2m5n8k", "plan": "PRO" }
}`;

const storeCreateTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/stores \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "M&A Data Room", "matter_type": "MA_ACQUISITION" }'`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.post(
    "https://api.dockase.com/v1/stores",
    headers={"Authorization": "Bearer dk_live_..."},
    json={"name": "M&A Data Room", "matter_type": "MA_ACQUISITION"},
)
store = resp.json()["data"]["store"]
print(store["id"], store["name"])`,
  },
];

const storeCreateResponse = `{
  "data": {
    "store": {
      "id": 412,
      "name": "M&A Data Room",
      "matter_type": "MA_ACQUISITION",
      "document_count": 0,
      "created_at": "2026-10-30T09:14:22+00:00"
    }
  },
  "meta": { "request_id": "req_8d3k1m", "plan": "PRO" }
}`;

const storeUploadTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl -X POST https://api.dockase.com/v1/stores/412/documents \\
  -H "Authorization: Bearer dk_live_..." \\
  -F "file=@share-purchase-agreement.pdf"`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests, time

resp = requests.post(
    "https://api.dockase.com/v1/stores/412/documents",
    headers={"Authorization": "Bearer dk_live_..."},
    files={"file": ("share-purchase-agreement.pdf", open("spa.pdf", "rb"))},
)
doc = resp.json()["data"]["document"]

# Ingestion is async — poll until READY
while True:
    r = requests.get(
        f"https://api.dockase.com/v1/stores/412/documents/{doc['id']}",
        headers={"Authorization": "Bearer dk_live_..."},
    )
    status = r.json()["data"]["document"]["status"]
    if status in ("READY", "FAILED"):
        break
    time.sleep(15)
print(status)`,
  },
];

const storeUploadResponse = `{
  "data": {
    "document": {
      "id": 1337,
      "name": "share-purchase-agreement.pdf",
      "status": "UPLOADED",
      "size_bytes": 2418332,
      "page_count": 0,
      "error": null,
      "uploaded_at": "2026-10-30T09:16:41+00:00"
    },
    "duplicate": false
  },
  "meta": { "request_id": "req_2x9p4w", "plan": "PRO" }
}`;

const storeQueryTabs = [
  {
    label: "curl",
    lang: "bash",
    code: `curl https://api.dockase.com/v1/stores/412/query \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "query": "indemnity cap and survival period", "limit": 5 }'`,
  },
  {
    label: "Python",
    lang: "python",
    code: `import requests

resp = requests.post(
    "https://api.dockase.com/v1/stores/412/query",
    headers={"Authorization": "Bearer dk_live_..."},
    json={"query": "indemnity cap and survival period", "limit": 5},
)
for p in resp.json()["data"]["passages"]:
    print(p["document"], p["pages"], "-", p["text"][:120])`,
  },
];

const storeQueryResponse = `{
  "data": {
    "passages": [
      {
        "text": "The aggregate liability of the Seller under this Clause 14 shall not exceed...",
        "document": "share-purchase-agreement.pdf",
        "pages": "31-32",
        "section": "Clause 14.2 — Limitation of Liability",
        "distance": 0.183
      }
    ],
    "mode": "search"
  },
  "meta": { "request_id": "req_6t5y8u", "plan": "PRO" }
}`;

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
            {sidebar.map((s, i) =>
              "group" in s ? (
                <li
                  key={`group-${i}`}
                  className="px-3 pb-1 pt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted/70 first:pt-0"
                >
                  {s.group}
                </li>
              ) : (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-fill-subtle hover:text-heading"
                  >
                    {s.label}
                  </a>
                </li>
              )
            )}
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
        {/* KYB assessment */}
        <Section id="kyb-assess">
          <EndpointHeading
            method="POST"
            path="/v1/kyb/assess"
            title="KYB assessment — one call, one decision"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Built for fintech onboarding: the merchant submits their details,
            and this endpoint runs every registry lane they gave you —
            CAC always, TIN and SCUML when supplied — then applies a
            deterministic ruleset to return a decision your system can route
            on. Auto-pass the clean majority; humans touch only the exceptions.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={kybAssessTabs} />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "rc_number", type: "string", required: true, description: "CAC registration number, e.g. RC123456." },
                { name: "company_name", type: "string", required: true, description: "The name the merchant claims — checked against the registry name." },
                { name: "tin", type: "string", description: "Tax Identification Number (optional). Checked when supplied." },
                { name: "scuml_number", type: "string", description: "SCUML registration number (optional). Checked when supplied." },
                { name: "scuml_required", type: "boolean", description: "When true, a missing SCUML number is itself a medium-severity flag. Default false." },
              ]}
            />
          </div>
          <Sub>Decision values</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "PASS", type: "decision", description: "No medium or high flags. Auto-onboard." },
                { name: "REVIEW", type: "decision", description: "At least one medium flag (CAC not found, TIN/SCUML unverified, SCUML missing when required). Route to human compliance." },
                { name: "FAIL", type: "decision", description: "At least one high flag (STATUS_INACTIVE, NAME_MISMATCH). Do not onboard." },
              ]}
            />
          </div>
          <Sub>Flag codes</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "STATUS_INACTIVE", type: "high", description: "Registry status is not ACTIVE. Hard stop." },
                { name: "NAME_MISMATCH", type: "high", description: "Submitted name does not match the registry name. Hard stop." },
                { name: "CAC_NOT_FOUND", type: "medium", description: "RC number not found in the registry. REVIEW, not FAIL — registry data lags new incorporations." },
                { name: "TIN_NOT_VERIFIED", type: "medium", description: "The supplied TIN could not be verified." },
                { name: "SCUML_NOT_VERIFIED", type: "medium", description: "The supplied SCUML number could not be verified." },
                { name: "SCUML_MISSING", type: "medium", description: "scuml_required was true and no SCUML number was supplied." },
                { name: "NAME_PARTIAL_MATCH", type: "low", description: "Names are similar but not identical — informational." },
                { name: "NO_DIRECTORS_FOUND", type: "low", description: "The registry returned no directors — informational." },
                { name: "RECENT_INCORPORATION", type: "low", description: "Incorporated within roughly the last year — informational." },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-4">
            <CodeBlock code={kybAssessResponse} lang="json" title="200 OK" />
          </div>
          <TierNote>
            A completed assessment is always a 200 — decisions are business
            answers, not errors. A degraded registry is a{" "}
            <code className="font-mono text-[13px]">503</code> instead, so a
            provider outage can never masquerade as &ldquo;company does not
            exist&rdquo;. Requires the{" "}
            <code className="font-mono text-[13px]">verify</code> scope
            (default keys include it). Consumes one call from your plan
            regardless of how many registry lanes run.
          </TierNote>
        </Section>

        {/* Verify company */}
        <Section id="verify-company">
          <EndpointHeading
            method="POST"
            path="/v1/verify/company"
            title="Verify a company (CAC)"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Live Corporate Affairs Commission registry check by RC number:
            registered name, status, address, directors, and share capital.
            This is the same check that powers the CAC lane of{" "}
            <a href="#kyb-assess" className="text-accent hover:text-accent-hover">
              /v1/kyb/assess
            </a>
            .
          </p>
          <div className="mt-6">
            <CodeTabs tabs={verifyCompanyTabs} />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "rc_number", type: "string", required: true, description: "Registration number, e.g. RC123456." },
                { name: "company_type", type: "string", description: "RC, BN, IT, LP or LLP. Default RC." },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-4">
            <CodeBlock code={verifyCompanyResponse} lang="json" title="200 OK" />
          </div>
          <TierNote>
            <code className="font-mono text-[13px]">status</code> is{" "}
            <code className="font-mono text-[13px]">VERIFIED</code> or{" "}
            <code className="font-mono text-[13px]">NOT_VERIFIED</code> — a
            completed check is always a 200; registry outages are a 503.
          </TierNote>
        </Section>

        {/* Verify TIN */}
        <Section id="verify-tin">
          <EndpointHeading
            method="POST"
            path="/v1/verify/tin"
            title="Verify a TIN"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Tax Identification Number verification. RC/BN/IT numbers are
            auto-routed through the appropriate registry channel.
          </p>
          <div className="mt-6">
            <CodeBlock
              code={`curl https://api.dockase.com/v1/verify/tin \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "tin": "12345678-0001" }'`}
              lang="bash"
              title="curl"
            />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "tin", type: "string", required: true, description: "Tax Identification Number, e.g. 12345678-0001." },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-4">
            <CodeBlock code={verifyTinResponse} lang="json" title="200 OK" />
          </div>
        </Section>

        {/* Verify SCUML */}
        <Section id="verify-scuml">
          <EndpointHeading
            method="POST"
            path="/v1/verify/scuml"
            title="Verify SCUML"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            SCUML (Special Control Unit Against Money Laundering) certification
            check — the AML question compliance teams ask about reporting
            entities. The SC prefix is added automatically if you pass bare
            digits.
          </p>
          <div className="mt-6">
            <CodeBlock
              code={`curl https://api.dockase.com/v1/verify/scuml \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "scuml_number": "SC251011526" }'`}
              lang="bash"
              title="curl"
            />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "scuml_number", type: "string", required: true, description: "SCUML registration number, e.g. SC251011526." },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-4">
            <CodeBlock code={verifyScumlResponse} lang="json" title="200 OK" />
          </div>
        </Section>

        {/* Company search */}
        <Section id="company-search">
          <EndpointHeading
            method="POST"
            path="/v1/verify/company-search"
            title="Company search"
            scope="Nigeria"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Name to RC number discovery — for when the merchant gives you a
            name but no registration number.
          </p>
          <div className="mt-6">
            <CodeBlock
              code={`curl https://api.dockase.com/v1/verify/company-search \\
  -H "Authorization: Bearer dk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "company_name": "acme payment" }'`}
              lang="bash"
              title="curl"
            />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "company_name", type: "string", required: true, description: "Full or partial company name." },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-4">
            <CodeBlock code={companySearchResponse} lang="json" title="200 OK" />
          </div>
        </Section>

        {/* Create a store */}
        <Section id="stores-create">
          <EndpointHeading
            method="POST"
            path="/v1/stores"
            title="Create a store"
            scope="Global"
          />
          <p className="mt-4 leading-relaxed text-muted">
            A store is an isolated knowledge bucket for your account: every
            document you upload is OCR&apos;d, chunked, and embedded
            automatically, and queries only ever return passages from inside
            the store you name. Stores are scoped to your API key — other
            accounts get a 404 for your store ids, as if they never existed.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={storeCreateTabs} />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "name", type: "string", required: true, description: "Display name for the store, e.g. \"M&A Data Room\"." },
                { name: "matter_type", type: "string", description: "One of GENERAL (default), MA_ACQUISITION, MA_MERGER, FINANCING, DISPUTE, REAL_ESTATE, REGULATORY, FORENSIC, LITIGATION, KNOWLEDGE." },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-4">
            <CodeBlock code={storeCreateResponse} lang="json" title="200 OK" />
          </div>
          <Sub>Related calls</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "GET /v1/stores", type: "list", description: "All stores on your account, newest first." },
                { name: "GET /v1/stores/{id}", type: "detail", description: "One store plus document counts grouped by ingestion status." },
              ]}
            />
          </div>
        </Section>

        {/* Documents & ingestion */}
        <Section id="stores-documents">
          <EndpointHeading
            method="POST"
            path="/v1/stores/{id}/documents"
            title="Upload documents"
            scope="Global"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Upload a PDF (including scans) and the ingestion pipeline takes
            over: text extraction with OCR fallback, structure-aware chunking,
            then embedding. Uploads are content-addressed — sending the same
            file twice is a no-op that returns the original document, so you
            never pay twice to embed the same bytes. Max 50 MB per document.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={storeUploadTabs} />
          </div>
          <Sub>Ingestion lifecycle</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "UPLOADED", type: "status", description: "Accepted and queued. Extraction starts within minutes." },
                { name: "EXTRACTING → EMBEDDING", type: "status", description: "Text extraction (with OCR), chunking, embedding, classification." },
                { name: "READY", type: "status", description: "Fully embedded — the document is queryable." },
                { name: "FAILED", type: "status", description: "Ingestion failed; the document record carries an error message." },
              ]}
            />
          </div>
          <Sub>Response (202 Accepted)</Sub>
          <div className="mt-4">
            <CodeBlock code={storeUploadResponse} lang="json" title="202 Accepted" />
          </div>
          <Sub>Related calls</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "GET /v1/stores/{id}/documents", type: "list", description: "Every document in the store with its ingestion status." },
                { name: "GET /v1/stores/{id}/documents/{doc_id}", type: "detail", description: "One document's status — poll this until READY." },
                { name: "DELETE /v1/stores/{id}/documents/{doc_id}", type: "delete", description: "Removes the document and all its embedded passages." },
              ]}
            />
          </div>
          <TierNote>
            Ingestion is asynchronous: upload returns 202 immediately and the
            pipeline catches up in the background (a stalled document is
            re-queued automatically by the ingestion watchdog). Documents count
            against your storage footprint; query calls count against your
            plan&apos;s call allowance like any other endpoint.
          </TierNote>
        </Section>

        {/* Query a store */}
        <Section id="stores-query">
          <EndpointHeading
            method="POST"
            path="/v1/stores/{id}/query"
            title="Query a store"
            scope="Global"
          />
          <p className="mt-4 leading-relaxed text-muted">
            Semantic search scoped to one store. Passages come back with
            citation anchors — document name, page range, and section label —
            so your app can link users straight to the source. Only documents
            in the READY state are searched.
          </p>
          <div className="mt-6">
            <CodeTabs tabs={storeQueryTabs} />
          </div>
          <Sub>Request body</Sub>
          <div className="mt-3">
            <FieldTable
              fields={[
                { name: "query", type: "string", required: true, description: "Natural-language question or phrase (2–2000 chars)." },
                { name: "limit", type: "integer", description: "Passages to return, 1–25. Default 8." },
              ]}
            />
          </div>
          <Sub>Response</Sub>
          <div className="mt-4">
            <CodeBlock code={storeQueryResponse} lang="json" title="200 OK" />
          </div>
          <TierNote>
            <code className="font-mono text-[13px]">mode: &ldquo;search&rdquo;</code>{" "}
            returns raw cited passages — deterministic and cheap. An{" "}
            <code className="font-mono text-[13px]">answer</code> mode
            (LLM-synthesized answer over the same passages, separately metered)
            is on the roadmap; talk to us if you need it early.
          </TierNote>
        </Section>

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
