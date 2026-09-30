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

/*
 * One ISOM map symbol per sector, in sector order, so the legend reads like a
 * real map key: man-made object, building, vegetation, water, cliff,
 * special vegetation feature, knoll, open land.
 */
export function SectorSymbol({ index, className }: { index: number; className?: string }) {
  const k = index % 8
  return (
    <svg viewBox="0 0 24 16" className={cn('h-4 w-6 shrink-0', className)} aria-hidden fill="none">
      {k === 0 && (
        <path
          d="M8 3l8 10M16 3 8 13"
          stroke="var(--map-ink)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      {k === 1 && <rect x="5" y="2" width="14" height="12" fill="var(--map-ink)" />}
      {k === 2 && (
        <>
          <rect x="2" y="1.5" width="20" height="13" fill="var(--color-thicket)" opacity="0.45" />
          <path
            d="M5 5h0M10 5h0M15 5h0M20 5h0M7.5 9h0M12.5 9h0M17.5 9h0M5 13h0M10 13h0M15 13h0M20 13h0"
            stroke="var(--color-thicket)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
      {k === 3 && (
        <>
          <rect x="2" y="1.5" width="20" height="13" fill="var(--color-water)" opacity="0.3" />
          <path d="M2 5h20M2 8h20M2 11h20" stroke="var(--color-water)" strokeWidth="1.2" />
        </>
      )}
      {k === 4 && (
        <path
          d="M2 5h20M5 5v5M10 5v5M15 5v5M20 5v5"
          stroke="var(--map-ink)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
      {k === 5 && <circle cx="12" cy="8" r="5" stroke="var(--color-thicket)" strokeWidth="2.2" />}
      {k === 6 && <circle cx="12" cy="8" r="4.5" fill="var(--map-contour)" />}
      {k === 7 && <rect x="2" y="1.5" width="20" height="13" fill="var(--color-open)" />}
    </svg>
  )
}
