import type { CollectionConfig, Field, FieldAccess } from 'payload'

import { ownBusinessOrGroup, superAdmin } from '@/access'

import { adminGroups } from './groups'

// Submitted details are never edited in the admin; only status and notes are.
const readOnly: FieldAccess = () => false
const submitted = (field: Field): Field =>
  'name' in field ? ({ ...field, access: { update: readOnly } } as Field) : field

/**
 * Website enquiries. Created by the enquiry form (server-side, Phase 4), not in the admin.
 * Business editors see enquiries for their own businesses; general enquiries are group-only.
 */
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    group: adminGroups.enquiries,
    useAsTitle: 'name',
    defaultColumns: ['name', 'business', 'type', 'status', 'createdAt'],
    description: 'Messages sent through the website. Update the status as you follow up.',
  },
  defaultSort: '-createdAt',
  access: {
    read: ownBusinessOrGroup(),
    create: superAdmin,
    update: ownBusinessOrGroup(),
    delete: superAdmin,
  },
  fields: [
    ...(
      [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'phone', type: 'text' },
        { name: 'message', type: 'textarea', required: true },
        { name: 'pageUrl', label: 'Sent from page', type: 'text' },
      ] satisfies Field[]
    ).map((f) => (f.type === 'row' ? { ...f, fields: f.fields.map(submitted) } : submitted(f))),
    submitted({
      name: 'business',
      type: 'relationship',
      relationTo: 'businesses',
      index: true,
      admin: { position: 'sidebar', description: 'Empty for general group enquiries.' },
    }),
    submitted({
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Sales / quote', value: 'sales' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Media', value: 'media' },
      ],
      admin: { position: 'sidebar' },
    }),
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'internalNotes', type: 'textarea', admin: { description: 'Only visible to staff.' } },
  ],
}
