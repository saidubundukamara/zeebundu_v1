import { Section } from '@/components/layout/Section'
import { formatDate } from '@/lib/links'
import type { RatesTableBlock as RatesTableBlockType } from '@/payload-types'

const fmt = (n?: number | null) =>
  n == null ? '—' : new Intl.NumberFormat('en-GB', { maximumFractionDigits: 4 }).format(n)

export function RatesTableBlock({
  block,
  tone,
}: {
  block: RatesTableBlockType
  tone: 'default' | 'paper'
}) {
  if (!block.rates?.length) return null
  const base = block.baseCurrency || 'SLE'
  return (
    <Section tone={tone} containerClassName="max-w-4xl">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        {block.heading && <h2 className="text-h2">{block.heading}</h2>}
        {block.updatedAt && (
          <p className="text-sm text-stone-600">
            As of <time dateTime={block.updatedAt}>{formatDate(block.updatedAt)}</time>
          </p>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
        <table className="w-full min-w-md text-left text-sm">
          <caption className="sr-only">
            Buy and sell rates in {base} per one unit of each currency
          </caption>
          <thead className="bg-stone-100 text-xs tracking-wide text-stone-600 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Currency
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                We buy ({base})
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                We sell ({base})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {block.rates.map((rate) => (
              <tr key={rate.id ?? rate.code}>
                <th scope="row" className="px-4 py-3 font-normal">
                  <span className="font-medium text-forest-800">{rate.code}</span>{' '}
                  <span className="text-stone-600">{rate.currency}</span>
                </th>
                <td className="px-4 py-3 text-right tabular-nums">{fmt(rate.buy)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{fmt(rate.sell)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.note && <p className="mt-4 text-sm text-stone-600">{block.note}</p>}
    </Section>
  )
}
