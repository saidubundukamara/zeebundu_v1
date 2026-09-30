import Image from 'next/image'

import type { Media as MediaDoc } from '@/payload-types'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { Terrain } from '@/components/map/Terrain'
import { isCloudinaryURL } from '@/lib/storage/is-cloudinary'
import { cn } from '@/lib/utils'

type Size = 'thumbnail' | 'card' | 'hero'

/**
 * Payload prefixes upload URLs with `serverURL`. Serve our own uploads by path so next/image
 * treats them as local (allowed by `images.localPatterns`); leave other hosts untouched.
 */
const toImageSrc = (url: string) => {
  if (url.startsWith('/')) return url
  try {
    const { pathname, search } = new URL(url)
    return pathname.startsWith('/api/media/') ? pathname + search : url
  } catch {
    return url
  }
}

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
    // No photo yet: show a patch of map terrain so empty slots still belong to the page.
    return (
      <div
        className={cn('relative flex items-end overflow-hidden bg-map-ground', className)}
        aria-hidden={!fallbackLabel}
      >
        <Terrain variant="tile" className="absolute inset-0 opacity-70" />
        {fallbackLabel && (
          <span className="relative m-4 bg-map-ground px-2 py-1 font-heading text-sm font-bold tracking-[0.04em] text-map-ink uppercase">
            {fallbackLabel}
          </span>
        )}
      </div>
    )
  }

  const focal =
    doc.focalX != null && doc.focalY != null ? `${doc.focalX}% ${doc.focalY}%` : undefined

  // Cloudinary resizes on its CDN, so start from the original rather than a pre-cut size.
  if (doc.url && isCloudinaryURL(doc.url)) {
    return (
      <div className={cn('relative overflow-hidden bg-muted', className)}>
        <CloudinaryImage
          src={doc.url}
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

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      <Image
        src={toImageSrc(url)}
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
