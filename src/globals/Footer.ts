import type { GlobalConfig } from 'payload'

import { anyone, groupEditors } from '@/access'
import { adminGroups } from '@/collections/groups'
import { linkGroup } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: adminGroups.settings,
    description: 'Businesses are listed by sector automatically.',
  },
  access: { read: anyone, update: groupEditors },
  fields: [
    { name: 'tagline', type: 'textarea' },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [linkGroup('link', 'Link', true)],
    },
    { name: 'showNewsletter', type: 'checkbox', defaultValue: true },
  ],
}
