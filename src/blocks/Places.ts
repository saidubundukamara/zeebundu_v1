import type { Block } from 'payload'

export const PlacesBlock: Block = {
  slug: 'places',
  interfaceName: 'PlacesBlock',
  labels: { singular: 'Places list', plural: 'Places lists' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'place', type: 'text', required: true, admin: { width: '50%' } },
            {
              name: 'kind',
              type: 'select',
              required: true,
              defaultValue: 'operating',
              options: [
                { label: 'Office', value: 'office' },
                { label: 'Operating', value: 'operating' },
                { label: 'Agriculture', value: 'agriculture' },
                { label: 'In development', value: 'in-development' },
              ],
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: { description: 'What the group does here.' },
        },
      ],
    },
  ],
}
