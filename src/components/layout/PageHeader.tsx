import Link from 'next/link'

import { Terrain } from '@/components/map/Terrain'
import { Lines, splitHeadline } from '@/components/motion/Lines'

import { Container } from './Container'

export type Crumb = { label: string; href?: string }

/** Title band for inner pages: condensed title on the white ground, terrain easing in from the right. */
export function PageHeader({
  title,
  description,
  crumbs = [],
  eyebrow,
  children,
}: {
  title: string
  description?: string | null
  crumbs?: Crumb[]
  eyebrow?: string
  children?: React.ReactNode
}) {
  return (
    <header className="relative overflow-hidden border-b border-map-rule">
      <Terrain
        variant="band"
        priority
        className="absolute inset-y-0 right-0 w-full terrain-fade-left opacity-80 md:w-3/4"
      />
      <Container className="relative space-y-6 pt-10 pb-14 md:pt-14 md:pb-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-map-ink-soft">
              {[{ label: 'Home', href: '/' }, ...crumbs].map((crumb, i, all) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href && i < all.length - 1 ? (
                    <Link href={crumb.href} className="hover:text-map-course hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-map-ink">
                      {crumb.label}
                    </span>
                  )}
                  {i < all.length - 1 && <span aria-hidden className="h-px w-4 bg-map-course" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="text-sm font-medium text-map-ink-soft">{eyebrow}</p>}
        <h1 className="max-w-5xl text-h1 text-map-ink">
          <Lines lines={splitHeadline(title, 22)} />
        </h1>
        {description && (
          <p className="max-w-[58ch] bg-map-ground/70 text-lead text-map-ink-soft">{description}</p>
        )}
        {children}
      </Container>
    </header>
  )
}
