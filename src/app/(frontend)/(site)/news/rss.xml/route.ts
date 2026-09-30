import { newsCategoryLabels } from '@/components/cards/NewsCard'
import { getNews, populated } from '@/lib/data'
import { siteURL } from '@/lib/links'

/**
 * RSS 2.0 feed of the 20 latest published articles at /news/rss.xml.
 * Rendered statically and regenerated at most hourly; the `news` cache tag used by
 * getNews also lets publish hooks refresh it sooner.
 */
export const revalidate = 3600

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export async function GET() {
  const { docs } = await getNews({ limit: 20 })
  const newsURL = siteURL('/news')
  const feedURL = siteURL('/news/rss.xml')
  const lastBuild = docs[0]?.publishedAt ?? new Date().toISOString()

  const items = docs
    .map((article) => {
      const link = siteURL(`/news/${article.slug}`)
      const business = populated(article.business)
      const categories = [newsCategoryLabels[article.category], business?.name].filter(Boolean)
      return [
        '    <item>',
        `      <title>${escape(article.title)}</title>`,
        `      <link>${escape(link)}</link>`,
        `      <guid isPermaLink="true">${escape(link)}</guid>`,
        article.publishedAt &&
          `      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>`,
        `      <description>${escape(article.excerpt)}</description>`,
        ...categories.map((c) => `      <category>${escape(c as string)}</category>`),
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zeebundu Group Newsroom</title>
    <link>${escape(newsURL)}</link>
    <description>News, press releases and stories from Zeebundu Group and its businesses in Sierra Leone.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${escape(feedURL)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
