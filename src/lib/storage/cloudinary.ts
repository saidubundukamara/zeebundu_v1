import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import path from 'node:path'
import type { Config, Plugin } from 'payload'

/**
 * Payload media on Cloudinary. Each uploaded file (the original and every
 * generated image size) is stored under `<folder>/<name>`, and documents point
 * straight at Cloudinary's CDN. Media.tsx then asks Cloudinary for the right
 * format and width per breakpoint.
 */
type Options = {
  enabled: boolean
  cloudName: string
  apiKey: string
  apiSecret: string
  /** Folder in the Cloudinary account, keeps site uploads apart from anything else there. */
  folder: string
  collections: string[]
}

const resourceType = (filename: string) =>
  /\.(jpe?g|png|gif|webp|avif|svg|pdf|heic|tiff?)$/i.test(filename) ? 'image' : 'raw'

/** "hero-1920x1080.jpg" → "zeebundu-site/hero-1920x1080" (raw files keep their extension). */
const publicIdFor = (folder: string, filename: string, prefix?: string) => {
  const base = resourceType(filename) === 'image' ? filename.replace(/\.[^.]+$/, '') : filename
  return path.posix.join(folder, prefix ?? '', base)
}

const deliveryURL = (folder: string, filename: string, prefix?: string) => {
  const type = resourceType(filename)
  const ext = path.extname(filename).slice(1).toLowerCase()
  return cloudinary.url(publicIdFor(folder, filename, prefix), {
    secure: true,
    resource_type: type,
    ...(type === 'image' && ext ? { format: ext === 'jpeg' ? 'jpg' : ext } : {}),
  })
}

const cloudinaryAdapter =
  (folder: string): Adapter =>
  ({ prefix }): GeneratedAdapter => ({
    name: 'cloudinary',

    handleUpload: async ({ file }) => {
      await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            public_id: publicIdFor(folder, file.filename, prefix),
            resource_type: resourceType(file.filename),
            overwrite: true,
            unique_filename: false,
            use_filename: false,
          },
          (error, result) => (error || !result ? reject(error) : resolve(result)),
        )
        stream.end(file.buffer)
      })
    },

    handleDelete: async ({ filename, doc }) => {
      await cloudinary.uploader.destroy(publicIdFor(folder, filename, doc.prefix ?? prefix), {
        resource_type: resourceType(filename),
        invalidate: true,
      })
    },

    generateURL: ({ filename, prefix: docPrefix }) =>
      deliveryURL(folder, filename, docPrefix ?? prefix),

    // Only used if something still requests /api/media/file/*: send it to the CDN.
    staticHandler: (_req, { params }) =>
      Response.redirect(deliveryURL(folder, params.filename, params.prefix), 302),
  })

export const cloudinaryStorage =
  (options: Options): Plugin =>
  (config: Config) => {
    if (!options.enabled) return config
    cloudinary.config({
      cloud_name: options.cloudName,
      api_key: options.apiKey,
      api_secret: options.apiSecret,
      secure: true,
      url_analytics: false,
    })
    return cloudStoragePlugin({
      collections: Object.fromEntries(
        options.collections.map((slug) => [
          slug,
          {
            adapter: cloudinaryAdapter(options.folder),
            disableLocalStorage: true,
            // Media is public, so documents link straight to the CDN.
            disablePayloadAccessControl: true,
          },
        ]),
      ),
    })(config)
  }
