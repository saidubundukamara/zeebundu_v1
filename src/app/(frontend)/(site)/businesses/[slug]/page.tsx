import { draftMode } from 'next/headers'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import type { Metadata } from 'next'

import { notFoundOrRedirect } from '@/lib/redirects'
import Link from 'next/link'

import { BusinessHero } from '@/components/business/BusinessHero'
import { ContactDetails } from '@/components/business/ContactDetails'
import { breadcrumbJsonLd, JsonLd, localBusinessJsonLd } from '@/lib/seo/jsonld'
import { Locations } from '@/components/business/Locations'
import { RenderBlocks } from '@/components/blocks'
import { NewsCard } from '@/components/cards/NewsCard'
import { Gallery } from '@/components/Gallery'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { StatsGrid } from '@/components/StatsGrid'
import { Button } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { getBusiness, getBusinesses, getNews, populated, relationID } from '@/lib/data'
import type { Media as MediaDoc } from '@/payload-types'

export async function generateStaticParams() {
  const businesses = await getBusinesses()
  return businesses.map((business) => ({ slug: business.slug }))
}

export async function generateMetadata(props: PageProps<'/businesses/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const business = await getBusiness(slug)
  if (!business) return {}

  const title = business.meta?.title || business.name
  const description = business.meta?.description || business.summary
  const image = populated(business.meta?.image) ?? populated(business.heroImage)
  const imageURL = image?.sizes?.hero?.url ?? image?.url

  return {
    title,
    description,
    alternates: { canonical: `/businesses/${business.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/businesses/${business.slug}`,
      ...(imageURL && { images: [{ url: imageURL, alt: (image as MediaDoc).alt }] }),
    },
  }
}

const hasText = (value: unknown) =>
  Boolean(
    value &&
    typeof value === 'object' &&
    'root' in value &&
    (value as { root: { children?: unknown[] } }).root.children?.length,
  )

