import type { Media as MediaDoc } from '@/payload-types'

import { Media } from './Media'

/** Simple responsive image grid; the first image spans two columns on larger screens. */
export function Gallery({ images }: { images?: (number | MediaDoc)[] | null }) {
  const docs = (images ?? []).filter((img): img is MediaDoc => typeof img === 'object')
  if (!docs.length) return null
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {docs.map((img, i) => (
        <li key={img.id} className={i === 0 ? 'col-span-2 row-span-2' : undefined}>
          <figure className="h-full">
            <Media
              resource={img}
              className="aspect-square h-full rounded-md"
              sizes={i === 0 ? '50vw' : '25vw'}
            />
            {img.caption && (
              <figcaption className="mt-2 text-xs text-map-ink-soft">{img.caption}</figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  )
}
