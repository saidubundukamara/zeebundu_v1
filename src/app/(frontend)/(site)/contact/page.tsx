import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'

import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section, SectionHeader } from '@/components/layout/Section'
import { getBusinessesBySector, getGlobal } from '@/lib/data'
import { telHref, whatsappHref } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Zeebundu Group or any of our businesses. Send an enquiry and the right team will reply.',
}

export default async function ContactPage() {
  const [settings, groups] = await Promise.all([
    getGlobal('site-settings', 0),
    getBusinessesBySector(),
  ])
  const contact = settings.contact
  const businesses = groups.flatMap((g) => g.businesses).map(({ id, name }) => ({ id, name }))

  const channels = [
    contact?.phone && {
      icon: PhoneIcon,
      label: 'Call us',
      value: contact.phone,
      href: telHref(contact.phone),
    },
    contact?.whatsapp && {
      icon: WhatsappLogoIcon,
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: whatsappHref(contact.whatsapp, 'Hello Zeebundu, '),
    },
    contact?.email && {
      icon: EnvelopeSimpleIcon,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ].filter(Boolean) as { icon: typeof PhoneIcon; label: string; value: string; href: string }[]

  return (
    <>
      <PageHeader
        title="Contact us"
        crumbs={[{ label: 'Contact' }]}
        description="Questions, quotes, partnerships or press: send us a message and the right team will get back to you."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="space-y-8">
            <h2 className="text-h2">Head office</h2>
            {contact?.address && (
              <p className="flex gap-3 whitespace-pre-line text-map-ink-soft">
                <MapPinIcon
                  weight="light"
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-map-ink"
                />
                {contact.address}
              </p>
            )}
            {channels.length > 0 ? (
              <ul className="border-t border-map-ink">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-4 border-b border-map-rule py-4 transition-colors hover:text-map-course"
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <span className="flex size-10 items-center justify-center rounded-sm border border-map-rule text-map-course">
                        <Icon weight="light" aria-hidden className="size-5" />
                      </span>
                      <span>
                        <span className="block text-sm text-map-ink-soft">{label}</span>
                        <span className="font-heading text-2xl font-extrabold tabular group-hover:text-map-course">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-map-ink-soft">
                Use the form to reach us, and we’ll reply by email.
              </p>
            )}
          </div>

          <div className="border border-map-ink bg-card p-5 md:p-8">
            <h2 className="mb-6 text-h2">Send an enquiry</h2>
            <EnquiryForm businesses={businesses} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-map-rule">
        <SectionHeader
          title="Contact a business directly"
          description="Each business page lists its own phone, WhatsApp and opening hours."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(({ sector, businesses }) => (
            <div key={sector.id}>
              <h3 className="mb-3 border-b border-map-ink pb-2 font-heading text-lg font-extrabold uppercase">
                {sector.name}
              </h3>
              <ul className="space-y-2">
                {businesses.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/businesses/${b.slug}#enquire`}
                      className="text-sm text-map-ink-soft hover:text-map-course hover:underline"
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
