import type { GlobalConfig } from 'payload'

import { anyone, groupEditors } from '@/access'
import { adminGroups } from '@/collections/groups'
import { linkGroup } from '@/fields/link'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: adminGroups.content },
  access: { read: anyone, update: groupEditors },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'headline', type: 'text', required: true },
            { name: 'subline', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            linkGroup('primaryCta', 'Main button'),
            linkGroup('secondaryCta', 'Second button'),
          ],
        },
        {
          label: 'Featured',
          fields: [
            {
              name: 'featuredBusinesses',
              type: 'relationship',
              relationTo: 'businesses',
              hasMany: true,
              admin: { description: 'Leave empty to use businesses marked "featured".' },
            },
            {
              name: 'featuredImpact',
              label: 'Featured impact story',
              type: 'relationship',
              relationTo: 'impact-programmes',
            },
          ],
        },
        {
          label: "Chairman's message",
          name: 'chairman',
          fields: [
            { name: 'quote', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', admin: { width: '50%' } },
                { name: 'title', type: 'text', admin: { width: '50%' } },
              ],
            },
            { name: 'portrait', type: 'upload', relationTo: 'media' },
            linkGroup('link', 'Read more link'),
          ],
        },
        {
          label: 'Enquiry band',
          name: 'ctaBand',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea' },
            linkGroup('link', 'Button'),
          ],
        },
      ],
    },
  ],
}
