import { cn } from '@/lib/utils'

type Variant = 'hero' | 'band' | 'tile'

/**
 * Generated orienteering terrain (scripts/generate-terrain.mjs). Decorative.
 * Both versions are in the markup; the header toggle decides which one shows
 * (the hidden image is display:none, so the browser skips it until needed).
 */
export function Terrain({
  variant = 'band',
  className,
  priority,
}: {
  variant?: Variant
  className?: string
  priority?: boolean
}) {
  const img = 'size-full object-cover'
  return (
    <div className={cn('pointer-events-none select-none', className)} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
      <img
        src={`/terrain/${variant}-light.svg`}
        alt=""
        className={cn(img, 'dark:hidden')}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
      <img
        src={`/terrain/${variant}-dark.svg`}
        alt=""
        className={cn(img, 'hidden dark:block')}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
