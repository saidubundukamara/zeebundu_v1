import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      // Access rules per role and tenant scoping are added in Phase 2
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'business-editor',
      options: [
        { label: 'Super admin', value: 'super-admin' },
        { label: 'Group editor', value: 'group-editor' },
        { label: 'Business editor', value: 'business-editor' },
      ],
      saveToJWT: true,
    },
  ],
}