export default async function BusinessPage(props: PageProps<'/businesses/[slug]'>) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await props.params
  const business = await getBusiness(slug, draft)
  if (!business) return notFoundOrRedirect(`/businesses/${slug}`)

  const sector = populated(business.sector)
  const [allBusinesses, news] = await Promise.all([
    getBusinesses(),
    getNews({ business: business.id, limit: 3 }),
  ])
  const siblings = allBusinesses.filter(
    (b) => b.id !== business.id && relationID(b.sector) === relationID(business.sector),
  )

  const services = business.services ?? []
  const stats = business.stats ?? []
  const gallery = (business.gallery ?? []).filter((img) => typeof img === 'object')
  const locations = business.locations ?? []
  const blocks = business.layout ?? []

  // Light sections alternate default/paper, whichever optional ones are present.
  let light = 0
  const nextTone = () => (light++ % 2 === 0 ? 'default' : 'paper') as 'default' | 'paper'

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Our businesses', href: '/businesses' },
    ...(sector ? [{ label: sector.name, href: `/businesses/sector/${sector.slug}` }] : []),
    { label: business.name },
  ]

  const overviewTone = nextTone()
  const servicesTone = services.length ? nextTone() : 'default'
  const blocksStart = blocks.length ? nextTone() : 'default'
  light += Math.max(blocks.length - 1, 0) // RenderBlocks alternates internally
  const galleryTone = gallery.length ? nextTone() : 'default'
  const locationsTone = locations.length ? nextTone() : 'default'
  const enquireTone = nextTone()
  const newsTone = news.docs.length ? nextTone() : 'default'
  const siblingsTone = nextTone()

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd(business),
          breadcrumbJsonLd(
            crumbs.map((c) => ({ name: c.label, path: c.href ?? `/businesses/${business.slug}` })),
          ),
        ]}
      />

      <BusinessHero business={business} crumbs={crumbs} />

      {/* Overview */}
      <Section tone={overviewTone}>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <h2 className="text-h2 text-forest-800">Overview</h2>
            {hasText(business.overview) ? (
              <RichText data={business.overview} />
            ) : (
              <p className="text-lead text-stone-700">{business.summary}</p>
            )}
          </div>
          <aside
            aria-labelledby="at-a-glance"
            className="h-fit space-y-5 rounded-lg border border-stone-200 bg-stone-100 p-6 group-data-[tone=paper]/section:bg-white"
          >
            <h2 id="at-a-glance" className="font-heading text-h3 text-forest-800">
              At a glance
            </h2>
            <dl className="divide-y divide-stone-200 text-sm">
              {sector && (
                <div className="flex justify-between gap-4 py-3 first:pt-0">
                  <dt className="text-stone-600">Sector</dt>
                  <dd className="text-right">
                    <Link
                      href={`/businesses/sector/${sector.slug}`}
                      className="rounded-sm font-medium text-forest-700 underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {sector.name}
                    </Link>
                  </dd>
                </div>
              )}
              {locations.length > 0 && (
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-stone-600">Locations</dt>
                  <dd className="text-right font-medium">
                    <a
                      href="#locations"
                      className="rounded-sm text-forest-700 underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {locations.length} {locations.length === 1 ? 'location' : 'locations'}
                    </a>
                  </dd>
                </div>
              )}
              {business.website && (
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-stone-600">Website</dt>
                  <dd className="min-w-0 text-right">
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-1 rounded-sm font-medium text-forest-700 underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="truncate">
                        {business.website.replace(/^https?:\/\//, '')}
                      </span>
                      <ArrowUpRightIcon aria-hidden className="size-3.5 shrink-0" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <Button asChild variant="default" size="lg" className="w-full">
              <a href="#enquire">Send an enquiry</a>
            </Button>
          </aside>
        </div>
      </Section>

      {/* Products & services */}
      {services.length > 0 && (
        <Section tone={servicesTone}>
          <SectionHeader eyebrow="What we offer" title="Products & services" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const image = populated(service.image)
              return (
                <li
                  key={service.id ?? service.title}
                  className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white"
                >
                  {image && (
                    <Media
                      resource={image}
                      className="aspect-[16/10]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-2 border-t-2 border-gold-400 p-5">
                    <h3 className="font-heading text-h3 text-forest-800">{service.title}</h3>
                    {service.description && (
                      <p className="text-sm leading-relaxed text-stone-600">
                        {service.description}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </Section>
      )}

      {/* Key stats */}
      {stats.length > 0 && (
        <Section tone="dark" aria-label={`${business.name} in numbers`}>
          <StatsGrid stats={stats} />
        </Section>
      )}

      {/* Business-specific extras (rates, loans, products, rooms, FAQ…) */}
      <RenderBlocks blocks={blocks} startTone={blocksStart} />

      {/* Gallery */}
      {gallery.length > 0 && (
        <Section tone={galleryTone}>
          <SectionHeader title="Gallery" />
          <Gallery images={gallery} />
        </Section>
      )}

      {/* Locations & opening hours */}
      {locations.length > 0 && (
        <Section tone={locationsTone} id="locations" className="scroll-mt-20">
          <SectionHeader
            eyebrow="Visit us"
            title="Locations & opening hours"
            description={
              locations.length > 1 ? `Find us at ${locations.length} locations.` : undefined
            }
          />
          <Locations locations={locations} />
        </Section>
      )}

      {/* Get in touch */}
      <Section tone={enquireTone} id="enquire" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Get in touch"
              title={`Contact ${business.name}`}
              description="Send us a message and the team will get back to you, or reach us directly."
              className="mb-0"
            />
            <ContactDetails business={business} />
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-5 md:p-8">
            <EnquiryForm business={{ id: business.id, name: business.name }} />
          </div>
        </div>
      </Section>

      {/* Related news */}
      {news.docs.length > 0 && (
        <Section tone={newsTone}>
          <SectionHeader
            eyebrow="Newsroom"
            title={`News from ${business.name}`}
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

      {/* Other businesses in this sector */}
      {siblings.length > 0 && sector && (
        <Section tone={siblingsTone}>
          <SectionHeader
            eyebrow={sector.name}
            title="Other businesses in this sector"
            action={
              <Button asChild variant="outline" size="lg">
                <Link href={`/businesses/sector/${sector.slug}`}>
                  View sector <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => {
              const logo = populated(sibling.logo)
              return (
                <li key={sibling.id}>
                  <Link
                    href={`/businesses/${sibling.slug}`}
                    className="group flex h-full items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 transition-colors outline-none hover:border-forest-700 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {logo ? (
                      <Media
                        resource={logo}
                        size="thumbnail"
                        className="size-12 shrink-0 rounded-md"
                        sizes="48px"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex size-12 shrink-0 items-center justify-center rounded-md bg-forest-800 font-heading text-lg text-gold-300"
                      >
                        {sibling.name.charAt(0)}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-lg text-forest-800 group-hover:underline">
                        {sibling.name}
                      </span>
                      {sibling.tagline && (
                        <span className="line-clamp-1 block text-sm text-stone-600">
                          {sibling.tagline}
                        </span>
                      )}
                    </span>
                    <ArrowRightIcon
                      aria-hidden
                      className="size-5 shrink-0 text-stone-400 transition-colors group-hover:text-forest-700"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </Section>
      )}
    </>
  )
}
