'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      'response-field-name'?: string
      theme?: 'light' | 'dark' | 'auto'
      size?: 'normal' | 'flexible' | 'compact'
    },
  ) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

/**
 * Cloudflare Turnstile widget (explicit render). Adds a hidden `cf-turnstile-response` input to
 * the surrounding form. Change `resetKey` to get a fresh token, e.g. after a failed submit
 * (tokens can only be verified once). Renders nothing when no site key is configured.
 */
export function Turnstile({ resetKey }: { resetKey?: unknown }) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const api = window.turnstile
    if (!ready || !api || !container.current || !turnstileSiteKey) return
    const id = api.render(container.current, {
      sitekey: turnstileSiteKey,
      'response-field-name': 'cf-turnstile-response',
      theme: 'light',
      size: 'flexible',
    })
    widgetId.current = id
    return () => {
      widgetId.current = null
      api.remove(id)
    }
  }, [ready])

  useEffect(() => {
    if (resetKey && widgetId.current) window.turnstile?.reset(widgetId.current)
  }, [resetKey])

  if (!turnstileSiteKey) return null

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={container} className="min-h-[65px]" />
    </>
  )
}
