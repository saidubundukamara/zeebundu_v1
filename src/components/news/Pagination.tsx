import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

/** Prev / next links; `hrefFor` builds the URL for a page number. */
export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number
  totalPages: number
  hrefFor: (page: number) => string
}) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-4">
      {page > 1 ? (
        <Button asChild variant="outline" size="lg">
          <Link href={hrefFor(page - 1)} rel="prev">
            <ArrowLeftIcon weight="light" data-icon="inline-start" /> Newer
          </Link>
        </Button>
      ) : (
        <span />
      )}
      <p className="text-sm text-map-ink-soft">
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Button asChild variant="outline" size="lg">
          <Link href={hrefFor(page + 1)} rel="next">
            Older <ArrowRightIcon weight="light" data-icon="inline-end" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  )
}
