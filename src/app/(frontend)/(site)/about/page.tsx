import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks'
import { CMSLink } from '@/components/blocks/CMSLink'
import { SectorCard } from '@/components/cards/SectorCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { StatsGrid } from '@/components/StatsGrid'
import { getBusinessesBySector, getGlobal, getLeadership, getPage } from '@/lib/data'
import type { Leadership } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about')
  return {
    title: page?.meta?.title || 'About',
    description:
      page?.meta?.description ??
      'Zeebundu is a Sierra Leone group of businesses across energy, hospitality, agriculture, food, construction, health, finance and retail.',
  }
}

function LeaderGrid({ leaders }: { leaders: Leadership[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {leaders.map((leader) => (
        <li key={leader.id} className="space-y-4">
          <Media
            resource={leader.photo}
            className="aspect-[4/5] rounded-lg"
            fallbackLabel={leader.name}
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
          <div>
            <h3 className="font-heading text-h3 text-forest-800">{leader.name}</h3>
            <p className="text-sm text-gold-700">{leader.title}</p>
          </div>
          {leader.bio && <p className="text-sm leading-relaxed text-stone-600">{leader.bio}</p>}
        </li>
      ))}
    </ul>
  )
}

export default async function AboutPage() {
  const { isEnabled: draft } = await draftMode()
  const [page, leadership, home, settings, groups] = await Promise.all([
    getPage('about', draft),
    getLeadership(),
    getGlobal('homepage', 1, draft),
    getGlobal('site-settings', 0),
    getBusinessesBySector(),
  ])

  const executives = leadership.filter((l) => l.group === 'executive')
  const board = leadership.filter((l) => l.group === 'board')
  const chairman = home.chairman
  const startsWithHero = page?.layout?.[0]?.blockType === 'hero'

  return (
    <>
      {!startsWithHero && (
        <PageHeader
          title={page?.title ?? 'About Zeebundu'}
          crumbs={[{ label: 'About' }]}
          description="A Sierra Leonean group of businesses, serving households and companies across the country."
        />
      )}

      {/* Overview, story, mission and values are edited as blocks on the "about" page */}
      <RenderBlocks blocks={page?.layout} />

      {settings.stats?.length ? (
        <Section tone="dark">
          <StatsGrid stats={settings.stats} />
        </Section>
      ) : null}

      {chairman?.quote && (
        <Section tone="paper">
          <figure className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
            <Media
              resource={chairman.portrait}
              className="aspect-[3/4] max-w-xs rounded-lg"
              fallbackLabel={chairman.name ?? undefined}
              sizes="(min-width: 768px) 30vw, 80vw"
            />
            <div className="space-y-6">
              <p className="text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">
                Chairman’s message
              </p>
              <blockquote className="font-heading text-h2 leading-snug text-forest-800">
                “{chairman.quote}”
              </blockquote>
              <figcaption className="text-sm text-stone-600">
                {[chairman.name, chairman.title].filter(Boolean).join(' · ')}
              </figcaption>
            </div>
          </figure>
        </Section>
      )}

      {executives.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Leadership" title="Executive team" />
          <LeaderGrid leaders={executives} />
        </Section>
      )}
      {board.length > 0 && (
        <Section tone={executives.length ? 'paper' : 'default'}>
          <SectionHeader eyebrow="Governance" title="Board of directors" />
          <LeaderGrid leaders={board} />
        </Section>
      )}

      <Section>
        <SectionHeader
          eyebrow="Our businesses"
          title="What we do"
          action={
            <CMSLink
              link={{ label: 'All businesses', url: '/businesses' }}
              variant="outline"
              size="lg"
            />
          }
        />
        <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {groups.map(({ sector, businesses }) => (
            <li key={sector.id}>
              <SectorCard sector={sector} count={businesses.length} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
