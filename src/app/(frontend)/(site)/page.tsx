import { draftMode } from 'next/headers'
import { ArrowRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { CMSLink } from '@/components/blocks/CMSLink'
import { BusinessCard } from '@/components/cards/BusinessCard'
import { ImpactCard } from '@/components/cards/ImpactCard'
import { NewsCard } from '@/components/cards/NewsCard'
import { SectorCard } from '@/components/cards/SectorCard'
import { Container } from '@/components/layout/Container'
import { Eyebrow, Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { StatsGrid } from '@/components/StatsGrid'
import { Button } from '@/components/ui/button'
import {
  getBusinesses,
  getBusinessesBySector,
  getGlobal,
  getImpactProgrammes,
  getNews,
  populated,
} from '@/lib/data'
import { impactPillarLabels } from '@/lib/impact'
import { cn } from '@/lib/utils'
import { JsonLd, organizationJsonLd } from '@/lib/seo/jsonld'
import type { Business, ImpactProgramme } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const home = await getGlobal('homepage', 0)
  return {
    title: { absolute: 'Zeebundu Group' },
    description: home.hero?.subline ?? undefined,
  }
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const [home, settings, groups, businesses, programmes, news] = await Promise.all([
    getGlobal('homepage', 1, draft),
    getGlobal('site-settings', 0),
    getBusinessesBySector(),
    getBusinesses(),
    getImpactProgrammes(),
    getNews({ limit: 3 }),
  ])

  const hero = home.hero
  const chosen = (home.featuredBusinesses ?? []).map(populated).filter(Boolean) as Business[]
  const featured = chosen.length ? chosen : businesses.filter((b) => b.featured)
  const featuredImpact =
    populated(home.featuredImpact as number | ImpactProgramme | null) ??
    programmes.find((p) => p.featured) ??
    programmes[0]
  const chairman = home.chairman

  return (
    <>
      <JsonLd data={organizationJsonLd({ settings, businesses })} />

      {/* 1. Hero */}
      <section data-tone="dark" className="group/section bg-forest-800 text-stone-50">
        <Container className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-7">
            {hero.eyebrow && <Eyebrow>{hero.eyebrow}</Eyebrow>}
            <h1 className="text-display">{hero.headline}</h1>
            {hero.subline && <p className="max-w-xl text-lead text-stone-300">{hero.subline}</p>}
            <div className="flex flex-wrap gap-3">
              <CMSLink link={hero.primaryCta} />
              <CMSLink
                link={hero.secondaryCta}
                variant="outline"
                className="border-white/30 bg-transparent text-stone-50 hover:bg-white/10 hover:text-stone-50"
              />
            </div>
          </div>
          <Media
            resource={hero.image}
            size="hero"
            priority
            className={cn('aspect-[4/3] rounded-lg', !populated(hero.image) && 'hidden lg:block')}
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </Container>
      </section>

      {/* 2. Stats band */}
      {settings.stats?.length ? (
        <Section tone="paper" className="py-12 md:py-14">
          <StatsGrid stats={settings.stats} />
        </Section>
      ) : null}

      {/* 3. Sectors */}
      <Section>
        <SectionHeader
          eyebrow="Our businesses"
          title="Eight sectors, one group"
          description="From fuel and food to finance and retail, our businesses serve households and companies across Sierra Leone."
          action={
            <Button asChild variant="outline" size="lg">
              <Link href="/businesses">
                All businesses <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
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

      {/* 4. Featured businesses */}
      {featured.length > 0 && (
        <Section tone="paper">
          <SectionHeader eyebrow="Featured" title="Spotlight on our businesses" />
          <ul
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4"
            aria-label="Featured businesses"
          >
            {featured.map((business) => (
              <li key={business.id} className="w-[80%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                <BusinessCard business={business} showSector />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 5. Impact */}
      <Section>
        <SectionHeader
          eyebrow="Impact"
          title="Growing with our communities"
          description="Through the Zeebundu Foundation and our businesses, we invest in the people and places we serve."
          action={
            <Button asChild variant="outline" size="lg">
              <Link href="/impact">
                Our impact <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          }
        />
        <div className={cn('grid gap-5', featuredImpact && 'lg:grid-cols-2')}>
          <ul className={cn('grid grid-cols-2 gap-3', !featuredImpact && 'md:grid-cols-4')}>
            {Object.values(impactPillarLabels)
              .slice(0, 4)
              .map((pillar) => (
                <li
                  key={pillar}
                  className="flex aspect-[4/3] items-end rounded-lg border border-stone-200 bg-stone-100 p-5"
                >
                  <span className="font-heading text-h3 text-forest-800">{pillar}</span>
                </li>
              ))}
          </ul>
          {featuredImpact && <ImpactCard programme={featuredImpact} />}
        </div>
      </Section>

      {/* 6. Chairman's message */}
      {chairman?.quote && (
        <Section tone="dark">
          <figure className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
            <Media
              resource={chairman.portrait}
              className="aspect-[3/4] max-w-xs rounded-lg"
              sizes="(min-width: 768px) 30vw, 80vw"
            />
            <div className="space-y-6">
              <blockquote className="font-heading text-h2 leading-snug">
                “{chairman.quote}”
              </blockquote>
              <figcaption className="text-sm text-gold-300">
                {[chairman.name, chairman.title].filter(Boolean).join(' · ')}
              </figcaption>
              <CMSLink
                link={chairman.link}
                variant="link"
                size="lg"
                className="px-0 text-stone-50"
              />
            </div>
          </figure>
        </Section>
      )}

      {/* 7. Latest news */}
      {news.docs.length > 0 && (
        <Section tone={chairman?.quote ? 'default' : 'paper'}>
          <SectionHeader
            eyebrow="Newsroom"
            title="Latest news"
            action={
              <Button asChild variant="outline" size="lg">
                <Link href="/news">
                  All news <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            }
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {news.docs.map((article) => (
              <li key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 8. Enquiry band */}
      {home.ctaBand?.heading && (
        <Section tone="dark" className="border-t border-white/10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-h2">{home.ctaBand.heading}</h2>
              {home.ctaBand.text && <p className="text-lead text-stone-300">{home.ctaBand.text}</p>}
            </div>
            <CMSLink link={home.ctaBand.link} />
          </div>
        </Section>
      )}
    </>
  )
}
