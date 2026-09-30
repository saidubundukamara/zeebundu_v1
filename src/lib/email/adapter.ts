import { resendAdapter } from '@payloadcms/email-resend'
import type { EmailAdapter } from 'payload'

/**
 * Resend email adapter, only when RESEND_API_KEY is set. Without it Payload falls back to its
 * console adapter, which logs each email (recipient + subject) instead of sending it — handy in dev.
 *
 * The from address must be on a domain verified in Resend (e.g. no-reply@zeebundu.com).
 */
export function emailAdapter(env: NodeJS.ProcessEnv = process.env): EmailAdapter | undefined {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) return undefined
  return resendAdapter({
    apiKey,
    defaultFromAddress: env.EMAIL_FROM_ADDRESS || 'no-reply@zeebundu.com',
    defaultFromName: env.EMAIL_FROM_NAME || 'Zeebundu Group',
  })
}
