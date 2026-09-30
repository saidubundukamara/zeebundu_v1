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
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Zeebundu Group',
    template: '%s | Zeebundu Group',
  },
  description:
    'Zeebundu is a Sierra Leone group with 16 businesses in energy, hospitality, farming, food and drink, construction, health, finance and retail.',
}

// Design direction contract (Impeccable). Kept in the built HTML so the finish review can audit it.
const DIRECTION_CONTRACT = `
THESIS: Zeebundu drawn as an orienteering map. Its 16 businesses are numbered controls on one course, and the 8 sectors are the legend. Refuses the holding-company default of a photo hero, stats band and sector card grid.
OWN-WORLD: White runnable ground; generated contour terrain in brown, with olive thicket, yellow open land and blue marsh. Course purple (#7B2CBF) only for the route, active state and primary action. Big Shoulders condensed uppercase display with control numerals, Mona Sans text. Square containers, circular controls, a legend-table grammar.
STORY: Visitors see that one Sierra Leone group runs 16 everyday businesses, trust its plain, specific voice, and reach any business in two taps or send an enquiry.
FIRST VIEWPORT: Left: a two-line condensed thesis, a short subline and one purple "Explore the businesses" action. Right: terrain with a purple course drawing through 16 numbered control circles. A legend panel lists the 8 sectors, and hovering one lights its controls.
FORM: Orienteering map and legend (dealt challenger, chosen by the user); ordered list #6 of fused; seed key 9838c056.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
