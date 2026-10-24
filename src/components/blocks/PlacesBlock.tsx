import { Section, SectionHeader } from '@/components/layout/Section'
import type { PlacesBlock as PlacesBlockType } from '@/payload-types'

const kindLabels: Record<NonNullable<PlacesBlockType['items']>[number]['kind'], string> = {
  office: 'Office',
  operating: 'Operating',
  agriculture: 'Agriculture',
  'in-development': 'In development',
}

export function PlacesBlock({
  block,
  tone,
}: {
  block: PlacesBlockType
  tone: 'default' | 'paper'
}) {
  if (!block.items?.length) return null
  return (
    <Section tone={tone}>
      {block.heading && <SectionHeader title={block.heading} description={block.intro} />}
      <ul className="divide-y divide-map-rule border-y border-map-rule">
        {block.items.map((item) => (
          <li
            key={item.id ?? item.place}
            className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] md:items-baseline md:gap-8"
          >
            <h3 className="font-heading text-2xl leading-none font-extrabold uppercase">
              {item.place}
            </h3>
            <p className="text-sm leading-relaxed text-map-ink-soft">{item.description}</p>
            <p className="text-xs font-medium text-map-ink-soft md:text-right">
              {kindLabels[item.kind]}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
