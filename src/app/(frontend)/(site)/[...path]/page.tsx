import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { RenderBlocks } from '@/components/blocks'
import { PageHeader } from '@/components/layout/PageHeader'
import { getPage, getPageSlugs } from '@/lib/data'
import { notFoundOrRedirect } from '@/lib/redirects'

/**
 * Generic CMS pages (privacy, terms…) at /[slug]. Any other unmatched URL lands here too,
 * so CMS redirects are checked before showing the 404.
 */

// Routes with their own page files take precedence
const reserved = new Set(['about'])

const slugFrom = (path: string[]) => (path.length === 1 && !reserved.has(path[0]) ? path[0] : null)

export async function generateStaticParams() {
  return (await getPageSlugs())
    .filter((slug) => !reserved.has(slug))
    .map((slug) => ({ path: [slug] }))
}

export async function generateMetadata(props: PageProps<'/[...path]'>): Promise<Metadata> {
  const slug = slugFrom((await props.params).path)
  const page = slug ? await getPage(slug) : null
  if (!page) return { title: 'Page not found' }
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description ?? undefined,
  }
}

export default async function CMSPage(props: PageProps<'/[...path]'>) {
  const { isEnabled: draft } = await draftMode()
  const { path } = await props.params
  const slug = slugFrom(path)
  const page = slug ? await getPage(slug, draft) : null
  if (!page) return notFoundOrRedirect(`/${path.join('/')}`)

  const startsWithHero = page.layout?.[0]?.blockType === 'hero'
  return (
    <>
      {!startsWithHero && <PageHeader title={page.title} crumbs={[{ label: page.title }]} />}
      <RenderBlocks blocks={page.layout} />
    </>
  )
}
