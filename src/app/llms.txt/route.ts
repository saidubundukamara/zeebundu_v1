import { getBusinessesBySector, getImpactProgrammes } from '@/lib/data'
import { absoluteURL } from '@/lib/seo/jsonld'

/**
 * /llms.txt (llmstxt.org) — a plain-Markdown map of the site for AI assistants:
 * every published business by sector, plus the group pages. Cached like the sitemap;
 * the data helpers' tags refresh it on publish. Preview deploys serve a 404, as robots.ts
 * closes them to crawlers.
 */
export const revalidate = 3600

const link = (title: string, path: string, note?: string | null) =>
  `- [${title}](${absoluteURL(path)})${note ? `: ${note}` : ''}`

export async function GET() {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return new Response('Not found', { status: 404 })
  }

  const [groups, programmes] = await Promise.all([getBusinessesBySector(), getImpactProgrammes()])
  const businessCount = groups.reduce((n, g) => n + g.businesses.length, 0)

  const lines = [
    '# Zeebundu Group',
    '',
    `> A Sierra Leonean group with ${businessCount} businesses across ${groups.length} sectors: ${groups.map((g) => g.sector.name).join(', ')}. Each business has its own page with contact details and an enquiry form.`,
    '',
    '## Businesses',
    '',
    ...groups.flatMap(({ sector, businesses }) => [
      `### ${sector.name}`,
      '',
      link(`${sector.name} overview`, `/businesses/sector/${sector.slug}`, sector.description),
      ...businesses.map((b) => link(b.name, `/businesses/${b.slug}`, b.tagline || b.summary)),
      '',
    ]),
    '## Group',
    '',
    link('About', '/about', 'Who runs the group and how it is organised'),
    link('All businesses', '/businesses'),
    link('Impact', '/impact', 'Community and social programmes'),
    link('News', '/news'),
    link('Contact', '/contact', 'Group enquiries; business enquiries go through each business page'),
    '',
    '## Optional',
    '',
    link('Media kit', '/news/media-kit'),
    ...programmes.filter((p) => p.slug).map((p) => link(p.title, `/impact/${p.slug}`, p.summary)),
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
