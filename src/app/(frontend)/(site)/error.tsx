'use client' // Error boundaries must be Client Components

import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { reportError } from '@/lib/monitoring/report-error'

/** Branded fallback for unexpected errors inside the site (header and footer stay in place). */
export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
    reportError(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-6 px-4 py-24 md:py-32">
      <title>Something went wrong | Zeebundu Group</title>
      <p className="text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">Error</p>
      <h1 className="text-h1 text-forest-800">Something went wrong</h1>
      <p className="text-lead text-stone-600">
        Sorry — this page didn’t load properly. Please try again, or head back to the homepage.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="highlight" size="xl" onClick={() => retry()}>
          Try again
        </Button>
        <Button asChild variant="outline" size="xl">
          <Link href="/">Go to the homepage</Link>
        </Button>
      </div>
      {error.digest && (
        <p className="text-sm text-stone-600">
          Reference: <code className="font-mono">{error.digest}</code>
        </p>
      )}
    </div>
  )
}
