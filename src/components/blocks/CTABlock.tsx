import { Section } from '@/components/layout/Section'
import type { CTABlock as CTABlockType } from '@/payload-types'

import { CMSLink } from './CMSLink'

export function CTABlock({ block }: { block: CTABlockType }) {
  const dark = block.style !== 'light'
  return (
    <Section tone={dark ? 'dark' : 'paper'}>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-h2">{block.heading}</h2>
          {block.text && (
            <p className={dark ? 'text-lead text-stone-300' : 'text-lead text-stone-600'}>
              {block.text}
            </p>
          )}
        </div>
        <CMSLink link={block.link} variant={dark ? 'highlight' : 'default'} />
      </div>
    </Section>
  )
}
