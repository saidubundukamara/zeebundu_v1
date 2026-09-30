import type { GroupField } from 'payload'

export const linkGroup = (name = 'link', label = 'Link', required = false): GroupField => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required, admin: { width: '50%' } },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required,
          admin: {
            width: '50%',
            description: 'A page on this site (e.g. /businesses) or a full web address.',
          },
        },
      ],
    },
  ],
})
