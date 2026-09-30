import { getBusiness, getBusinesses, populated } from '@/lib/data'
import { ogContentType, ogSize, renderOgImage } from '@/lib/seo/og'

export const alt = 'A Zeebundu Group business'
export const size = ogSize
export const contentType = ogContentType

// Prerender a card for every published business at build; new ones render on first request
export async function generateStaticParams() {
  const businesses = await getBusinesses()
  return businesses.map((business) => ({ slug: business.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const business = await getBusiness(slug)
  if (!business) return renderOgImage({ title: 'Zeebundu Group' })
  const sector = populated(business.sector)
  return renderOgImage({
    eyebrow: sector?.name ?? 'Zeebundu Group',
    title: business.name,
    footer: business.tagline || 'Part of Zeebundu Group',
  })
}
