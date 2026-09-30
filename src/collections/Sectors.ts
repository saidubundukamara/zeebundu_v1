import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone, groupEditors } from '@/access'

import { adminGroups } from './groups'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
  admin: {
    group: adminGroups.businesses,
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
    description: 'Groups businesses on the site, e.g. Energy, Hospitality.',
  },
  defaultSort: 'order',
  access: {
    read: anyone,
    create: groupEditors,
    update: groupEditors,
    delete: groupEditors,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    slugField({ useAsSlug: 'name', position: 'sidebar' }),
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
