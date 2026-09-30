import type { Metadata } from 'next'
import Link from 'next/link'

import { ImpactCard } from '@/components/cards/ImpactCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Eyebrow, Section, SectionHeader } from '@/components/layout/Section'
import { StatsGrid } from '@/components/StatsGrid'
import { getImpactProgrammes } from '@/lib/data'
import { impactPillarLabels } from '@/lib/impact'
import { cn } from '@/lib/utils'
import type { ImpactProgramme } from '@/payload-types'

type Pillar = ImpactProgramme['pillar']

const pillarDescriptions: Record<Pillar, string> = {
  education: 'Helping children and young people learn, from school meals to scholarships.',
  health: 'Bringing care, screening and medicines closer to the communities we serve.',
  environment: 'Protecting the land, water and forests our businesses depend on.',
  enterprise: 'Backing local suppliers, traders and small businesses to grow.',
  community: 'Standing with our neighbours through local projects and emergencies.',
}

const pillars = Object.keys(impactPillarLabels) as Pillar[]

const parsePillar = (value: string | string[] | undefined) => {
  const pillar = Array.isArray(value) ? value[0] : value
  return pillar && pillar in impactPillarLabels ? (pillar as Pillar) : undefined
}

export async function generateMetadata(props: PageProps<'/impact'>): Promise<Metadata> {
  const pillar = parsePillar((await props.searchParams).pillar)
  return {
    title: pillar ? `${impactPillarLabels[pillar]} — Impact` : 'Impact',
    description:
      'How Zeebundu Group and the Zeebundu Foundation invest in education, health, the environment, enterprise and communities across Sierra Leone.',
    alternates: { canonical: '/impact' },
  }
}

export default async function ImpactPage(props: PageProps<'/impact'>) {
  const pillar = parsePillar((await props.searchParams).pillar)
  const programmes = await getImpactProgrammes()
  const counts = Object.fromEntries(
    pillars.map((p) => [p, programmes.filter((prog) => prog.pillar === p).length]),
  ) as Record<Pillar, number>
  const shown = pillar ? programmes.filter((p) => p.pillar === pillar) : programmes

  // Headline stats: the first figure from each programme (featured first), up to four.
  const stats = [...programmes]
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .flatMap((p) => p.stats?.slice(0, 1) ?? [])
    .slice(0, 4)

  return (
    <>
      <PageHeader
        title="Our impact"
        description="We grow with the communities we serve. Through the Zeebundu Foundation and our businesses, we invest in the people and places that make Sierra Leone home."
        crumbs={[{ label: 'Impact' }]}
      />

      {/* Intro */}
      <Section>
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <div className="space-y-3">
            <Eyebrow>Zeebundu Foundation</Eyebrow>
            <h2 className="text-h2 text-forest-800">Business with a purpose</h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-stone-700">
            <p>
              Our businesses employ, supply and serve thousands of people across Sierra Leone. That
              gives us a responsibility, and an opportunity, to leave communities stronger than we
              found them.
            </p>
            <p>
              Our programmes are organised around five pillars. Many are run hand in hand with our
              businesses, drawing on their people, products and know-how, and with local partners
              who know their communities best.
            </p>
          </div>
        </div>
      </Section>

      {/* Pillars */}
      <Section tone="paper">
        <SectionHeader eyebrow="What we focus on" title="Five pillars" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => {
            const count = counts[p]
            const body = (
              <>
                <span className="font-heading text-h3 text-forest-800">
                  {impactPillarLabels[p]}
                </span>
                <span className="text-sm leading-relaxed text-stone-600">
                  {pillarDescriptions[p]}
                </span>
                <span className="mt-auto pt-2 text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">
                  {count ? `${count} programme${count === 1 ? '' : 's'}` : 'Coming soon'}
                </span>
              </>
            )
            const base =
              'flex h-full flex-col gap-2 rounded-lg border bg-white p-5 transition-colors'
            return (
              <li key={p}>
                {count ? (
                  <Link
                    href={`/impact?pillar=${p}#programmes`}
                    aria-current={pillar === p ? 'true' : undefined}
                    className={cn(
                      base,
                      'hover:border-forest-700 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                      pillar === p
                        ? 'border-forest-700 ring-1 ring-forest-700'
                        : 'border-stone-200',
                    )}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={cn(base, 'border-stone-200')}>{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </Section>

      {/* Stats */}
      {stats.length > 0 && (
        <Section tone="dark" className="py-12 md:py-14">
          <h2 className="sr-only">Impact in numbers</h2>
          <StatsGrid stats={stats} />
        </Section>
      )}

      {/* Programmes */}
      <Section id="programmes" className="scroll-mt-20">
        <SectionHeader
          eyebrow="Programmes"
          title={pillar ? `${impactPillarLabels[pillar]} programmes` : 'Our programmes'}
          action={
            pillar ? (
              <Link
                href="/impact#programmes"
                className="rounded-sm text-sm font-medium text-forest-700 underline underline-offset-4 hover:text-forest-900 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Show all programmes
              </Link>
            ) : undefined
          }
        />
        {shown.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((programme) => (
              <li key={programme.id}>
                <ImpactCard programme={programme} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center font-heading text-h3 text-forest-800">
            Programmes will be published here soon.
          </p>
        )}
      </Section>
    </>
  )
}
