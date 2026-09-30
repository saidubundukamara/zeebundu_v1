import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import type { ProductListBlock as ProductListBlockType } from '@/payload-types'

export function ProductListBlock({
  block,
  tone,
}: {
  block: ProductListBlockType
  tone: 'default' | 'paper'
}) {
  if (!block.products?.length) return null
  return (
    <Section tone={tone}>
      {block.heading && <SectionHeader title={block.heading} description={block.intro} />}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {block.products.map((p) => (
          <li key={p.id} className="flex gap-4 rounded-lg border border-stone-200 bg-white p-4">
            {p.image && typeof p.image === 'object' && (
              <Media
                resource={p.image}
                size="thumbnail"
                className="size-20 shrink-0 rounded-md"
                sizes="80px"
              />
            )}
            <div className="min-w-0 space-y-1">
              <h3 className="font-medium text-forest-800">{p.name}</h3>
              <p className="text-sm text-stone-600">
                {[p.size, p.pack].filter(Boolean).join(' · ')}
              </p>
              {p.price && <p className="text-sm font-medium tabular-nums">Le {p.price}</p>}
            </div>
          </li>
        ))}
      </ul>
      {block.note && <p className="mt-4 text-sm text-stone-600">{block.note}</p>}
    </Section>
  )
}
