import type { GlobalConfig } from 'payload'

import { anyone, groupEditors } from '@/access'
import { adminGroups } from '@/collections/groups'

export const MediaKit: GlobalConfig = {
  slug: 'media-kit',
  admin: { group: adminGroups.content, description: 'Shown at /news/media-kit.' },
  access: { read: anyone, update: groupEditors },
  fields: [
    { name: 'boilerplate', label: 'About Zeebundu (press boilerplate)', type: 'textarea' },
    {
      name: 'logos',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    { name: 'brandGuidelines', type: 'upload', relationTo: 'media' },
    {
      name: 'pressContact',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', admin: { width: '33%' } },
            { name: 'email', type: 'email', admin: { width: '33%' } },
            { name: 'phone', type: 'text', admin: { width: '33%' } },
          ],
        },
      ],
    },
  ],
}
