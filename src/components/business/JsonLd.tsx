import { districtLabel } from '@/components/business/districts'
import type { Business } from '@/payload-types'

const baseURL = () =>
  (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

const absolute = (path: string) => `${baseURL()}${path}`

/** Renders structured data. `<` is escaped so CMS text can't close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

/** schema.org LocalBusiness for a business detail page. */
export function businessJsonLd(business: Business) {
  const location = business.locations?.[0]
  const phone = business.contact?.phone || location?.phone || undefined
  const logo = typeof business.logo === 'object' ? business.logo?.url : undefined
  const image = typeof business.heroImage === 'object' ? business.heroImage?.url : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.summary,
    url: business.website || absolute(`/businesses/${business.slug}`),
    ...(phone && { telephone: phone }),
    ...(business.contact?.email && { email: business.contact.email }),
    ...(logo && { logo: absolute(logo) }),
    ...(image && { image: absolute(image) }),
    ...(location && {
      address: {
        '@type': 'PostalAddress',
        ...(location.address && { streetAddress: location.address.replace(/\s*\n\s*/g, ', ') }),
        ...(location.district && { addressRegion: districtLabel(location.district) }),
        addressCountry: 'SL',
      },
    }),
    ...(location?.lat != null &&
      location?.lng != null && {
        geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng },
      }),
    parentOrganization: {
      '@type': 'Organization',
      name: 'Zeebundu Group',
      url: absolute('/'),
    },
  }
}

/** schema.org BreadcrumbList from site-relative crumbs. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  }
}
