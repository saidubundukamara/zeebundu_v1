import type { Metadata } from 'next'
import Link from 'next/link'

import { ImpactCard } from '@/components/cards/ImpactCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { StatsGrid } from '@/components/StatsGrid'
import { getImpactProgrammes } from '@/lib/data'
import { impactPillarLabels } from '@/lib/impact'
import { cn } from '@/lib/utils'
import type { ImpactProgramme } from '@/payload-types'

type Pillar = ImpactProgramme['pillar']

const pillarDescriptions: Record<Pillar, string> = {
  education: 'Support for learning: schools, students and skills.',
  health: 'Access to care and medicines near where our businesses work.',
  environment: 'Looking after the land, water and coast our businesses rely on.',
  enterprise: 'Support for local suppliers, traders and small businesses.',
  community: 'Local projects, and help when our neighbours need it.',
}

const pillars = Object.keys(impactPillarLabels) as Pillar[]

const parsePillar = (value: string | string[] | undefined) => {
  const pillar = Array.isArray(value) ? value[0] : value
  return pillar && pillar in impactPillarLabels ? (pillar as Pillar) : undefined
}

export async function generateMetadata(props: PageProps<'/impact'>): Promise<Metadata> {
  const pillar = parsePillar((await props.searchParams).pillar)
  return {
    title: pillar ? `${impactPillarLabels[pillar]} impact` : 'Impact',
    description:
      'How Zeebundu and the Zeebundu Foundation invest in education, health, the environment, enterprise and communities in Sierra Leone.',
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
        description="How our businesses and the Zeebundu Foundation invest in the people and places around them."
        crumbs={[{ label: 'Impact' }]}
      />

      {/* Intro */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <h2 className="text-h2">The Zeebundu Foundation</h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-[62ch] space-y-5 text-lead text-map-ink">
            <p>
              Our businesses employ people, buy from local suppliers and serve customers across
              Sierra Leone. We think that comes with a duty to leave those communities better off.
            </p>
            <p className="text-map-ink-soft">
              Programmes sit under five pillars. Many are run with our businesses and with local
              partners who know their areas well.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Pillars, as a legend */}
      <Section className="border-t border-map-rule">
        <h2 className="mb-10 text-h2">Five pillars</h2>
        <ul className="border-t border-map-ink">
          {pillars.map((p, i) => {
            const count = counts[p]
            const body = (
              <>
                <span className="control-num text-2xl text-map-course">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-heading text-3xl leading-none font-extrabold uppercase md:text-4xl">
                  {impactPillarLabels[p]}
                </span>
                <span className="text-sm leading-relaxed text-map-ink-soft md:text-base">
                  {pillarDescriptions[p]}
                </span>
                <span className="text-sm whitespace-nowrap text-map-ink-soft md:text-right">
                  {count ? `${count} programme${count === 1 ? '' : 's'}` : 'None published yet'}
                </span>
              </>
            )
            const base =
              'grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-b border-map-rule py-6 md:grid-cols-[4rem_minmax(0,4fr)_minmax(0,6fr)_minmax(0,2fr)] md:gap-x-8 [&>*:nth-child(n+3)]:col-start-2 md:[&>*:nth-child(n+3)]:col-start-auto'
            return (
              <li key={p}>
                {count ? (
                  <Link
                    href={`/impact?pillar=${p}#programmes`}
                    aria-current={pillar === p ? 'true' : undefined}
                    className={cn(
                      base,
                      'transition-colors hover:bg-map-course-soft',
                      pillar === p && 'bg-map-course-soft',
                    )}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={base}>{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </Section>

      {/* Stats */}
      {stats.length > 0 && (
        <Section className="border-t border-map-rule py-14 md:py-16">
          <h2 className="sr-only">Impact in numbers</h2>
          <StatsGrid stats={stats} />
        </Section>
      )}

      {/* Programmes */}
      <Section id="programmes" className="scroll-mt-20 border-t border-map-rule">
        <SectionHeader
          title={pillar ? `${impactPillarLabels[pillar]} programmes` : 'Our programmes'}
          action={
            pillar ? (
              <Link
                href="/impact#programmes"
                className="rounded-sm text-sm font-medium text-map-ink underline underline-offset-4 hover:text-map-ink focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
          <p className="border border-dashed border-map-rule px-6 py-16 text-center text-lead text-map-ink-soft">
            No programmes are published yet. Check back soon.
          </p>
        )}
      </Section>
    </>
  )
}
