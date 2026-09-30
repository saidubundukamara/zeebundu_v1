# Zeebundu Group Website — Implementation Plan

## Context

Zeebundu is a Sierra Leone–based group company with 16 smaller businesses. An earlier build (`~/Dev/zeebundu_old`, Next.js 15 + MongoDB) is **reference for copy only** — no code, design, or assets carry over. We are building a fresh corporate "group" website in the style used by holding companies (Dangote, Tata, Heirs Holdings, Tolaram, CFAO): a strong parent brand, a sector‑organised "Our Businesses" portfolio with a detail page per business, a newsroom, a foundation/impact section, and per‑business enquiries — all editable by non‑technical staff, with each business able to manage its own content.

**Decisions made**

- Businesses are subpages on the main site: `/businesses/[slug]` (not subdomains).
- Content managed by non‑technical staff via CMS, with per‑business editor access.
- Stack: **Next.js 16 (App Router) + Payload CMS 3** in one repo, Postgres, npm.
- Launch features: News/Press room, per‑business contact & enquiry forms, Foundation/CSR/Impact. (Careers and Investors deferred to Phase 2.)
- Market: Sierra Leone; **new brand look** (old terracotta palette not reused); name "Zeebundu" (standardise spelling — old site mixed "ZeeBundu"/"Zeebundu").
- Location: `~/Dev/zeebundu` (new repo). After approval, copy this plan to `~/Dev/zeebundu/IMPLEMENTATION_PLAN.md`.

### Why Next.js + Payload (clarification)

- Payload 3 is installed _inside_ the Next.js app: public site at `/`, admin panel at `/admin`, one codebase, one deploy.
- Content lives in **our own Postgres** (Neon) — no per‑seat fees, no lock‑in.
- Content types defined in TypeScript → admin forms and TS types generated automatically.
- Built‑in auth + access control; the official `@payloadcms/plugin-multi-tenant` scopes editors to "their" business.
- Trade‑off vs Sanity: we own DB/hosting and the editor UI is slightly plainer; we gain control and lower long‑term cost.

---

## 1. Information Architecture (modelled on group‑company sites)

**Primary nav:** About · Our Businesses · Impact · Newsroom · Contact (+ "Enquire" CTA button)
**Footer:** every business grouped by sector, group contact, socials, newsletter signup, Privacy, Terms.

### Sitemap

```
/                         Home
/about                    Overview, story/timeline, vision-mission-values, leadership, chairman's message
/businesses               Sector-grouped grid with sector filter + search
/businesses/sector/[slug] Sector landing (e.g. Agriculture & Food)
/businesses/[slug]        Business detail page
/impact                   Foundation / CSR: pillars, programmes, stories, stats
/impact/[slug]            Impact programme / story
/news                     Newsroom: filter by business & category (news, press release, story)
/news/[slug]              Article
/news/media-kit           Logos, brand guidelines, boilerplate, press contact
/contact                  Group HQ + business directory + routed enquiry form
/privacy, /terms          Legal
/admin                    Payload CMS
```

### Sectors → businesses (16)

| Sector                     | Businesses                                           |
| -------------------------- | ---------------------------------------------------- |
| Energy                     | Gas Stations, Petroleum Services                     |
| Hospitality                | Hotels & Resorts                                     |
| Agriculture & Food         | Farming Operations, Fish Farming, Livestock, Poultry |
| Food & Beverage Production | Water Production, Natural Juices, Beverages          |
| Construction               | Construction Materials                               |
| Health & Beauty            | Pharmacy, Cosmetics Salon                            |
| Financial Services         | Foreign Exchange, Micro‑Finance & Lending            |
| Retail                     | Zeemart Shopping                                     |

(Sectors are a CMS collection, so regrouping later needs no code changes.)

### Homepage sections (the common group‑site pattern)

1. Hero — group purpose statement + CTA "Explore our businesses"
2. Stats band — businesses, sectors, employees, communities/districts served (CMS‑editable numbers)
3. Sector/businesses grid — sector cards → sector pages
4. Featured businesses carousel
5. Impact teaser — foundation pillars + 1 featured story
6. Chairman/CEO message (quote + portrait)
7. Latest news (3 items)
8. Enquiry/partnership CTA band + newsletter

