/**
 * Report a caught client-side error to Sentry when it is configured.
 * `NEXT_PUBLIC_SENTRY_DSN` is inlined at build time, so without it this is an empty
 * function and the Sentry SDK is never downloaded.
 */
export function reportError(error: unknown) {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return
  import('@sentry/nextjs')
    .then((Sentry) => Sentry.captureException(error))
    .catch(() => {
      // Never let error reporting break the error page
    })
}
