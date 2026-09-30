/*
 * Zeebundu marks for the Payload admin. The start triangle is the orienteering
 * "you begin here" symbol, the same mark the public site uses beside its wordmark.
 * Colours come from the admin theme (src/app/(payload)/custom.scss).
 */

function StartTriangle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 22" fill="none" aria-hidden>
      <path
        d="M12 2 22.4 20H1.6Z"
        stroke="var(--zb-course)"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Login screen and other full-size brand spots. */
export function Logo() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: 'var(--zb-font-display)',
        fontWeight: 800,
        fontSize: 40,
        lineHeight: 1,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: 'var(--theme-text)',
      }}
    >
      <StartTriangle size={32} />
      Zeebundu
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: 0,
          textTransform: 'none',
          color: 'var(--theme-elevation-500)',
          alignSelf: 'flex-end',
          marginBottom: 4,
        }}
      >
        CMS
      </span>
    </span>
  )
}

/** Small mark in the nav and step bar. */
export function Icon() {
  return <StartTriangle size={22} />
}
