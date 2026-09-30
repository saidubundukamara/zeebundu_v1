import type { MetadataRoute } from 'next'

import { absoluteURL } from '@/lib/seo/jsonld'

/**
 * /robots.txt. Preview/staging deploys (VERCEL_ENV set to anything but "production")
 * are closed to crawlers entirely so they never compete with the live site.
 */
export default function robots(): MetadataRoute.Robots {
  const isPreviewDeploy = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== 'production'

  if (isPreviewDeploy) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      // Uploaded images are served from /api/media/file — keep them indexable
      allow: ['/', '/api/media/file/'],
      disallow: ['/admin', '/api/', '/wireframes', '/next/'],
    },
    sitemap: absoluteURL('/sitemap.xml'),
  }
}