### Business detail page template (one flexible template for all 16)

Hero (logo, name, one‑line purpose, image) → Overview → Products/Services (cards) → Key stats → Gallery → Locations & opening hours (map embed) → Contact block (phone, WhatsApp, email) → **Enquiry form (routed to that business)** → Related news → "Other businesses in this sector".
Business‑specific extras are handled with **optional Payload blocks** rather than per‑business templates (e.g. Foreign Exchange "Indicative rates" table, Micro‑Finance "Loan products & requirements", Water "Product sizes", Hotel "Rooms & amenities"). This replaces the old site's 10+ hand‑coded templates.

---

## 2. Tech Stack

- **Framework:** Next.js 16 App Router, React Server Components, TypeScript (strict).
- **CMS:** Payload 3 (`@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/plugin-multi-tenant`, `plugin-seo`, `plugin-form-builder`, `plugin-redirects`).
- **DB:** Postgres on Neon. **Media:** Cloudflare R2 via `@payloadcms/storage-s3` (or Vercel Blob).
- **UI:** Tailwind CSS v4 + shadcn/ui; `next/font` (1 display + 1 text font); lucide icons; restrained motion.
- **Email:** Resend (enquiry routing + notifications). **Spam:** Cloudflare Turnstile + rate limit.
- **Search:** Payload query for businesses; Pagefind optional later.
- **Analytics:** Plausible (or GA4). **Errors:** Sentry.
- **Hosting:** Vercel (preview deploys per PR). Domain: zeebundu.com.
- **Rendering:** static generation + on‑demand revalidation via Payload `afterChange` hooks (`revalidatePath/revalidateTag`); Live Preview + drafts for editors.

---

## 3. Content Model (Payload collections)

| Collection            | Key fields                                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `users`               | name, email, role (`super-admin` \| `group-editor` \| `business-editor`), tenants[]                                                                                                                                                                                                                                                                                |
| `businesses` (tenant) | name, slug, sector→, logo, heroImage, tagline, summary, overview (rich text), services[] {title, description, icon}, stats[] {value,label}, gallery[], layout blocks[] (optional extras), locations[] {name, address, district, phone, hours, lat/lng}, contact {phone, whatsapp, email, enquiryEmail}, socials, website (optional external), featured, order, SEO |
| `sectors`             | name, slug, description, image, order                                                                                                                                                                                                                                                                                                                              |
| `news`                | title, slug, category (news/press/story), business→ (optional, tenant), sectors, heroImage, excerpt, body, author, publishedAt, status/draft, SEO                                                                                                                                                                                                                  |
| `impact-programmes`   | title, slug, pillar (Education/Health/Environment/Enterprise…), summary, body, stats, gallery, partners, business→ optional                                                                                                                                                                                                                                        |
| `leadership`          | name, title, bio, photo, group (executive/board), order                                                                                                                                                                                                                                                                                                            |
| `enquiries`           | name, email, phone, business→, type (general/sales/partnership/media), message, status, createdAt (tenant‑scoped, read‑only for editors except status)                                                                                                                                                                                                             |
| `pages`               | generic pages built from layout blocks (About, legal)                                                                                                                                                                                                                                                                                                              |
| `media`               | image/file with alt text required                                                                                                                                                                                                                                                                                                                                  |
| Globals               | `site-settings` (group contact, socials, stats band numbers), `header`, `footer`, `homepage` (hero copy, featured items, chairman message), `media-kit`                                                                                                                                                                                                            |

**Access control**

- `super-admin`: everything, users, settings.
- `group-editor`: all content, no users/settings.
- `business-editor`: only their tenant's business page, news tagged to their business, and their enquiries (multi‑tenant plugin filters admin + enforces access).

---

## 4. Copy Migration (old site → new CMS)

Old real copy is in MongoDB (`zeebundu` DB, collections `businesses`, `business_content`) — the repo mostly has placeholders.

