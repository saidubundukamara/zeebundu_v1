import Link from 'next/link'

import { Media } from '@/components/Media'
import type { ImpactProgramme } from '@/payload-types'

import { impactPillarLabels } from '@/lib/impact'

export function ImpactCard({ programme }: { programme: ImpactProgramme }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Media
        resource={programme.heroImage}
        className="aspect-[16/10]"
        fallbackLabel={impactPillarLabels[programme.pillar]}
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">
          {impactPillarLabels[programme.pillar]}
        </p>
        <h3 className="font-heading text-h3 text-forest-800">
          <Link
            href={`/impact/${programme.slug}`}
            className="group-hover:underline after:absolute after:inset-0"
          >
            {programme.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-stone-600">{programme.summary}</p>
      </div>
    </article>
  )
}
