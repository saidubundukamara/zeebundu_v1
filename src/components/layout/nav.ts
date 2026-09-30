import type { Header } from '@/payload-types'

export type NavLink = { label: string; url: string }

const fallbackNav: NavLink[] = [
  { label: 'About', url: '/about' },
  { label: 'Our Businesses', url: '/businesses' },
  { label: 'Impact', url: '/impact' },
  { label: 'Newsroom', url: '/news' },
  { label: 'Contact', url: '/contact' },
]

export const navFromHeader = (header: Header | null) => {
  const items = (header?.navItems ?? [])
    .map(({ link }) => link)
    .filter((l): l is NavLink => Boolean(l?.label && l?.url))
  const cta =
    header?.cta?.label && header.cta.url
      ? { label: header.cta.label, url: header.cta.url }
      : { label: 'Send an enquiry', url: '/contact' }
  return { items: items.length ? items : fallbackNav, cta }
}
