import Link from 'next/link'

import { Terrain } from '@/components/map/Terrain'
import { ControlMark, FinishMark } from '@/components/map/symbols'
import { getCourse } from '@/lib/course'
import { getGlobal } from '@/lib/data'
import { telHref } from '@/lib/links'

import { Container } from './Container'
import { Logo } from './Logo'
import { Socials } from './Socials'

export async function SiteFooter() {
  const [{ legs }, footer, settings] = await Promise.all([
    getCourse(),
    getGlobal('footer', 0),
    getGlobal('site-settings', 0),
  ])
  const contact = settings.contact

  return (
    <footer className="relative border-t border-map-rule bg-map-ground">
      <Terrain
        variant="band"
        className="absolute inset-x-0 top-0 h-40 [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-40"
      />
      <Container className="relative grid gap-14 pt-20 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
        <div className="space-y-6">
          <Logo />
          {footer.tagline && (
            <p className="max-w-sm text-sm leading-relaxed text-map-ink-soft">{footer.tagline}</p>
          )}
          <address className="space-y-1 text-sm text-map-ink not-italic">
            {contact?.address && <p className="whitespace-pre-line">{contact.address}</p>}
            {contact?.phone && (
              <p>
                <a href={telHref(contact.phone)} className="tabular hover:text-map-course">
                  {contact.phone}
                </a>
              </p>
            )}
            {contact?.email && (
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-map-course">
                  {contact.email}
                </a>
              </p>
            )}
          </address>
          <Socials socials={settings.socials} />
        </div>

        {/* The footer is the map legend: every sector and its numbered controls. */}
        <nav
          aria-label="Our businesses"
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4"
        >
          {legs.map(({ sector, controls }) => (
            <div key={sector.id}>
              <h2 className="mb-3 font-heading text-lg font-extrabold tracking-[0.02em]">
                <Link
                  href={`/businesses/sector/${sector.slug}`}
                  className="text-map-ink hover:text-map-course"
                >
                  {sector.name}
                </Link>
              </h2>
              <ul className="space-y-2">
                {controls.map((c) => (
                  <li key={c.business.id}>
                    <Link
                      href={`/businesses/${c.business.slug}`}
                      className="group flex items-center gap-3 text-sm text-map-ink-soft hover:text-map-ink"
                    >
                      <ControlMark
                        code={c.code}
                        size="sm"
                        className="size-7 text-xs transition-colors group-hover:bg-map-course group-hover:text-primary-foreground"
                      />
                      {c.business.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="relative border-t border-map-rule">
        <Container className="flex flex-col gap-3 py-6 text-xs text-map-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <FinishMark className="size-3.5 text-map-course" />© {new Date().getFullYear()}{' '}
            {settings.groupName}
          </p>
          <ul className="flex flex-wrap gap-5">
            {(footer.legalLinks ?? []).map(({ link }) =>
              link?.label && link.url ? (
                <li key={link.url}>
                  <Link href={link.url} className="hover:text-map-ink">
                    {link.label}
                  </Link>
                </li>
              ) : null,
            )}
            <li>
              <Link href="/news/media-kit" className="hover:text-map-ink">
                Media kit
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  )
}
