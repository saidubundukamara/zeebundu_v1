import { Container } from '@/components/layout/Container'
import { Terrain } from '@/components/map/Terrain'
import { Media } from '@/components/Media'
import { Lines, splitHeadline } from '@/components/motion/Lines'
import type { HeroBlock as HeroBlockType } from '@/payload-types'

import { CMSLink } from './CMSLink'

export function HeroBlock({ block }: { block: HeroBlockType }) {
  const hasImage = Boolean(block.image && typeof block.image === 'object')
  return (
    <section className="relative overflow-hidden border-b border-map-rule">
      {!hasImage && (
        <Terrain
          variant="band"
          priority
          className="absolute inset-0 terrain-fade-left opacity-80"
        />
      )}
      <Container
        className={
          hasImage
            ? 'relative grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14'
            : 'relative py-14 md:py-24'
        }
      >
        <div className="max-w-3xl space-y-6">
          {block.eyebrow && (
            <p className="text-sm font-medium text-map-ink-soft">
              {block.eyebrow}
            </p>
          )}
          <h1 className="text-h1 lg:text-[clamp(3.5rem,2rem+3.6vw,6rem)]">
            <Lines lines={splitHeadline(block.heading, 18)} />
          </h1>
          {block.subheading && (
            <p className="max-w-[50ch] text-lead text-map-ink-soft">{block.subheading}</p>
          )}
          <CMSLink link={block.cta} />
        </div>
        {hasImage && (
          <div className="aspect-[4/3] develop-in">
            <Media
              resource={block.image}
              size="hero"
              priority
              className="size-full"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
        )}
      </Container>
    </section>
  )
}
