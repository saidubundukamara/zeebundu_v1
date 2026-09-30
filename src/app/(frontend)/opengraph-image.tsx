import { getBusinesses, getSectors } from '@/lib/data'
import { ogContentType, ogSize, renderOgImage } from '@/lib/seo/og'

// Default share card for every page without its own opengraph-image
export const alt = 'Zeebundu Group — a Sierra Leone group of businesses'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  const [businesses, sectors] = await Promise.all([getBusinesses(), getSectors()])
  const title =
    businesses.length && sectors.length
      ? `${businesses.length} businesses across ${sectors.length} sectors`
      : 'A Sierra Leone group of businesses'
  return renderOgImage({ eyebrow: 'Sierra Leone', title, footer: 'Zeebundu Group' })
}
