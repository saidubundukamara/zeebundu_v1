import { ArrowLeftIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { NewsCard, newsCategoryLabels, type NewsCardData } from '@/components/cards/NewsCard'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { ShareLinks } from '@/components/news/ShareLinks'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { getArticle, getNews, populated, relationID } from '@/lib/data'
import { formatDate, siteURL } from '@/lib/links'
import type { Media as MediaDoc, News } from '@/payload-types'

/**
 * The 20 most recent articles are prerendered at build; older ones render on first visit
 * and are then cached (dynamicParams defaults to true). Keeps builds fast as the archive grows.
 */
export async function generateStaticParams() {
  const { docs } = await getNews({ limit: 20 })
  return docs.map((article) => ({ slug: article.slug as string })).filter((p) => p.slug)
}

const imageURL = (image: News['heroImage']) => {
  const doc = populated(image as number | MediaDoc)
  const url = doc?.sizes?.hero?.url ?? doc?.url
  return url ? (url.startsWith('http') ? url : siteURL(url)) : undefined
}

export async function generateMetadata(props: PageProps<'/news/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const article = await getArticle(slug)
  if (!article) return {}
  const image = imageURL(article.heroImage)
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt,
      authors: article.author ? [article.author] : undefined,
      section: newsCategoryLabels[article.category],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: image ? 'summary_large_image' : 'summary' },
  }
}

/** Up to 3 other articles: same business first, then same category, then the latest. */
async function getRelated(article: News): Promise<NewsCardData[]> {
  const business = relationID(article.business) ?? undefined
  const [byBusiness, byCategory, latest] = await Promise.all([
    business ? getNews({ business, limit: 4 }) : null,
    getNews({ category: article.category, limit: 4 }),
    getNews({ limit: 4 }),
  ])
  const seen = new Set([article.id])
  return [...(byBusiness?.docs ?? []), ...byCategory.docs, ...latest.docs]
    .filter((doc) => !seen.has(doc.id) && seen.add(doc.id))
    .slice(0, 3)
}

export default async function ArticlePage(props: PageProps<'/news/[slug]'>) {
  const { slug } = await props.params
  const article = await getArticle(slug)
  if (!article) notFound()

  const business = populated(article.business)
  const related = await getRelated(article)
  const url = siteURL(`/news/${article.slug}`)
  const image = imageURL(article.heroImage)
  const category = newsCategoryLabels[article.category]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.excerpt,
      url,
      mainEntityOfPage: url,
      datePublished: article.publishedAt ?? article.createdAt,
      dateModified: article.updatedAt,
      image: image ? [image] : undefined,
      articleSection: category,
      author: article.author
        ? { '@type': 'Person', name: article.author }
        : { '@type': 'Organization', name: 'Zeebundu Group', url: siteURL('/') },
      publisher: {
        '@type': 'Organization',
        name: 'Zeebundu Group',
        url: siteURL('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { name: 'Home', item: siteURL('/') },
        { name: 'Newsroom', item: siteURL('/news') },
        { name: article.title, item: url },
      ].map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        // Escape `<` so CMS text can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <PageHeader
        title={article.title}
        description={article.excerpt}
        eyebrow={[category, business?.name].filter(Boolean).join(' · ')}
        crumbs={[{ label: 'Newsroom', href: '/news' }, { label: article.title }]}
      >
        {article.publishedAt && (
          <p className="text-sm text-stone-600">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.author && <> · By {article.author}</>}
          </p>
        )}
      </PageHeader>

      <article className="py-10 md:py-14">
        <Container className="max-w-5xl">
          <Media
            resource={article.heroImage}
            size="hero"
            priority
            className="aspect-[16/9] rounded-lg"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </Container>

        <Container className="mt-10 max-w-3xl md:mt-14">
          <RichText data={article.body} />

          <footer className="mt-12 space-y-6 border-t border-stone-200 pt-8">
            {article.author && (
              <p className="text-sm text-stone-600">
                Written by <span className="font-medium text-stone-900">{article.author}</span>
              </p>
            )}
            <ShareLinks url={url} title={article.title} />
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg">
                <Link href="/news">
                  <ArrowLeftIcon data-icon="inline-start" /> Back to the newsroom
                </Link>
              </Button>
              {business && (
                <Button asChild variant="ghost" size="lg">
                  <Link href={`/businesses/${business.slug}`}>About {business.name}</Link>
                </Button>
              )}
            </div>
          </footer>
        </Container>
      </article>

      {related.length > 0 && (
        <Section tone="paper">
          <SectionHeader eyebrow="Newsroom" title="More from the newsroom" />
          <ul className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <NewsCard article={item} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
