import './(frontend)/globals.css'

import type { Metadata } from 'next'
import { Fraunces, Geist } from 'next/font/google'

import { NotFoundContent } from '@/components/NotFoundContent'

const fontSans = Geist({ variable: '--font-sans', subsets: ['latin'] })
const fontDisplay = Fraunces({ variable: '--font-display', subsets: ['latin'], axes: ['opsz'] })

export const metadata: Metadata = {
  title: 'Page not found | Zeebundu Group',
}

// Unmatched URLs skip every layout, so this page must stand alone (no CMS data)
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <NotFoundContent />
      </body>
    </html>
  )
}
