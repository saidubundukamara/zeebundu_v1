import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react/ssr'

import type { SiteSetting } from '@/payload-types'

const networks = {
  facebook: { label: 'Facebook', Icon: FacebookLogoIcon },
  instagram: { label: 'Instagram', Icon: InstagramLogoIcon },
  linkedin: { label: 'LinkedIn', Icon: LinkedinLogoIcon },
  tiktok: { label: 'TikTok', Icon: TiktokLogoIcon },
  x: { label: 'X', Icon: XLogoIcon },
  youtube: { label: 'YouTube', Icon: YoutubeLogoIcon },
} as const

export function Socials({ socials }: { socials?: SiteSetting['socials'] }) {
  const links = Object.entries(socials ?? {}).filter(
    (entry): entry is [keyof typeof networks, string] =>
      entry[0] in networks && typeof entry[1] === 'string' && Boolean(entry[1]),
  )
  if (!links.length) return null
  return (
    <ul className="flex flex-wrap gap-1">
      {links.map(([key, url]) => {
        const { label, Icon } = networks[key]
        return (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-sm text-map-ink-soft transition-colors hover:bg-map-course-soft hover:text-map-course"
            >
              <Icon weight="light" className="size-5" aria-hidden />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
