import Link from 'next/link'

import { getBusinessesBySector, getGlobal } from '@/lib/data'
import { telHref } from '@/lib/links'

import { Container } from './Container'
import { Logo } from './Logo'
import { Socials } from './Socials'

export async function SiteFooter() {
  const [groups, footer, settings] = await Promise.all([
    getBusinessesBySector(),
    getGlobal('footer', 0),
    getGlobal('site-settings', 0),
  ])
  const contact = settings.contact

  return (
    <footer className="bg-forest-900 text-stone-300">
      <Container className="grid gap-12 py-14 md:py-16 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-5">
          <Logo tone="light" />
          {footer.tagline && <p className="max-w-sm text-sm leading-relaxed">{footer.tagline}</p>}
          <address className="space-y-1 text-sm not-italic">
            {contact?.address && <p className="whitespace-pre-line">{contact.address}</p>}
            {contact?.phone && (
              <p>
                <a href={telHref(contact.phone)} className="hover:text-stone-50">
                  {contact.phone}
                </a>
              </p>
            )}
            {contact?.email && (
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-stone-50">
                  {contact.email}
                </a>
              </p>
            )}
          </address>
          <Socials socials={settings.socials} />
        </div>

        <nav aria-label="Our businesses" className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {groups.map(({ sector, businesses }) => (
            <div key={sector.id}>
              <h2 className="mb-3 font-sans text-xs font-medium tracking-[0.14em] text-gold-300 uppercase">
                <Link href={`/businesses/sector/${sector.slug}`} className="hover:text-gold-200">
                  {sector.name}
                </Link>
              </h2>
              <ul className="space-y-2 text-sm">
                {businesses.map((b) => (
                  <li key={b.id}>
                    <Link href={`/businesses/${b.slug}`} className="hover:text-stone-50">
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.groupName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            {(footer.legalLinks ?? []).map(({ link }) =>
              link?.label && link.url ? (
                <li key={link.url}>
                  <Link href={link.url} className="hover:text-stone-50">
                    {link.label}
                  </Link>
                </li>
              ) : null,
            )}
            <li>
              <Link href="/news/media-kit" className="hover:text-stone-50">
                Media kit
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  )
}
