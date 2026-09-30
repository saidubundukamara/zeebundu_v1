/**
 * Cloudflare Turnstile server-side verification.
 *
 * Without TURNSTILE_SECRET_KEY verification is skipped (local dev); in production that logs a
 * warning once. Test keys: secret 1x0000000000000000000000000000000AA always passes,
 * 2x0000000000000000000000000000000AA always fails.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export type TurnstileResult = { success: boolean; skipped?: boolean; errorCodes?: string[] }

let warnedMissingSecret = false

export async function verifyTurnstile(
  token: string | null | undefined,
  remoteip?: string | null,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    if (process.env.NODE_ENV === 'production' && !warnedMissingSecret) {
      warnedMissingSecret = true
      console.warn('[turnstile] TURNSTILE_SECRET_KEY is not set; enquiry spam protection is off')
    }
    return { success: true, skipped: true }
  }
  if (!token) return { success: false, errorCodes: ['missing-input-response'] }

  const body = new URLSearchParams({ secret, response: token })
  if (remoteip) body.set('remoteip', remoteip)

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(10_000),
    })
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
    return { success: data.success === true, errorCodes: data['error-codes'] ?? [] }
  } catch (err) {
    console.error('[turnstile] verification request failed', err)
    return { success: false, errorCodes: ['internal-error'] }
  }
}

/** For tests: lets the "missing secret" warning be logged again */
export function resetTurnstileWarning() {
  warnedMissingSecret = false
}
