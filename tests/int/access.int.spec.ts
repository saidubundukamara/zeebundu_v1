/**
 * Access control integration tests. Run against a throwaway database:
 *   DATABASE_URI=postgres://…/zeebundu_test npm run test:int
 */
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { Business, Enquiry, News, User } from '@/payload-types'

let payload: Payload
const run = `t${Date.now()}`
const ids: { collection: 'businesses' | 'sectors' | 'news' | 'enquiries' | 'users'; id: number }[] =
  []

let bizA: Business
let bizB: Business
let groupEditor: User
let editorA: User

const asUser = (user: User) => ({ ...user, collection: 'users' as const })

const track = <T extends { id: number }>(
  collection: (typeof ids)[number]['collection'],
  doc: T,
) => {
  ids.push({ collection, id: doc.id })
  return doc
}

const richText = {
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', text: 'Body', version: 1 }],
      },
    ],
  },
}

beforeAll(async () => {
  payload = await getPayload({ config })

  const sector = track(
    'sectors',
    await payload.create({
      collection: 'sectors',
      data: { name: `Sector ${run}`, slug: `sector-${run}` },
    }),
  )
  const business = async (key: string, status: 'published' | 'draft') =>
    track(
      'businesses',
      await payload.create({
        collection: 'businesses',
        data: {
          name: `Biz ${key} ${run}`,
          slug: `biz-${key}-${run}`,
          summary: 'Summary',
          sector: sector.id,
          _status: status,
        },
      }),
    )
  bizA = await business('a', 'published')
  bizB = await business('b', 'published')
  track('businesses', await business('draft', 'draft'))

  const user = async (key: string, role: User['role'], tenants: number[] = []) =>
    track(
      'users',
      await payload.create({
        collection: 'users',
        data: {
          email: `${key}-${run}@example.com`,
          password: 'test-password-123',
          name: key,
          role,
          tenants: tenants.map((tenant) => ({ tenant })),
        },
      }),
    )
  groupEditor = await user('group', 'group-editor')
  editorA = await user('editor-a', 'business-editor', [bizA.id])
})

afterAll(async () => {
  for (const { collection, id } of ids.reverse()) {
    await payload.delete({ collection, id }).catch(() => undefined)
  }
})

describe('businesses', () => {
  it('business editors only see their own business', async () => {
    const { docs } = await payload.find({
      collection: 'businesses',
      overrideAccess: false,
      user: asUser(editorA),
      where: { slug: { contains: run } },
      draft: true,
    })
    expect(docs.map((d) => d.id)).toEqual([bizA.id])
  })

  it('group editors see every business', async () => {
    const { totalDocs } = await payload.find({
      collection: 'businesses',
      overrideAccess: false,
      user: asUser(groupEditor),
      where: { slug: { contains: run } },
      draft: true,
    })
    expect(totalDocs).toBe(3)
  })

  it('the public only sees published businesses', async () => {
    const { totalDocs } = await payload.find({
      collection: 'businesses',
      overrideAccess: false,
      where: { slug: { contains: run } },
    })
    expect(totalDocs).toBe(2)
  })

  it('business editors can edit their own business but not its slug or sector', async () => {
    const updated = await payload.update({
      collection: 'businesses',
      id: bizA.id,
      overrideAccess: false,
      user: asUser(editorA),
      data: { tagline: 'New tagline', slug: 'hijacked', featured: true },
    })
    expect(updated.tagline).toBe('New tagline')
    expect(updated.slug).toBe(bizA.slug)
    expect(updated.featured).toBe(false)
  })

  it('business editors cannot edit another business', async () => {
    await expect(
      payload.update({
        collection: 'businesses',
        id: bizB.id,
        overrideAccess: false,
        user: asUser(editorA),
        data: { tagline: 'Nope' },
      }),
    ).rejects.toThrow()
  })
})

