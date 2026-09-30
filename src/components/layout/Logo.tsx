import Link from 'next/link'

import { cn } from '@/lib/utils'

/** Interim wordmark until a logo lockup is supplied (see content/brand/BRAND.md). */
export function Logo({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <Link
      href="/"
      className={cn(
        'font-heading text-xl font-semibold tracking-[0.12em]',
        tone === 'dark' ? 'text-forest-800' : 'text-stone-50',
        className,
      )}
    >
      ZEEBUNDU
      <span className="sr-only"> Group — home</span>
    </Link>
  )
}
