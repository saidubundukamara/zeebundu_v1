import { Forbidden, type CollectionConfig } from 'payload'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

import { isSuperAdminUser, superAdmin, superAdminField } from '@/access'

import { adminGroups } from './groups'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: adminGroups.admin,
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  hooks: {
    // No self sign-up. Payload's "create first user" screen lets anyone register while the
    // users table is empty, so over HTTP an account can only be created by a logged-in user
    // (and the create access below makes that a super-admin). The seed script uses the local
    // API and is unaffected. See also src/proxy.ts.
    beforeOperation: [
      ({ operation, req }) => {
        if (operation === 'create' && !req.user && req.payloadAPI !== 'local') {
          throw new Forbidden(req.t)
        }
      },
    ],
  },
  access: {
    // Everyone can see their own account; super-admins manage all accounts
    read: ({ req: { user } }) =>
      isSuperAdminUser(user) ? true : user ? { id: { equals: user.id } } : false,
    create: superAdmin,
    update: ({ req: { user } }) =>
      isSuperAdminUser(user) ? true : user ? { id: { equals: user.id } } : false,
    delete: superAdmin,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
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
      access: { create: superAdminField, update: superAdminField },
      admin: {
        position: 'sidebar',
        description:
          'Super admin: everything. Group editor: all content. Business editor: only the businesses below.',
      },
    },
    {
      // Multi-tenant plugin field: the businesses a business editor may manage
      ...tenantsArrayField({
        tenantsCollectionSlug: 'businesses',
        arrayFieldAccess: { create: superAdminField, update: superAdminField },
      }),
      label: 'Assigned businesses',
      labels: { singular: 'Business', plural: 'Businesses' },
      admin: {
        condition: (data) => data?.role === 'business-editor',
        description:
          'Business editors can only edit these businesses and their news and enquiries.',
      },
    },
  ],
}
