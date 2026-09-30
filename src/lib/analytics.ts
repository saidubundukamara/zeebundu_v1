type EventProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps; callback?: () => void }) => void
  }
}

/**
 * Send a Plausible custom event from client code, e.g.
 * `trackEvent('Enquiry', { business: 'zeemart-shopping', type: 'quote' })`.
 * A no-op when analytics isn't configured or is blocked. Custom events must also be
 * added as goals in the Plausible dashboard to show up there.
 */
export function trackEvent(name: string, props?: EventProps) {
  if (typeof window === 'undefined' || !window.plausible) return
  try {
    window.plausible(name, props ? { props } : undefined)
  } catch {
    // Analytics must never break the page
  }
}
