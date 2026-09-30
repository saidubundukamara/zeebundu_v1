/**
 * Enquiry pipeline tests: rate limiting, recipient resolution, emails, Turnstile and templates.
 * Run against a throwaway database:
 *   DATABASE_URI=postgres://…/zeebundu_test npm run test:int
 */
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { emailAdapter } from '@/lib/email/adapter'
import { enquiryAutoReplyEmail, enquiryNotificationEmail, escapeHtml } from '@/lib/email/templates'
import { resolveRecipients, sendEnquiryEmails } from '@/lib/enquiry-notify'
import { enquiryRateLimits, getClientIp, hashIp, isRateLimited } from '@/lib/enquiry-rate-limit'
import { resetTurnstileWarning, verifyTurnstile } from '@/lib/turnstile'
import type { Business, SiteSetting } from '@/payload-types'

let payload: Payload
const run = `e${Date.now()}`
const ids: { collection: 'businesses' | 'sectors' | 'enquiries'; id: number }[] = []
const track = <T extends { id: number }>(
  collection: (typeof ids)[number]['collection'],
  doc: T,
) => {
  ids.push({ collection, id: doc.id })
  return doc
}

let withInbox: Business
let withoutInbox: Business
let originalContact: SiteSetting['contact']
const groupInbox = `group-${run}@example.com`

const setGroupInbox = (enquiryEmail: string | null) =>
  payload.updateGlobal({
    slug: 'site-settings',
    data: { contact: { ...originalContact, enquiryEmail, phone: '+232 76 000 000' } },
  })

beforeAll(async () => {
  payload = await getPayload({ config })
  originalContact = (await payload.findGlobal({ slug: 'site-settings', depth: 0 })).contact

  const sector = track(
    'sectors',
    await payload.create({
      collection: 'sectors',
      data: { name: `Sector ${run}`, slug: `sector-${run}` },
    }),
  )
  const business = async (key: string, enquiryEmail?: string) =>
    track(
      'businesses',
      await payload.create({
        collection: 'businesses',
        data: {
          name: `Biz ${key} ${run}`,
          slug: `biz-${key}-${run}`,
          summary: 'Summary',
          sector: sector.id,
          contact: { enquiryEmail },
          _status: 'published',
        },
      }),
    )
  withInbox = await business('inbox', `sales-${run}@example.com`)
  withoutInbox = await business('none')
})

