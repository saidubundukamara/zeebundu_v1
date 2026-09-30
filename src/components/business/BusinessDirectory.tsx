'use client'

import { ArrowRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useDeferredValue, useId, useState } from 'react'

import { Button } from '@/components/ui/button'
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
  codes: string[]
  items: DirectoryItem[]
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Legend-style sector filter + text search over the businesses. Cards are rendered on the server. */
export function BusinessDirectory({ groups }: { groups: DirectoryGroup[] }) {
  const [sector, setSector] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const id = useId()
  const reduce = useReducedMotion()
  const total = groups.reduce((n, g) => n + g.items.length, 0)

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

  const chips = [{ id: null, name: 'All sectors', codes: [] as string[] }, ...groups]

  return (
    <div>
      <div className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div
          role="group"
          aria-label="Filter by sector"
          className="-mx-4 flex snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
        >
          {chips.map((chip) => {
            const active = sector === chip.id
            return (
              <button
                key={chip.id ?? 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => setSector(chip.id)}
                className={cn(
                  'relative isolate inline-flex h-10 shrink-0 snap-start items-center gap-2 rounded-sm border px-3.5 text-sm font-medium transition-colors duration-200',
                  active
                    ? 'border-map-course text-primary-foreground'
                    : 'border-map-rule text-map-ink hover:border-map-ink',
                )}
              >
                {active && (
                  <motion.span
                    layoutId={`${id}-chip`}
                    className="absolute inset-0 -z-0 rounded-[1px] bg-map-course"
                    transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
                  />
                )}
                <span className="relative">{chip.name}</span>
                {chip.codes.length > 0 && (
                  <span
                    className={cn(
                      'relative control-num text-sm',
                      active ? 'text-primary-foreground/80' : 'text-map-course',
                    )}
                  >
                    {chip.codes.join(' ')}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <div className="relative">
          <label htmlFor={`${id}-search`} className="mb-2 block text-sm font-medium">
            Search businesses
          </label>
          <MagnifyingGlassIcon
            aria-hidden
            weight="light"
            className="pointer-events-none absolute bottom-3 left-0 size-5 text-map-ink-soft"
          />
          <input
            id={`${id}-search`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pharmacy, fuel, juice…"
            autoComplete="off"
            className="h-11 w-full border-0 border-b border-map-ink bg-transparent pl-8 text-base outline-none placeholder:text-map-ink-soft focus-visible:border-b-2 focus-visible:border-map-course focus-visible:outline-none"
          />
        </div>
      </div>

      <p role="status" className="mb-6 text-sm text-map-ink-soft">
        Showing <span className="font-medium text-map-ink tabular">{count}</span> of {total}{' '}
        businesses
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-start gap-4 border border-dashed border-map-rule p-8 md:p-12">
          <h2 className="text-h3">Nothing matches that search</h2>
          <p className="max-w-[48ch] text-map-ink-soft">
            Try a shorter word, like &ldquo;fuel&rdquo; or &ldquo;loan&rdquo;, or clear the filters
            to see all {total} businesses.
          </p>
          <Button variant="outline" size="lg" onClick={reset}>
            Clear filters
          </Button>
        </div>
      ) : (
        <LayoutGroup>
          <div className="space-y-16">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((group) => (
                <motion.section
                  key={group.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  aria-labelledby={`${id}-${group.slug}`}
                >
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-map-ink pb-3">
                    <h2 id={`${id}-${group.slug}`} className="text-h3">
                      <Link
                        href={`/businesses/sector/${group.slug}`}
                        className="hover:text-map-course"
                      >
                        {group.name}
                      </Link>
                    </h2>
                    <Link
                      href={`/businesses/sector/${group.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-map-course"
                    >
                      Sector page <span className="sr-only">for {group.name}</span>
                      <ArrowRightIcon
                        aria-hidden
                        weight="light"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout={!reduce}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        {item.card}
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      )}
    </div>
  )
}
