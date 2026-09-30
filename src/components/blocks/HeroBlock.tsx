import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import type { HeroBlock as HeroBlockType } from '@/payload-types'

import { CMSLink } from './CMSLink'

export function HeroBlock({ block }: { block: HeroBlockType }) {
  const hasImage = Boolean(block.image && typeof block.image === 'object')
  return (
    <section data-tone="dark" className="group/section bg-forest-800 text-stone-50">
      <Container
        className={
          hasImage ? 'grid items-center gap-10 py-16 md:grid-cols-2 md:py-24' : 'py-16 md:py-24'
        }
      >
        <div className="max-w-2xl space-y-6">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h1 className="text-display">{block.heading}</h1>
          {block.subheading && <p className="text-lead text-stone-300">{block.subheading}</p>}
          <CMSLink link={block.cta} />
        </div>
        {hasImage && (
          <Media
            resource={block.image}
            size="hero"
            priority
            className="aspect-[4/3] rounded-lg"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        )}
      </Container>
    </section>
  )
}
