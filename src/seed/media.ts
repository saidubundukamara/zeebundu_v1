import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Payload } from 'payload'

/**
 * Temporary seed photography (Unsplash License), listed in src/seed/media/credits.json.
 * Replace with real Zeebundu photography before launch (docs/LAUNCH_CHECKLIST.md).
 */
type Credit = {
  file: string
  alt: string
  photographer: string
  photographerUrl?: string
  pageUrl: string
  license: string
}

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'media')

/** Uploads each credited photo once (matched by filename) and returns file → media ID. */
export async function seedMedia(payload: Payload): Promise<Record<string, number>> {
  const manifest = path.join(dir, 'credits.json')
  if (!existsSync(manifest)) return {}
  const credits = JSON.parse(readFileSync(manifest, 'utf8')) as Credit[]
  const ids: Record<string, number> = {}

  for (const credit of credits) {
    const filePath = path.join(dir, credit.file)
    if (!existsSync(filePath)) continue
    const caption = `Photo: ${credit.photographer} on Unsplash (temporary)`
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: credit.file } },
      limit: 1,
      depth: 0,
    })
    const doc = existing.docs[0]
    if (doc) {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: { alt: credit.alt, caption },
        depth: 0,
      })
      ids[credit.file] = doc.id as number
    } else {
      const created = await payload.create({
        collection: 'media',
        data: { alt: credit.alt, caption },
        filePath,
        depth: 0,
      })
      ids[credit.file] = created.id as number
    }
  }
  return ids
}

/** Look up a seeded photo by its base name, e.g. photo(ids, 'pharmacy'). */
export const photo = (ids: Record<string, number>, name: string) =>
  ids[`${name}.jpg`] ?? ids[`${name}.jpeg`] ?? ids[`${name}.png`] ?? undefined
