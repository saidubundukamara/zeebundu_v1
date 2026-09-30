import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Terrain } from '@/components/map/Terrain'
import { Button } from '@/components/ui/button'

/** 404: a control that isn't on the course. */
export function NotFoundContent() {
  return (
    <section className="relative overflow-hidden">
      <Terrain variant="hero" className="absolute inset-0 terrain-fade-left opacity-80" />
      <Container className="relative grid min-h-[70vh] items-center gap-12 py-20 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm font-medium text-map-ink-soft">Error 404</p>
          <h1 className="text-h1">This page isn&rsquo;t on the map</h1>
          <p className="max-w-[46ch] bg-map-ground/80 text-lead text-map-ink-soft">
            The link may be old, or the page may have moved. Start again from the homepage, or go
            straight to the businesses.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="xl">
              <Link href="/businesses">See all businesses</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-map-ground">
              <Link href="/">Homepage</Link>
            </Button>
          </div>
        </div>
        <div aria-hidden className="hidden justify-center md:flex">
          <span className="flex size-56 items-center justify-center rounded-full border-4 border-dashed border-map-course bg-map-ground/60">
            <span className="control-num text-8xl text-map-course">?</span>
          </span>
        </div>
      </Container>
    </section>
  )
}
