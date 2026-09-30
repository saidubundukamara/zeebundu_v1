import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
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
    <html lang="en" className={`${fontSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
