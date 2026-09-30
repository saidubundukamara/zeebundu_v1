/**
 * Idempotent seed: sectors, 16 businesses, group globals and a draft About page.
 * Safe to re-run — documents are matched by slug and updated in place.
 *
 * Usage: npm run seed
 * Optional: SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD create a first super-admin if none exists.
 * Optional (local only): SEED_DEMO_USERS=true adds one demo account per role (src/seed/users.ts).
 */
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { businesses } from './data/businesses'
import { groupCopy } from './data/group'
import { sectors } from './data/sectors'
import { photo, seedMedia } from './media'
import { seedDemoUsers } from './users'

/** Plain paragraphs → Lexical rich text JSON. */
const toRichText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      textFormat: 0,
      textStyle: '',
      children: [
        { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
      ],
    })),
  },
})

async function upsertBySlug<T extends 'sectors' | 'businesses' | 'pages'>(
  payload: Payload,
  collection: T,
  slug: string,
  data: Record<string, unknown>,
): Promise<number> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
  })
  const doc = existing.docs[0]
  const payloadData = { ...data, slug, generateSlug: false } as never
  if (doc) {
    await payload.update({ collection, id: doc.id, data: payloadData, depth: 0 })
    return doc.id as number
  }
  const created = await payload.create({ collection, data: payloadData, depth: 0 })
  return created.id as number
}

async function seed() {
  const payload = await getPayload({ config })
  const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

  // Temporary photography (skipped when src/seed/media/credits.json is absent)
  const photos = await seedMedia(payload)
  log(`${Object.keys(photos).length} photos`)

  // Sectors
  const sectorIDs: Record<string, number> = {}
  for (const sector of sectors) {
    sectorIDs[sector.slug] = await upsertBySlug(payload, 'sectors', sector.slug, {
      name: sector.name,
      description: sector.description,
      order: sector.order,
      ...(photo(photos, sector.slug) && { image: photo(photos, sector.slug) }),
    })
  }
  log(`${sectors.length} sectors`)

  // A business without its own photo borrows its sector's (the forex business shows
  // the Freetown banking wall rather than a foreign currency).
  const photoFor: Record<string, string> = { 'foreign-exchange': 'financial-services' }
  const businessPhoto = (slug: string) => photo(photos, slug) ?? photo(photos, photoFor[slug] ?? '')

  // Businesses (published so the site renders; contact details stay empty until supplied)
  const businessIDs: Record<string, number> = {}
  for (const business of businesses) {
    const sector = sectorIDs[business.sector]
    if (!sector) throw new Error(`Unknown sector "${business.sector}" for ${business.name}`)
    businessIDs[business.slug] = await upsertBySlug(payload, 'businesses', business.slug, {
      name: business.name,
      sector,
      tagline: business.tagline,
      summary: business.summary,
      overview: toRichText(business.overview),
      services: business.services.map(({ title, description }) => ({
        title,
        description: description || undefined,
      })),
      featured: business.featured,
      order: business.order,
      ...(businessPhoto(business.slug) && { heroImage: businessPhoto(business.slug) }),
      _status: 'published',
    })
  }
  log(`${businesses.length} businesses`)

  // Globals
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      groupName: 'Zeebundu Group',
      stats: [
        { value: String(businesses.length), label: 'Businesses' },
        { value: String(sectors.length), label: 'Sectors' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { label: 'About', url: '/about' } },
        { link: { label: 'Our Businesses', url: '/businesses' } },
        { link: { label: 'Impact', url: '/impact' } },
        { link: { label: 'Newsroom', url: '/news' } },
        { link: { label: 'Contact', url: '/contact' } },
      ],
      cta: { label: 'Send an enquiry', url: '/contact' },
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: groupCopy.footerTagline,
      legalLinks: [
        { link: { label: 'Privacy', url: '/privacy' } },
        { link: { label: 'Terms', url: '/terms' } },
      ],
      showNewsletter: true,
    },
  })
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        ...groupCopy.hero,
        ...(photo(photos, 'group-hero') && { image: photo(photos, 'group-hero') }),
        primaryCta: { label: 'Explore our businesses', url: '/businesses' },
        secondaryCta: { label: 'About Zeebundu', url: '/about' },
      },
      ctaBand: {
        heading: 'Work with Zeebundu',
        text: 'Partnerships, supply and general enquiries: tell us what you need and the right team will reply.',
        link: { label: 'Send an enquiry', url: '/contact' },
      },
      _status: 'published',
    },
  })
  await payload.updateGlobal({
    slug: 'media-kit',
    data: { boilerplate: groupCopy.pressBoilerplate },
  })
  log('globals')

  // About page stays a draft until mission, history and leadership are supplied
  await upsertBySlug(payload, 'pages', 'about', {
    title: 'About Zeebundu',
    layout: [
      { blockType: 'hero', heading: 'About Zeebundu', eyebrow: 'Zeebundu Group' },
      { blockType: 'richText', content: toRichText(groupCopy.about) },
    ],
    _status: 'draft',
  })
  log('about page (draft)')

  // Optional first super-admin
  const { SEED_ADMIN_EMAIL: email, SEED_ADMIN_PASSWORD: password } = process.env
  if (email && password) {
    const { totalDocs } = await payload.count({
      collection: 'users',
      where: { email: { equals: email } },
    })
    if (!totalDocs) {
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'Administrator', role: 'super-admin' },
      })
      log(`super-admin ${email}`)
    }
  }

  // Optional demo accounts, one per role (local only)
  await seedDemoUsers(payload, businessIDs, log)

  log('done')
}

// Top-level await: `payload run` exits as soon as this module finishes loading
await seed()
