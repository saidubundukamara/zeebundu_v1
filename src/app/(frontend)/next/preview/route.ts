import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { safePath } from '@/lib/safe-path'

/**
 * Turns on Draft Mode for logged-in CMS users, then shows the requested page.
 * Used by the admin's Preview button and Live Preview (see admin.livePreview in payload.config).
 */
export async function GET(request: Request) {
  const path = safePath(new URL(request.url).searchParams.get('path'))
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    return new Response('You need to be logged in to the CMS to preview drafts.', { status: 403 })
  }

  ;(await draftMode()).enable()
  redirect(path)
}
