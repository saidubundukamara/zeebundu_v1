import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Business, News } from '@/payload-types'

type Category = News['category']

export const newsCategoryFilters: { value?: Category; label: string }[] = [
  { label: 'All' },
  { value: 'news', label: 'News' },
  { value: 'press', label: 'Press releases' },
  { value: 'story', label: 'Stories' },
]

export const newsHref = ({
  category,
  business,
  page,
}: {
  category?: Category
  business?: number
  page?: number
}) => {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (business) params.set('business', String(business))
  if (page && page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `/news?${qs}` : '/news'
}

/**
 * Category tabs (links) and a business picker (GET form), so filtering works without JS.
 */
export function NewsFilters({
  category,
  business,
  businesses,
}: {
  category?: Category
  business?: number
  businesses: Pick<Business, 'id' | 'name'>[]
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 border-b border-map-rule pb-6 lg:flex-row lg:items-end lg:justify-between">
      <nav aria-label="Filter by category">
        <ul className="flex flex-wrap gap-2">
          {newsCategoryFilters.map((filter) => {
            const active = filter.value === category
            return (
              <li key={filter.label}>
                <Link
                  href={newsHref({ category: filter.value, business })}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-9 items-center rounded-sm border px-4 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                    active
                      ? 'border-map-course bg-map-course text-primary-foreground'
                      : 'border-map-rule text-map-ink hover:border-map-ink hover:bg-muted',
                  )}
                >
                  {filter.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <form action="/news" method="get" className="flex flex-wrap items-end gap-2">
        {category && <input type="hidden" name="category" value={category} />}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="news-business" className="text-sm font-medium text-map-ink-soft">
            Business
          </label>
          <select
            id="news-business"
            name="business"
            defaultValue={business ? String(business) : ''}
            className="h-9 min-w-56 rounded-lg border border-input bg-card px-2.5 text-sm text-map-ink-soft outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">All businesses</option>
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="lg" className="px-4">
          Filter
        </Button>
        {business ? (
          <Button asChild variant="ghost" size="lg">
            <Link href={newsHref({ category })}>Clear</Link>
          </Button>
        ) : null}
      </form>
    </div>
  )
}
