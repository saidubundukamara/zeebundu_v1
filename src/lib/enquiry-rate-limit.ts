import { createHmac } from 'crypto'
import type { Payload } from 'payload'

/**
 * Database-backed rate limiting for the enquiry form, so it works across serverless instances.
 * We never store the raw IP address, only a keyed hash of it.
 */
export const enquiryRateLimits = {
  /** Enquiries per IP address per hour */
  perIpPerHour: 5,
  /** Enquiries per email address per day */
  perEmailPerDay: 10,
}

const HOUR = 60 * 60 * 1000

/** First address in x-forwarded-for, else x-real-ip */
export function getClientIp(headers: Pick<Headers, 'get'>): string | undefined {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || headers.get('x-real-ip')?.trim() || undefined
}

export function hashIp(ip: string, secret = process.env.PAYLOAD_SECRET || '') {
  return createHmac('sha256', secret).update(ip).digest('hex')
}

/** Returns which limit was hit, or false if the sender may submit another enquiry */
export async function isRateLimited(
  payload: Payload,
  { ipHash, email, now = new Date() }: { ipHash?: string; email?: string; now?: Date },
): Promise<false | 'ip' | 'email'> {
  const since = (ms: number) => new Date(now.getTime() - ms).toISOString()

  if (ipHash) {
    const { totalDocs } = await payload.count({
      collection: 'enquiries',
      where: { ipHash: { equals: ipHash }, createdAt: { greater_than: since(HOUR) } },
    })
    if (totalDocs >= enquiryRateLimits.perIpPerHour) return 'ip'
  }

  if (email) {
    const { totalDocs } = await payload.count({
      collection: 'enquiries',
      where: {
        email: { equals: email.toLowerCase() },
        createdAt: { greater_than: since(24 * HOUR) },
      },
    })
    if (totalDocs >= enquiryRateLimits.perEmailPerDay) return 'email'
  }

  return false
}
