import 'server-only'

import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPayload } from 'payload'

import { docPath } from './paths'
import { tags } from './tags'

/** CMS redirects (Administration → Redirects) as a from → to map. Old site URLs live in next.config.ts. */
const getRedirectMap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'redirects', limit: 1000, depth: 1 })
    const map: Record<string, string> = {}
    for (const r of docs) {
      const ref = r.to?.reference
      const target =
        r.to?.type === 'reference' && ref && typeof ref.value === 'object'
          ? docPath(ref.relationTo, (ref.value as { slug?: string | null }).slug)
          : r.to?.url
      if (r.from && target) map[normalise(r.from)] = target
    }
    return map
  },
  ['redirects'],
  { tags: [tags.redirects] },
)

const normalise = (path: string) => {
  const p = path
    .trim()
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/\/+$/, '')
  return (p.startsWith('/') ? p : `/${p}`).toLowerCase() || '/'
}

/** Use instead of notFound(): follows a CMS redirect for this path if there is one. */
export async function notFoundOrRedirect(path: string): Promise<never> {
  const target = (await getRedirectMap())[normalise(path)]
  if (target && normalise(target) !== normalise(path)) permanentRedirect(target)
  notFound()
}
