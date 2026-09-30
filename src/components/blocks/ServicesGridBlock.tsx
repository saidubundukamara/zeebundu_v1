import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import type { ServicesGridBlock as ServicesGridBlockType } from '@/payload-types'

export function ServicesGridBlock({
  block,
  tone,
}: {
  block: ServicesGridBlockType
  tone: 'default' | 'paper'
}) {
  return (
    <Section tone={tone}>
      {block.heading && <SectionHeader title={block.heading} description={block.intro} />}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {block.items?.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-lg border border-stone-200 bg-white">
            {item.image && typeof item.image === 'object' && (
              <Media resource={item.image} className="aspect-[16/10]" />
            )}
            <div className="space-y-2 p-5">
              <h3 className="font-heading text-h3 text-forest-800">{item.title}</h3>
              {item.description && (
                <p className="text-sm leading-relaxed text-stone-600">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
