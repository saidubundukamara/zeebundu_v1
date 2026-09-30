import { MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react'
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
      icon: MessageCircleIcon,
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: whatsappHref(contact.whatsapp, 'Hello Zeebundu, '),
    },
    contact?.email && {
      icon: MailIcon,
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
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-8">
            <h2 className="text-h2">Head office</h2>
            {contact?.address && (
              <p className="flex gap-3 whitespace-pre-line text-stone-700">
                <MapPinIcon aria-hidden className="mt-1 size-5 shrink-0 text-forest-600" />
                {contact.address}
              </p>
            )}
            {channels.length > 0 ? (
              <ul className="space-y-4">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 hover:border-forest-300"
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <span className="flex size-10 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-stone-600">{label}</span>
                        <span className="font-medium text-forest-800 group-hover:underline">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-stone-600">Use the form to reach us, and we’ll reply by email.</p>
            )}
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-100 p-6 md:p-8">
            <h2 className="mb-6 text-h2">Send an enquiry</h2>
            <EnquiryForm businesses={businesses} />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeader
          title="Contact a business directly"
          description="Each business page lists its own phone, WhatsApp and opening hours."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(({ sector, businesses }) => (
            <div key={sector.id}>
              <h3 className="mb-3 font-sans text-xs font-medium tracking-[0.14em] text-gold-700 uppercase">
                {sector.name}
              </h3>
              <ul className="space-y-2">
                {businesses.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/businesses/${b.slug}#enquire`}
                      className="text-forest-800 hover:underline"
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
