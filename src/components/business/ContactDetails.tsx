import { MailIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react'

import { telHref, whatsappHref } from '@/lib/links'
import type { Business } from '@/payload-types'

const linkClass =
  'group flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 transition-colors outline-none hover:border-forest-700 focus-visible:ring-3 focus-visible:ring-ring/50'

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
      Icon: MessageCircleIcon,
      external: true,
    },
    email && {
      key: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      Icon: MailIcon,
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
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
              <Icon aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">
                {label}
              </span>
              <span className="block truncate font-medium text-forest-800 group-hover:underline">
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
