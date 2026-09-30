import type { Metadata } from 'next'
import { Fraunces, Geist } from 'next/font/google'
import './globals.css'

const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const fontDisplay = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  axes: ['opsz'],
})

export const metadata: Metadata = {
  title: {
    default: 'Zeebundu Group',
    template: '%s | Zeebundu Group',
  },
  description:
    'Zeebundu is a Sierra Leone group company with businesses across energy, hospitality, agriculture, food & beverage, construction, health, finance and retail.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
