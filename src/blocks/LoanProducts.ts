import type { Block } from 'payload'

/** Micro-Finance: loan products, requirements and terms. */
export const LoanProductsBlock: Block = {
  slug: 'loanProducts',
  interfaceName: 'LoanProductsBlock',
  labels: { singular: 'Loan products', plural: 'Loan products' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Loan products' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'products',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'amountRange', label: 'Amount (Le)', type: 'text', admin: { width: '33%' } },
            {
              name: 'interestRate',
              type: 'text',
              admin: {
                width: '33%',
                description: 'Say per month or per year, and flat or reducing balance.',
              },
            },
            { name: 'term', type: 'text', admin: { width: '33%' } },
          ],
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'terms', label: 'Terms & conditions', type: 'richText' },
  ],
}
