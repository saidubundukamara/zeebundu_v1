import { Section } from '@/components/layout/Section'
import { FinishMark } from '@/components/map/symbols'
import { Reveal } from '@/components/motion/Reveal'
import type { CTABlock as CTABlockType } from '@/payload-types'

import { CMSLink } from './CMSLink'

/** "dark" renders the course-purple finish field; "light" stays on the ground with a hairline. */
export function CTABlock({ block }: { block: CTABlockType }) {
  const dark = block.style !== 'light'
  return (
    <Section
      tone={dark ? 'dark' : 'default'}
      className={dark ? undefined : 'border-t border-map-ink'}
    >
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <Reveal className="max-w-3xl space-y-5">
          {dark && <FinishMark className="size-10" />}
          <h2 className="text-h2">{block.heading}</h2>
          {block.text && (
            <p
              className={
                dark
                  ? 'max-w-[52ch] text-lead text-primary-foreground/85'
                  : 'max-w-[52ch] text-lead text-map-ink-soft'
              }
            >
              {block.text}
            </p>
          )}
        </Reveal>
        <CMSLink
          link={block.link}
          variant={dark ? 'outline' : 'default'}
          className={
            dark
              ? 'border-primary-foreground bg-primary-foreground text-map-course hover:bg-transparent hover:text-primary-foreground'
              : undefined
          }
        />
      </div>
    </Section>
  )
}
