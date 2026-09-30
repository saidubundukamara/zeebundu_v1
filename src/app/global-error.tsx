'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

import { reportError } from '@/lib/monitoring/report-error'

/**
 * Last-resort error page, shown when a root layout itself fails. It replaces the whole
 * document, so it can't rely on globals.css, fonts or CMS data — styles are inline.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    reportError(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7F5EF',
          color: '#16181A',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <title>Something went wrong | Zeebundu Group</title>
        <main style={{ maxWidth: 560, padding: '48px 24px' }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#8A6A1F',
            }}
          >
            Zeebundu Group
          </p>
          <h1
            style={{
              margin: '16px 0',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 36,
              lineHeight: 1.15,
              color: '#0F3D2E',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ margin: '0 0 28px', fontSize: 18, lineHeight: 1.5, color: '#66635A' }}>
            Sorry — the site hit an unexpected problem. Please try again in a moment.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{
                padding: '12px 22px',
                border: 0,
                borderRadius: 6,
                background: '#C8A24A',
                color: '#0F3D2E',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            {/* A plain link forces a full reload, which is what we want after a root failure */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                padding: '12px 22px',
                border: '1px solid #0F3D2E',
                borderRadius: 6,
                color: '#0F3D2E',
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Go to the homepage
            </a>
          </div>
          {error.digest && (
            <p style={{ marginTop: 28, fontSize: 14, color: '#66635A' }}>
              Reference: <code>{error.digest}</code>
            </p>
          )}
        </main>
      </body>
    </html>
  )
}
