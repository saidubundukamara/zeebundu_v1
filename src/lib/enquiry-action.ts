'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { enquirySchema, type EnquiryState } from './enquiry-schema'

/**
 * Stores a website enquiry. Phase 4 adds: Turnstile verification, rate limiting,
 * email to the business's enquiry inbox (CC group) and an auto-reply to the sender.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === 'string' && v !== ''),
  ) as Record<string, string>

  // Honeypot: real people never fill the hidden "company" field
  if (raw.company) return { status: 'success' }

  const parsed = enquirySchema.safeParse(raw)
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'enquiries',
      data: { ...parsed.data, status: 'new' },
    })
    return { status: 'success' }
  } catch (err) {
    console.error('[enquiry] failed to save', err)
    return {
      status: 'error',
      message: 'Sorry, something went wrong sending your message. Please try again or call us.',
      values: raw,
    }
  }
}
