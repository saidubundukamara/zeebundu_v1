import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'

import { BusinessCard } from '@/components/cards/BusinessCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { DevelopImage } from '@/components/motion/DevelopImage'
import { Reveal } from '@/components/motion/Reveal'
import { getCourse } from '@/lib/course'
import { getSector, getSectors } from '@/lib/data'
import { notFoundOrRedirect } from '@/lib/redirects'

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
      sector.description || `Zeebundu Group businesses in ${sector.name}, in Sierra Leone.`,
  }
}

export default async function SectorPage(props: PageProps<'/businesses/sector/[slug]'>) {
  const { slug } = await props.params
  const [sector, { legs }] = await Promise.all([getSector(slug), getCourse()])
  if (!sector) return notFoundOrRedirect(`/businesses/sector/${slug}`)

  const leg = legs.find((l) => l.sector.id === sector.id)
  const controls = leg?.controls ?? []
  const index = legs.findIndex((l) => l.sector.id === sector.id)
  const next = legs.length > 1 ? legs[(index + 1) % legs.length] : null
  const others = legs.filter((l) => l.sector.id !== sector.id)

  return (
    <>
      <PageHeader
        title={sector.name}
        description={sector.description}
        crumbs={[{ label: 'Our businesses', href: '/businesses' }, { label: sector.name }]}
      >
        {controls.length > 0 && (
          <p className="text-sm text-map-ink-soft">
            {controls.length} {controls.length === 1 ? 'business' : 'businesses'}, controls{' '}
            <span className="control-num text-lg text-map-course">
              {controls.map((c) => c.code).join(' ')}
            </span>
          </p>
        )}
      </PageHeader>

      {sector.image && typeof sector.image === 'object' && (
        <div className="border-b border-map-rule">
          <DevelopImage className="aspect-[21/9] max-h-[70vh] w-full">
            <Media resource={sector.image} size="hero" className="size-full" sizes="100vw" />
          </DevelopImage>
        </div>
      )}

      <Section>
        {controls.length > 0 ? (
          <>
            <h2 className="sr-only">Businesses in {sector.name}</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {controls.map(({ business, code }, i) => (
                <Reveal as="li" key={business.id} delay={i * 0.06}>
                  <BusinessCard business={business} code={code} />
                </Reveal>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-lead text-map-ink-soft">
            No businesses are listed in this sector yet.
          </p>
        )}
      </Section>

      {next && (
        <Section className="border-t border-map-rule">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <Link href={`/businesses/sector/${next.sector.slug}`} className="group block">
              <p className="text-sm text-map-ink-soft">Next sector</p>
              <p className="mt-3 flex items-center gap-4 font-heading text-h2 font-extrabold uppercase group-hover:text-map-course">
                {next.sector.name}
                <ArrowRightIcon
                  aria-hidden
                  weight="light"
                  className="size-10 shrink-0 transition-transform duration-300 group-hover:translate-x-2"
                />
              </p>
            </Link>
            <nav aria-label="Other sectors">
              <ul className="grid border-t border-map-ink sm:grid-cols-2 sm:gap-x-8">
                {others.map(({ sector: other, controls: otherControls }) => (
                  <li key={other.id} className="border-b border-map-rule">
                    <Link
                      href={`/businesses/sector/${other.slug}`}
                      className="flex items-center justify-between gap-4 py-3 text-sm hover:text-map-course"
                    >
                      <span className="font-medium">{other.name}</span>
                      <span className="control-num text-base whitespace-nowrap text-map-course">
                        {otherControls.map((c) => c.code).join(' ')}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Section>
      )}
    </>
  )
}
