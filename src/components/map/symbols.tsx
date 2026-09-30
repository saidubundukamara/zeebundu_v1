import { cn } from '@/lib/utils'

/*
 * ISOM course symbols: control circle, start triangle, finish double circle.
 * Drawn in the course colour with the map's own line weight.
 */

export function ControlMark({
  code,
  className,
  size = 'md',
}: {
  code: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full border-map-course text-map-course',
        size === 'sm' && 'size-8 border-[1.5px] text-sm',
        size === 'md' && 'size-11 border-2 text-lg',
        size === 'lg' && 'size-20 border-[3px] text-3xl md:size-24 md:text-4xl',
        className,
      )}
    >
      <span className="control-num">{code}</span>
    </span>
  )
}

export function StartMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={cn('size-4', className)} aria-hidden fill="none">
      <path
        d="M12 2 22.4 20H1.6Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FinishMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} aria-hidden fill="none">
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
