import { districtLabel } from '@/components/business/districts'
import { newsCategoryLabels } from '@/components/cards/NewsCard'
import type { Business, Media, News, SiteSetting } from '@/payload-types'

/**
 * schema.org structured data for the public site.
 * Builders return plain objects; render them with <JsonLd data={...} />.
 */

type JsonLdObject = Record<string, unknown>

const GROUP_NAME = 'Zeebundu Group'

const baseURL = () =>
  (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** Site-relative path (or already absolute URL) → absolute URL. */
export const absoluteURL = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${baseURL()}${path.startsWith('/') ? '' : '/'}${path}`

const mediaURL = (value: unknown, size?: string) => {
  if (!value || typeof value !== 'object') return undefined
  const media = value as Media
  const sized = size ? (media.sizes as Record<string, { url?: string | null }> | undefined) : null
  const url = sized?.[size as string]?.url ?? media.url
  return url ? absoluteURL(url) : undefined
}

/** Drop undefined/null/empty-string values so the output stays tidy. */
const compact = <T extends JsonLdObject>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as T

/** Renders structured data. `<` is escaped so CMS text can't close the script tag. */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

const groupRef = () => ({
  '@type': 'Organization',
  name: GROUP_NAME,
  url: absoluteURL('/'),
})

/** schema.org Organization for the group, with each business as a subOrganization. */
export function organizationJsonLd({
  settings,
  businesses = [],
}: {
  settings?: Pick<SiteSetting, 'groupName' | 'contact' | 'socials'> | null
  businesses?: Pick<Business, 'name' | 'slug' | 'website' | 'summary'>[]
}) {
  const contact = settings?.contact
  const sameAs = Object.values(settings?.socials ?? {}).filter(
    (url): url is string => typeof url === 'string' && /^https?:\/\//.test(url),
  )
  const phone = contact?.phone || contact?.whatsapp

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.groupName || GROUP_NAME,
    url: absoluteURL('/'),
    logo: absoluteURL('/icon.svg'),
    email: contact?.email || undefined,
    telephone: phone || undefined,
    address: contact?.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: contact.address.replace(/\s*\n\s*/g, ', '),
          addressCountry: 'SL',
        }
      : undefined,
    contactPoint:
      phone || contact?.email || contact?.enquiryEmail
        ? [
            compact({
              '@type': 'ContactPoint',
              contactType: 'customer service',
              telephone: phone || undefined,
              email: contact?.enquiryEmail || contact?.email || undefined,
              areaServed: 'SL',
              availableLanguage: ['en'],
            }),
          ]
        : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    subOrganization: businesses.length
      ? businesses.map((business) =>
          compact({
            '@type': 'Organization',
            name: business.name,
            description: business.summary || undefined,
            url: business.website || absoluteURL(`/businesses/${business.slug}`),
          }),
        )
      : undefined,
  })
}

/** schema.org LocalBusiness for a business detail page. */
export function localBusinessJsonLd(business: Business) {
  const location = business.locations?.[0]
  const phone = business.contact?.phone || location?.phone || undefined
  const logo = mediaURL(business.logo)
  const image = mediaURL(business.heroImage)

  return compact({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.summary,
    url: business.website || absoluteURL(`/businesses/${business.slug}`),
    telephone: phone,
    email: business.contact?.email || undefined,
    logo,
    image,
    address: location
      ? compact({
          '@type': 'PostalAddress',
          streetAddress: location.address?.replace(/\s*\n\s*/g, ', ') || undefined,
          addressRegion: location.district ? districtLabel(location.district) : undefined,
          addressCountry: 'SL',
        })
      : undefined,
    geo:
      location?.lat != null && location?.lng != null
        ? { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng }
        : undefined,
    parentOrganization: groupRef(),
  })
}

/** schema.org NewsArticle for a newsroom post. */
export function newsArticleJsonLd(article: News) {
  const url = absoluteURL(`/news/${article.slug}`)
  const image = mediaURL(article.heroImage, 'hero')

  return compact({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: article.publishedAt ?? article.createdAt,
    dateModified: article.updatedAt,
    image: image ? [image] : undefined,
    articleSection: newsCategoryLabels[article.category],
    author: article.author ? { '@type': 'Person', name: article.author } : groupRef(),
    publisher: {
      ...groupRef(),
      logo: { '@type': 'ImageObject', url: absoluteURL('/icon.svg') },
    },
  })
}

/** schema.org BreadcrumbList from site-relative crumbs (Home first). */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteURL(crumb.path),
    })),
  }
}
