import type { Block } from 'payload'

import { linkGroup } from '@/fields/link'

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    linkGroup('link', 'Button', true),
    {
      name: 'style',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark green band', value: 'dark' },
        { label: 'Light band', value: 'light' },
      ],
    },
  ],
}