afterAll(async () => {
  await payload.updateGlobal({ slug: 'site-settings', data: { contact: originalContact } })
  for (const { collection, id } of ids.reverse()) {
    await payload.delete({ collection, id }).catch(() => undefined)
  }
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const enquiry = async (data: { ipHash?: string; email?: string; business?: number }) =>
  track(
    'enquiries',
    await payload.create({
      collection: 'enquiries',
      data: {
        name: 'Aminata Kamara',
        email: data.email ?? `sender-${run}@example.com`,
        message: `Hello ${run}`,
        type: 'sales',
        status: 'new',
        ipHash: data.ipHash,
        business: data.business,
      },
    }),
  )

describe('rate limiting', () => {
  it('reads the client IP from x-forwarded-for, then x-real-ip', () => {
    expect(getClientIp(new Headers({ 'x-forwarded-for': '41.1.2.3, 10.0.0.1' }))).toBe('41.1.2.3')
    expect(getClientIp(new Headers({ 'x-real-ip': '41.9.9.9' }))).toBe('41.9.9.9')
    expect(getClientIp(new Headers())).toBeUndefined()
  })

  it('hashes IPs with the secret and never stores the raw address', () => {
    const hash = hashIp('41.1.2.3', 'secret')
    expect(hash).toMatch(/^[a-f0-9]{64}$/)
    expect(hash).not.toContain('41.1.2.3')
    expect(hashIp('41.1.2.3', 'other-secret')).not.toBe(hash)
  })

  it(`allows ${enquiryRateLimits.perIpPerHour} enquiries per IP per hour`, async () => {
    const ipHash = hashIp(`ip-${run}`)
    for (let i = 0; i < enquiryRateLimits.perIpPerHour - 1; i++) {
      await enquiry({ ipHash, email: `ip-${i}-${run}@example.com` })
    }
    expect(await isRateLimited(payload, { ipHash })).toBe(false)
    await enquiry({ ipHash, email: `ip-last-${run}@example.com` })
    expect(await isRateLimited(payload, { ipHash })).toBe('ip')
    // A different IP is unaffected, and the window moves on after an hour
    expect(await isRateLimited(payload, { ipHash: hashIp(`other-${run}`) })).toBe(false)
    const later = new Date(Date.now() + 61 * 60 * 1000)
    expect(await isRateLimited(payload, { ipHash, now: later })).toBe(false)
  })

  it(`allows ${enquiryRateLimits.perEmailPerDay} enquiries per email per day`, async () => {
    const email = `busy-${run}@example.com`
    for (let i = 0; i < enquiryRateLimits.perEmailPerDay; i++) {
      await enquiry({ email, ipHash: hashIp(`busy-${i}-${run}`) })
    }
    expect(await isRateLimited(payload, { email: email.toUpperCase() })).toBe('email')
    const tomorrow = new Date(Date.now() + 25 * 60 * 60 * 1000)
    expect(await isRateLimited(payload, { email, now: tomorrow })).toBe(false)
  })

  it('does not return the IP hash from the API', async () => {
    const doc = await enquiry({ ipHash: hashIp(`hidden-${run}`) })
    const read = await payload
      .findByID({ collection: 'enquiries', id: doc.id, overrideAccess: false, user: undefined })
      .catch(() => null)
    // Public reads are denied outright; staff reads never include the hash
    expect(read).toBeNull()
    const { docs } = await payload.find({
      collection: 'enquiries',
      where: { id: { equals: doc.id } },
      overrideAccess: false,
      user: { ...(await firstSuperAdmin()), collection: 'users' },
    })
    expect(docs[0]).toBeDefined()
    expect(docs[0].ipHash).toBeUndefined()
  })
})

async function firstSuperAdmin() {
  const { docs } = await payload.find({
    collection: 'users',
    where: { role: { equals: 'super-admin' } },
    limit: 1,
  })
  if (!docs[0]) throw new Error('Test database needs a super-admin user')
  return docs[0]
}

describe('recipients', () => {
  it('sends to the business inbox and copies the group inbox', async () => {
    await setGroupInbox(groupInbox)
    const r = await resolveRecipients(payload, withInbox.id)
    expect(r).toMatchObject({
      to: `sales-${run}@example.com`,
      cc: groupInbox,
      businessName: withInbox.name,
    })
  })

  it('falls back to the group inbox without a CC', async () => {
    await setGroupInbox(groupInbox)
    expect(await resolveRecipients(payload, withoutInbox.id)).toMatchObject({
      to: groupInbox,
      cc: undefined,
      businessName: withoutInbox.name,
    })
    const general = await resolveRecipients(payload, null)
    expect(general).toMatchObject({ to: groupInbox, cc: undefined })
    expect(general.businessName).toBe(general.groupName)
  })

  it('has no recipient when no inbox is configured', async () => {
    await setGroupInbox(null)
    const r = await resolveRecipients(payload, withoutInbox.id)
    expect(r.to).toBeUndefined()
    expect(r.cc).toBeUndefined()
  })
})

describe('sending emails', () => {
  it('emails the business (CC group, reply-to sender) and auto-replies to the sender', async () => {
    await setGroupInbox(groupInbox)
    const send = vi.spyOn(payload, 'sendEmail').mockResolvedValue(undefined)
    const doc = await enquiry({ business: withInbox.id })
    await sendEnquiryEmails(payload, doc, 'https://zeebundu.test')

    expect(send).toHaveBeenCalledTimes(2)
    const [notification, autoReply] = send.mock.calls.map(([m]) => m)
    expect(notification).toMatchObject({
      to: `sales-${run}@example.com`,
      cc: groupInbox,
      replyTo: { address: doc.email, name: 'Aminata Kamara' },
      subject: `New website enquiry: Sales — ${withInbox.name}`,
    })
    expect(notification.html).toContain(
      `https://zeebundu.test/admin/collections/enquiries/${doc.id}`,
    )
    expect(notification.text).toContain(`Hello ${run}`)
    expect(autoReply).toMatchObject({ to: doc.email, replyTo: `sales-${run}@example.com` })
    expect(autoReply.text).toContain(withInbox.name)
    expect(autoReply.text).toContain('1–2 working days')
    expect(autoReply.text).toContain('+232 76 000 000')
  })

  it('warns (and still auto-replies) when no inbox is configured', async () => {
    await setGroupInbox(null)
    const send = vi.spyOn(payload, 'sendEmail').mockResolvedValue(undefined)
    const warn = vi.spyOn(payload.logger, 'warn').mockImplementation(() => undefined)
    const doc = await enquiry({ business: withoutInbox.id })
    await sendEnquiryEmails(payload, doc)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('No enquiry inbox'))
    expect(send).toHaveBeenCalledTimes(1)
    expect(send.mock.calls[0][0].to).toBe(doc.email)
  })

  it('never throws when sending fails', async () => {
    await setGroupInbox(groupInbox)
    vi.spyOn(payload, 'sendEmail').mockRejectedValue(new Error('Resend is down'))
    const error = vi.spyOn(payload.logger, 'error').mockImplementation(() => undefined)
    const doc = await enquiry({ business: withInbox.id })
    await expect(sendEnquiryEmails(payload, doc)).resolves.toBeUndefined()
    expect(error).toHaveBeenCalled()
  })
})

describe('email templates', () => {
  it('escapes HTML', () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'y'`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;',
    )
  })

  it('escapes everything the sender typed', () => {
    const evil = '<img src=x onerror=alert(1)>'
    const { html, subject } = enquiryNotificationEmail({
      enquiry: {
        id: 1,
        name: evil,
        email: 'a@example.com',
        phone: evil,
        type: 'media',
        message: `${evil}\nsecond line`,
        pageUrl: evil,
      },
      businessName: 'Water Production',
      adminUrl: 'https://zeebundu.test/admin/collections/enquiries/1',
    })
    expect(subject).toBe('New website enquiry: Media — Water Production')
    expect(html).not.toContain('<img')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;<br>second line')

    const reply = enquiryAutoReplyEmail({
      name: evil,
      businessName: 'Water Production',
      groupName: 'Zeebundu Group',
    })
    expect(reply.html).not.toContain('<img')
    expect(reply.text).not.toContain('WhatsApp')
  })
})

describe('Turnstile', () => {
  const okResponse = (body: object) => vi.fn().mockResolvedValue(new Response(JSON.stringify(body)))

  it('is skipped without a secret key', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '')
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    expect(await verifyTurnstile(undefined)).toEqual({ success: true, skipped: true })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('warns once in production without a secret key', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '')
    vi.stubEnv('NODE_ENV', 'production')
    resetTurnstileWarning()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    await verifyTurnstile('x')
    await verifyTurnstile('x')
    expect(warn).toHaveBeenCalledTimes(1)
  })

  it('verifies the token with Cloudflare', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA')
    const fetch = okResponse({ success: true, 'error-codes': [] })
    vi.stubGlobal('fetch', fetch)
    expect(await verifyTurnstile('token-123', '41.1.2.3')).toEqual({
      success: true,
      errorCodes: [],
    })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify')
    const body = new URLSearchParams(init.body)
    expect(body.get('secret')).toBe('1x0000000000000000000000000000000AA')
    expect(body.get('response')).toBe('token-123')
    expect(body.get('remoteip')).toBe('41.1.2.3')
  })

  it('rejects failed, missing and unverifiable tokens', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '2x0000000000000000000000000000000AA')
    vi.stubGlobal(
      'fetch',
      okResponse({ success: false, 'error-codes': ['invalid-input-response'] }),
    )
    expect(await verifyTurnstile('token')).toEqual({
      success: false,
      errorCodes: ['invalid-input-response'],
    })
    expect((await verifyTurnstile('')).success).toBe(false)

    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    expect(await verifyTurnstile('token')).toEqual({
      success: false,
      errorCodes: ['internal-error'],
    })
  })
})

describe('Resend adapter', () => {
  it('is only used when RESEND_API_KEY is set', () => {
    expect(emailAdapter({ NODE_ENV: 'test' })).toBeUndefined()
  })

  it('sends through the Resend API from the configured address', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'email_1' })))
    vi.stubGlobal('fetch', fetch)
    const adapter = emailAdapter({
      NODE_ENV: 'test',
      RESEND_API_KEY: 're_test',
      EMAIL_FROM_ADDRESS: 'no-reply@zeebundu.com',
    })!
    await adapter({ payload }).sendEmail({
      to: 'sales@example.com',
      cc: 'group@example.com',
      replyTo: { name: 'Sender', address: 'sender@example.com' },
      subject: 'Hi',
      text: 'Hi',
    })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.headers.Authorization).toBe('Bearer re_test')
    expect(JSON.parse(init.body)).toMatchObject({
      from: 'Zeebundu Group <no-reply@zeebundu.com>',
      to: 'sales@example.com',
      cc: 'group@example.com',
      reply_to: ['sender@example.com'],
    })
  })
})
