import { cn } from '@/lib/utils'

type Stat = { value: string; label: string; id?: string | null }

/** Figures set like map-legend entries: big condensed numeral, plain label, one hairline. */
export function StatsGrid({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4', className)}>
      {stats.map((stat) => (
        <div
          key={stat.id ?? stat.label}
          className="flex flex-col-reverse gap-2 border-t border-map-ink/80 pt-4 group-data-[tone=dark]/section:border-primary-foreground/60"
        >
          <dt className="text-sm text-map-ink-soft group-data-[tone=dark]/section:text-primary-foreground/85">
            {stat.label}
          </dt>
          <dd className="control-num text-6xl text-map-ink group-data-[tone=dark]/section:text-primary-foreground md:text-7xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
