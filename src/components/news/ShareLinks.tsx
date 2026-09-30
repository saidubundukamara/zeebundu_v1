import { cn } from '@/lib/utils'

/** Plain share links (no JS, no tracking scripts). `url` must be absolute. */
export function ShareLinks({
  url,
  title,
  className,
}: {
  url: string
  title: string
  className?: string
}) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'X', href: `https://x.com/intent/post?url=${u}&text=${t}` },
  ]
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="mr-1 text-sm font-medium text-stone-700">Share</span>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-stone-300 px-4 text-sm text-forest-800 transition-colors hover:border-forest-700 hover:bg-forest-50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
