import {
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  PhoneIcon,
} from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { getGlobal, populated } from '@/lib/data'
import { telHref } from '@/lib/links'
import type { Media as MediaDoc } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Media kit',
  description:
    'Zeebundu Group logos, brand guidelines, company boilerplate and press contact for journalists and partners.',
  alternates: { canonical: '/news/media-kit' },
}

const fileSize = (bytes?: number | null) => {
  if (!bytes) return null
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

const fileType = (doc: MediaDoc) =>
  doc.mimeType?.split('/')[1]?.replace('svg+xml', 'svg').toUpperCase() ?? null

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-dashed border-map-rule bg-muted px-5 py-8 text-center text-map-ink-soft">
      {children}
    </p>
  )
}

export default async function MediaKitPage() {
  const [kit, settings] = await Promise.all([
    getGlobal('media-kit', 1),
    getGlobal('site-settings', 0),
  ])

  const logos = (kit.logos ?? [])
    .map((logo) => ({ ...logo, doc: populated(logo.file) }))
    .filter((logo): logo is typeof logo & { doc: MediaDoc } => Boolean(logo.doc?.url))
  const guidelines = populated(kit.brandGuidelines)
  const contact = {
    name: kit.pressContact?.name,
    email: kit.pressContact?.email || settings.contact?.email,
    phone: kit.pressContact?.phone || settings.contact?.phone,
  }

  return (
    <>
      <PageHeader
        title="Media kit"
        description="Logos, brand guidelines and company information for journalists, partners and event organisers."
        crumbs={[{ label: 'Newsroom', href: '/news' }, { label: 'Media kit' }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-14">
            <section aria-labelledby="boilerplate" className="space-y-4">
              <h2 id="boilerplate" className="text-h2 text-map-ink">
                About Zeebundu Group
              </h2>
              {kit.boilerplate ? (
                <div className="space-y-4 text-lg leading-relaxed text-map-ink-soft">
                  {kit.boilerplate.split(/\n\s*\n/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <Empty>Our press boilerplate will be available here soon.</Empty>
              )}
            </section>

            <section aria-labelledby="logos" className="space-y-5">
              <h2 id="logos" className="text-h2 text-map-ink">
                Logos
              </h2>
              {logos.length ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {logos.map((logo) => (
                    <li
                      key={logo.id ?? logo.label}
                      className="overflow-hidden border border-map-rule bg-card"
                    >
                      {logo.doc.mimeType?.startsWith('image/') && (
                        <div className="flex aspect-[16/9] items-center justify-center bg-muted p-6">
                          <Media
                            resource={logo.doc}
                            size="thumbnail"
                            className="size-full bg-transparent [&_img]:object-contain!"
                            sizes="300px"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3 p-4">
                        <div>
                          <p className="font-medium text-map-ink-soft">{logo.label}</p>
                          <p className="text-xs text-map-ink-soft">
                            {[fileType(logo.doc), fileSize(logo.doc.filesize)]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        </div>
                        <Button asChild variant="outline" size="lg">
                          <a href={logo.doc.url!} download={logo.doc.filename ?? true}>
                            <DownloadSimpleIcon weight="light" data-icon="inline-start" /> Download
                            <span className="sr-only"> {logo.label}</span>
                          </a>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty>Logo files will be available to download here soon.</Empty>
              )}
            </section>

            <section aria-labelledby="guidelines" className="space-y-5">
              <h2 id="guidelines" className="text-h2 text-map-ink">
                Brand guidelines
              </h2>
              {guidelines?.url ? (
                <div className="flex flex-wrap items-center justify-between gap-4 border border-map-rule bg-card p-5">
                  <div className="flex items-center gap-4">
                    <FileTextIcon weight="light" aria-hidden className="size-8 text-map-ink" />
                    <div>
                      <p className="font-medium text-map-ink-soft">Zeebundu brand guidelines</p>
                      <p className="text-xs text-map-ink-soft">
                        {[fileType(guidelines), fileSize(guidelines.filesize)]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    </div>
                  </div>
                  <Button asChild size="lg">
                    <a href={guidelines.url} download={guidelines.filename ?? true}>
                      <DownloadSimpleIcon weight="light" data-icon="inline-start" /> Download
                      guidelines
                    </a>
                  </Button>
                </div>
              ) : (
                <Empty>Our brand guidelines will be available to download here soon.</Empty>
              )}
            </section>
          </div>

          <aside aria-labelledby="press-contact" className="lg:pt-2">
            <div className="space-y-4 border border-map-ink bg-card p-6 lg:sticky lg:top-24">
              <h2 id="press-contact" className="font-heading text-h3 font-extrabold uppercase">
                Press contact
              </h2>
              {contact.name && <p className="font-medium">{contact.name}</p>}
              {contact.email || contact.phone ? (
                <ul className="space-y-3">
                  {contact.email && (
                    <li>
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center gap-2 break-all text-map-course underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-map-course/60 focus-visible:outline-none"
                      >
                        <EnvelopeSimpleIcon
                          weight="light"
                          aria-hidden
                          className="size-4 shrink-0"
                        />
                        {contact.email}
                      </a>
                    </li>
                  )}
                  {contact.phone && (
                    <li>
                      <a
                        href={telHref(contact.phone)}
                        className="inline-flex items-center gap-2 text-map-course underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-map-course/60 focus-visible:outline-none"
                      >
                        <PhoneIcon weight="light" aria-hidden className="size-4 shrink-0" />
                        {contact.phone}
                      </a>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-map-ink-soft">
                  For media enquiries, please use our{' '}
                  <Link
                    href="/contact"
                    className="text-map-course underline underline-offset-4 focus-visible:ring-3 focus-visible:ring-map-course/60 focus-visible:outline-none"
                  >
                    contact page
                  </Link>
                  .
                </p>
              )}
              <p className="border-t border-map-rule pt-4 text-sm text-map-ink-soft">
                Looking for our latest announcements?{' '}
                <Link
                  href="/news?category=press"
                  className="text-map-course underline underline-offset-4 focus-visible:ring-3 focus-visible:ring-map-course/60 focus-visible:outline-none"
                >
                  Read our press releases
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
