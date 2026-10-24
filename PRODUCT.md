# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally on the group pages:

- **Partners, investors, press and prospective staff** judging whether Zeebundu is a serious, well-run Sierra Leonean group. They want the group's shape (what it owns, how it hangs together) and a way to get in touch.
- **Customers in Sierra Leone** (households, farmers, traders, companies) looking for one business: the pharmacy, forex, a fuel station, Zeemart, a loan. They want to reach the right business and its contact details fast, often on a phone and a slow connection.

## Product Purpose

The public website of Zeebundu Group. It presents the group and its 19 businesses and projects, routes visitors to each business page, and collects enquiries per business (Payload `Enquiries`, routed to the owning business). Editors run everything through Payload CMS at `/admin`.

Success: a first-time visitor understands within one screen that Zeebundu is a multi-sector Sierra Leone group, and any business is at most two taps away.

## Positioning

A single Sierra Leonean group covering the everyday economy: fuel, food, water, building materials, medicines, money and shopping. Its claim is breadth rooted in one country, not global reach.

## Operating Context

- 9 sectors, 19 businesses and projects (source: `src/seed/data/sectors.ts`, `businesses.ts`, from the client's `review.md`). Businesses marked _dev_ are in development: their pages hide services and locations.
  - Energy & Vehicle Care (Zeebundu Gas Station, Zee AutoCare)
  - Retail (ZeeMart 360, Electrical and Plumbing Shop _dev_)
  - Food & Beverage (Heart2Heart Water Factory, Heart2Heart Natural Juices _dev_, Zee Flavors Restaurant, Food Import and Export)
  - Agriculture (Food Production and Processing, Cattle Farms and Meat Production)
  - Hospitality & Venues (Zeebundu Conference Center, Hotels and Resorts _dev_)
  - Construction (Construction and Building Supplies)
  - Beauty & Health (ZeeLux Beauty Salon, Lux Zee, Zeebundu Pharmacy _dev_)
  - Financial Services (Foreign Exchange and Microfinance _dev_, Zee Empowered Lending and Microfinance _dev_)
  - Security (Elite Lion Zuma Security Agency _dev_)
- Sections: About Us, Our Businesses (index, sector, detail), Projects and Locations, Community, News (articles, RSS, media kit), Careers, Contact, CMS pages (privacy, terms). /impact redirects to /community; impact programme pages remain for future use.
- Reference sites named in the brief: Dangote, Tata, Heirs Holdings, Tolaram.

## Capabilities and Constraints

- Stack: Next.js 16 App Router, Payload 3.90 (pinned), Postgres, Tailwind v4, shadcn/ui. Deploy on Vercel with R2 media.
- Routes, slugs, Payload schemas and enquiry form field names must stay stable.
- Draft mode and live preview must keep working.

## Brand Commitments

- Name: always "Zeebundu" (one word, capital Z only). Formal: "Zeebundu Group of Companies" (the client writes it in capitals in documents; the site uses title case).
- No logo exists yet. The client must supply one or approve a new lockup, so any wordmark is interim.
- The earlier "Forest & gold" direction was never signed off and is replaced by the 2026-09 redesign.

## Evidence on Hand

- Real facts (client content pack, `review.md`, October 2026): office at 42 Bathurst Street, Freetown; admin@zeebundu.com; +232 73 921 049, +232 79 088 882, +232 75 339 268; CEO Usman Jawa Bundu; places Freetown/Goderich, Lungi, Lunsar, Kamranka, Sanda, plus hotel projects at Mahera Beach, Tagrin and John Obey; in 2026 over 120 acres of rice and over 30 acres of corn, groundnuts and sweet potatoes, with a rice milling factory. Founding year, staff count and revenue are **not known**. Never invent them.
- Copy: the client's approved content pack is `review.md` (October 2026), loaded into `src/seed/data/*`. `content/legacy/COPY_REVIEW.md` is the earlier draft it replaced.
- Photography: none from the client. Unsplash photos are temporary seed media and must be replaced with real Zeebundu photography before launch.
- No testimonials, awards or partner logos. Don't fabricate any.

## Product Principles

1. Every business gets equal standing. No business looks like an afterthought.
2. The group story leads, but a customer can always reach their business quickly.
3. Say only what is true and verifiable. Plain words over corporate claims.
4. Works well on a mid-range Android phone on a slow connection.

## Accessibility & Inclusion

WCAG 2.2 AA. All motion respects `prefers-reduced-motion`. Keep the skip link, visible focus states and one h1 per page.
