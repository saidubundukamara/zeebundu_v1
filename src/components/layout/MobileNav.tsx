'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog } from 'radix-ui'
import { useState } from 'react'

import { Terrain } from '@/components/map/Terrain'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { NavLink } from './nav'
import { isActive } from './NavLinks'

const EASE = [0.16, 1, 0.3, 1] as const

export function MobileNav({ items, cta }: { items: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const reduce = useReducedMotion()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="relative z-50 -mr-2 inline-flex size-11 items-center justify-center lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={cn(
                'absolute left-0 h-[2px] w-6 bg-map-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                open ? 'top-[5px] rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 h-[2px] w-6 bg-map-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                open ? 'top-[5px] -rotate-45' : 'top-[10px]',
              )}
            />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          className="fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col overflow-y-auto bg-map-ground pt-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Close className="sr-only focus:not-sr-only focus:m-4 focus:self-start focus:font-heading focus:font-bold focus:uppercase">
            Close menu
          </Dialog.Close>
          <Terrain variant="band" className="absolute inset-x-0 bottom-0 h-1/3 opacity-60" />
          <nav aria-label="Mobile" className="relative flex-1 px-4">
            <ul>
              {items.map((item, i) => (
                <motion.li
                  key={item.url}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
                  className="border-b border-map-rule"
                >
                  <Link
                    href={item.url}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, item.url) ? 'page' : undefined}
                    className="flex items-baseline gap-4 py-4 font-heading text-5xl font-extrabold text-map-ink uppercase aria-[current=page]:text-map-course"
                  >
                    <span className="control-num text-lg text-map-course">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + items.length * 0.05, ease: EASE }}
            >
              <Button asChild size="xl" className="mt-8 w-full">
                <Link href={cta.url} onClick={() => setOpen(false)}>
                  {cta.label}
                </Link>
              </Button>
            </motion.div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
