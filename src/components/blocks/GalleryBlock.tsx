import { Section, SectionHeader } from '@/components/layout/Section'
import { Gallery } from '@/components/Gallery'
import type { GalleryBlock as GalleryBlockType } from '@/payload-types'

export function GalleryBlock({
  block,
  tone,
}: {
  block: GalleryBlockType
  tone: 'default' | 'paper'
}) {
  return (
    <Section tone={tone}>
      {block.heading && <SectionHeader title={block.heading} />}
      <Gallery images={block.images} />
    </Section>
  )
}
