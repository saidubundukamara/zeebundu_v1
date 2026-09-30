import type { Block } from 'payload'

/** Product catalogue with sizes and prices, e.g. water, juices, construction materials. */
export const ProductListBlock: Block = {
  slug: 'productList',
  interfaceName: 'ProductListBlock',
  labels: { singular: 'Product list', plural: 'Product lists' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Products' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'products',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'size', type: 'text', admin: { width: '20%' } },
            { name: 'pack', type: 'text', admin: { width: '20%' } },
            { name: 'price', label: 'Price (Le)', type: 'text', admin: { width: '20%' } },
          ],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'note',
      type: 'text',
      admin: { description: 'e.g. "Prices include GST and may change."' },
    },
  ],
}
