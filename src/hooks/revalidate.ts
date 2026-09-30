import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  GlobalAfterChangeHook,
  GlobalConfig,
} from 'payload'

import { tags } from '@/lib/tags'

type Doc = { slug?: string | null; _status?: 'draft' | 'published' | null }

/**
 * Expire cached site data so published changes show on the very next request.
 * Outside a Next.js request (seed script, CLI) there is no cache to expire, so errors are ignored.
 */
export const expireTags = (tagList: string[], logger?: { debug: (msg: string) => void }) => {
  for (const tag of new Set(tagList)) {
    try {
      revalidateTag(tag, { expire: 0 })
    } catch {
      logger?.debug(`[revalidate] skipped "${tag}" (no Next.js request context)`)
    }
  }
}

/** Drafts don't affect the public site — only publish, unpublish and edits to published docs do. */
const affectsPublicSite = (doc?: Doc | null, previous?: Doc | null) =>
  doc?._status === undefined || doc?._status === 'published' || previous?._status === 'published'

/**
 * Adds afterChange/afterDelete hooks that expire the collection's tag and per-slug tags
 * (old and new slug, so renamed pages drop out of the cache too).
 */
export const withRevalidation = (
  collection: CollectionConfig,
  baseTags: string[],
  slugTag?: (slug: string) => string,
): CollectionConfig => {
  const tagsFor = (...docs: (Doc | null | undefined)[]) => [
    ...baseTags,
    ...(slugTag
      ? docs
          .map((d) => d?.slug)
          .filter((s): s is string => Boolean(s))
          .map(slugTag)
      : []),
  ]

  const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req, context }) => {
    if (!context.disableRevalidate && affectsPublicSite(doc, previousDoc)) {
      expireTags(tagsFor(doc, previousDoc), req.payload.logger)
    }
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req, context }) => {
    if (!context.disableRevalidate) expireTags(tagsFor(doc), req.payload.logger)
    return doc
  }

  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), afterChange],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), afterDelete],
    },
  }
}

export const withGlobalRevalidation = (global: GlobalConfig): GlobalConfig => {
  const afterChange: GlobalAfterChangeHook = ({ doc, previousDoc, req, context }) => {
    if (!context.disableRevalidate && affectsPublicSite(doc, previousDoc)) {
      expireTags([tags.global(global.slug)], req.payload.logger)
    }
    return doc
  }
  return {
    ...global,
    hooks: { ...global.hooks, afterChange: [...(global.hooks?.afterChange ?? []), afterChange] },
  }
}
