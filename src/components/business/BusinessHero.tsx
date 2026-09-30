import { MessageCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { populated } from '@/lib/data'
import { whatsappHref } from '@/lib/links'
import { cn } from '@/lib/utils'
import type { Business } from '@/payload-types'

export type Crumb = { label: string; href?: string }

/** Dark title band for a business page: breadcrumbs, logo, name, tagline, calls to action. */
export function BusinessHero({ business, crumbs }: { business: Business; crumbs: Crumb[] }) {
  const logo = populated(business.logo)
  const logoURL = logo?.sizes?.thumbnail?.url ?? logo?.url
  const hero = populated(business.heroImage)
  const whatsapp = business.contact?.whatsapp

  return (
    <section data-tone="dark" className="group/section bg-forest-800 text-stone-50">
      <Container className="grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone-300">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.href && i < crumbs.length - 1 ? (
                    <Link
                      href={crumb.href}
                      className="rounded-sm outline-none hover:text-stone-50 hover:underline focus-visible:ring-3 focus-visible:ring-gold-300/60"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-gold-300">
                      {crumb.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>

          {logo && logoURL && (
            <div className="relative size-16 overflow-hidden rounded-md bg-white p-2 md:size-20">
              <Image
                src={logoURL}
                alt={logo.alt || `${business.name} logo`}
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-h1 md:text-display">{business.name}</h1>
            {business.tagline && (
              <p className="max-w-xl text-lead text-stone-300">{business.tagline}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="highlight" size="xl">
              <a href="#enquire">Send an enquiry</a>
            </Button>
            {whatsapp && (
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white/30 bg-transparent text-stone-50 hover:bg-white/10 hover:text-stone-50"
              >
                <a
                  href={whatsappHref(
                    whatsapp,
                    `Hello ${business.name}, I found you on the Zeebundu website.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircleIcon data-icon="inline-start" aria-hidden />
                  WhatsApp us
                </a>
              </Button>
            )}
          </div>
        </div>

        <Media
          resource={hero}
          size="hero"
          priority
          fallbackLabel={hero ? undefined : business.name}
          className={cn(
            'aspect-[4/3] rounded-lg',
            !hero && 'hidden ring-1 ring-white/10 ring-inset lg:flex',
          )}
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </Container>
    </section>
  )
}
