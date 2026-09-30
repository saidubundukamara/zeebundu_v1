/** Public path of a document, shared by SEO, live preview, redirects and the sitemap. */
export const docPath = (collection: string | undefined, slug: string | null | undefined) => {
  if (!slug) return ''
  switch (collection) {
    case 'businesses':
      return `/businesses/${slug}`
    case 'news':
      return `/news/${slug}`
    case 'impact-programmes':
      return `/impact/${slug}`
    case 'pages':
      return slug === 'home' ? '/' : `/${slug}`
    default:
      return `/${slug}`
  }
}
