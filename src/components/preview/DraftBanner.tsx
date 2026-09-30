'use client'

import { usePathname } from 'next/navigation'

/** Shown only in Draft Mode, so editors never mistake a preview for the live site. */
export function DraftBanner() {
  const pathname = usePathname()
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-4 bg-gold-400 px-4 py-2 text-sm text-forest-900"
    >
      <span className="font-medium">Preview: you are viewing unpublished drafts.</span>
      <a
        href={`/next/exit-preview?path=${encodeURIComponent(pathname)}`}
        className="underline underline-offset-4"
      >
        Exit preview
      </a>
    </div>
  )
}
