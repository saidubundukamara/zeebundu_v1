import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'

import { CMSLink } from '@/components/blocks/CMSLink'
import { ControlIndex } from '@/components/business/ControlIndex'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { CourseMap } from '@/components/map/CourseMap'
import { Terrain } from '@/components/map/Terrain'
import { FinishMark } from '@/components/map/symbols'
import { Media } from '@/components/Media'
import { DevelopImage } from '@/components/motion/DevelopImage'
import { Lines, splitHeadline } from '@/components/motion/Lines'
import { Reveal } from '@/components/motion/Reveal'
import { buildCourse } from '@/lib/course'
import {
  getBusinessesBySector,
  getGlobal,
  getImpactProgrammes,
  getNews,
  populated,
} from '@/lib/data'
import { impactPillarLabels } from '@/lib/impact'
import { formatDate } from '@/lib/links'
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
  const [home, settings, groups, programmes, news] = await Promise.all([
    getGlobal('homepage', 1, draft),
    getGlobal('site-settings', 0),
    getBusinessesBySector(),
    getImpactProgrammes(),
    getNews({ limit: 3 }),
  ])

  const { legs, controls } = buildCourse(groups)
  const businesses = controls.map((c) => c.business)
  const hero = home.hero
  const chosen = (home.featuredBusinesses ?? []).map(populated).filter(Boolean) as Business[]
  const featured = (chosen.length ? chosen : businesses.filter((b) => b.featured)).slice(0, 3)
  const featuredImpact =
    populated(home.featuredImpact as number | ImpactProgramme | null) ??
    programmes.find((p) => p.featured) ??
    programmes[0]
  const chairman = home.chairman
  const codeFor = (b: Business) => controls.find((c) => c.business.id === b.id)?.code ?? ''

  return (
    <>
      <JsonLd data={organizationJsonLd({ settings, businesses })} />

      {/* 1. Hero: the group as a course. The legend lights each sector's controls. */}
      <section className="relative overflow-hidden border-b border-map-rule">
        <Terrain
          variant="hero"
          priority
          className="absolute inset-0 terrain-fade-left opacity-90"
        />
        <Container className="relative py-10 md:py-14 lg:min-h-[calc(100dvh-4rem)] lg:content-center">
          <CourseMap
            controls={controls.map((c) => ({
              number: c.number,
              code: c.code,
              name: c.business.name,
              slug: c.business.slug,
              sectorId: c.sector.id,
              sectorName: c.sector.name,
            }))}
            legs={legs.map((l) => ({
              id: l.sector.id,
              name: l.sector.name,
              slug: l.sector.slug,
              codes: l.controls.map((c) => c.code),
            }))}
            intro={
              <div className="space-y-6">
                <h1 className="text-[clamp(3rem,1.6rem+4vw,5.75rem)] leading-[0.9] text-map-ink">
                  <Lines lines={splitHeadline(hero.headline, 20)} />
                </h1>
                {hero.subline && (
                  <p className="max-w-[46ch] text-lead text-map-ink-soft">{hero.subline}</p>
                )}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <CMSLink link={hero.primaryCta} />
                  {hero.secondaryCta?.label && hero.secondaryCta.url && (
                    <Link
                      href={hero.secondaryCta.url}
                      className="group inline-flex items-center gap-2 font-heading text-lg font-bold tracking-[0.03em] text-map-ink uppercase"
                    >
                      {hero.secondaryCta.label}
                      <ArrowRightIcon
                        aria-hidden
                        weight="light"
                        className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                </div>
              </div>
            }
          />
        </Container>
      </section>

      {/* 2. Every business, as the control-description sheet */}
      <Section>
        <Reveal className="mb-12 md:mb-16">
          <h2 className="max-w-4xl text-h2">All {controls.length} businesses, in course order</h2>
        </Reveal>
        <ControlIndex
          rows={controls.map((c) => ({
            code: c.code,
            slug: c.business.slug,
            name: c.business.name,
            sectorName: c.sector.name,
            summary: c.business.summary,
          }))}
          frames={controls.map((c) => (
            <Media
              key={c.business.id}
              resource={c.business.heroImage ?? c.sector.image}
              size="card"
              className="size-full"
              fallbackLabel={c.business.name}
              sizes="(min-width: 1024px) 38vw, 1px"
            />
          ))}
        />
      </Section>

      {/* 3. Featured businesses: an asymmetric spread of photographs */}
      {featured.length > 0 && (
        <section className="border-t border-map-rule py-20 md:py-28">
          <Container>
            <ul className="grid gap-5 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-[1.35fr_1fr]">
              {featured.map((b, i) => (
                <li key={b.id} className={i === 0 ? 'md:row-span-2' : undefined}>
                  <Link href={`/businesses/${b.slug}`} className="group block h-full">
                    <DevelopImage
                      className={
                        i === 0
                          ? 'aspect-[4/5] md:aspect-auto md:h-[calc(100%-5.5rem)]'
                          : 'aspect-[16/10]'
                      }
                    >
                      <Media
                        resource={b.heroImage}
                        size={i === 0 ? 'hero' : 'card'}
                        className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        fallbackLabel={b.name}
                        sizes={
                          i === 0
                            ? '(min-width: 768px) 55vw, 100vw'
                            : '(min-width: 768px) 40vw, 100vw'
                        }
                      />
                    </DevelopImage>
                    <div className="flex items-start justify-between gap-4 pt-4">
                      <div>
                        <p className="font-heading text-3xl leading-none font-extrabold uppercase">
                          {b.name}
                        </p>
                        <p className="mt-2 max-w-[48ch] text-sm text-map-ink-soft">{b.summary}</p>
                      </div>
                      <span className="control-num text-3xl text-map-course">{codeFor(b)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* 4. Impact: one statement over open terrain */}
      <section className="relative overflow-hidden border-t border-map-rule py-24 md:py-36">
        <Terrain variant="band" className="absolute inset-0 terrain-fade-edges opacity-70" />
        <Container className="relative grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <Reveal>
            <h2 className="text-h1">
              {featuredImpact ? 'Growing with the places we work' : 'Growing with our communities'}
            </h2>
            <p className="mt-6 max-w-[52ch] bg-map-ground/80 text-lead text-map-ink-soft">
              {featuredImpact?.summary ??
                'Through our businesses and the Zeebundu Foundation, we invest in the people and places around us.'}
            </p>
            <Link
              href={featuredImpact ? `/impact/${featuredImpact.slug}` : '/impact'}
              className="group mt-8 inline-flex items-center gap-2 font-heading text-lg font-bold tracking-[0.03em] uppercase"
            >
              {featuredImpact ? featuredImpact.title : 'See our impact work'}
              <ArrowRightIcon
                aria-hidden
                weight="light"
                className="size-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2">
              {Object.values(impactPillarLabels).map((pillar) => (
                <li
                  key={pillar}
                  className="border border-map-ink bg-map-ground px-4 py-2 font-heading text-xl font-extrabold uppercase"
                >
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* 5. Chairman's message */}
      {chairman?.quote && (
        <Section className="border-t border-map-rule">
          <figure className="grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <DevelopImage className="aspect-[3/4] max-w-sm">
              <Media
                resource={chairman.portrait}
                className="size-full"
                sizes="(min-width: 768px) 30vw, 80vw"
              />
            </DevelopImage>
            <Reveal className="space-y-6">
              <blockquote className="font-heading text-h2 font-extrabold uppercase">
                &ldquo;{chairman.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-map-ink-soft">
                <span className="font-medium text-map-ink">{chairman.name}</span>
                {chairman.title && <>, {chairman.title}</>}
              </figcaption>
              <CMSLink link={chairman.link} variant="link" size="lg" className="px-0" />
            </Reveal>
          </figure>
        </Section>
      )}

      {/* 6. Latest news, as a plain dated list */}
      {news.docs.length > 0 && (
        <Section className="border-t border-map-rule">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <Reveal>
              <h2 className="text-h2">Latest news</h2>
              <Link
                href="/news"
                className="group mt-6 inline-flex items-center gap-2 font-heading text-lg font-bold tracking-[0.03em] uppercase"
              >
                All news
                <ArrowRightIcon
                  aria-hidden
                  weight="light"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
            <ul className="border-t border-map-ink">
              {news.docs.map((article) => (
                <li key={article.id} className="border-b border-map-rule">
                  <Link
                    href={`/news/${article.slug}`}
                    className="group grid gap-2 py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
                  >
                    {article.publishedAt && (
                      <time
                        dateTime={article.publishedAt}
                        className="text-sm text-map-ink-soft tabular"
                      >
                        {formatDate(article.publishedAt)}
                      </time>
                    )}
                    <span>
                      <span className="block font-heading text-2xl leading-tight font-extrabold uppercase group-hover:text-map-course">
                        {article.title}
                      </span>
                      <span className="mt-2 line-clamp-2 block text-sm text-map-ink-soft">
                        {article.excerpt}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* 7. Finish: the one closing call to action */}
      {home.ctaBand?.heading && (
        <Section tone="dark">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-3xl space-y-5">
              <FinishMark className="size-12" />
              <h2 className="text-h1">{home.ctaBand.heading}</h2>
              {home.ctaBand.text && (
                <p className="max-w-[52ch] text-lead text-primary-foreground/85">
                  {home.ctaBand.text}
                </p>
              )}
            </Reveal>
            <CMSLink
              link={home.ctaBand.link}
              variant="outline"
              className="border-primary-foreground bg-primary-foreground text-map-course hover:bg-transparent hover:text-primary-foreground"
            />
          </div>
        </Section>
      )}
    </>
  )
}
