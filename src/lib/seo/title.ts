import type { Metadata } from 'next'

/**
 * A CMS meta title that already names the group (e.g. "About Us | Zeebundu Group of Companies")
 * is used as written; anything else gets the site's title template.
 */
export const metaTitle = (title: string | null | undefined, fallback: string): Metadata['title'] =>
  title?.includes(' | ') ? { absolute: title } : title || fallback