1. **Read‑only export script** `scripts/export-old-copy.ts` in the new repo: connects with `MONGODB_URI` from `~/Dev/zeebundu_old/.env.local` (read‑only; never writes), dumps each business's text fields to `content/legacy/<slug>.json` and a human‑readable `content/legacy/COPY_REVIEW.md`.
2. Also harvest usable repo copy:
   - Group copy: `zeebundu_old/app/page.tsx` (hero "Your gateway to exceptional businesses…", "Building Excellence Across Industries" about text), `components/layout/Footer.tsx` ("Building tomorrow's success stories through diverse business ventures rooted in quality, sustainability, and community growth.").
   - Business copy: `FOREIGN_EXCHANGE_INITIAL_DATA_POST.md`, `MICRO_FINANCE_POST_EXAMPLE.md`, `WATER_PRODUCTION_POST_EXAMPLE.md`, `LIVESTOCK_TEMPLATE_POST_EXAMPLE.md`, `components/business-templates/ConstructionMaterialsTemplate.tsx`, `SalonTemplate.tsx`, `PharmacyTemplate.tsx`; feature focus per business in `IMPLEMENTATION_PLAN.md` L1027–1166.
3. **Clean & localise** during review: strip US placeholders (+1 555 numbers, "USDA", "$", Medicare/GoodRx, CA 90210, Swiss Alps/Maldives), switch currency to Leones (SLE), use real Sierra Leone addresses/phones, standardise "Zeebundu", mark gaps (mission/vision/values, leadership bios, real stats) as **TODO for client**.
4. **Seed script** `src/seed/index.ts`: creates sectors, 16 businesses, homepage/global copy, placeholder leadership & impact items from the reviewed JSON — idempotent, runnable with `npm run seed`.

**Content the client must supply (not in old site):** mission/vision/values, group history/timeline, leadership names/bios/photos, real stats, per‑business addresses/phones/hours, logos & photography, foundation programmes, legal pages.

---

## 5. Key Features — implementation notes

- **Routed enquiries:** Form on `/contact` (business dropdown) and on each business page (business pre‑selected). Server Action → validate (zod) → Turnstile verify → store in `enquiries` → Resend email to `business.contact.enquiryEmail` (CC group inbox) + auto‑reply to sender. WhatsApp click‑to‑chat button alongside (key channel in Sierra Leone).
- **Newsroom:** list with filters (business, category) via search params; paginated; RSS feed `/news/rss.xml`; media kit page with downloadable assets.
- **Impact/Foundation:** pillars overview, programme pages, stats, story cards; stories can also be tagged to a business.
- **Business directory:** `/businesses` grid with sector filter chips + client‑side search; sector landing pages.
- **SEO:** `generateMetadata` per route; `Organization` JSON‑LD on home with `subOrganization[]`; each business page `Organization`/`LocalBusiness` with `parentOrganization` + address/phone; `NewsArticle` on posts; `BreadcrumbList`; `sitemap.ts` + `robots.ts`; dynamic OG images (`opengraph-image.tsx`) per business/article.
- **Performance (mobile/3G‑friendly):** AVIF/WebP via next/image, minimal client JS, static pages + ISR, fonts subset, Lighthouse ≥ 90 mobile.
- **Accessibility:** WCAG 2.2 AA — required alt text in CMS, focus states, contrast checks, semantic headings.

---

## 6. Project Structure (`~/Dev/zeebundu`)

```
src/
  app/
    (frontend)/            layout, page.tsx, about/, businesses/, impact/, news/, contact/, [slug]/
    (payload)/admin/...    generated Payload admin + api routes
    sitemap.ts robots.ts
  collections/             Users, Businesses, Sectors, News, ImpactProgrammes, Leadership, Enquiries, Pages, Media
  globals/                 SiteSettings, Header, Footer, Homepage, MediaKit
  blocks/                  Hero, RichText, ServicesGrid, Stats, Gallery, RatesTable, LoanProducts, ProductList, CTA, FAQ
  components/              ui/ (shadcn), layout/, business/, news/, forms/
  lib/                     payload.ts (getPayload helper), seo/jsonld.ts, email.ts, turnstile.ts
  access/                  isSuperAdmin, isGroupEditor, tenant helpers
  seed/                    index.ts + data/
  payload.config.ts
scripts/export-old-copy.ts
content/legacy/            exported old copy + COPY_REVIEW.md
```

