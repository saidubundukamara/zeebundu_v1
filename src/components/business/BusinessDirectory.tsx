'use client'

import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useDeferredValue, useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type DirectoryItem = {
  id: number
  /** Lower-cased text the search matches against (name, tagline, summary, sector). */
  search: string
  /** Server-rendered card. */
  card: React.ReactNode
}

export type DirectoryGroup = {
  id: number
  name: string
  slug: string
  items: DirectoryItem[]
}

const chipClass =
  'inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50'

/** Sector chips + text search over the businesses grid. Cards are rendered on the server. */
export function BusinessDirectory({ groups }: { groups: DirectoryGroup[] }) {
  const [sector, setSector] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const id = useId()

  const terms = deferredQuery.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const visible = groups
    .filter((group) => sector === null || group.id === sector)
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => terms.every((t) => item.search.includes(t))),
    }))
    .filter((group) => group.items.length > 0)
  const count = visible.reduce((n, g) => n + g.items.length, 0)

  const reset = () => {
    setSector(null)
    setQuery('')
  }

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div role="group" aria-label="Filter by sector" className="flex flex-wrap gap-2">
          {[{ id: null, name: 'All' }, ...groups].map((chip) => {
            const active = sector === chip.id
            return (
              <button
                key={chip.id ?? 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => setSector(chip.id)}
                className={cn(
                  chipClass,
                  active
                    ? 'border-forest-800 bg-forest-800 text-stone-50'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-forest-700 hover:text-forest-800',
                )}
              >
                {chip.name}
              </button>
            )
          })}
        </div>
        <div className="relative shrink-0 lg:w-72">
          <label htmlFor={`${id}-search`} className="sr-only">
            Search businesses
          </label>
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-600"
          />
          <Input
            id={`${id}-search`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search businesses"
            autoComplete="off"
            className="h-10 bg-white pl-9"
          />
        </div>
      </div>

      <p role="status" className="sr-only">
        {count} {count === 1 ? 'business' : 'businesses'} shown
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-lg border border-dashed border-stone-300 bg-stone-100 p-8">
          <h2 className="font-heading text-h3 text-forest-800">No businesses match your search</h2>
          <p className="text-stone-600">
            Try a different word, or browse all {groups.reduce((n, g) => n + g.items.length, 0)}{' '}
            businesses.
          </p>
          <Button variant="outline" size="lg" onClick={reset}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="space-y-14">
          {visible.map((group) => (
            <section key={group.id} aria-labelledby={`${id}-${group.slug}`}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-stone-200 pb-3">
                <h2 id={`${id}-${group.slug}`} className="text-h3 text-forest-800">
                  <Link
                    href={`/businesses/sector/${group.slug}`}
                    className="rounded-sm outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {group.name}
                  </Link>
                </h2>
                <Link
                  href={`/businesses/sector/${group.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-forest-700 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  View sector <span className="sr-only">{group.name}</span>
                  <ArrowRightIcon aria-hidden className="size-4" />
                </Link>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <li key={item.id}>{item.card}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
