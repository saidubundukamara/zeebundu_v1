import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import { Media } from '@/components/Media'
import type { Sector } from '@/payload-types'

export function SectorCard({
  sector,
  count,
  codes,
}: {
  sector: Sector
  count: number
  codes?: string[]
}) {
  return (
    <Link href={`/businesses/sector/${sector.slug}`} className="group block">
      <div className="overflow-hidden">
        <Media
          resource={sector.image}
          className="aspect-[4/5] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          fallbackLabel={sector.name}
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 border-b border-map-ink pb-3">
        <div>
          <h3 className="font-heading text-2xl leading-none font-extrabold uppercase group-hover:text-map-course">
            {sector.name}
          </h3>
          <p className="mt-1.5 text-sm text-map-ink-soft">
            {count} {count === 1 ? 'business' : 'businesses'}
            {codes?.length ? (
              <span className="ml-2 control-num text-base text-map-course">{codes.join(' ')}</span>
            ) : null}
          </p>
        </div>
        <ArrowRightIcon
          aria-hidden
          weight="light"
          className="mt-0.5 size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  )
}