---

## 7. Phased Delivery

**Phase 0 — Setup (day 1–2)**
Payload 3.90 installed into the existing Next 16 app (blank setup, Postgres adapter; `src/app/(frontend)` + `src/app/(payload)`) → Tailwind v4 + shadcn (radix) → ESLint/Prettier → Neon DB, env vars. **Status:** done except Neon connection string; R2, Resend, Turnstile, Vercel and GitHub remote deferred (placeholders in `.env.example`).

**Phase 1 — Copy & brand (parallel, days 2–5)**
Run export script, produce `COPY_REVIEW.md`, client review. Brand direction: new logo lockup (if needed), palette, type scale, design tokens; low‑fi wireframes for Home, Businesses, Business detail.
**Status:** repo copy harvested (`content/legacy/repo-copy.md`) and cleaned into `content/legacy/COPY_REVIEW.md` for client review; brand direction "Forest & gold" tokens in `globals.css`, documented in `content/brand/BRAND.md`; grey-box wireframes at `/wireframes` (brand sheet, home, businesses, business detail). **Pending:** MongoDB copy export (script not yet written; must be run by the team with access to the old DB), client sign-off on copy and brand.

**Phase 2 — CMS model (days 4–8)**
Collections, globals, blocks, access control, multi‑tenant plugin, seed script, admin grouping & labels for non‑technical editors.
**Status:** done. 9 collections, 5 globals, 11 blocks, role + business-scoped access, multi-tenant plugin (businesses as tenants), SEO + redirects plugins, idempotent `npm run seed`, 13 passing access-control integration tests (`npm run test:int`). Form-builder plugin not used: enquiries are a custom collection. Seeded businesses are published with contact details empty; the About page is seeded as a draft. Leadership and impact items are not seeded (no real data yet).

**Phase 3 — Frontend pages (days 8–18)**
Layout (header/footer/mobile nav) → Home → Businesses index + sector pages → Business detail + blocks → About → Impact → Newsroom + article + media kit → Contact → legal.

**Phase 4 — Forms, SEO, polish (days 18–23)**
Enquiry flow + emails + Turnstile, JSON‑LD, sitemap, OG images, revalidation hooks, live preview, 404/500 pages, analytics, Sentry, accessibility & performance pass.

**Phase 5 — Content entry, training, launch (days 23–28)**
Enter real content, create business‑editor accounts, 1‑page editor guide, UAT, DNS cutover to zeebundu.com, redirects from any old URLs (`/business/[slug]` → `/businesses/[slug]`, `/services/[category]` → `/businesses/sector/[slug]`).

**Later (Phase 2 scope):** Careers/jobs board (with `JobPosting` schema), per‑business custom domains/subdomains via middleware if any business outgrows its page, Krio/French i18n if needed, live FX rates feed, Zeemart online shop.

---

## 8. Verification

- `npm run build` passes with strict TS; `npm run lint` clean.
- `npm run seed` on a fresh DB → all 16 businesses and 8 sectors render at `/businesses` and `/businesses/[slug]`.
- Access control test: log in as a `business-editor` → can edit only own business/news/enquiries; cannot see others (Payload integration tests with Vitest + manual check).
- Enquiry E2E (Playwright): submit from a business page → record in `enquiries` with correct business, email received at that business's inbox (Resend test mode), auto‑reply sent, Turnstile rejects bots.
- Edit a business in `/admin` → change visible on the live page without redeploy (revalidation).
- SEO: validate JSON‑LD with Google Rich Results Test; `/sitemap.xml` lists every business/article.
- Lighthouse mobile ≥ 90 performance, 100 accessibility/SEO on Home, Business detail, Article; axe checks in Playwright.
- Cross‑device check at 360px, 768px, 1280px widths.
