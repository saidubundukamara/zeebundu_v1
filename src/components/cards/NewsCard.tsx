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
    <Link
      href={`/news/${article.slug}`}
      className="group flex h-full flex-col border border-map-rule bg-card transition-colors duration-300 hover:border-map-ink"
    >
      <div className="overflow-hidden">
        <Media
          resource={article.heroImage}
          className="aspect-[16/10] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-map-ink-soft">
          <span className="font-medium text-map-course">
            {newsCategoryLabels[article.category]}
          </span>
          {business && <>, {business.name}</>}
        </p>
        <h3 className="font-heading text-2xl leading-tight font-extrabold uppercase group-hover:text-map-course">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-map-ink-soft">{article.excerpt}</p>
        {article.publishedAt && (
          <time
            dateTime={article.publishedAt}
            className="mt-auto pt-2 text-xs text-map-ink-soft tabular"
          >
            {formatDate(article.publishedAt)}
          </time>
        )}
      </div>
    </Link>
  )
}
