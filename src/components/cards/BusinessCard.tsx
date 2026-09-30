import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import { ViewTransition } from 'react'

import { ControlMark } from '@/components/map/symbols'
import { Media } from '@/components/Media'
import { populated } from '@/lib/data'
import type { Business } from '@/payload-types'

/** A business as a control-description card: photo, control number, name, one line of detail. */
export function BusinessCard({
  business,
  code,
  showSector = false,
}: {
  business: Business
  code?: string
  showSector?: boolean
}) {
  const sector = populated(business.sector)
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className="group flex h-full flex-col border border-map-rule bg-card transition-colors duration-300 hover:border-map-ink"
    >
      <div className="overflow-hidden">
        <Media
          resource={business.heroImage}
          className="aspect-[4/3] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          fallbackLabel={business.name}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex items-center gap-4 border-b border-map-rule px-5 py-4">
        {code && (
          <ViewTransition name={`control-${business.slug}`} share="morph" default="none">
            <ControlMark
              code={code}
              className="transition-colors duration-300 group-hover:bg-map-course group-hover:text-primary-foreground"
            />
          </ViewTransition>
        )}
        <h3 className="min-w-0 flex-1 font-heading text-2xl leading-none font-extrabold uppercase">
          {business.name}
        </h3>
        <ArrowRightIcon
          aria-hidden
          weight="light"
          className="size-6 shrink-0 text-map-ink-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:text-map-course"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 py-4">
        {showSector && sector && <p className="text-xs font-medium text-map-ink">{sector.name}</p>}
        <p className="text-sm leading-relaxed text-map-ink-soft">{business.summary}</p>
      </div>
    </Link>
  )
}
