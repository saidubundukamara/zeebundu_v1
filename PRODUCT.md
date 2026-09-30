# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally on the group pages:

- **Partners, investors, press and prospective staff** judging whether Zeebundu is a serious, well-run Sierra Leonean group. They want the group's shape (what it owns, how it hangs together) and a way to get in touch.
- **Customers in Sierra Leone** (households, farmers, traders, companies) looking for one business: the pharmacy, forex, a fuel station, Zeemart, a loan. They want to reach the right business and its contact details fast, often on a phone and a slow connection.

## Product Purpose

The public website of Zeebundu Group. It presents the group and its 16 businesses, routes visitors to each business page, and collects enquiries per business (Payload `Enquiries`, routed to the owning business). Editors run everything through Payload CMS at `/admin`.

Success: a first-time visitor understands within one screen that Zeebundu is a multi-sector Sierra Leone group, and any business is at most two taps away.

## Positioning

A single Sierra Leonean group covering the everyday economy: fuel, food, water, building materials, medicines, money and shopping. Its claim is breadth rooted in one country, not global reach.

## Operating Context

- 8 sectors, 16 businesses (source: `src/seed/data/sectors.ts`, `businesses.ts`):
  - Energy (Gas Stations, Petroleum Services)
  - Hospitality (Hotels & Resorts)
  - Agriculture & Food (Farming Operations, Fish Farming, Livestock, Poultry)
  - Food & Beverage Production (Water Production, Natural Juices, Beverages)
  - Construction (Construction Materials)
  - Health & Beauty (Pharmacy, Cosmetics Salon)
  - Financial Services (Foreign Exchange, Micro-Finance & Lending)
  - Retail (Zeemart Shopping)
- Sections: About, Businesses (index, sector, detail), Impact (programmes), News (articles, RSS, media kit), Contact, CMS pages (privacy, terms).
- Reference sites named in the brief: Dangote, Tata, Heirs Holdings, Tolaram.

## Capabilities and Constraints

- Stack: Next.js 16 App Router, Payload 3.90 (pinned), Postgres, Tailwind v4, shadcn/ui. Deploy on Vercel with R2 media.
- Routes, slugs, Payload schemas and enquiry form field names must stay stable.
- Draft mode and live preview must keep working.

## Brand Commitments

- Name: always "Zeebundu" (one word, capital Z only). Formal: "Zeebundu Group".
- No logo exists yet. The client must supply one or approve a new lockup, so any wordmark is interim.
- The earlier "Forest & gold" direction was never signed off and is replaced by the 2026-09 redesign.

## Evidence on Hand

- Real numbers: 16 businesses, 8 sectors. Founding year, staff count, locations and revenue are **not known**. Never invent them.
- Copy: seed data in `src/seed/data/*`, legacy copy in `content/legacy/`.
- Photography: none from the client. Unsplash photos are temporary seed media and must be replaced with real Zeebundu photography before launch.
- No testimonials, awards or partner logos. Don't fabricate any.

## Product Principles

1. Every business gets equal standing. No business looks like an afterthought.
2. The group story leads, but a customer can always reach their business quickly.
3. Say only what is true and verifiable. Plain words over corporate claims.
4. Works well on a mid-range Android phone on a slow connection.

## Accessibility & Inclusion

WCAG 2.2 AA. All motion respects `prefers-reduced-motion`. Keep the skip link, visible focus states and one h1 per page.
