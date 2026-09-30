import { ClockIcon, MapPinIcon, PhoneIcon } from '@phosphor-icons/react/ssr'

import { telHref } from '@/lib/links'
import type { Business } from '@/payload-types'

import { districtLabel } from './districts'

type Location = NonNullable<Business['locations']>[number]

const mapQuery = (location: Location) => {
  if (location.lat != null && location.lng != null) return `${location.lat},${location.lng}`
  if (location.address) return `${location.address.replace(/\s*\n\s*/g, ', ')}, Sierra Leone`
  return null
}

/** Branch list with opening hours, plus a map of the first branch that has a position or address. */
export function Locations({ locations }: { locations: Location[] }) {
  const mapped = locations.find((l) => mapQuery(l))
  const query = mapped ? mapQuery(mapped) : null

  return (
    <div className={query ? 'grid gap-8 lg:grid-cols-[1fr_1.3fr]' : undefined}>
      <ul className={query ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
        {locations.map((location) => {
          const district = districtLabel(location.district)
          const q = mapQuery(location)
          return (
            <li
              key={location.id ?? location.name}
              className="space-y-3 rounded-lg border border-map-rule bg-card p-5"
            >
              <div>
                <h3 className="font-heading text-h3 text-map-ink">{location.name}</h3>
                {district && <p className="text-sm text-map-ink-soft">{district}</p>}
              </div>
              <dl className="space-y-2 text-sm">
                {location.address && (
                  <div className="flex gap-2.5">
                    <dt>
                      <MapPinIcon
                        weight="light"
                        aria-hidden
                        className="mt-0.5 size-4 text-map-ink"
                      />
                      <span className="sr-only">Address</span>
                    </dt>
                    <dd className="whitespace-pre-line">{location.address}</dd>
                  </div>
                )}
                {location.hours && (
                  <div className="flex gap-2.5">
                    <dt>
                      <ClockIcon
                        weight="light"
                        aria-hidden
                        className="mt-0.5 size-4 text-map-ink"
                      />
                      <span className="sr-only">Opening hours</span>
                    </dt>
                    <dd>{location.hours}</dd>
                  </div>
                )}
                {location.phone && (
                  <div className="flex gap-2.5">
                    <dt>
                      <PhoneIcon
                        weight="light"
                        aria-hidden
                        className="mt-0.5 size-4 text-map-ink"
                      />
                      <span className="sr-only">Phone</span>
                    </dt>
                    <dd>
                      <a
                        href={telHref(location.phone)}
                        className="rounded-sm font-medium text-map-ink underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {location.phone}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              {q && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-sm text-sm font-medium text-map-ink underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Open in Google Maps
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          )
        })}
      </ul>

      {mapped && query && (
        <div className="overflow-hidden rounded-lg border border-map-rule bg-muted lg:sticky lg:top-24 lg:self-start">
          <iframe
            title={`Map showing ${mapped.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] h-auto w-full border-0"
          />
        </div>
      )}
    </div>
  )
}
