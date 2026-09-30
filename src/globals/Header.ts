import type { GlobalConfig } from 'payload'

import { anyone, groupEditors } from '@/access'
import { adminGroups } from '@/collections/groups'
import { linkGroup } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: adminGroups.settings },
  access: { read: anyone, update: groupEditors },
  fields: [
    {
      name: 'navItems',
      label: 'Menu',
      type: 'array',
      maxRows: 7,
      fields: [linkGroup('link', 'Link', true)],
    },
    linkGroup('cta', 'Header button'),
  ],
}
