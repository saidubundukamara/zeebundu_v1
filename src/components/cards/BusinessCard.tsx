import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { populated } from '@/lib/data'
import type { Business } from '@/payload-types'

export function BusinessCard({
  business,
  showSector = false,
}: {
  business: Business
  showSector?: boolean
}) {
  const sector = populated(business.sector)
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <Media
        resource={business.heroImage}
        className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
        fallbackLabel={business.name}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        {showSector && sector && (
          <p className="text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">
            {sector.name}
          </p>
        )}
        <h3 className="flex items-start justify-between gap-3 font-heading text-h3 text-forest-800">
          {business.name}
          <ArrowUpRightIcon
            aria-hidden
            className="mt-1 size-5 shrink-0 text-stone-400 transition-colors group-hover:text-forest-700"
          />
        </h3>
        <p className="text-sm leading-relaxed text-stone-600">{business.summary}</p>
      </div>
    </Link>
  )
}
