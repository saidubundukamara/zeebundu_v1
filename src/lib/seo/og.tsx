import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

/**
 * Shared Open Graph card: forest background, gold rule, ZEEBUNDU wordmark, eyebrow + title.
 * Used by the co-located `opengraph-image.tsx` files. Fonts are static TTF instances
 * (Satori can't read woff2 or variable fonts) bundled under src/assets/fonts (OFL).
 */

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const colors = {
  forest: '#0F3D2E',
  forestDeep: '#0A2E22',
  gold: '#C8A24A',
  paper: '#F7F5EF',
  muted: '#B9C4BD',
}

let fonts: Promise<{ display: Buffer; sans: Buffer }> | undefined

const loadFonts = () =>
  (fonts ??= Promise.all([
    readFile(join(process.cwd(), 'src/assets/fonts/Fraunces-SemiBold.ttf')),
    readFile(join(process.cwd(), 'src/assets/fonts/Geist-Medium.ttf')),
  ]).then(([display, sans]) => ({ display, sans })))

/** Scale the headline down as it gets longer so it always fits in three lines. */
const titleSize = (title: string) =>
  title.length > 90 ? 50 : title.length > 60 ? 58 : title.length > 32 ? 68 : 84

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text

export async function renderOgImage({
  eyebrow,
  title,
  footer = 'Zeebundu Group · Sierra Leone',
}: {
  eyebrow?: string | null
  title: string
  footer?: string
}) {
  const { display, sans } = await loadFonts()
  const heading = truncate(title, 120)

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 80px',
        backgroundColor: colors.forest,
        backgroundImage: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.forestDeep} 100%)`,
        color: colors.paper,
        fontFamily: 'Geist',
      }}
    >
      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="48" height="48" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="12" fill={colors.gold} />
          <path d="M18 18h28v6L27 40h19v6H18v-6l19-16H18z" fill={colors.forest} />
        </svg>
        <div
          style={{
            fontFamily: 'Fraunces',
            fontSize: 34,
            letterSpacing: 6,
            color: colors.paper,
          }}
        >
          ZEEBUNDU
        </div>
      </div>

      {/* Eyebrow + title */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 96, height: 6, backgroundColor: colors.gold, marginBottom: 28 }} />
        {eyebrow && (
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: colors.gold,
              marginBottom: 20,
            }}
          >
            {truncate(eyebrow, 60)}
          </div>
        )}
        <div
          style={{
            fontFamily: 'Fraunces',
            fontSize: titleSize(heading),
            lineHeight: 1.08,
            letterSpacing: -1,
            color: colors.paper,
            maxWidth: 1000,
            lineClamp: 3,
            display: 'block',
          }}
        >
          {heading}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 22,
          color: colors.muted,
          borderTop: `1px solid rgba(247, 245, 239, 0.18)`,
          paddingTop: 24,
        }}
      >
        <div>{footer}</div>
        <div style={{ color: colors.gold }}>zeebundu.com</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: 'Fraunces', data: display, style: 'normal', weight: 600 },
        { name: 'Geist', data: sans, style: 'normal', weight: 500 },
      ],
    },
  )
}
