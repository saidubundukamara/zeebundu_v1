import { ArrowRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BusinessCard } from '@/components/cards/BusinessCard'
import { ImpactCard } from '@/components/cards/ImpactCard'
import { Gallery } from '@/components/Gallery'
import { PartnerList } from '@/components/impact/PartnerList'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { StatsGrid } from '@/components/StatsGrid'
import { Button } from '@/components/ui/button'
import { getImpactProgramme, getImpactProgrammes, populated } from '@/lib/data'
import { impactPillarLabels } from '@/lib/impact'
import { siteURL } from '@/lib/links'
import { cn } from '@/lib/utils'
import type { Media as MediaDoc } from '@/payload-types'

export async function generateStaticParams() {
  const programmes = await getImpactProgrammes()
  return programmes.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata(props: PageProps<'/impact/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const programme = await getImpactProgramme(slug)
  if (!programme) return {}
  const hero = populated(programme.heroImage as number | MediaDoc | null)
  const image = hero?.sizes?.hero?.url ?? hero?.url
  return {
    title: programme.title,
    description: programme.summary,
    alternates: { canonical: `/impact/${programme.slug}` },
    openGraph: {
      title: programme.title,
      description: programme.summary,
      url: `/impact/${programme.slug}`,
      images: image ? [{ url: image.startsWith('http') ? image : siteURL(image) }] : undefined,
    },
  }
}

export default async function ImpactProgrammePage(props: PageProps<'/impact/[slug]'>) {
  const { slug } = await props.params
  const [programme, programmes] = await Promise.all([
    getImpactProgramme(slug),
    getImpactProgrammes(),
  ])
  if (!programme) notFound()

  const pillar = impactPillarLabels[programme.pillar]
  const business = populated(programme.business)
  const partners = programme.partners ?? []
  const gallery = (programme.gallery ?? []).filter((img) => populated(img))
  const hasAside = Boolean(business || partners.length)
  // Same pillar first, then the rest.
  const more = programmes
    .filter((p) => p.id !== programme.id)
    .sort((a, b) => Number(b.pillar === programme.pillar) - Number(a.pillar === programme.pillar))
    .slice(0, 3)

  return (
    <>
      <PageHeader
        title={programme.title}
        description={programme.summary}
        eyebrow={pillar}
        crumbs={[{ label: 'Impact', href: '/impact' }, { label: programme.title }]}
      />

      <article>
        <Container className="pt-10 md:pt-14">
          <Media
            resource={programme.heroImage}
            size="hero"
            priority
            fallbackLabel={pillar}
            className="aspect-[16/9] rounded-lg md:aspect-[21/9]"
            sizes="(min-width: 1152px) 1152px, 100vw"
          />
        </Container>

        <Container
          className={cn(
            'grid gap-12 py-12 md:py-16',
            hasAside && 'lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-16',
          )}
        >
          <div className="max-w-3xl">
            {programme.body ? (
              <RichText data={programme.body} />
            ) : (
              <p className="text-lead text-stone-700">{programme.summary}</p>
            )}
          </div>

          {hasAside && (
            <aside className="space-y-10">
              {business && (
                <section aria-labelledby="run-by" className="space-y-4">
                  <h2 id="run-by" className="font-heading text-h3 text-forest-800">
                    Delivered with
                  </h2>
                  <BusinessCard business={business} />
                </section>
              )}
              {partners.length > 0 && (
                <section aria-labelledby="partners" className="space-y-4">
                  <h2 id="partners" className="font-heading text-h3 text-forest-800">
                    Partners
                  </h2>
                  <PartnerList partners={partners} />
                </section>
              )}
            </aside>
          )}
        </Container>

        {programme.stats?.length ? (
          <Section tone="dark" className="py-12 md:py-14">
            <h2 className="sr-only">Programme in numbers</h2>
            <StatsGrid stats={programme.stats} />
          </Section>
        ) : null}

        {gallery.length > 0 && (
          <Section>
            <SectionHeader title="Gallery" />
            <Gallery images={gallery} />
          </Section>
        )}
      </article>

      <Section tone="paper">
        <SectionHeader
          eyebrow="Impact"
          title="More programmes"
          action={
            <Button asChild variant="outline" size="lg">
              <Link href="/impact">
                All programmes <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          }
        />
        {more.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.id}>
                <ImpactCard programme={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-stone-600">More programmes will be published here soon.</p>
        )}
      </Section>
    </>
  )
}
