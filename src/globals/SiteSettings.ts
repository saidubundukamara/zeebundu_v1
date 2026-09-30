import type { GlobalConfig } from 'payload'

import { anyone, superAdmin } from '@/access'
import { adminGroups } from '@/collections/groups'
import { statsArray } from '@/fields/stats'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Group details',
  admin: { group: adminGroups.settings },
  access: { read: anyone, update: superAdmin },
  fields: [
    { name: 'groupName', type: 'text', required: true, defaultValue: 'Zeebundu Group' },
    {
      name: 'contact',
      label: 'Head office contact',
      type: 'group',
      fields: [
        { name: 'address', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text', admin: { width: '33%' } },
            { name: 'whatsapp', label: 'WhatsApp', type: 'text', admin: { width: '33%' } },
            { name: 'email', type: 'email', admin: { width: '33%' } },
          ],
        },
        {
          name: 'enquiryEmail',
          label: 'Group enquiries inbox',
          type: 'email',
          admin: {
            description: 'General enquiries go here; business enquiries are copied here too.',
          },
        },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: ['facebook', 'instagram', 'linkedin', 'tiktok', 'x', 'youtube'].map((name) => ({
            name,
            type: 'text' as const,
            admin: { width: '33%' },
          })),
        },
      ],
    },
    {
      ...statsArray('stats'),
      label: 'Stats band',
      admin: { description: 'Numbers shown on the homepage, e.g. 16 businesses, 8 sectors.' },
    },
  ],
}
