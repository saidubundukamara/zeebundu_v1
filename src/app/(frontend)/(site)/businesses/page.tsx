import type { Metadata } from 'next'

import { BusinessDirectory, type DirectoryGroup } from '@/components/business/BusinessDirectory'
import { BusinessCard } from '@/components/cards/BusinessCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { getCourse } from '@/lib/course'

export const metadata: Metadata = {
  title: { absolute: 'Our Businesses | Zeebundu Group of Companies' },
  description:
    'Discover the Zeebundu portfolio, including ZeeMart 360, Heart2Heart Water, ZeeLux, Zee AutoCare, agriculture and development projects.',
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
        title="Our Businesses"
        description={`Explore the ${controls.length} businesses and projects within Zeebundu Group of Companies, in ${legs.length} sectors. Contact our team for current services, product availability and location information.`}
        crumbs={[{ label: 'Our businesses' }]}
      />
      <Section className="pt-14 md:pt-20">
        <BusinessDirectory groups={directory} />
      </Section>
    </>
  )
}
