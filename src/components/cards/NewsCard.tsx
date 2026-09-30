import Link from 'next/link'

import { Media } from '@/components/Media'
import { populated } from '@/lib/data'
import { formatDate } from '@/lib/links'
import type { News } from '@/payload-types'

export const newsCategoryLabels: Record<News['category'], string> = {
  news: 'News',
  press: 'Press release',
  story: 'Story',
}

export type NewsCardData = Pick<
  News,
  'id' | 'title' | 'slug' | 'excerpt' | 'heroImage' | 'category' | 'business' | 'publishedAt'
>

export function NewsCard({ article }: { article: NewsCardData }) {
  const business = populated(article.business)
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Media
        resource={article.heroImage}
        className="aspect-[16/9]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">
          {newsCategoryLabels[article.category]}
          {business && <> · {business.name}</>}
        </p>
        <h3 className="font-heading text-h3 text-forest-800">
          <Link
            href={`/news/${article.slug}`}
            className="group-hover:underline after:absolute after:inset-0"
          >
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-stone-600">{article.excerpt}</p>
        {article.publishedAt && (
          <time dateTime={article.publishedAt} className="mt-auto text-xs text-stone-500">
            {formatDate(article.publishedAt)}
          </time>
        )}
      </div>
    </article>
  )
}
