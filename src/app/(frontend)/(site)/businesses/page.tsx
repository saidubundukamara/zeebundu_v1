import type { Metadata } from 'next'

import { BusinessDirectory, type DirectoryGroup } from '@/components/business/BusinessDirectory'
import { BusinessCard } from '@/components/cards/BusinessCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { getCourse } from '@/lib/course'

export const metadata: Metadata = {
  title: 'Our businesses',
  description:
    'All 16 Zeebundu Group businesses in Sierra Leone, from fuel and farming to pharmacy, forex and shopping.',
}

export default async function BusinessesPage() {
  const { legs, controls } = await getCourse()

  const directory: DirectoryGroup[] = legs.map(({ sector, controls: legControls }) => ({
    id: sector.id,
    name: sector.name,
    slug: sector.slug,
    codes: legControls.map((c) => c.code),
    items: legControls.map(({ business, code }) => ({
      id: business.id,
      search: [business.name, business.tagline, business.summary, sector.name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
      card: <BusinessCard business={business} code={code} />,
    })),
  }))

  return (
    <>
      <PageHeader
        title="Our businesses"
        description={`${controls.length} businesses in ${legs.length} sectors. Pick a sector or search for what you need.`}
        crumbs={[{ label: 'Our businesses' }]}
      />
      <Section className="pt-14 md:pt-20">
        <BusinessDirectory groups={directory} />
      </Section>
    </>
  )
}
