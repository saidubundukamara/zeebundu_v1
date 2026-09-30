import 'server-only'

import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import { tags } from './tags'
import type { Business, ImpactProgramme, Leadership, News, Page, Sector } from '@/payload-types'

/**
 * Read-only data access for the public site. Every query:
 * - returns published content, cached with `unstable_cache` and tagged so Payload hooks
 *   (src/hooks/revalidate.ts) can expire it on publish
 * - single-document getters take `draft`: in Draft Mode (editor preview, only enabled for
 *   logged-in CMS users) they skip the cache and return the latest draft instead
 */

export { tags }

const payload = cache(() => getPayload({ config }))

const published: Where = { _status: { equals: 'published' } }

// ---------- Globals ----------

type GlobalSlug = 'site-settings' | 'header' | 'footer' | 'homepage' | 'media-kit'

export const getGlobal = <T extends GlobalSlug>(slug: T, depth = 1, draft = false) =>
  draft
    ? payload().then((p) => p.findGlobal({ slug, depth, draft: true }))
    : unstable_cache(
        async () => (await payload()).findGlobal({ slug, depth }),
        ['global', slug, String(depth)],
        { tags: [tags.global(slug)] },
      )()

/** Find one document by slug: published and cached, or the latest draft uncached. */
const findBySlug = <C extends 'businesses' | 'news' | 'pages' | 'impact-programmes'>(
  collection: C,
  slug: string,
  draft: boolean,
  cacheTags: string[],
) => {
  const query = async () => {
    const { docs } = await (
      await payload()
    ).find({
      collection,
      where: draft ? { slug: { equals: slug } } : { and: [published, { slug: { equals: slug } }] },
      draft,
      limit: 1,
      depth: 2,
    })
    return docs[0] ?? null
  }
  return draft ? query() : unstable_cache(query, [collection, 'slug', slug], { tags: cacheTags })()
}

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

export const getBusiness = (slug: string, draft = false): Promise<Business | null> =>
  findBySlug('businesses', slug, draft, [tags.businesses, `${tags.businesses}:${slug}`])

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

export const getArticle = (slug: string, draft = false): Promise<News | null> =>
  findBySlug('news', slug, draft, [tags.news, `${tags.news}:${slug}`])

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

export const getImpactProgramme = (slug: string, draft = false): Promise<ImpactProgramme | null> =>
  findBySlug('impact-programmes', slug, draft, [tags.impact])

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

export const getPage = (slug: string, draft = false): Promise<Page | null> =>
  findBySlug('pages', slug, draft, [tags.pages, `${tags.pages}:${slug}`])

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
