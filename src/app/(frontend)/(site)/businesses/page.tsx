import type { Metadata } from 'next'

import { BusinessDirectory, type DirectoryGroup } from '@/components/business/BusinessDirectory'
import { BusinessCard } from '@/components/cards/BusinessCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { getBusinessesBySector } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Our businesses',
  description:
    'Explore the Zeebundu Group businesses serving households and companies across Sierra Leone, from fuel and food to finance and retail.',
}

export default async function BusinessesPage() {
  const groups = await getBusinessesBySector()
  const total = groups.reduce((n, g) => n + g.businesses.length, 0)

  const directory: DirectoryGroup[] = groups.map(({ sector, businesses }) => ({
    id: sector.id,
    name: sector.name,
    slug: sector.slug,
    items: businesses.map((business) => ({
      id: business.id,
      search: [business.name, business.tagline, business.summary, sector.name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
      card: <BusinessCard business={business} />,
    })),
  }))

  return (
    <>
      <PageHeader
        title="Our businesses"
        description={`${total} businesses across ${groups.length} sectors, serving households and companies across Sierra Leone.`}
        crumbs={[{ label: 'Our businesses' }]}
      />
      <Section>
        <BusinessDirectory groups={directory} />
      </Section>
    </>
  )
}
