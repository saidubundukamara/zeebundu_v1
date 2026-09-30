import Link from 'next/link'

import { Container } from './Container'
import { Eyebrow } from './Section'

export type Crumb = { label: string; href?: string }

/** Title band for inner pages, with breadcrumbs. */
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
    <header className="border-b border-stone-200 bg-stone-100 py-12 md:py-16">
      <Container className="space-y-4">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone-600">
              {[{ label: 'Home', href: '/' }, ...crumbs].map((crumb, i, all) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.href && i < all.length - 1 ? (
                    <Link href={crumb.href} className="hover:text-forest-800 hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                  {i < all.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-3xl text-h1 text-forest-800">{title}</h1>
        {description && <p className="max-w-2xl text-lead text-stone-600">{description}</p>}
        {children}
      </Container>
    </header>
  )
}
