import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Payload } from 'payload'

import { isLocalDatabase } from './env'

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

const cloudinaryEnabled = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_SECRET,
)

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'media')

/**
 * Uploads each credited photo once (matched by filename) and returns file → media ID.
 * Goes to Cloudinary when CLOUDINARY_* is set (see src/lib/storage/cloudinary.ts).
 */
export async function seedMedia(payload: Payload): Promise<Record<string, number>> {
  const manifest = path.join(dir, 'credits.json')
  if (!existsSync(manifest)) return {}
  // Without Cloudinary, uploads land on this machine's disk. That's fine for local dev,
  // but a hosted database would end up pointing at files that don't exist in production.
  if (!cloudinaryEnabled && !isLocalDatabase()) {
    payload.logger.warn(
      '[seed] photos skipped: set CLOUDINARY_* to seed photos into a hosted database',
    )
    return {}
  }
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
      // Re-send the file when Cloudinary is on but this copy still lives on local disk.
      const moveToCloud = cloudinaryEnabled && !doc.url?.startsWith('https://res.cloudinary.com/')
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: { alt: credit.alt, caption },
        ...(moveToCloud && { filePath }),
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
