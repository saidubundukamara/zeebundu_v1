import type { ArrayField } from 'payload'

export const statsArray = (name = 'stats'): ArrayField => ({
  name,
  type: 'array',
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { width: '30%', description: 'e.g. 16, 250+, 24/7' },
        },
        { name: 'label', type: 'text', required: true, admin: { width: '70%' } },
      ],
    },
  ],
})
