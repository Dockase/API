# Dockase API — developer portal

Standalone developer platform for the Dockase legal API: docs, pricing,
signup, and the developer dashboard. Deployed at **developers.dockase.com**
(Vercel).

Two lanes, one API: the **AELR Nigerian case-law corpus** (13,000+ judgments,
citation graph, citation verification, statutes) and **global legal AI
primitives** (domain-trained embeddings; specialized contract models coming
soon).

- API base URL: `https://api.dockase.com`
- Developer accounts: this portal is the whole platform — signup, API keys, usage, and billing live at `/signup` and `/dashboard` (backed by `https://api.dockase.com/v1/auth/*` and `/v1/account/*`)

## Stack

Next.js (App Router) + Tailwind CSS v4 + TypeScript. Marketing/docs pages are
static; `/signup`, `/login`, and `/dashboard` are client components that call
the live API (session token in `localStorage`, client: `lib/api.ts`). Design
tokens mirror `brand/tokens.css` (cream / navy / gold, light theme).

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
| `/signup`   | Create account — first API key issued instantly  |
| `/login`    | Developer login                                  |
| `/dashboard`| API key, usage bars, overage toggle, upgrades    |
| `/changelog`| Platform updates                                 |
| `/status`   | Operational status + support contact             |
| `/terms`    | API usage terms summary                          |
