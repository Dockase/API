import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Terms",
  description: "Terms of use for the Dockase API — plain-language summary.",
};

const sections = [
  {
    title: "No bulk export or scraping",
    body: "The API is for answering questions in your product, not for copying the corpus. Do not systematically harvest judgments, statutes, citations, or embeddings — in bulk, at scale, or through automated scraping. Per-request rate limits are not a download quota.",
  },
  {
    title: "Caching is limited to 30 days",
    body: "You may cache API responses for at most 30 days. After that, delete the cached copy or refresh it from the API. The law changes — treatments get overruled and statutes get amended — and stale legal data is how bad advice happens.",
  },
  {
    title: 'Attribution: "Powered by Dockase"',
    body: 'Wherever API results are displayed to end users, you must show the attribution "Powered by Dockase" in a visible and legible form. This applies to search results, judgment text, citation data, and anything derived from them.',
  },
  {
    title: "No competing datasets",
    body: "You may not use the API — or anything derived from it — to build, train, benchmark, or populate a competing legal dataset, search index, or research product. Using embeddings from amicus-embed-ng-v1 inside your own product is fine; using our data to recreate our product is not.",
  },
  {
    title: "Enforcement",
    body: "We monitor usage patterns. Violating these terms may result in suspension or termination of your API access, effective immediately, without refund. If you are unsure whether a use case is allowed, ask us at support@dockase.com before you build it.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="max-w-3xl text-3xl font-semibold text-heading sm:text-4xl">
        API terms of use
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted">
        This is the plain-language summary of the terms that govern use of the
        Dockase API. It is short because the rules are simple: use the API to
        build things for your users, don&apos;t use it to rebuild the corpus.
        By creating an API key you agree to these terms.
      </p>

      <div className="mt-12 max-w-3xl space-y-6">
        {sections.map((s, i) => (
          <section
            key={s.title}
            className="rounded-2xl border border-border bg-bg-raised/60 p-8"
          >
            <h2 className="flex items-baseline gap-3 text-lg font-semibold text-heading">
              <span className="font-mono text-sm text-gold">{i + 1}.</span>
              {s.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm leading-relaxed text-muted">
        Questions about a specific use case? Email{" "}
        <a
          href="mailto:support@dockase.com"
          className="text-accent hover:text-accent-hover"
        >
          support@dockase.com
        </a>
        .
      </p>
    </div>
  );
}
