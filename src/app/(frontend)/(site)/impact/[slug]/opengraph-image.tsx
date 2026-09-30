import { getImpactProgramme, getImpactProgrammes } from '@/lib/data'
import { impactPillarLabels } from '@/lib/impact'
import { ogContentType, ogSize, renderOgImage } from '@/lib/seo/og'

export const alt = 'A Zeebundu Group impact programme'
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  const programmes = await getImpactProgrammes()
  return programmes.map((programme) => ({ slug: programme.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const programme = await getImpactProgramme(slug)
  if (!programme) return renderOgImage({ eyebrow: 'Impact', title: 'Zeebundu Group' })
  return renderOgImage({
    eyebrow: `Impact · ${impactPillarLabels[programme.pillar]}`,
    title: programme.title,
    footer: 'Zeebundu Group · Community impact',
  })
}
