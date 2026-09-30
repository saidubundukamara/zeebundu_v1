import Link from 'next/link'

import { Media } from '@/components/Media'
import type { Sector } from '@/payload-types'

export function SectorCard({ sector, count }: { sector: Sector; count: number }) {
  return (
    <Link
      href={`/businesses/sector/${sector.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg text-stone-50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:aspect-[3/4]"
    >
      <Media
        resource={sector.image}
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 25vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
      <div className="relative space-y-1 p-5">
        <h3 className="font-heading text-h3">{sector.name}</h3>
        <p className="text-sm text-stone-300">
          {count} {count === 1 ? 'business' : 'businesses'}
        </p>
      </div>
    </Link>
  )
}
