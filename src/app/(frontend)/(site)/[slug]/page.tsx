import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks'
import { PageHeader } from '@/components/layout/PageHeader'
import { getPage, getPageSlugs } from '@/lib/data'

// Routes with their own page files take precedence; these are generic CMS pages (privacy, terms…)
const reserved = new Set(['about'])

export async function generateStaticParams() {
  return (await getPageSlugs()).filter((slug) => !reserved.has(slug)).map((slug) => ({ slug }))
}

export async function generateMetadata(props: PageProps<'/[slug]'>): Promise<Metadata> {
  const page = await getPage((await props.params).slug)
  if (!page) return { title: 'Page not found' }
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description ?? undefined,
  }
}

export default async function CMSPage(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params
  const page = reserved.has(slug) ? null : await getPage(slug)
  if (!page) notFound()

  const startsWithHero = page.layout?.[0]?.blockType === 'hero'
  return (
    <>
      {!startsWithHero && <PageHeader title={page.title} crumbs={[{ label: page.title }]} />}
      <RenderBlocks blocks={page.layout} />
    </>
  )
}
