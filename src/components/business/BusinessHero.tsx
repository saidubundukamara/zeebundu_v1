import { WhatsappLogoIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'

import { Container } from '@/components/layout/Container'
import { Terrain } from '@/components/map/Terrain'
import { ControlMark } from '@/components/map/symbols'
import { Media } from '@/components/Media'
import { Lines, splitHeadline } from '@/components/motion/Lines'
import { Button } from '@/components/ui/button'
import { populated } from '@/lib/data'
import { whatsappHref } from '@/lib/links'
import type { Business } from '@/payload-types'

export type Crumb = { label: string; href?: string }

/** Business title: control number, name, tagline, actions; the photo takes the other half. */
export function BusinessHero({
  business,
  crumbs,
  code,
  leg,
  sectorName,
}: {
  business: Business
  crumbs: Crumb[]
  code?: string
  /** Every control in this business's sector, in course order. */
  leg?: { code: string; slug: string; name: string }[]
  sectorName?: string
}) {
  const logo = populated(business.logo)
  const logoURL = logo?.sizes?.thumbnail?.url ?? logo?.url
  const hero = populated(business.heroImage)
  const whatsapp = business.contact?.whatsapp

  return (
    <section className="relative overflow-hidden border-b border-map-rule">
      <Terrain
        variant="band"
        priority
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_18%,transparent_55%)] opacity-70 lg:[mask-image:radial-gradient(ellipse_60%_80%_at_25%_0%,black_20%,transparent_75%)]"
      />
      <Container className="relative grid gap-10 py-10 md:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-14">
        <div className="flex flex-col justify-between gap-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-map-ink-soft">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href && i < crumbs.length - 1 ? (
                    <Link href={crumb.href} className="hover:text-map-course hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-map-ink">
                      {crumb.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden className="h-px w-4 bg-map-course" />}
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {code && (
                <ViewTransition name={`control-${business.slug}`} share="morph" default="none">
                  <ControlMark code={code} size="lg" />
                </ViewTransition>
              )}
              {logo && logoURL && (
                <div className="relative size-16 overflow-hidden border border-map-rule bg-white md:size-20">
                  <Image
                    src={logoURL}
                    alt={logo.alt || `${business.name} logo`}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>
            <h1 className="text-h1 lg:text-[clamp(3.5rem,2rem+3.6vw,6rem)]">
              <Lines lines={splitHeadline(business.name, 14)} />
            </h1>
            {business.tagline && (
              <p className="max-w-[44ch] text-lead text-map-ink-soft">{business.tagline}</p>
            )}
            {leg && leg.length > 1 && (
              <nav
                aria-label={`${sectorName ?? 'Sector'} businesses`}
                className="flex items-center gap-3"
              >
                <span className="text-sm text-map-ink-soft">{sectorName}</span>
                <ol className="flex items-center">
                  {leg.map((c, i) => (
                    <li key={c.slug} className="flex items-center">
                      {i > 0 && <span aria-hidden className="h-[2px] w-6 bg-map-course" />}
                      {c.slug === business.slug ? (
                        <span
                          aria-current="page"
                          className="flex size-9 items-center justify-center rounded-full border-2 border-map-course bg-map-course control-num text-sm text-primary-foreground"
                        >
                          {c.code}
                        </span>
                      ) : (
                        <Link
                          href={`/businesses/${c.slug}`}
                          aria-label={`${c.code}: ${c.name}`}
                          title={c.name}
                          className="flex size-9 items-center justify-center rounded-full border-2 border-map-course bg-map-ground control-num text-sm text-map-course transition-colors hover:bg-map-course hover:text-primary-foreground"
                        >
                          {c.code}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="xl">
                <a href="#enquire">Send an enquiry</a>
              </Button>
              {whatsapp && (
                <Button asChild variant="outline" size="xl">
                  <a
                    href={whatsappHref(
                      whatsapp,
                      `Hello ${business.name}, I found you on the Zeebundu website.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsappLogoIcon data-icon="inline-start" weight="light" aria-hidden />
                    WhatsApp
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] develop-in lg:aspect-auto lg:min-h-[32rem]">
          <Media
            resource={hero}
            size="hero"
            priority
            fallbackLabel={hero ? undefined : business.name}
            className="absolute inset-0 size-full"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
      </Container>
    </section>
  )
}
