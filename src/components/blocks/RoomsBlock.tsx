import { CheckIcon } from '@phosphor-icons/react/ssr'

import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import type { RoomsBlock as RoomsBlockType } from '@/payload-types'

export function RoomsBlock({ block, tone }: { block: RoomsBlockType; tone: 'default' | 'paper' }) {
  return (
    <Section tone={tone}>
      {block.heading && <SectionHeader title={block.heading} />}
      {block.rooms?.length ? (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {block.rooms.map((room) => (
            <li key={room.id} className="overflow-hidden rounded-lg border border-map-rule bg-card">
              <Media resource={room.image} className="aspect-[4/3]" fallbackLabel={room.name} />
              <div className="space-y-2 p-5">
                <h3 className="font-heading text-h3 text-map-ink">{room.name}</h3>
                {room.description && (
                  <p className="text-sm leading-relaxed text-map-ink-soft">{room.description}</p>
                )}
                <p className="flex justify-between gap-4 border-t border-map-rule pt-3 text-sm">
                  {room.capacity && <span className="text-map-ink-soft">{room.capacity}</span>}
                  {room.rate && <span className="font-medium">From Le {room.rate}</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      {block.amenities?.length ? (
        <div className="mt-12">
          <h3 className="mb-4 font-heading text-h3">Amenities</h3>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {block.amenities.map((a) => (
              <li key={a.id} className="flex gap-3 text-sm">
                <CheckIcon
                  weight="light"
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-map-ink"
                />
                {a.item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  )
}
