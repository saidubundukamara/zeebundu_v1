import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wireframes',
  robots: { index: false, follow: false },
}

const pages = [
  { href: '/wireframes', label: 'Brand sheet' },
  { href: '/wireframes/home', label: 'Home' },
  { href: '/wireframes/businesses', label: 'Businesses' },
  { href: '/wireframes/business', label: 'Business detail' },
]

export default function WireframesLayout({ children }: LayoutProps<'/wireframes'>) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-ink text-stone-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 text-xs md:px-6">
          <span className="font-medium tracking-wide text-gold-300 uppercase">
            Low-fi wireframe · not final
          </span>
          <nav className="flex flex-wrap gap-3" aria-label="Wireframes">
            {pages.map((p) => (
              <Link key={p.href} href={p.href} className="underline-offset-4 hover:underline">
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </>
  )
}
