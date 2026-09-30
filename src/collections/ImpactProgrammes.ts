import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { groupEditors, publishedOrAuthenticated } from '@/access'
import { statsArray } from '@/fields/stats'

import { adminGroups } from './groups'

export const impactPillars = [
  { label: 'Education', value: 'education' },
  { label: 'Health', value: 'health' },
  { label: 'Environment', value: 'environment' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'Community', value: 'community' },
]

export const ImpactProgrammes: CollectionConfig = {
  slug: 'impact-programmes',
  labels: { singular: 'Impact programme', plural: 'Impact programmes' },
  admin: {
    group: adminGroups.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'pillar', '_status', 'updatedAt'],
    description: 'Foundation / CSR programmes and stories, shown under /impact.',
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
          label: 'Programme',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'summary', type: 'textarea', required: true, maxLength: 280 },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            { name: 'body', type: 'richText' },
            statsArray(),
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
            {
              name: 'partners',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'logo', type: 'upload', relationTo: 'media' },
                { name: 'url', label: 'Website', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    slugField({ position: 'sidebar' }),
    {
      name: 'pillar',
      type: 'select',
      required: true,
      options: impactPillars,
      admin: { position: 'sidebar' },
    },
    {
      name: 'business',
      type: 'relationship',
      relationTo: 'businesses',
      admin: { position: 'sidebar', description: 'Optional: the business behind this programme.' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
