import { postgresAdapter } from '@payloadcms/db-postgres'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { groupEditors, isGroupUser } from './access'
import { Businesses } from './collections/Businesses'
import { Enquiries } from './collections/Enquiries'
import { adminGroups } from './collections/groups'
import { ImpactProgrammes } from './collections/ImpactProgrammes'
import { Leadership } from './collections/Leadership'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Pages } from './collections/Pages'
import { Sectors } from './collections/Sectors'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Homepage } from './globals/Homepage'
import { MediaKit } from './globals/MediaKit'
import { SiteSettings } from './globals/SiteSettings'
import type { Config } from './payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

// Public URL for each SEO-enabled collection
const docPath = (collection: string | undefined, slug: string | undefined) => {
  if (!slug) return ''
  switch (collection) {
    case 'businesses':
      return `/businesses/${slug}`
    case 'news':
      return `/news/${slug}`
    case 'impact-programmes':
      return `/impact/${slug}`
    default:
      return `/${slug}`
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: { titleSuffix: ' · Zeebundu CMS' },
  },
  collections: [
    Businesses,
    Sectors,
    News,
    ImpactProgrammes,
    Leadership,
    Pages,
    Enquiries,
    Media,
    Users,
  ],
  globals: [Homepage, MediaKit, SiteSettings, Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    multiTenantPlugin<Config>({
      // Each business is a tenant; business editors are assigned businesses on their user
      tenantsSlug: 'businesses',
      tenantsArrayField: { includeDefaultField: false },
      // News, enquiries and media can be group-level (no business), so they use our own
      // business-scoped access (src/access) instead of the plugin's required tenant field
      collections: {},
      userHasAccessToAllTenants: (user) => isGroupUser(user),
      useTenantsListFilter: false,
      i18n: { translations: { en: { 'nav-tenantSelector-label': 'Business' } } },
    }),
    seoPlugin({
      collections: ['businesses', 'news', 'impact-programmes', 'pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        `${(doc as { name?: string; title?: string }).name ?? doc.title ?? ''} | Zeebundu Group`,
      generateDescription: ({ doc }) => doc.summary ?? doc.excerpt ?? '',
      generateURL: ({ doc, collectionConfig }) =>
        `${serverURL}${docPath(collectionConfig?.slug, doc?.slug)}`,
    }),
    redirectsPlugin({
      collections: ['pages', 'businesses', 'news', 'impact-programmes'],
      overrides: {
        admin: { group: adminGroups.admin },
        access: {
          read: groupEditors,
          create: groupEditors,
          update: groupEditors,
          delete: groupEditors,
        },
      },
    }),
  ],
})
