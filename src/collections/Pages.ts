import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { groupEditors, publishedOrAuthenticated } from '@/access'
import { pageBlocks } from '@/blocks'

import { adminGroups } from './groups'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: adminGroups.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Flexible pages such as About, Privacy and Terms.',
  },
  access: {
    read: publishedOrAuthenticated,
    create: groupEditors,
    update: groupEditors,
    delete: groupEditors,
    readVersions: groupEditors,
  },
  versions: { drafts: true, maxPerDoc: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'layout', type: 'blocks', blocks: pageBlocks },
          ],
        },
      ],
    },
    slugField({ position: 'sidebar' }),
  ],
}
