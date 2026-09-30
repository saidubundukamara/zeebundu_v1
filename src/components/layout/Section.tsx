import { cn } from '@/lib/utils'

import { Container } from './Container'

type Tone = 'default' | 'paper' | 'dark'

export function Section({
  tone = 'default',
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<'section'> & { tone?: Tone; containerClassName?: string }) {
  return (
    <section
      data-tone={tone}
      className={cn(
        'group/section py-14 md:py-20',
        tone === 'paper' && 'bg-stone-100',
        tone === 'dark' && 'bg-forest-800 text-stone-50',
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export function Eyebrow({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-xs font-medium tracking-[0.14em] text-gold-700 uppercase group-data-[tone=dark]/section:text-gold-300',
        className,
      )}
      {...props}
    />
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  as: Heading = 'h2',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string | null
  action?: React.ReactNode
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div
      className={cn('mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4', className)}
    >
      <div className="max-w-2xl space-y-3">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading className={Heading === 'h1' ? 'text-h1' : 'text-h2'}>{title}</Heading>
        {description && (
          <p className="text-lead text-stone-600 group-data-[tone=dark]/section:text-stone-300">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
