'use client'

import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import type { NavLink } from './nav'

export function MobileNav({ items, cta }: { items: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="md:hidden" aria-label="Open menu">
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm bg-stone-50">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg tracking-[0.12em] text-forest-800">
            ZEEBUNDU
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-4">
          <ul className="divide-y divide-stone-200 border-y border-stone-200">
            {items.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  onClick={() => setOpen(false)}
                  aria-current={pathname.startsWith(item.url) ? 'page' : undefined}
                  className="block py-4 font-heading text-xl text-forest-800 aria-[current=page]:text-gold-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="highlight" size="xl" className="mt-6 w-full">
            <Link href={cta.url} onClick={() => setOpen(false)}>
              {cta.label}
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
