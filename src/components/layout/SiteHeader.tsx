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
    <header className="sticky top-0 z-40 border-b border-map-rule bg-map-ground/90 backdrop-blur-md supports-[backdrop-filter]:bg-map-ground/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-map-course focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks items={items} className="flex items-center gap-8" />
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <Link href={cta.url}>{cta.label}</Link>
          </Button>
          <MobileNav items={items} cta={cta} />
        </div>
      </Container>
    </header>
  )
}
