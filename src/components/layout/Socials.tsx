import type { SiteSetting } from '@/payload-types'

const labels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  x: 'X',
  youtube: 'YouTube',
}

/** Text links to social profiles (icons can replace these once brand assets exist). */
export function Socials({ socials }: { socials?: SiteSetting['socials'] }) {
  const links = Object.entries(socials ?? {}).filter((entry): entry is [string, string] =>
    Boolean(labels[entry[0]] && entry[1]),
  )
  if (!links.length) return null
  return (
    <ul className="flex flex-wrap gap-4 text-sm">
      {links.map(([key, url]) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-stone-50">
            {labels[key]}
          </a>
        </li>
      ))}
    </ul>
  )
}
