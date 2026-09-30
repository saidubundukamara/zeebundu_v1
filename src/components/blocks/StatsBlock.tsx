import { Section } from '@/components/layout/Section'
import { StatsGrid } from '@/components/StatsGrid'
import type { StatsBlock as StatsBlockType } from '@/payload-types'

export function StatsBlock({ block }: { block: StatsBlockType }) {
  if (!block.stats?.length) return null
  return (
    <Section className="border-t border-map-rule">
      {block.heading && <h2 className="mb-10 text-h2">{block.heading}</h2>}
      <StatsGrid stats={block.stats} />
    </Section>
  )
}
