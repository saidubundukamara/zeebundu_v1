import { Section } from '@/components/layout/Section'
import { RichText } from '@/components/RichText'
import type { RichTextBlock as RichTextBlockType } from '@/payload-types'

export function RichTextBlock({
  block,
  tone,
}: {
  block: RichTextBlockType
  tone: 'default' | 'paper'
}) {
  return (
    <Section tone={tone} containerClassName="max-w-3xl">
      <RichText data={block.content} />
    </Section>
  )
}
