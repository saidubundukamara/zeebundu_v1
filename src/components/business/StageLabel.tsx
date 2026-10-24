import type { Business } from '@/payload-types'
import { cn } from '@/lib/utils'

/** "In development" marker. A dashed ring, as maps draw planned features. Renders nothing for operating businesses. */
export function StageLabel({
  stage,
  className,
}: {
  stage?: Business['stage']
  className?: string
}) {
  if (stage !== 'in-development') return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-medium text-map-ink-soft',
        className,
      )}
    >
      <span aria-hidden className="size-2.5 rounded-full border border-dashed border-map-ink" />
      In development
    </span>
  )
}
