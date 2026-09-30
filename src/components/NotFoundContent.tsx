import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function NotFoundContent() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-6 px-4 py-24 md:py-32">
      <p className="text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">Error 404</p>
      <h1 className="text-h1 text-forest-800">We couldn’t find that page</h1>
      <p className="text-lead text-stone-600">
        It may have moved, or the link may be out of date. Try one of these instead.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="highlight" size="xl">
          <Link href="/">Go to the homepage</Link>
        </Button>
        <Button asChild variant="outline" size="xl">
          <Link href="/businesses">Our businesses</Link>
        </Button>
      </div>
    </div>
  )
}
