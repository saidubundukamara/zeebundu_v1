import Link from 'next/link'

import { StartMark } from '@/components/map/symbols'
import { cn } from '@/lib/utils'

/**
 * Interim wordmark until the client supplies a logo (see PRODUCT.md).
 * The start triangle is the orienteering "you begin here" symbol.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2 font-heading text-2xl leading-none font-extrabold tracking-[0.02em] text-map-ink uppercase',
        className,
      )}
    >
      <StartMark className="size-5 text-map-course transition-transform duration-500 ease-out group-hover:rotate-[120deg]" />
      Zeebundu
      <span className="sr-only"> Group, home</span>
    </Link>
  )
}
