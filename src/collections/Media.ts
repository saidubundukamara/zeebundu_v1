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
    // Sizes are never enlarged, so an image narrower than 400px has no thumbnail;
    // fall back to the original so the admin still shows a preview of it.
    adminThumbnail: ({ doc }) => {
      const { mimeType, url, filename, sizes } = doc as {
        mimeType?: string
        url?: string | null
        filename?: string | null
        sizes?: { thumbnail?: { url?: string | null; filename?: string | null } }
      }
      if (!mimeType?.startsWith('image/')) return null
      const thumbnail = sizes?.thumbnail
      if (thumbnail?.url) return thumbnail.url
      if (thumbnail?.filename) return `/api/media/file/${encodeURIComponent(thumbnail.filename)}`
      return url || (filename ? `/api/media/file/${encodeURIComponent(filename)}` : null)
    },
  },
}
