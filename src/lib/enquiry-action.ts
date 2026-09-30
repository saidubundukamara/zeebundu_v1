'use server'

import config from '@payload-config'
import { headers } from 'next/headers'
import { after } from 'next/server'
import { getPayload } from 'payload'
import { z } from 'zod'

import { sendEnquiryEmails } from './enquiry-notify'
import { getClientIp, hashIp, isRateLimited } from './enquiry-rate-limit'
import { enquirySchema, type EnquiryState } from './enquiry-schema'
import { verifyTurnstile } from './turnstile'

const TURNSTILE_FIELD = 'cf-turnstile-response'

/**
 * Handles a website enquiry: validate → Turnstile → rate limit → store → (after the response)
 * email the business inbox (CC group) and send the sender an auto-reply.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === 'string' && v !== ''),
  ) as Record<string, string>
  const { [TURNSTILE_FIELD]: turnstileToken, company, ...values } = raw

  // Honeypot: real people never fill the hidden "company" field
  if (company) return { status: 'success' }

  const parsed = enquirySchema.safeParse(values)
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors: z.flattenError(parsed.error).fieldErrors,
      values,
    }
  }

  const ip = getClientIp(await headers())

  const turnstile = await verifyTurnstile(turnstileToken, ip)
  if (!turnstile.success) {
    return {
      status: 'error',
      code: 'turnstile',
      message:
        'We couldn’t confirm you’re not a robot. Please wait for the security check to finish and send your message again.',
      values,
    }
  }

  const data = { ...parsed.data, email: parsed.data.email.toLowerCase() }
  const ipHash = ip ? hashIp(ip) : undefined

  try {
    const payload = await getPayload({ config })

    if (await isRateLimited(payload, { ipHash, email: data.email })) {
      return {
        status: 'error',
        code: 'rate-limited',
        message:
          'You’ve sent us several messages in a short time. Please wait a while before sending another, or call us if it’s urgent.',
        values,
      }
    }

    const enquiry = await payload.create({
      collection: 'enquiries',
      data: { ...data, ipHash, status: 'new' },
      depth: 0,
    })

    // Email after the response is sent, so the visitor isn't kept waiting
    after(() => sendEnquiryEmails(payload, enquiry))

    return { status: 'success' }
  } catch (err) {
    console.error('[enquiry] failed to save', err)
    return {
      status: 'error',
      message: 'Sorry, something went wrong sending your message. Please try again or call us.',
      values,
    }
  }
}
