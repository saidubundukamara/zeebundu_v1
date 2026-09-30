/** Is this CMS-entered URL outside the site? */
export const isExternal = (url: string) =>
  /^(https?:)?\/\//.test(url) || url.startsWith('mailto:') || url.startsWith('tel:')

/** WhatsApp click-to-chat link from a phone number in any format. */
export const whatsappHref = (number: string, text?: string) => {
  const digits = number.replace(/[^\d]/g, '')
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export const telHref = (number: string) => `tel:${number.replace(/[^\d+]/g, '')}`

export const formatDate = (iso?: string | null) =>
  iso
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
        new Date(iso),
      )
    : ''

export const siteURL = (path = '') => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${path}`
