import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { isExternal } from '@/lib/links'

type LinkValue = { label?: string | null; url?: string | null } | null | undefined

/** Button for a CMS link group; renders nothing if the editor left it empty. */
export function CMSLink({
  link,
  variant = 'highlight',
  size = 'xl',
  className,
}: {
  link: LinkValue
  variant?: 'highlight' | 'default' | 'outline' | 'secondary' | 'link'
  size?: 'lg' | 'xl'
  className?: string
}) {
  if (!link?.label || !link.url) return null
  const external = isExternal(link.url)
  return (
    <Button asChild variant={variant} size={size} className={className}>
      {external ? (
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ) : (
        <Link href={link.url}>{link.label}</Link>
      )}
    </Button>
  )
}
