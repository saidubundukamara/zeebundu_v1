import 'server-only'

import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import type { Business, ImpactProgramme, Leadership, News, Page, Sector } from '@/payload-types'

/**
 * Read-only data access for the public site. Every query:
 * - only returns published content (drafts come in with live preview, Phase 4)
 * - is cached with `unstable_cache` and tagged so Payload hooks can revalidate on publish
 */

export const tags = {
  businesses: 'businesses',
  sectors: 'sectors',
  news: 'news',
  impact: 'impact-programmes',
  leadership: 'leadership',
  pages: 'pages',
  global: (slug: string) => `global:${slug}`,
} as const

const payload = cache(() => getPayload({ config }))

const published: Where = { _status: { equals: 'published' } }

// ---------- Globals ----------

type GlobalSlug = 'site-settings' | 'header' | 'footer' | 'homepage' | 'media-kit'

export const getGlobal = <T extends GlobalSlug>(slug: T, depth = 1) =>
  unstable_cache(
    async () => (await payload()).findGlobal({ slug, depth }),
    ['global', slug, String(depth)],
    { tags: [tags.global(slug)] },
  )()

// ---------- Sectors & businesses ----------

export const getSectors = unstable_cache(
  async (): Promise<Sector[]> => {
    const { docs } = await (
      await payload()
    ).find({
      collection: 'sectors',
      sort: 'order',
      limit: 100,
      depth: 1,
    })
    return docs
  },
  ['sectors'],
  { tags: [tags.sectors] },
)

export const getSector = async (slug: string) =>
  (await getSectors()).find((s) => s.slug === slug) ?? null

/** Card-level data for every published business (depth 1 so sector and images resolve). */
export const getBusinesses = unstable_cache(
  async (): Promise<Business[]> => {
    const { docs } = await (
      await payload()
    ).find({
      collection: 'businesses',
      where: published,
      sort: 'order',
      limit: 100,
      depth: 1,
      select: {
        name: true,
        slug: true,
        tagline: true,
        summary: true,
        logo: true,
        heroImage: true,
        sector: true,
        featured: true,
        order: true,
      },
    })
    return docs as Business[]
  },
  ['businesses'],
  { tags: [tags.businesses, tags.sectors] },
)

export const getBusiness = (slug: string) =>
  unstable_cache(
    async (): Promise<Business | null> => {
      const { docs } = await (
        await payload()
      ).find({
        collection: 'businesses',
        where: { and: [published, { slug: { equals: slug } }] },
        limit: 1,
        depth: 2,
      })
      return docs[0] ?? null
    },
    ['business', slug],
    { tags: [tags.businesses, `${tags.businesses}:${slug}`] },
  )()

/** Businesses grouped by sector, in sector order — used by the footer, index and sector pages. */
export const getBusinessesBySector = async () => {
  const [sectors, businesses] = await Promise.all([getSectors(), getBusinesses()])
  return sectors
    .map((sector) => ({
      sector,
      businesses: businesses.filter((b) => relationID(b.sector) === sector.id),
    }))
    .filter((group) => group.businesses.length > 0)
}

// ---------- News ----------

export type NewsFilters = {
  category?: News['category']
  business?: number
  page?: number
  limit?: number
}

export const getNews = ({ category, business, page = 1, limit = 9 }: NewsFilters = {}) =>
  unstable_cache(
    async () => {
      const where: Where[] = [published]
      if (category) where.push({ category: { equals: category } })
      if (business) where.push({ business: { equals: business } })
      return (await payload()).find({
        collection: 'news',
        where: { and: where },
        sort: '-publishedAt',
        page,
        limit,
        depth: 1,
        select: {
          title: true,
          slug: true,
          excerpt: true,
          heroImage: true,
          category: true,
          business: true,
          publishedAt: true,
        },
      })
    },
    ['news', category ?? '', String(business ?? ''), String(page), String(limit)],
    { tags: [tags.news] },
  )()

export const getArticle = (slug: string) =>
  unstable_cache(
    async (): Promise<News | null> => {
      const { docs } = await (
        await payload()
      ).find({
        collection: 'news',
        where: { and: [published, { slug: { equals: slug } }] },
        limit: 1,
        depth: 2,
      })
      return docs[0] ?? null
    },
    ['article', slug],
    { tags: [tags.news, `${tags.news}:${slug}`] },
  )()

// ---------- Impact ----------

export const getImpactProgrammes = unstable_cache(
  async (): Promise<ImpactProgramme[]> => {
    const { docs } = await (
      await payload()
    ).find({
      collection: 'impact-programmes',
      where: published,
      sort: '-createdAt',
      limit: 100,
      depth: 1,
    })
    return docs
  },
  ['impact-programmes'],
  { tags: [tags.impact] },
)

export const getImpactProgramme = async (slug: string) =>
  (await getImpactProgrammes()).find((p) => p.slug === slug) ?? null

// ---------- Leadership & pages ----------

export const getLeadership = unstable_cache(
  async (): Promise<Leadership[]> => {
    const { docs } = await (
      await payload()
    ).find({
      collection: 'leadership',
      sort: 'order',
      limit: 100,
      depth: 1,
    })
    return docs
  },
  ['leadership'],
  { tags: [tags.leadership] },
)

export const getPage = (slug: string) =>
  unstable_cache(
    async (): Promise<Page | null> => {
      const { docs } = await (
        await payload()
      ).find({
        collection: 'pages',
        where: { and: [published, { slug: { equals: slug } }] },
        limit: 1,
        depth: 2,
      })
      return docs[0] ?? null
    },
    ['page', slug],
    { tags: [tags.pages, `${tags.pages}:${slug}`] },
  )()

export const getPageSlugs = unstable_cache(
  async () => {
    const { docs } = await (
      await payload()
    ).find({
      collection: 'pages',
      where: published,
      limit: 100,
      depth: 0,
      select: { slug: true },
    })
    return docs.map((d) => d.slug).filter(Boolean) as string[]
  },
  ['page-slugs'],
  { tags: [tags.pages] },
)

// ---------- Helpers ----------

/** Relationship value → ID, whether or not it has been populated. */
export const relationID = (value: unknown): number | null => {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) return (value as { id: number }).id
  return null
}

/** Relationship value → populated doc, or null if only the ID is present. */
export const populated = <T extends { id: number }>(value: number | T | null | undefined) =>
  value && typeof value === 'object' ? value : null
