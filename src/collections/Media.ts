import type { CollectionConfig } from 'payload'

import { anyone, authenticated, ownBusinessOrGroup } from '@/access'
import { businessField } from '@/fields/businessField'

import { adminGroups } from './groups'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: adminGroups.media,
    defaultColumns: ['filename', 'alt', 'business', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: ownBusinessOrGroup(),
    delete: ownBusinessOrGroup(),
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for people who cannot see it.' },
    },
    { name: 'caption', type: 'text' },
    businessField(),
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1920 },
    ],
    adminThumbnail: 'thumbnail',
  },
}
