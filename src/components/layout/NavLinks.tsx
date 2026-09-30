'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import type { NavLink } from './nav'

const isActive = (pathname: string, url: string) =>
  url === '/' ? pathname === '/' : pathname === url || pathname.startsWith(`${url}/`)

export function NavLinks({ items, className }: { items: NavLink[]; className?: string }) {
  const pathname = usePathname()
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.url}>
          <Link
            href={item.url}
            aria-current={isActive(pathname, item.url) ? 'page' : undefined}
            className={cn(
              'relative py-2 text-sm font-medium text-stone-700 transition-colors hover:text-forest-800',
              'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:bg-gold-400 after:transition-transform',
              'aria-[current=page]:text-forest-800 aria-[current=page]:after:scale-x-100',
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
