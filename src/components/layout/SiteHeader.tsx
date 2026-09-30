import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getGlobal } from '@/lib/data'

import { Container } from './Container'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { navFromHeader } from './nav'
import { NavLinks } from './NavLinks'

export async function SiteHeader() {
  const { items, cta } = navFromHeader(await getGlobal('header', 0))

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/95 backdrop-blur supports-[backdrop-filter]:bg-stone-50/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-forest-800 focus:px-3 focus:py-2 focus:text-stone-50"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6 md:h-18">
        <Logo />
        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={items} className="flex items-center gap-7" />
        </nav>
        <div className="flex items-center gap-1">
          <Button asChild variant="highlight" size="lg" className="hidden sm:inline-flex">
            <Link href={cta.url}>{cta.label}</Link>
          </Button>
          <MobileNav items={items} cta={cta} />
        </div>
      </Container>
    </header>
  )
}
