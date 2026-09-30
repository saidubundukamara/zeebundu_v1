import type { CollectionConfig } from 'payload'

import { anyone, groupEditors } from '@/access'

import { adminGroups } from './groups'

export const Leadership: CollectionConfig = {
  slug: 'leadership',
  labels: { singular: 'Leader', plural: 'Leadership' },
  admin: {
    group: adminGroups.content,
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'group', 'order'],
  },
  defaultSort: 'order',
  access: {
    read: anyone,
    create: groupEditors,
    update: groupEditors,
    delete: groupEditors,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'title',
          label: 'Job title',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    {
      name: 'group',
      type: 'select',
      required: true,
      defaultValue: 'executive',
      options: [
        { label: 'Executive team', value: 'executive' },
        { label: 'Board', value: 'board' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
