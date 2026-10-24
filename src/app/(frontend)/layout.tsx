import type { Metadata } from 'next'
import { Big_Shoulders, Mona_Sans } from 'next/font/google'
import './globals.css'

import { Analytics } from '@/components/Analytics'

const fontSans = Mona_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  axes: ['wdth'],
})

// Condensed display face; its roots are Chicago street signage.
const fontDisplay = Big_Shoulders({
  variable: '--font-display',
  subsets: ['latin'],
  axes: ['opsz'],
  // next/font has no metrics for Big Shoulders, so it can't size a fallback; name condensed ones instead
  adjustFontFallback: false,
  fallback: ['Impact', 'Arial Narrow', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Zeebundu Group of Companies',
    template: '%s | Zeebundu Group of Companies',
  },
  description:
    'Zeebundu Group of Companies brings together businesses and development projects across Sierra Leone, from fuel, retail and water to agriculture, construction and hospitality.',
}

// Light is the default; the night map is opt-in (ThemeToggle) and remembered in localStorage.
const THEME_SCRIPT = `try{if(localStorage.getItem('zb-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`

// Design direction contract (Impeccable). Kept in the built HTML so the finish review can audit it.
const DIRECTION_CONTRACT = `
THESIS: Zeebundu drawn as an orienteering map. Its businesses are numbered controls on one course, and the sectors are the legend. Refuses the holding-company default of a photo hero, stats band and sector card grid.
OWN-WORLD: White runnable ground; generated contour terrain in brown, with olive thicket, yellow open land and blue marsh. Course purple (#7B2CBF) only for the route, active state and primary action. Big Shoulders condensed uppercase display with control numerals, Mona Sans text. Square containers, circular controls, a legend-table grammar with ISOM symbol swatches. The night map is an opt-in toggle (light is the default): same inks on near-black paper, course lifted to #A36FE3 for contrast, vegetation printed as dot screens.
STORY: Visitors see that one Sierra Leone group runs everyday businesses and projects, trust its plain, specific voice, and reach any business in two taps or send an inquiry.
FIRST VIEWPORT: Left: a four-line condensed poster thesis, a short subline and one purple "Explore the businesses" action. Right: terrain with a purple course drawing through the numbered control circles. Under the map, a two-column legend lists every sector with their map symbols and controls; hovering one lights its controls.
FORM: Orienteering map and legend (dealt challenger, chosen by the user); ordered list #6 of fused; seed key 9838c056.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply a saved night-map choice before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
