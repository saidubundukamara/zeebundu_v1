/**
 * Idempotent seed: sectors, businesses, group globals, leadership, the first news story and the
 * group pages (About, Projects and Locations, Community, Careers, Contact FAQ, legal).
 * Safe to re-run: documents are matched by slug and updated in place. Businesses and sectors
 * that are no longer in the seed data are deleted.
 *
 * Usage: npm run seed
 * Optional: SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD create a first super-admin if none exists.
 * Optional (local only): SEED_DEMO_USERS=true adds one demo account per role (src/seed/users.ts).
 */
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { businesses } from './data/businesses'
import { groupCopy } from './data/group'
import { legalPages } from './data/legal'
import { sectors } from './data/sectors'
import { photo, seedMedia } from './media'
import { seedDemoUsers } from './users'

/** Plain paragraphs → Lexical rich text JSON. A line starting with "## " becomes an h2. */
const toRichText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((line) => {
      const heading = line.startsWith('## ')
      const text = heading ? line.slice(3) : line
      return {
        ...(heading
          ? { type: 'heading', tag: 'h2' }
          : { type: 'paragraph', textFormat: 0, textStyle: '' }),
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
        ],
      }
    }),
  },
})

async function upsertBySlug<T extends 'sectors' | 'businesses' | 'pages' | 'news'>(
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

/** Deletes documents whose slug is no longer in the seed data (renamed or dropped). */
async function pruneMissing(
  payload: Payload,
  collection: 'sectors' | 'businesses',
  keep: string[],
): Promise<string[]> {
  const { docs } = await payload.find({
    collection,
    where: { slug: { not_in: keep } },
    limit: 100,
    depth: 0,
    draft: true,
  })
  for (const doc of docs) await payload.delete({ collection, id: doc.id, depth: 0 })
  return docs.map((doc) => doc.slug ?? String(doc.id))
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

  // A business without its own photo borrows its sector's
  const businessPhoto = (slug: string, sector: string) =>
    photo(photos, slug) ?? photo(photos, sector)

  // Businesses (published so the site renders; addresses, phones and hours wait for verification)
  const businessIDs: Record<string, number> = {}
  for (const business of businesses) {
    const sector = sectorIDs[business.sector]
    if (!sector) throw new Error(`Unknown sector "${business.sector}" for ${business.name}`)
    const heroImage = businessPhoto(business.slug, business.sector)
    businessIDs[business.slug] = await upsertBySlug(payload, 'businesses', business.slug, {
      name: business.name,
      sector,
      stage: business.stage,
      tagline: business.tagline,
      summary: business.summary,
      enquiryLabel: business.enquiryLabel,
      overview: toRichText(business.overview),
      services: business.services ?? [],
      stats: business.stats ?? [],
      locations: business.locations ?? [],
      featured: business.featured,
      order: business.order,
      meta: { title: `${business.name} | Zeebundu`, description: business.summary },
      ...(heroImage && { heroImage }),
      _status: 'published',
    })
  }
  log(`${businesses.length} businesses`)

  const prunedBusinesses = await pruneMissing(
    payload,
    'businesses',
    businesses.map((b) => b.slug),
  )
  const prunedSectors = await pruneMissing(
    payload,
    'sectors',
    sectors.map((s) => s.slug),
  )
  if (prunedBusinesses.length || prunedSectors.length) {
    log(`removed ${[...prunedBusinesses, ...prunedSectors].join(', ')}`)
  }

  const { contact, seo } = groupCopy

  // Globals
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      groupName: 'Zeebundu Group of Companies',
      contact: {
        address: contact.address,
        email: contact.email,
        phone: contact.phones[0],
        otherPhones: contact.phones.slice(1).map((number) => ({ number })),
      },
      stats: [
        { value: String(businesses.length), label: 'Businesses and projects' },
        { value: String(sectors.length), label: 'Sectors' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { label: 'About Us', url: '/about' } },
        { link: { label: 'Our Businesses', url: '/businesses' } },
        { link: { label: 'Projects and Locations', url: '/projects' } },
        { link: { label: 'Community', url: '/community' } },
        { link: { label: 'News', url: '/news' } },
        { link: { label: 'Careers', url: '/careers' } },
      ],
      cta: { label: 'Contact', url: '/contact' },
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: groupCopy.footerTagline,
      legalLinks: [
        { link: { label: 'Privacy Notice', url: '/privacy' } },
        { link: { label: 'Terms', url: '/terms' } },
      ],
      showNewsletter: true,
    },
  })
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        eyebrow: null,
        ...groupCopy.hero,
        ...(photo(photos, 'group-hero') && { image: photo(photos, 'group-hero') }),
        primaryCta: { label: 'Explore Our Businesses', url: '/businesses' },
        secondaryCta: { label: 'Contact Our Team', url: '/contact' },
      },
      intro: groupCopy.intro,
      // No portrait yet: the page shows the name until an approved photo is uploaded
      chairman: {
        quote: groupCopy.ceo.message,
        name: groupCopy.ceo.name,
        title: groupCopy.ceo.title,
        link: { label: 'About our leadership', url: '/about' },
      },
      ctaBand: {
        heading: groupCopy.partnerships.heading,
        text: groupCopy.partnerships.text,
        link: { label: 'Send a Partnership Inquiry', url: '/contact' },
      },
      _status: 'published',
    },
  })
  await payload.updateGlobal({
    slug: 'media-kit',
    data: { boilerplate: groupCopy.pressBoilerplate },
  })
  log('globals')

  // Leadership, matched by name
  const { ceo } = groupCopy
  const leader = await payload.find({
    collection: 'leadership',
    where: { name: { equals: ceo.name } },
    limit: 1,
    depth: 0,
  })
  const leaderData = {
    name: ceo.name,
    title: ceo.title,
    bio: ceo.bio.join('\n\n'),
    group: 'executive' as const,
    order: 1,
  }
  if (leader.docs[0]) {
    await payload.update({ collection: 'leadership', id: leader.docs[0].id, data: leaderData })
  } else {
    await payload.create({ collection: 'leadership', data: leaderData })
  }
  log('leadership')

  // Group pages
  const { about, community, careers, partnerships, projects } = groupCopy
  const pages: Record<string, { title: string; layout: unknown[] }> = {
    about: {
      title: 'About Us',
      layout: [
        { blockType: 'hero', heading: about.heading },
        { blockType: 'richText', content: toRichText(about.intro) },
        {
          blockType: 'richText',
          content: toRichText(['## Mission', about.mission, '## Vision', about.vision]),
        },
        { blockType: 'servicesGrid', heading: 'Our values', items: about.values },
        {
          blockType: 'cta',
          heading: about.connects.heading,
          text: about.connects.text,
          link: { label: 'Meet Our Businesses', url: '/businesses' },
          style: 'light',
        },
      ],
    },
    projects: {
      title: 'Projects and Locations',
      layout: [
        { blockType: 'hero', heading: projects.heading, subheading: projects.intro },
        { blockType: 'places', items: projects.places },
        {
          blockType: 'cta',
          heading: projects.lunsar.heading,
          text: projects.lunsar.text,
          link: { label: 'Contact the Lunsar Team', url: '/contact' },
          style: 'dark',
        },
      ],
    },
    community: {
      title: 'Community',
      layout: [
        {
          blockType: 'hero',
          heading: community.heading,
          subheading: community.text,
          cta: { label: 'Discuss a Community Partnership', url: '/contact' },
        },
        { blockType: 'servicesGrid', items: community.commitments },
      ],
    },
    careers: {
      title: 'Careers',
      layout: [
        {
          blockType: 'hero',
          heading: careers.heading,
          subheading: careers.text[0],
          cta: { label: 'View Current Vacancies', url: '#vacancies' },
        },
        { blockType: 'richText', content: toRichText(careers.text.slice(1)) },
        {
          blockType: 'richText',
          blockName: 'vacancies',
          content: toRichText(['## Current vacancies', careers.vacancies]),
        },
        {
          blockType: 'cta',
          heading: partnerships.heading,
          text: partnerships.text,
          link: { label: 'Send a Partnership Inquiry', url: '/contact' },
          style: 'dark',
        },
      ],
    },
    // Rendered under the form on /contact
    contact: {
      title: 'Contact Us',
      layout: [{ blockType: 'faq', heading: 'Frequently asked questions', items: contact.faq }],
    },
  }
  for (const [slug, page] of Object.entries(pages)) {
    await upsertBySlug(payload, 'pages', slug, {
      ...page,
      meta: seo[slug as keyof typeof seo],
      _status: 'published',
    })
  }
  log(`${Object.keys(pages).join(', ')} pages`)

  // First news story; the hero is a placeholder until event photos arrive
  const newsHero = photo(photos, 'group-hero')
  if (newsHero) {
    const { news } = groupCopy
    const slug = 'lunsar-business-destination-opening'
    const existing = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      draft: true,
    })
    await upsertBySlug(payload, 'news', slug, {
      title: news.title,
      excerpt: news.excerpt,
      body: toRichText(news.body),
      heroImage: newsHero,
      category: 'news',
      ...(existing.docs[0] ? {} : { publishedAt: new Date().toISOString() }),
      _status: 'published',
    })
    log('news story')
  }

  // Starter legal pages behind the footer links; editors refine them in the admin
  for (const [slug, { title, body }] of Object.entries(legalPages)) {
    await upsertBySlug(payload, 'pages', slug, {
      title,
      layout: [{ blockType: 'richText', content: toRichText(body) }],
      _status: 'published',
    })
  }
  log('privacy and terms pages')

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
