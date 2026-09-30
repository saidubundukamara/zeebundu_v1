'use client'

import { ArrowRightIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useState, ViewTransition } from 'react'

import { ControlMark } from '@/components/map/symbols'
import { cn } from '@/lib/utils'

export type IndexRow = {
  code: string
  slug: string
  name: string
  sectorName: string
  summary: string
}

/**
 * Every business as a row of the control-description sheet. On wide screens,
 * hovering or focusing a row develops that business's photo in the fixed frame.
 * `frames` are server-rendered <Media> elements, one per row, in the same order.
 */
export function ControlIndex({
  rows,
  frames,
  className,
}: {
  rows: IndexRow[]
  frames: React.ReactNode[]
  className?: string
}) {
  const [{ active, previous }, setState] = useState({ active: 0, previous: 0 })
  const setActive = (i: number) =>
    setState((s) => (s.active === i ? s : { active: i, previous: s.active }))
  const reduce = useReducedMotion()

  return (
    <div className={cn('grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]', className)}>
      <ol className="border-t border-map-ink">
        {rows.map((row, i) => (
          <li key={row.slug}>
            <Link
              href={`/businesses/${row.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-1 border-b border-map-rule py-4 transition-colors md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:py-5"
            >
              <ViewTransition name={`control-${row.slug}`} share="morph" default="none">
                <ControlMark
                  code={row.code}
                  className={cn(
                    'transition-colors duration-300',
                    active === i && 'lg:bg-map-course lg:text-primary-foreground',
                    'group-hover:bg-map-course group-hover:text-primary-foreground',
                  )}
                />
              </ViewTransition>
              <span className="min-w-0">
                <span className="block font-heading text-2xl leading-none font-extrabold uppercase md:text-3xl">
                  {row.name}
                </span>
                <span className="mt-1 block text-sm text-map-ink-soft md:hidden">
                  {row.sectorName}
                </span>
              </span>
              <span className="hidden min-w-0 text-sm text-map-ink-soft md:block">
                <span className="block font-medium text-map-ink">{row.sectorName}</span>
                <span className="line-clamp-1">{row.summary}</span>
              </span>
              <ArrowRightIcon
                aria-hidden
                weight="light"
                className="size-6 text-map-ink-soft transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-map-course"
              />
            </Link>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[4/5] overflow-hidden border border-map-rule">
            {frames.map((frame, i) => {
              const shown = i === active || i === previous
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{ zIndex: i === active ? 2 : i === previous ? 1 : 0 }}
                  initial={false}
                  animate={{ clipPath: shown ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
                  transition={
                    i === active && !reduce
                      ? { duration: 0.7, ease: [0.32, 0.72, 0, 1] }
                      : { duration: 0 }
                  }
                >
                  {frame}
                </motion.div>
              )
            })}
          </div>
          <p className="mt-4 flex items-baseline justify-between gap-4 border-b border-map-ink pb-3">
            <span className="font-heading text-2xl font-extrabold uppercase">
              {rows[active]?.name}
            </span>
            <span className="control-num text-2xl text-map-course">{rows[active]?.code}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-map-ink-soft">{rows[active]?.summary}</p>
        </div>
      </div>
    </div>
  )
}
