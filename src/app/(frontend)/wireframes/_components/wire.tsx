import { cn } from '@/lib/utils'

import { navItems, sectors } from './data'

/** Grey placeholder box with a label describing the content that goes there. */
export function Box({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex min-h-16 items-center justify-center rounded-md border border-dashed border-stone-400 bg-stone-200/60 p-3 text-center text-xs tracking-wide text-stone-600 uppercase',
        className,
      )}
    >
      {label}
    </div>
  )
}

/** Stand-in for a line of text. */
export function Lines({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn('h-2.5 rounded-full bg-stone-300', i === count - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  )
}

export function Section({
  title,
  note,
  tone = 'default',
  children,
}: {
  title?: string
  note?: string
  tone?: 'default' | 'paper' | 'dark'
  children: React.ReactNode
}) {
  return (
    <section
      className={cn(
        'border-b border-stone-200 py-12 md:py-16',
        tone === 'paper' && 'bg-stone-100',
        tone === 'dark' && 'bg-forest-800 text-stone-50',
      )}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {title && (
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-h2">{title}</h2>
            {note && (
              <p
                className={cn(
                  'text-xs tracking-wide uppercase',
                  tone === 'dark' ? 'text-gold-300' : 'text-gold-700',
                )}
              >
                {note}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export function WireHeader() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <span className="font-heading text-xl font-semibold tracking-wide text-forest-800">
          ZEEBUNDU
        </span>
        <nav className="hidden gap-6 text-sm md:flex" aria-label="Primary (wireframe)">
          {navItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-highlight px-3 py-1.5 text-sm font-medium text-highlight-foreground">
            Enquire
          </span>
          <Box label="Menu" className="min-h-0 px-2 py-1 md:hidden" />
        </div>
      </div>
    </header>
  )
}

export function WireFooter() {
  return (
    <footer className="bg-forest-900 text-stone-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        {sectors.map((sector) => (
          <div key={sector.name}>
            <p className="mb-2 text-xs tracking-wide text-gold-300 uppercase">{sector.name}</p>
            <ul className="space-y-1 text-sm">
              {sector.businesses.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 border-t border-white/10 px-4 py-8 md:grid-cols-3 md:px-6">
        <Box
          label="Group contact · address · phone · email"
          className="bg-white/5 text-stone-300"
        />
        <Box label="Newsletter signup" className="bg-white/5 text-stone-300" />
        <Box label="Socials · Privacy · Terms · ©" className="bg-white/5 text-stone-300" />
      </div>
    </footer>
  )
}
