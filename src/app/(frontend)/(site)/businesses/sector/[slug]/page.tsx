import { ArrowRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BusinessCard } from '@/components/cards/BusinessCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { getBusinessesBySector, getSector, getSectors } from '@/lib/data'

export async function generateStaticParams() {
  const sectors = await getSectors()
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export async function generateMetadata(
  props: PageProps<'/businesses/sector/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params
  const sector = await getSector(slug)
  if (!sector) return {}
  return {
    title: sector.name,
    description:
      sector.description ||
      `Zeebundu Group businesses in ${sector.name}, serving customers across Sierra Leone.`,
  }
}

export default async function SectorPage(props: PageProps<'/businesses/sector/[slug]'>) {
  const { slug } = await props.params
  const [sector, groups] = await Promise.all([getSector(slug), getBusinessesBySector()])
  if (!sector) notFound()

  const businesses = groups.find((g) => g.sector.id === sector.id)?.businesses ?? []
  const others = groups.filter((g) => g.sector.id !== sector.id)

  return (
    <>
      <PageHeader
        eyebrow="Sector"
        title={sector.name}
        description={sector.description}
        crumbs={[{ label: 'Our businesses', href: '/businesses' }, { label: sector.name }]}
      />

      <Section>
        {businesses.length > 0 ? (
          <>
            <h2 className="sr-only">Businesses in {sector.name}</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((business) => (
                <li key={business.id}>
                  <BusinessCard business={business} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-lead text-stone-600">
            Businesses in this sector will be listed here soon.
          </p>
        )}
      </Section>

      {others.length > 0 && (
        <Section tone="paper">
          <SectionHeader
            eyebrow="Keep exploring"
            title="Other sectors"
            action={
              <Button asChild variant="outline" size="lg">
                <Link href="/businesses">
                  All businesses <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            }
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map(({ sector: other, businesses }) => (
              <li key={other.id}>
                <Link
                  href={`/businesses/sector/${other.slug}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-lg border border-stone-200 bg-white p-5 transition-colors outline-none hover:border-forest-700 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="space-y-1">
                    <span className="block font-heading text-lg text-forest-800">{other.name}</span>
                    <span className="block text-sm text-stone-600">
                      {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'}
                    </span>
                  </span>
                  <ArrowRightIcon
                    aria-hidden
                    className="size-5 shrink-0 text-stone-400 transition-colors group-hover:text-forest-700"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
