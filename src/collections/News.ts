import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, ownBusinessOrGroup, publishedOrOwnBusiness } from '@/access'
import { businessField } from '@/fields/businessField'

import { adminGroups } from './groups'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Article', plural: 'News & press' },
  admin: {
    group: adminGroups.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'business', 'publishedAt', '_status'],
  },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrOwnBusiness(),
    create: authenticated, // businessField validation keeps business editors to their own business
    update: ownBusinessOrGroup(),
    delete: ownBusinessOrGroup(),
    readVersions: ownBusinessOrGroup(),
  },
  versions: { drafts: { schedulePublish: true }, maxPerDoc: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              maxLength: 280,
              admin: { description: 'Shown on cards and in search results.' },
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
            { name: 'body', type: 'richText', required: true },
          ],
        },
      ],
    },
    slugField({ position: 'sidebar' }),
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'news',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Press release', value: 'press' },
        { label: 'Story', value: 'story' },
      ],
      admin: { position: 'sidebar' },
    },
    businessField(),
    {
      name: 'sectors',
      type: 'relationship',
      relationTo: 'sectors',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    { name: 'author', type: 'text', admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      type: 'date',
      index: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) =>
            value ?? (siblingData._status === 'published' ? new Date().toISOString() : value),
        ],
      },
    },
  ],
}
