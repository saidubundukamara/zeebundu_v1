import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { groupEditors, groupEditorsField, publishedOrAuthenticated, superAdmin } from '@/access'
import { businessBlocks } from '@/blocks'
import { districts } from '@/fields/districts'
import { statsArray } from '@/fields/stats'

import { adminGroups } from './groups'

/**
 * One document per business. This is also the multi-tenant "tenants" collection: business
 * editors are assigned businesses on their user, and the plugin limits them to those documents.
 */
export const Businesses: CollectionConfig = {
  slug: 'businesses',
  labels: { singular: 'Business', plural: 'Businesses' },
  admin: {
    group: adminGroups.businesses,
    useAsTitle: 'name',
    defaultColumns: ['name', 'sector', 'featured', '_status', 'updatedAt'],
    description: 'Each business has its own page at /businesses/[slug].',
  },
  defaultSort: 'order',
  access: {
    read: publishedOrAuthenticated,
    create: groupEditors,
    // Business editors are limited to their own businesses by the multi-tenant plugin
    update: ({ req: { user } }) => Boolean(user),
    delete: superAdmin,
    readVersions: ({ req: { user } }) => Boolean(user),
  },
  versions: { drafts: { schedulePublish: true }, maxPerDoc: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'tagline',
              type: 'text',
              admin: { description: 'One line under the name, about 12 words.' },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 240,
              admin: { description: 'One or two sentences, shown on cards and in search results.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%' },
                },
              ],
            },
            { name: 'overview', type: 'richText' },
          ],
        },
        {
          label: 'Services & stats',
          fields: [
            {
              name: 'services',
              label: 'Products & services',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
            statsArray(),
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
          ],
        },
        {
          label: 'Extras',
          description:
            'Optional sections for this business, e.g. exchange rates, loan products, product sizes or rooms.',
          fields: [
            { name: 'layout', label: 'Extra sections', type: 'blocks', blocks: businessBlocks },
          ],
        },
        {
          label: 'Locations & contact',
          fields: [
            {
              name: 'locations',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                    {
                      name: 'district',
                      type: 'select',
                      options: districts,
                      admin: { width: '50%' },
                    },
                  ],
                },
                { name: 'address', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'phone', type: 'text', admin: { width: '50%' } },
                    {
                      name: 'hours',
                      label: 'Opening hours',
                      type: 'text',
                      admin: { width: '50%', description: 'e.g. Mon–Sat 8am–8pm' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'lat', label: 'Latitude', type: 'number', admin: { width: '50%' } },
                    { name: 'lng', label: 'Longitude', type: 'number', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            {
              name: 'contact',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'phone', type: 'text', admin: { width: '50%' } },
                    {
                      name: 'whatsapp',
                      label: 'WhatsApp number',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'International format, e.g. +23276000000',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'email',
                      label: 'Public email',
                      type: 'email',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'enquiryEmail',
                      label: 'Enquiries go to',
                      type: 'email',
                      admin: {
                        width: '50%',
                        description: 'Not shown on the site. Website enquiries are emailed here.',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'socials',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: ['facebook', 'instagram', 'linkedin', 'tiktok', 'x', 'youtube'].map(
                    (name) => ({ name, type: 'text' as const, admin: { width: '33%' } }),
                  ),
                },
              ],
            },
            {
              name: 'website',
              label: 'External website',
              type: 'text',
              admin: { description: 'Optional, if the business has its own site.' },
            },
          ],
        },
      ],
    },
    // Sidebar — structural fields only group editors may change
    slugField({
      useAsSlug: 'name',
      position: 'sidebar',
      overrides: (row) => {
        for (const field of row.fields) {
          if (field.type === 'text' && field.name === 'slug') {
            field.access = { update: groupEditorsField }
          }
        }
        return row
      },
    }),
    {
      name: 'sector',
      type: 'relationship',
      relationTo: 'sectors',
      required: true,
      access: { update: groupEditorsField },
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      access: { update: groupEditorsField },
      admin: { position: 'sidebar', description: 'Show in the homepage carousel.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      access: { update: groupEditorsField },
      admin: { position: 'sidebar', description: 'Lower numbers are listed first.' },
    },
  ],
}
