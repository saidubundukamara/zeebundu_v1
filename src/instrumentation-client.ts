/**
 * Browser error monitoring (Sentry). NEXT_PUBLIC_SENTRY_DSN is inlined at build time: without
 * it the import below is dropped from the bundle, so visitors download no Sentry code.
 * With it, the SDK loads as a separate chunk so it doesn't delay first render.
 */
type SentryModule = typeof import('@sentry/nextjs')

let sentry: SentryModule | undefined

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  import('@sentry/nextjs')
    .then((Sentry) => {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
      })
      sentry = Sentry
    })
    .catch(() => {
      // Monitoring must never break the site
    })
}

export function onRouterTransitionStart(
  href: string,
  navigationType: 'push' | 'replace' | 'traverse',
) {
  sentry?.captureRouterTransitionStart(href, navigationType)
}
