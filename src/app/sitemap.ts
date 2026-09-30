import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { getImpactProgrammes, getSectors, tags } from '@/lib/data'
import { absoluteURL } from '@/lib/seo/jsonld'

/**
 * /sitemap.xml — every public page. Wireframes, admin and preview routes are left out.
 * Generated at build and cached; the collection tags let publish hooks refresh it,
 * and it is regenerated at least hourly as a fallback.
 */
export const revalidate = 3600

type Entry = { slug?: string | null; updatedAt: string }

/** Published slugs + updatedAt for a collection (the data layer's list queries omit updatedAt). */
const publishedEntries = (collection: 'businesses' | 'news' | 'pages', tag: string) =>
  unstable_cache(
    async (): Promise<Entry[]> => {
      const payload = await getPayload({ config })
      const { docs } = await payload.find({
        collection,
        where: { _status: { equals: 'published' } },
        sort: '-updatedAt',
        limit: 1000,
        depth: 0,
        pagination: false,
        select: { slug: true, updatedAt: true },
      })
      return docs as Entry[]
    },
    ['sitemap', collection],
    { tags: [tag] },
  )()

// Routes with their own page files; CMS pages with these slugs are not served by /[slug]
const reservedPageSlugs = new Set(['about', 'home'])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [businesses, news, pages, sectors, programmes] = await Promise.all([
    publishedEntries('businesses', tags.businesses),
    publishedEntries('news', tags.news),
    publishedEntries('pages', tags.pages),
    getSectors(),
    getImpactProgrammes(),
  ])

  const latest = (items: Entry[]) =>
    items
      .map((i) => i.updatedAt)
      .sort()
      .at(-1)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteURL('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteURL('/about'), changeFrequency: 'monthly', priority: 0.8 },
    {
      url: absoluteURL('/businesses'),
      lastModified: latest(businesses),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: absoluteURL('/impact'), changeFrequency: 'monthly', priority: 0.7 },
    {
      url: absoluteURL('/news'),
      lastModified: latest(news),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    { url: absoluteURL('/news/media-kit'), changeFrequency: 'yearly', priority: 0.4 },
    { url: absoluteURL('/contact'), changeFrequency: 'yearly', priority: 0.6 },
  ]

  const withSlug = (items: Entry[]) => items.filter((i): i is Entry & { slug: string } => !!i.slug)

  return [
    ...staticRoutes,
    ...sectors.map((sector) => ({
      url: absoluteURL(`/businesses/sector/${sector.slug}`),
      lastModified: sector.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...withSlug(businesses).map((business) => ({
      url: absoluteURL(`/businesses/${business.slug}`),
      lastModified: business.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...programmes
      .filter((p) => p.slug)
      .map((programme) => ({
        url: absoluteURL(`/impact/${programme.slug}`),
        lastModified: programme.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ...withSlug(news).map((article) => ({
      url: absoluteURL(`/news/${article.slug}`),
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...withSlug(pages)
      .filter((page) => !reservedPageSlugs.has(page.slug))
      .map((page) => ({
        url: absoluteURL(`/${page.slug}`),
        lastModified: page.updatedAt,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      })),
  ]
}
