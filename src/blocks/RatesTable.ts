import type { Block } from 'payload'

/** Foreign Exchange: indicative buy/sell rates against the Leone. */
export const RatesTableBlock: Block = {
  slug: 'ratesTable',
  interfaceName: 'RatesTableBlock',
  labels: { singular: 'Exchange rates table', plural: 'Exchange rates tables' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Indicative exchange rates' },
    {
      type: 'row',
      fields: [
        {
          name: 'baseCurrency',
          type: 'text',
          defaultValue: 'SLE',
          admin: { width: '50%', description: 'Rates are shown as this currency per 1 unit.' },
        },
        { name: 'updatedAt', label: 'Rates as of', type: 'date', admin: { width: '50%' } },
      ],
    },
    {
      name: 'rates',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'code', type: 'text', required: true, admin: { width: '20%' } },
            { name: 'currency', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'buy', type: 'number', admin: { width: '20%' } },
            { name: 'sell', type: 'number', admin: { width: '20%' } },
          ],
        },
      ],
    },
    {
      name: 'note',
      type: 'textarea',
      defaultValue:
        'Rates are indicative and may change during the day. Visit a branch for a quote.',
    },
  ],
}
