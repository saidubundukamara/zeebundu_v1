import { CheckIcon } from '@phosphor-icons/react/ssr'

import { Section, SectionHeader } from '@/components/layout/Section'
import { RichText } from '@/components/RichText'
import type { LoanProductsBlock as LoanProductsBlockType } from '@/payload-types'

export function LoanProductsBlock({
  block,
  tone,
}: {
  block: LoanProductsBlockType
  tone: 'default' | 'paper'
}) {
  return (
    <Section tone={tone}>
      {block.heading && <SectionHeader title={block.heading} description={block.intro} />}
      <ul className="grid gap-5 md:grid-cols-2">
        {block.products?.map((product) => (
          <li key={product.id} className="space-y-4 rounded-lg border border-map-rule bg-card p-6">
            <h3 className="font-heading text-h3 text-map-ink">{product.name}</h3>
            {product.description && (
              <p className="text-sm leading-relaxed text-map-ink-soft">{product.description}</p>
            )}
            <dl className="grid grid-cols-3 gap-3 border-t border-map-rule pt-4 text-sm">
              {[
                ['Amount', product.amountRange],
                ['Interest', product.interestRate],
                ['Term', product.term],
              ].map(([label, value]) =>
                value ? (
                  <div key={label}>
                    <dt className="text-xs text-map-ink-soft">{label}</dt>
                    <dd className="font-medium text-map-ink">{value}</dd>
                  </div>
                ) : null,
              )}
            </dl>
          </li>
        ))}
      </ul>
      {(block.requirements?.length || block.terms) && (
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {block.requirements?.length ? (
            <div>
              <h3 className="mb-4 font-heading text-h3">What you need to apply</h3>
              <ul className="space-y-2">
                {block.requirements.map((r) => (
                  <li key={r.id} className="flex gap-3 text-sm">
                    <CheckIcon
                      weight="light"
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-map-ink"
                    />
                    {r.item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {block.terms && (
            <div>
              <h3 className="mb-4 font-heading text-h3">Terms &amp; conditions</h3>
              <RichText data={block.terms} className="prose-sm md:prose-sm" />
            </div>
          )}
        </div>
      )}
    </Section>
  )
}
