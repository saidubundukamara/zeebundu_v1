import { NextResponse, type NextRequest } from 'next/server'

/**
 * Admins can only log in. Payload's first-user registration (the screen shown while
 * the users table is empty) is switched off: accounts come from the seed script or
 * from a super-admin in /admin → Users. The Users collection also refuses the request
 * (src/collections/Users.ts), so this is the visible half of that lock.
 *
 * A 404 rather than a redirect: Payload sends an empty database to this page itself,
 * and redirecting to /admin/login would loop.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ errors: [{ message: 'Not found' }] }, { status: 404 })
  }
  return new NextResponse(
    '<!doctype html><meta charset="utf-8"><title>Not available | Zeebundu CMS</title>' +
      '<body style="font:16px system-ui;padding:3rem;max-width:40rem">' +
      '<h1 style="font-size:1.5rem">Sign-up is not available</h1>' +
      '<p>Zeebundu CMS accounts are created by an administrator. ' +
      '<a href="/admin/login">Go to the login page</a>.</p></body>',
    { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } },
  )
}

export const config = {
  matcher: ['/admin/create-first-user', '/api/users/first-register'],
}
