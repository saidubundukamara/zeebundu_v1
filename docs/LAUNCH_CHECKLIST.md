# Launch checklist

Everything that must happen outside the codebase before zeebundu.com goes live. Tick items off as they're done.

## 1. Accounts & infrastructure

- [ ] **GitHub:** private repo created and this branch pushed; `main` protected.
- [ ] **Neon Postgres:** production database created. Use the **pooled** connection string for `DATABASE_URI`. A separate branch/database for preview deploys is recommended.
- [ ] **Vercel project** linked to the repo, with the env vars below set for Production (and Preview where noted).
  - Builds need database access (pages are generated from CMS content at build time).
  - Vercel Cron (`vercel.json`) runs scheduled publishing every 5 minutes. Sub-daily crons need a Vercel **Pro** plan; on Hobby, change the schedule to daily.
- [ ] **Media storage:** Cloudflare R2 bucket (or Vercel Blob) wired in with `@payloadcms/storage-s3`. **Not done yet:** uploads currently go to local disk, which does not persist on Vercel. Must be completed before editors upload images in production.

## 2. Environment variables

| Variable                                                                                    | Where from                                                            | Required                              |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------- |
| `DATABASE_URI`                                                                              | Neon (pooled)                                                         | Yes                                   |
| `PAYLOAD_SECRET`                                                                            | `openssl rand -hex 32` (different per environment)                    | Yes                                   |
| `NEXT_PUBLIC_SERVER_URL`                                                                    | `https://zeebundu.com` (no trailing slash)                            | Yes                                   |
| `CRON_SECRET`                                                                               | `openssl rand -hex 32`                                                | Yes (scheduled publishing)            |
| `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`                                   | Resend, after verifying the domain                                    | Yes (enquiry emails, password resets) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`                                    | Cloudflare Turnstile widget for zeebundu.com. Set **both** or neither | Yes                                   |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (+ optional `NEXT_PUBLIC_PLAUSIBLE_SRC`)                     | Plausible site                                                        | Recommended                           |
| `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` | Sentry project                                                        | Recommended                           |
| `S3_*`                                                                                      | R2 bucket (see above)                                                 | Yes, once storage is wired            |

`NEXT_PUBLIC_*` values are built into the pages: redeploy after changing them.

## 3. Email

- [ ] Verify **zeebundu.com** in Resend (add its SPF/DKIM DNS records).
- [ ] Send a test enquiry and check that the notification, the CC to the group inbox and the auto-reply all arrive (check spam folders too).
- [ ] Test **Forgot password** on `/admin`.

## 4. Content (client)

See `content/legacy/COPY_REVIEW.md` for the full list of open questions.

- [ ] Copy review signed off, and the 6 drafted business descriptions confirmed.
- [ ] **Group details** (CMS → Site settings): head-office address, phone, WhatsApp, email, **group enquiries inbox**, socials, stats band numbers.
- [ ] Every business: "Enquiries go to" email, phone/WhatsApp, locations and hours, logo, main photo, gallery.
- [ ] Replace the temporary Unsplash seed photos (`src/seed/media/CREDITS.md`) with real Zeebundu photography. Two are clearly off: the forex photo shows Nigerian naira and the pharmacy shelf is from the USA.
- [ ] Regulatory claims confirmed before publishing (e.g. Bank of Sierra Leone licence for Foreign Exchange, Pharmacy Board registration).
- [ ] **About** page: mission, vision, values and history. Publish it (it's seeded as a draft). Leadership profiles and photos. Chairman's message on the Homepage.
- [ ] **Impact programmes:** at least one real programme.
- [ ] **Privacy** and **Terms** pages created under Pages (slugs `privacy` and `terms`); the footer already links to them.
- [ ] **Media kit:** logos, brand guidelines PDF, press contact.
- [ ] Logo decision (see `content/brand/BRAND.md`): the interim wordmark is in use.
- [ ] Replace nothing marked `[Sample]`: sample content only ever existed in local test databases.

## 5. People

- [ ] Super-admin accounts for the web team (create the first one with `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` when running `npm run seed`, or on first visit to `/admin`).
- [ ] Group-editor accounts for the communications team.
- [ ] One business-editor account per business, each assigned to its business.
- [ ] Share `docs/EDITOR_GUIDE.md` and run a 30-minute walkthrough.

## 6. Pre-launch checks (UAT)

- [ ] `npm run test:int` and `npm run test:e2e` pass against a staging database.
- [ ] Log in as a business editor: you can only see and edit your own business, news and enquiries.
- [ ] Publish a change and check it appears on the live page straight away. Check that Live Preview updates while typing.
- [ ] Submit an enquiry from a business page and from `/contact` (Turnstile on).
- [ ] Lighthouse (mobile) on Home, a business page and an article: Performance ≥ 90, Accessibility and SEO 100.
- [ ] Check at 360px, 768px and 1280px widths on a real Android phone.
- [ ] `/sitemap.xml` lists every business and article; `/robots.txt` allows indexing on production only.
- [ ] Validate JSON-LD with Google's Rich Results Test.

## 7. Go-live

- [ ] Run `npm run seed` once against production (safe to re-run), then enter real content.
- [ ] Point **zeebundu.com** DNS at Vercel (plus `www` → apex redirect). Keep the old site's hosting until DNS has propagated.
- [ ] Old URLs redirect automatically (`/business/*` → `/businesses/*`, `/services/*` → sector pages): spot-check a few.
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- [ ] Turn on Sentry alerts; check Plausible is receiving visits.
- [ ] Remove the `/wireframes` pages (already hidden from search engines) once the client no longer needs them.
