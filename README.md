# Zeebundu Group website

Next.js 16 (App Router) + Payload CMS 3 + Postgres (Neon). Public site at `/`, CMS at `/admin`.
See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for scope and phases.

## Setup

1. `npm install`
2. `cp .env.example .env`, then set `DATABASE_URI` (Neon pooled connection string) and `PAYLOAD_SECRET` (`openssl rand -hex 32`).
3. `npm run dev` — in development Payload pushes the schema to the database automatically.
4. Open http://localhost:3000/admin and create the first user (give it the `super-admin` role).

## Scripts

| Script                       | What it does                                                         |
| ---------------------------- | -------------------------------------------------------------------- |
| `npm run dev`                | Dev server                                                           |
| `npm run build` / `start`    | Production build / serve                                             |
| `npm run lint`               | ESLint                                                               |
| `npm run typecheck`          | Next route types + `tsc --noEmit`                                    |
| `npm run format`             | Prettier (write); `format:check` to verify                           |
| `npm run generate:types`     | Regenerate `src/payload-types.ts` after schema edits                 |
| `npm run generate:importmap` | Regenerate the admin import map after adding custom admin components |

## Layout

```
src/
  app/(frontend)/   public site
  app/(payload)/    Payload admin + REST/GraphQL routes (generated — don't edit)
  collections/      Payload collections
  components/ui/    shadcn/ui components
  payload.config.ts
```
