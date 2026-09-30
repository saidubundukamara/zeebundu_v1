import { draftMode } from 'next/headers'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { DraftBanner } from '@/components/preview/DraftBanner'
import { LivePreviewListener } from '@/components/preview/LivePreviewListener'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const { isEnabled: draft } = await draftMode()
  return (
    <>
      {draft && (
        <>
          <DraftBanner />
          <LivePreviewListener />
        </>
      )}
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
