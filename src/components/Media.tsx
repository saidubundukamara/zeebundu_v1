import Image from 'next/image'

import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/lib/utils'

type Size = 'thumbnail' | 'card' | 'hero'

/**
 * Renders a CMS image, or a branded placeholder when none has been uploaded yet
 * (most content launches before photography is ready).
 */
export function Media({
  resource,
  size = 'card',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority,
  className,
  fallbackLabel,
}: {
  resource?: number | MediaDoc | null
  size?: Size
  sizes?: string
  priority?: boolean
  className?: string
  fallbackLabel?: string
}) {
  const doc = resource && typeof resource === 'object' ? resource : null
  const variant = doc?.sizes?.[size]
  const url = variant?.url ?? doc?.url

  if (!doc || !url) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-forest-700 text-forest-200',
          'bg-[radial-gradient(circle_at_20%_20%,var(--color-forest-600),transparent_55%),radial-gradient(circle_at_80%_90%,var(--color-forest-900),transparent_60%)]',
          className,
        )}
        aria-hidden={!fallbackLabel}
      >
        {fallbackLabel && (
          <span className="px-4 text-center font-heading text-lg text-forest-100/80">
            {fallbackLabel}
          </span>
        )}
      </div>
    )
  }

  const focal =
    doc.focalX != null && doc.focalY != null ? `${doc.focalX}% ${doc.focalY}%` : undefined

  return (
    <div className={cn('relative overflow-hidden bg-stone-200', className)}>
      <Image
        src={url}
        alt={doc.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={focal ? { objectPosition: focal } : undefined}
      />
    </div>
  )
}
