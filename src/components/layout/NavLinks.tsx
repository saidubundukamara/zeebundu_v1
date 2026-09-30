'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import type { NavLink } from './nav'

export const isActive = (pathname: string, url: string) =>
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
              'relative py-2 font-heading text-lg font-bold tracking-[0.03em] text-map-ink-soft uppercase transition-colors duration-200 hover:text-map-ink',
              'after:absolute after:inset-x-0 after:bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-map-course after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)]',
              'hover:after:scale-x-100 aria-[current=page]:text-map-ink aria-[current=page]:after:scale-x-100',
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
