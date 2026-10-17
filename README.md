# Dockase API — developer portal

Public documentation and marketing site for the Dockase legal API.
Deployed at **developers.dockase.com** (Vercel).

- API base URL: `https://api.dockase.com`
- App / API keys: `https://dockase.com/billing/developer/` (the Django dashboard hosts key management, usage, and billing)

## Stack

Next.js (App Router) + Tailwind CSS v4 + TypeScript. Fully static — no
backend calls, no auth. Design tokens mirror `dockase/frontend` (dark navy).

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
