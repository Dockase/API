import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status",
  description: "Dockase API operational status.",
};

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-3xl font-semibold text-heading sm:text-4xl">
        API status
      </h1>

      <div className="mt-10 max-w-3xl rounded-2xl border border-border bg-bg-raised/60 p-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>
          <p className="text-lg font-semibold text-heading">
            All systems operational
          </p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The Dockase API (
          <code className="font-mono text-[13px] text-accent-hover">
            api.dockase.com
          </code>
          ) is running normally. If you are seeing elevated errors or latency,
          include the{" "}
          <code className="font-mono text-[13px] text-accent-hover">
            request_id
          </code>{" "}
          from the response meta when you reach out — it lets us trace the
          exact call.
        </p>
      </div>

      <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-bg-raised/60 p-8">
        <h2 className="text-lg font-semibold text-heading">Need help?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          For incidents, billing, or integration questions, email{" "}
          <a
            href="mailto:support@dockase.com"
            className="text-accent hover:text-accent-hover"
          >
            support@dockase.com
          </a>
          . Enterprise plans include priority support.
        </p>
      </div>
    </div>
  );
}
