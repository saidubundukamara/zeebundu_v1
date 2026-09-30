import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { impactPillarLabels } from '@/lib/impact'
import type { ImpactProgramme } from '@/payload-types'

export function ImpactCard({ programme }: { programme: ImpactProgramme }) {
  return (
    <Link
      href={`/impact/${programme.slug}`}
      className="group flex h-full flex-col border border-map-rule bg-card transition-colors duration-300 hover:border-map-ink"
    >
      <div className="overflow-hidden">
        <Media
          resource={programme.heroImage}
          className="aspect-[4/3] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          fallbackLabel={impactPillarLabels[programme.pillar]}
          sizes="(min-width: 1024px) 30vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium text-map-course">
          {impactPillarLabels[programme.pillar]}
        </p>
        <h3 className="flex items-start justify-between gap-3 font-heading text-2xl leading-none font-extrabold uppercase">
          {programme.title}
          <ArrowRightIcon
            aria-hidden
            weight="light"
            className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-map-course"
          />
        </h3>
        <p className="text-sm leading-relaxed text-map-ink-soft">{programme.summary}</p>
      </div>
    </Link>
  )
}
