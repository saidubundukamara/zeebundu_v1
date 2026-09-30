import { cn } from '@/lib/utils'

type Stat = { value: string; label: string; id?: string | null }

/** Big-number stats. Reads its colours from the surrounding section tone. */
export function StatsGrid({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4', className)}>
      {stats.map((stat) => (
        <div
          key={stat.id ?? stat.label}
          className="flex flex-col-reverse gap-1 border-l-2 border-gold-400 pl-4"
        >
          <dt className="text-sm text-stone-600 group-data-[tone=dark]/section:text-stone-300">
            {stat.label}
          </dt>
          <dd className="font-heading text-h1 text-forest-800 group-data-[tone=dark]/section:text-gold-400">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
