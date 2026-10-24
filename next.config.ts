import { withPayload } from '@payloadcms/next/withPayload'
import { withSentryConfig } from '@sentry/nextjs/config'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    // Cloudinary uploads (logos and anything rendered with a plain next/image)
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  // URLs from the previous site (~/Dev/zeebundu_old) and from the first seed, before the client's
  // October 2026 content pack renamed the businesses. Editors add further redirects in the CMS.
  async redirects() {
    // First-seed business slug → current slug, or a sector page for dropped businesses
    const renamedBusinesses: Record<string, string> = {
      'gas-stations': '/businesses/gas-station',
      'petroleum-services': '/businesses/sector/energy',
      'water-production': '/businesses/heart2heart-water',
      beverages: '/businesses/sector/food-beverage-production',
      'zeemart-shopping': '/businesses/zeemart-360',
      'cosmetics-salon': '/businesses/zeelux',
      'construction-materials': '/businesses/construction',
      'farming-operations': '/businesses/food-production',
      'fish-farming': '/businesses/sector/agriculture-food',
      poultry: '/businesses/sector/agriculture-food',
      livestock: '/businesses/cattle-farms',
      'foreign-exchange': '/businesses/financial-services',
      'micro-finance-lending': '/businesses/zee-empowered',
    }
    const oldSite: Record<string, string> = {
      farming: 'food-production',
      zeemart: 'zeemart-360',
      'micro-finance': 'zee-empowered',
      'hotels-and-resorts': 'hotels-resorts',
      ...Object.fromEntries(
        Object.entries(renamedBusinesses).map(([from, to]) => [
          from,
          to.replace('/businesses/', ''),
        ]),
      ),
    }
    const oldCategories: Record<string, string> = {
      fuel: 'energy',
      'gas-stations': 'energy',
      hotels: 'hospitality',
      restaurants: 'food-beverage-production',
      food: 'agriculture-food',
    }
    return [
      ...Object.entries(renamedBusinesses).map(([from, to]) => ({
        source: `/businesses/${from}`,
        destination: to,
        permanent: true,
      })),
      ...Object.entries(oldSite).map(([from, to]) => ({
        source: `/business/${from}`,
        destination: `/businesses/${to}`,
        permanent: true,
      })),
      { source: '/business/:slug', destination: '/businesses/:slug', permanent: true },
      ...Object.entries(oldCategories).map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/businesses/sector/${to}`,
        permanent: true,
      })),
      { source: '/services/:category', destination: '/businesses', permanent: true },
      // Impact became Community; programme pages under /impact/[slug] stay where they are
      { source: '/impact', destination: '/community', permanent: true },
    ]
  },
  experimental: {
    // One 404 for unmatched URLs, since the site and admin have separate root layouts
    globalNotFound: true,
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

const config = withPayload(nextConfig, { devBundleServerPackages: false })

// Sentry is opt-in: without a DSN the config is left untouched. Source maps are only
// uploaded when SENTRY_AUTH_TOKEN is set, so builds never need a Sentry account.
const sentryEnabled = Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN)

export default sentryEnabled
  ? withSentryConfig(config, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      telemetry: false,
      sourcemaps: { disable: !process.env.SENTRY_AUTH_TOKEN },
      release: { create: Boolean(process.env.SENTRY_AUTH_TOKEN) },
    })
  : config
