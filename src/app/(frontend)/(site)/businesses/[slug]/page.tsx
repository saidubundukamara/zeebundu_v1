import { draftMode } from 'next/headers'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'

import { notFoundOrRedirect } from '@/lib/redirects'
import Link from 'next/link'

import { BusinessHero } from '@/components/business/BusinessHero'
import { ContactDetails } from '@/components/business/ContactDetails'
import { breadcrumbJsonLd, JsonLd, localBusinessJsonLd } from '@/lib/seo/jsonld'
import { Locations } from '@/components/business/Locations'
import { RenderBlocks } from '@/components/blocks'
import { Gallery } from '@/components/Gallery'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { StatsGrid } from '@/components/StatsGrid'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { ControlMark } from '@/components/map/symbols'
import { Reveal } from '@/components/motion/Reveal'
import { getCourse } from '@/lib/course'
import { getBusiness, getBusinesses, getNews, populated } from '@/lib/data'
import { formatDate } from '@/lib/links'
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
  const [{ controls }, news] = await Promise.all([
    getCourse(),
    getNews({ business: business.id, limit: 3 }),
  ])
  const at = controls.findIndex((c) => c.business.id === business.id)
  const control = at >= 0 ? controls[at] : null
  const previous = at > 0 ? controls[at - 1] : null
  const next = at >= 0 && at < controls.length - 1 ? controls[at + 1] : null

  const services = business.services ?? []
  const stats = business.stats ?? []
  const gallery = (business.gallery ?? []).filter((img) => typeof img === 'object')
  const locations = business.locations ?? []
  const blocks = business.layout ?? []

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Our businesses', href: '/businesses' },
    ...(sector ? [{ label: sector.name, href: `/businesses/sector/${sector.slug}` }] : []),
    { label: business.name },
  ]

  const facts = [
    control && {
      label: 'Control',
      value: <span className="control-num text-xl text-map-course">{control.code}</span>,
    },
    sector && {
      label: 'Sector',
      value: (
        <Link
          href={`/businesses/sector/${sector.slug}`}
          className="font-medium underline hover:text-map-course"
        >
          {sector.name}
        </Link>
      ),
    },
    locations.length > 0 && {
      label: 'Locations',
      value: (
        <a href="#locations" className="font-medium underline hover:text-map-course">
          {locations.length} {locations.length === 1 ? 'location' : 'locations'}
        </a>
      ),
    },
    business.website && {
      label: 'Website',
      value: (
        <a
          href={business.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-1 font-medium underline hover:text-map-course"
        >
          <span className="truncate">{business.website.replace(/^https?:\/\//, '')}</span>
          <ArrowUpRightIcon aria-hidden weight="light" className="size-3.5 shrink-0" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ),
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[]

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

      <BusinessHero
        business={business}
        crumbs={crumbs}
        code={control?.code}
        sectorName={sector?.name}
        leg={controls
          .filter((c) => c.sector.id === control?.sector.id)
          .map((c) => ({ code: c.code, slug: c.business.slug, name: c.business.name }))}
      />

      {/* Overview, with the control description as a legend table */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <Reveal className="space-y-6">
            <h2 className="text-h2">Overview</h2>
            {hasText(business.overview) ? (
              <RichText data={business.overview} />
            ) : (
              <p className="max-w-[60ch] text-lead text-map-ink">{business.summary}</p>
            )}
          </Reveal>
          <aside aria-labelledby="control-description" className="h-fit">
            <h2
              id="control-description"
              className="border-b border-map-ink pb-2 font-heading text-lg font-extrabold uppercase"
            >
              Control description
            </h2>
            <dl className="text-sm">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-4 border-b border-map-rule py-3"
                >
                  <dt className="text-map-ink-soft">{fact.label}</dt>
                  <dd className="min-w-0">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {/* Products & services: numbered rows, photo where one exists */}
      {services.length > 0 && (
        <Section className="border-t border-map-rule">
          <h2 className="mb-12 text-h2">Products and services</h2>
          <ol className="grid gap-x-10 border-t border-map-ink md:grid-cols-2">
            {services.map((service, i) => {
              const image = populated(service.image)
              return (
                <Reveal
                  as="li"
                  key={service.id ?? service.title}
                  delay={(i % 2) * 0.08}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-map-rule py-6"
                >
                  <span className="control-num text-2xl text-map-course">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl leading-none font-extrabold uppercase">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-sm leading-relaxed text-map-ink-soft">
                        {service.description}
                      </p>
                    )}
                    {image && (
                      <Media
                        resource={image}
                        className="mt-2 aspect-[16/9]"
                        sizes="(min-width: 768px) 40vw, 100vw"
                      />
                    )}
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </Section>
      )}

      {stats.length > 0 && (
        <Section className="border-t border-map-rule" aria-label={`${business.name} in numbers`}>
          <StatsGrid stats={stats} />
        </Section>
      )}

      {/* Business-specific extras (rates, loans, products, rooms, FAQ…) */}
      <RenderBlocks blocks={blocks} />

      {gallery.length > 0 && (
        <Section className="border-t border-map-rule">
          <h2 className="mb-12 text-h2">Gallery</h2>
          <Gallery images={gallery} />
        </Section>
      )}

      {locations.length > 0 && (
        <Section id="locations" className="scroll-mt-20 border-t border-map-rule">
          <SectionHeader
            title="Where to find us"
            description={locations.length > 1 ? `${locations.length} locations.` : undefined}
          />
          <Locations locations={locations} />
        </Section>
      )}

      {/* Get in touch */}
      <Section id="enquire" className="scroll-mt-20 border-t border-map-rule">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="space-y-8">
            <SectionHeader
              title={`Contact ${business.name}`}
              description="Send a message and the team will reply, or use the details below."
              className="mb-0"
            />
            <ContactDetails business={business} />
          </div>
          <div className="border border-map-ink bg-card p-5 md:p-8">
            <EnquiryForm business={{ id: business.id, name: business.name }} />
          </div>
        </div>
      </Section>

      {news.docs.length > 0 && (
        <Section className="border-t border-map-rule">
          <h2 className="mb-10 text-h2">News from {business.name}</h2>
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
                  <span className="font-heading text-2xl leading-tight font-extrabold uppercase group-hover:text-map-course">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* The course continues: previous and next controls */}
      {(previous || next) && (
        <nav aria-label="Other businesses" className="border-t border-map-ink">
          <div className="mx-auto grid max-w-[1360px] md:grid-cols-2">
            {[previous, next].map((c, i) =>
              c ? (
                <Link
                  key={c.business.id}
                  href={`/businesses/${c.business.slug}`}
                  className={
                    'group flex items-center gap-5 px-4 py-10 transition-colors hover:bg-map-course-soft md:px-8 md:py-14 ' +
                    (i === 1 ? 'md:flex-row-reverse md:text-right' : '') +
                    (i === 1 && previous
                      ? ' border-t border-map-rule md:border-t-0 md:border-l'
                      : '')
                  }
                >
                  {i === 0 ? (
                    <ArrowLeftIcon
                      aria-hidden
                      weight="light"
                      className="size-7 shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
                    />
                  ) : (
                    <ArrowRightIcon
                      aria-hidden
                      weight="light"
                      className="size-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                  <ControlMark code={c.code} />
                  <span className="min-w-0">
                    <span className="block text-sm text-map-ink-soft">
                      {i === 0 ? 'Previous control' : 'Next control'}
                    </span>
                    <span className="block font-heading text-3xl leading-none font-extrabold uppercase">
                      {c.business.name}
                    </span>
                  </span>
                </Link>
              ) : (
                <span key={i} aria-hidden className="hidden md:block" />
              ),
            )}
          </div>
        </nav>
      )}
    </>
  )
}
