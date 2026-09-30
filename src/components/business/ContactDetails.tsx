import { EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from '@phosphor-icons/react/ssr'

import { telHref, whatsappHref } from '@/lib/links'
import type { Business } from '@/payload-types'

const linkClass =
  'group flex items-center gap-4 rounded-lg border border-map-rule bg-card p-4 transition-colors outline-none hover:border-map-ink focus-visible:ring-3 focus-visible:ring-ring/50'

/** Phone, WhatsApp and email links for a business. Renders nothing when none are set. */
export function ContactDetails({ business }: { business: Business }) {
  const { phone, whatsapp, email } = business.contact ?? {}
  const items = [
    phone && {
      key: 'phone',
      label: 'Call us',
      value: phone,
      href: telHref(phone),
      Icon: PhoneIcon,
    },
    whatsapp && {
      key: 'whatsapp',
      label: 'WhatsApp',
      value: whatsapp,
      href: whatsappHref(whatsapp, `Hello ${business.name}, I found you on the Zeebundu website.`),
      Icon: WhatsappLogoIcon,
      external: true,
    },
    email && {
      key: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      Icon: EnvelopeSimpleIcon,
    },
  ].filter(Boolean) as {
    key: string
    label: string
    value: string
    href: string
    Icon: typeof PhoneIcon
    external?: boolean
  }[]

  if (!items.length) return null

  return (
    <ul className="space-y-3">
      {items.map(({ key, label, value, href, Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            className={linkClass}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-map-rule text-map-course">
              <Icon weight="light" aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-map-ink-soft">{label}</span>
              <span className="block truncate font-medium text-map-ink group-hover:underline">
                {value}
              </span>
            </span>
            {external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
