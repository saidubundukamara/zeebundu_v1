import { cn } from '@/lib/utils'

import { Container } from './Container'

/*
 * default: the white runnable ground.
 * paper:   a quiet tinted band, used sparingly to separate dense passages.
 * dark:    a course-purple field, reserved for the one closing call to action.
 */
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
        'group/section py-20 md:py-28',
        tone === 'paper' && 'bg-muted',
        tone === 'dark' && 'bg-map-course text-primary-foreground',
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

/** Small label. Use rarely; the heading should normally carry itself. */
export function Eyebrow({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'font-heading text-base font-bold tracking-[0.06em] text-map-ink-soft uppercase group-data-[tone=dark]/section:text-primary-foreground/80',
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
    <div className={cn('mb-12 flex flex-col gap-5 md:mb-16', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading className={cn('max-w-4xl', Heading === 'h1' ? 'text-h1' : 'text-h2')}>
        {title}
      </Heading>
      {description && (
        <p className="max-w-[60ch] text-lead text-map-ink-soft group-data-[tone=dark]/section:text-primary-foreground/85">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
