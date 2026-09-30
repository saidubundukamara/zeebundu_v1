import { postgresAdapter } from '@payloadcms/db-postgres'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { groupEditors, isGroupUser, isSuperAdminUser } from './access'
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
import { expireTags, withGlobalRevalidation, withRevalidation } from './hooks/revalidate'
import { emailAdapter } from './lib/email/adapter'
import { docPath } from './lib/paths'
import { tags } from './lib/tags'
import type { Config } from './payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

// Collections and globals editors can preview live; the site shows their latest draft in Draft Mode
const previewCollections = ['businesses', 'news', 'impact-programmes', 'pages'] as const
const previewURL = (path: string) => `${serverURL}/next/preview?path=${encodeURIComponent(path)}`

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: { titleSuffix: ' · Zeebundu CMS' },
    livePreview: {
      url: ({ data, collectionConfig }) =>
        previewURL(collectionConfig ? docPath(collectionConfig.slug, data?.slug) || '/' : '/'),
      collections: [...previewCollections],
      globals: ['homepage'],
      breakpoints: [
        { label: 'Phone', name: 'phone', width: 375, height: 740 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800 },
      ],
    },
  },
  // Each public collection/global expires its cache tags on publish (src/hooks/revalidate.ts)
  collections: [
    withRevalidation(Businesses, [tags.businesses], (s) => `${tags.businesses}:${s}`),
    withRevalidation(Sectors, [tags.sectors]),
    withRevalidation(News, [tags.news], (s) => `${tags.news}:${s}`),
    withRevalidation(ImpactProgrammes, [tags.impact]),
    withRevalidation(Leadership, [tags.leadership]),
    withRevalidation(Pages, [tags.pages], (s) => `${tags.pages}:${s}`),
    Enquiries,
    // Images are embedded in most cached data, so a changed image expires everything
    withRevalidation(Media, [
      tags.businesses,
      tags.sectors,
      tags.news,
      tags.impact,
      tags.leadership,
      tags.pages,
      ...['homepage', 'media-kit'].map(tags.global),
    ]),
    Users,
  ].map((collection) =>
    (previewCollections as readonly string[]).includes(collection.slug)
      ? {
          ...collection,
          admin: {
            ...collection.admin,
            preview: (doc) => previewURL(docPath(collection.slug, doc?.slug as string) || '/'),
          },
        }
      : collection,
  ),
  globals: [Homepage, MediaKit, SiteSettings, Header, Footer].map(withGlobalRevalidation),
  editor: lexicalEditor(),
  // Resend when RESEND_API_KEY is set, otherwise emails are logged to the console
  email: emailAdapter(),
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
  // Scheduled publishing runs through the jobs queue. On Vercel a cron calls
  // /api/payload-jobs/run (see vercel.json) with `Authorization: Bearer $CRON_SECRET`.
  jobs: {
    access: {
      run: ({ req }) => {
        if (isSuperAdminUser(req.user)) return true
        const secret = process.env.CRON_SECRET
        return Boolean(secret) && req.headers.get('authorization') === `Bearer ${secret}`
      },
    },
  },
  plugins: [
    // Media in Cloudflare R2 (S3-compatible) when configured; local disk otherwise (dev only —
    // Vercel's filesystem isn't persistent). Files are still served via /api/media/file/*.
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: { media: true },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
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
        hooks: {
          afterChange: [({ req }) => expireTags([tags.redirects], req.payload.logger)],
          afterDelete: [({ req }) => expireTags([tags.redirects], req.payload.logger)],
        },
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
