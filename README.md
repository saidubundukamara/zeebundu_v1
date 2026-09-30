# Zeebundu Group website

Next.js 16 (App Router) + Payload CMS 3 + Postgres (Neon). Public site at `/`, CMS at `/admin`.
See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for scope and phases.

## Setup

1. `npm install`
2. `docker compose up -d` — local Postgres 16 on `localhost:5432` (data persists in a Docker volume).
3. `cp .env.example .env`, then set `PAYLOAD_SECRET` (`openssl rand -hex 32`). The example `DATABASE_URI` already points at the Docker database.
4. `npm run seed` — loads sectors, the 16 businesses and group copy (safe to re-run). Set `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` to also create a first super-admin.
5. `npm run dev`, then open http://localhost:3000/admin (create the first user there if you skipped the seed admin).

Production uses Neon instead of Docker — see `docs/LAUNCH_CHECKLIST.md`.

## Scripts

| Script                       | What it does                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`                | Dev server                                                                           |
| `npm run build` / `start`    | Production build / serve                                                             |
| `npm run lint`               | ESLint                                                                               |
| `npm run typecheck`          | Next route types + `tsc --noEmit`                                                    |
| `npm run format`             | Prettier (write); `format:check` to verify                                           |
| `npm run seed`               | Idempotent content seed (`src/seed`)                                                 |
| `npm run test:e2e`           | Playwright E2E (enquiry flow) against `E2E_BASE_URL` (default http://localhost:3100) |
| `npm run test:int`           | Access-control integration tests — point `DATABASE_URI` at a throwaway DB            |
| `npm run generate:types`     | Regenerate `src/payload-types.ts` after schema edits                                 |
| `npm run generate:importmap` | Regenerate the admin import map after adding custom admin components                 |

## Layout

```
src/
  app/(frontend)/   public site
  app/(payload)/    Payload admin + REST/GraphQL routes (generated — don't edit)
  access/           Role + business-scoped access helpers
  blocks/           Layout blocks (pages and business "extras")
  collections/      Payload collections
  fields/           Shared field configs
  globals/          Homepage, header, footer, group details, media kit
  seed/             Seed script + data from content/legacy/COPY_REVIEW.md
  components/ui/    shadcn/ui components
  payload.config.ts
```

## Roles

| Role            | Can edit                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------- |
| Super admin     | Everything, including users and group details                                             |
| Group editor    | All content and globals except group details; cannot manage users                         |
| Business editor | Only their assigned businesses, plus news, media and enquiries tagged to those businesses |

Businesses are the multi-tenant plugin's tenants (assigned on each user). News, media and enquiries use an optional `business` field with our own access rules in `src/access`, so group-level items (no business) stay group-only.

## Publishing & preview

- Publishing in the CMS expires the cached data for that content (`src/hooks/revalidate.ts`), so changes appear on the next request with no redeploy.
- **Preview** / **Live Preview** in the admin open the page in Draft Mode (`/next/preview`, logged-in users only) and refresh as drafts autosave.
- Scheduled publishing runs through Payload's jobs queue, triggered by the Vercel Cron in `vercel.json` (needs `CRON_SECRET`).

## Integrations (all optional in development)

Email (Resend), spam protection (Cloudflare Turnstile), media storage (Cloudinary), analytics (Plausible) and error tracking (Sentry) switch on when their env vars are set — see `.env.example`. Without them, emails are logged to the console, the Turnstile check is skipped, uploads go to `./media`, and analytics/Sentry are off.

See `docs/LAUNCH_CHECKLIST.md` for production setup and `docs/EDITOR_GUIDE.md` for CMS users.