describe('news', () => {
  let n = 0
  const article = (business?: number) => ({
    title: `Article ${++n} ${run}`,
    slug: `article-${n}-${run}`,
    excerpt: 'Excerpt',
    body: richText,
    category: 'news' as const,
    business,
    _status: 'draft' as const,
  })

  // News requires a hero image; create articles without upload validation via a stub media doc
  let heroImage: number
  beforeAll(async () => {
    const media = await payload.db.create({
      collection: 'media',
      data: { alt: 'stub', filename: `stub-${run}.png`, mimeType: 'image/png' },
    })
    heroImage = media.id as number
  })
  afterAll(async () => {
    await payload.db.deleteOne({ collection: 'media', where: { id: { equals: heroImage } } })
  })

  it('business editors must tag their own business', async () => {
    const user = asUser(editorA)
    await expect(
      payload.create({
        collection: 'news',
        overrideAccess: false,
        user,
        data: { ...article(), heroImage },
      }),
    ).rejects.toThrow()
    await expect(
      payload.create({
        collection: 'news',
        overrideAccess: false,
        user,
        data: { ...article(bizB.id), heroImage },
      }),
    ).rejects.toThrow()
    const own = track(
      'news',
      await payload.create({
        collection: 'news',
        overrideAccess: false,
        user,
        data: { ...article(bizA.id), heroImage },
        draft: true,
      }),
    )
    expect((own as News).business).toMatchObject({ id: bizA.id })
  })

  it('business editors cannot see other businesses’ drafts or group drafts', async () => {
    const other = track(
      'news',
      await payload.create({
        collection: 'news',
        data: { ...article(bizB.id), heroImage },
        draft: true,
      }),
    )
    const group = track(
      'news',
      await payload.create({ collection: 'news', data: { ...article(), heroImage }, draft: true }),
    )
    const { docs } = await payload.find({
      collection: 'news',
      overrideAccess: false,
      user: asUser(editorA),
      draft: true,
      where: { title: { contains: run } },
    })
    const seen = docs.map((d) => d.id)
    expect(seen).not.toContain(other.id)
    expect(seen).not.toContain(group.id)
    expect(seen.length).toBeGreaterThan(0)
  })
})

describe('enquiries', () => {
  let enquiryA: Enquiry
  beforeAll(async () => {
    const enquiry = async (business?: number) =>
      track(
        'enquiries',
        await payload.create({
          collection: 'enquiries',
          data: {
            name: 'Sender',
            email: 'sender@example.com',
            message: `Hello ${run}`,
            type: 'general',
            status: 'new',
            business,
          },
        }),
      )
    enquiryA = await enquiry(bizA.id)
    await enquiry(bizB.id)
    await enquiry()
  })

  const find = (user?: User) =>
    payload.find({
      collection: 'enquiries',
      overrideAccess: false,
      user: user ? asUser(user) : undefined,
      where: { message: { equals: `Hello ${run}` } },
    })

  it('business editors only see enquiries for their business', async () => {
    const { docs } = await find(editorA)
    expect(docs.map((d) => d.id)).toEqual([enquiryA.id])
  })

  it('group editors see all enquiries, including general ones', async () => {
    expect((await find(groupEditor)).totalDocs).toBe(3)
  })

  it('the public cannot read enquiries', async () => {
    await expect(find()).rejects.toThrow('not allowed')
  })

  it('editors can change status but not the submitted message', async () => {
    const updated = await payload.update({
      collection: 'enquiries',
      id: enquiryA.id,
      overrideAccess: false,
      user: asUser(editorA),
      data: { status: 'in-progress', message: 'Tampered' },
    })
    expect(updated.status).toBe('in-progress')
    expect(updated.message).toBe(`Hello ${run}`)
  })
})

describe('users', () => {
  it('business editors cannot change their own role or businesses', async () => {
    const updated = await payload.update({
      collection: 'users',
      id: editorA.id,
      overrideAccess: false,
      user: asUser(editorA),
      data: { role: 'super-admin', tenants: [{ tenant: bizB.id }] },
    })
    expect(updated.role).toBe('business-editor')
    expect(
      updated.tenants?.map((t) => (typeof t.tenant === 'object' ? t.tenant.id : t.tenant)),
    ).toEqual([bizA.id])
  })

  it('group editors cannot create users', async () => {
    await expect(
      payload.create({
        collection: 'users',
        overrideAccess: false,
        user: asUser(groupEditor),
        data: {
          email: `x-${run}@example.com`,
          password: 'test-password-123',
          name: 'x',
          role: 'super-admin',
        },
      }),
    ).rejects.toThrow()
  })
})
