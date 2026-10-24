import type { Header } from '@/payload-types'

export type NavLink = { label: string; url: string }

const fallbackNav: NavLink[] = [
  { label: 'About Us', url: '/about' },
  { label: 'Our Businesses', url: '/businesses' },
  { label: 'Projects and Locations', url: '/projects' },
  { label: 'Community', url: '/community' },
  { label: 'News', url: '/news' },
  { label: 'Careers', url: '/careers' },
]

export const navFromHeader = (header: Header | null) => {
  const items = (header?.navItems ?? [])
    .map(({ link }) => link)
    .filter((l): l is NavLink => Boolean(l?.label && l?.url))
  const cta =
    header?.cta?.label && header.cta.url
      ? { label: header.cta.label, url: header.cta.url }
      : { label: 'Contact', url: '/contact' }
  return { items: items.length ? items : fallbackNav, cta }
}
