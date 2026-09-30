import { ArrowUpRightIcon } from 'lucide-react'

import { Media } from '@/components/Media'
import { populated } from '@/lib/data'
import { isExternal } from '@/lib/links'
import type { ImpactProgramme } from '@/payload-types'

type Partner = NonNullable<ImpactProgramme['partners']>[number]

/** Programme partners: logo if uploaded, otherwise the name; linked when a website is set. */
export function PartnerList({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      {partners.map((partner) => {
        const logo = populated(partner.logo)
        const href = partner.url
          ? isExternal(partner.url)
            ? partner.url
            : `https://${partner.url}`
          : null
        const content = (
          <>
            {logo?.url && (
              <Media
                resource={logo}
                size="thumbnail"
                className="size-12 shrink-0 rounded-md bg-stone-100 [&_img]:object-contain!"
                sizes="48px"
              />
            )}
            <span className="flex-1 font-medium text-stone-900">{partner.name}</span>
            {href && (
              <ArrowUpRightIcon
                aria-hidden
                className="size-4 shrink-0 text-stone-400 group-hover:text-forest-700"
              />
            )}
          </>
        )
        const base = 'flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-3'
        return (
          <li key={partner.id ?? partner.name}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${base} transition-colors hover:border-forest-700 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none`}
              >
                {content}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <div className={base}>{content}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
