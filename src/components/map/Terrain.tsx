import { cn } from '@/lib/utils'

type Variant = 'hero' | 'band' | 'tile'

/**
 * Generated orienteering terrain (scripts/generate-terrain.mjs). Decorative.
 * Swaps to the night-map version in dark mode.
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
  return (
    <div className={cn('pointer-events-none select-none', className)} aria-hidden>
      <picture className="block size-full">
        <source srcSet={`/terrain/${variant}-dark.svg`} media="(prefers-color-scheme: dark)" />
        <img
          src={`/terrain/${variant}-light.svg`}
          alt=""
          className="size-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </picture>
    </div>
  )
}
