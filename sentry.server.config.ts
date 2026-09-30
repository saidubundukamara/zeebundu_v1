// Sentry for the Node.js server runtime. Loaded from src/instrumentation.ts only when a DSN is set.
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  // Errors are always sent; sample a tenth of requests for performance tracing
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
})
