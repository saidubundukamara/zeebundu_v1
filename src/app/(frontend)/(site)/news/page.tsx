import { ArrowRightIcon, RssIcon } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'

import { NewsCard, newsCategoryLabels } from '@/components/cards/NewsCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { NewsFilters, newsCategoryFilters, newsHref } from '@/components/news/NewsFilters'
import { Pagination } from '@/components/news/Pagination'
import { Button } from '@/components/ui/button'
import { getBusinesses, getNews } from '@/lib/data'
import type { News } from '@/payload-types'

type Filters = { category?: News['category']; business?: number; page: number }

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

/** Search params → validated filters (anything unrecognised is ignored). */
function parseFilters(searchParams: Record<string, string | string[] | undefined>): Filters {
  const category = first(searchParams.category)
  const business = Number(first(searchParams.business))
  const page = Number(first(searchParams.page))
  return {
    category:
      category && category in newsCategoryLabels ? (category as News['category']) : undefined,
    business: Number.isInteger(business) && business > 0 ? business : undefined,
    page: Number.isInteger(page) && page > 1 ? page : 1,
  }
}

export async function generateMetadata(props: PageProps<'/news'>): Promise<Metadata> {
  const { category, business, page } = parseFilters(await props.searchParams)
  const label = newsCategoryFilters.find((f) => f.value === category)?.label
  return {
    title: [category ? `${label} — Newsroom` : 'Newsroom', page > 1 && `Page ${page}`]
      .filter(Boolean)
      .join(' · '),
    description:
      'News, press releases and stories from Zeebundu Group and its businesses across Sierra Leone.',
    alternates: {
      canonical: newsHref({ category, business, page }),
      types: { 'application/rss+xml': '/news/rss.xml' },
    },
  }
}

export default async function NewsPage(props: PageProps<'/news'>) {
  const filters = parseFilters(await props.searchParams)
  const [news, businesses] = await Promise.all([getNews(filters), getBusinesses()])
  const business = businesses.find((b) => b.id === filters.business)
  const filtered = Boolean(filters.category || filters.business)

  return (
    <>
      <PageHeader
        title="Newsroom"
        description="News, press releases and stories from across Zeebundu Group and our businesses."
        crumbs={[{ label: 'Newsroom' }]}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="outline" size="lg">
            <Link href="/news/media-kit">
              Media kit <ArrowRightIcon weight="light" data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="/news/rss.xml">
              <RssIcon weight="light" data-icon="inline-start" /> RSS feed
            </a>
          </Button>
        </div>
      </PageHeader>

      <Section>
        <NewsFilters
          category={filters.category}
          business={filters.business}
          businesses={businesses}
        />

        <h2 className="sr-only">
          {business ? `Articles from ${business.name}` : 'Latest articles'}
        </h2>

        {news.docs.length > 0 ? (
          <>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {news.docs.map((article) => (
                <li key={article.id}>
                  <NewsCard article={article} />
                </li>
              ))}
            </ul>
            <Pagination
              page={news.page ?? filters.page}
              totalPages={news.totalPages}
              hrefFor={(page) => newsHref({ ...filters, page })}
            />
          </>
        ) : (
          <div className="border border-dashed border-map-rule px-6 py-16 text-center">
            <p className="font-heading text-h3 text-map-ink">
              {filtered
                ? 'No articles match these filters yet.'
                : 'No news has been published yet.'}
            </p>
            <p className="mt-2 text-map-ink-soft">
              {filtered
                ? 'Try another category or business.'
                : 'News from across the group will appear here.'}
            </p>
            {filtered && (
              <Button asChild variant="outline" size="lg" className="mt-6">
                <Link href="/news">Show all news</Link>
              </Button>
            )}
          </div>
        )}
      </Section>
    </>
  )
}
