/** Cache tags shared by the data layer (src/lib/data.ts) and Payload revalidation hooks. */
export const tags = {
  businesses: 'businesses',
  sectors: 'sectors',
  news: 'news',
  impact: 'impact-programmes',
  leadership: 'leadership',
  pages: 'pages',
  redirects: 'redirects',
  global: (slug: string) => `global:${slug}`,
} as const
