import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Zeebundu Group</h1>
      <p className="max-w-md text-muted-foreground">
        Our new website is on its way. Sixteen businesses, one group, rooted in Sierra Leone.
      </p>
      <Button asChild>
        <Link href="/admin">Open CMS</Link>
      </Button>
    </main>
  )
}
