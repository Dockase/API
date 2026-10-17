# Dockase API — developer portal

Public documentation and marketing site for the Dockase legal API.
Deployed at **developers.dockase.com** (Vercel).

Two lanes, one API: the **AELR Nigerian case-law corpus** (13,000+ judgments,
citation graph, citation verification, statutes) and **global legal AI
primitives** (domain-trained embeddings; specialized contract models coming
soon).

- API base URL: `https://api.dockase.com`
- App / API keys: `https://dockase.com/billing/developer/` (the Django dashboard hosts key management, usage, and billing)

## Stack

Next.js (App Router) + Tailwind CSS v4 + TypeScript. Fully static — no
backend calls, no auth. Design tokens mirror `brand/tokens.css` (cream /
navy / gold, light theme).

## Develop

```bash
npm install
npm run dev
```

## Pages

| Route       | Purpose                                          |
| ----------- | ------------------------------------------------ |
| `/`         | Hero, endpoint cards, quickstart                 |
| `/docs`     | Full API reference (curl / Python / JavaScript)  |
| `/pricing`  | Free / Pro / Enterprise plans                    |
| `/changelog`| Platform updates                                 |
| `/status`   | Operational status + support contact             |
| `/terms`    | API usage terms summary                          |
