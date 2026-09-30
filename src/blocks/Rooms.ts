import type { Block } from 'payload'

/** Hotels: rooms and amenities. */
export const RoomsBlock: Block = {
  slug: 'rooms',
  interfaceName: 'RoomsBlock',
  labels: { singular: 'Rooms & amenities', plural: 'Rooms & amenities' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Rooms & amenities' },
    {
      name: 'rooms',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'capacity', type: 'text', admin: { width: '50%' } },
            { name: 'rate', label: 'Rate from (Le)', type: 'text', admin: { width: '50%' } },
          ],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
  ],
}
