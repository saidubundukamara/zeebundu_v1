import { newsCategoryLabels } from '@/components/cards/NewsCard'
import { getArticle, getNews, populated } from '@/lib/data'
import { formatDate } from '@/lib/links'
import { ogContentType, ogSize, renderOgImage } from '@/lib/seo/og'

export const alt = 'Zeebundu Group newsroom article'
export const size = ogSize
export const contentType = ogContentType

// Same split as the article page: the 20 latest at build, older ones on first request
export async function generateStaticParams() {
  const { docs } = await getNews({ limit: 20 })
  return docs.map((article) => ({ slug: article.slug as string })).filter((p) => p.slug)
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return renderOgImage({ eyebrow: 'Newsroom', title: 'Zeebundu Group' })
  const business = populated(article.business)
  return renderOgImage({
    eyebrow: [newsCategoryLabels[article.category], business?.name].filter(Boolean).join(' · '),
    title: article.title,
    footer: article.publishedAt ? formatDate(article.publishedAt) : 'Zeebundu Group newsroom',
  })
}
