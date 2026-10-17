export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-sm font-bold text-accent">
                D
              </span>
              <span className="text-lg font-semibold text-heading">Dockase</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The Nigerian legal corpus, as an API. Judgments, citations,
              statutes, and legal embeddings from the AELR corpus.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-heading">Developers</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/docs" className="text-muted hover:text-heading">Documentation</a></li>
              <li><a href="/changelog" className="text-muted hover:text-heading">Changelog</a></li>
              <li><a href="/status" className="text-muted hover:text-heading">Status</a></li>
              <li>
                <a
                  href="https://dockase.com/billing/developer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-heading"
                >
                  Get an API key
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-heading">Pricing</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/pricing" className="text-muted hover:text-heading">Plans</a></li>
              <li><a href="/terms" className="text-muted hover:text-heading">API terms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-heading">Dockase</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://dockase.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-heading">
                  dockase.com
                </a>
              </li>
              <li>
                <a href="https://app.dockase.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-heading">
                  app.dockase.com
                </a>
              </li>
              <li>
                <a href="mailto:support@dockase.com" className="text-muted hover:text-heading">
                  support@dockase.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>&copy; 2026 Dockase. All rights reserved.</p>
          <p className="font-mono text-xs">
            api.dockase.com &middot; developers.dockase.com
          </p>
        </div>
      </div>
    </footer>
  );
}
