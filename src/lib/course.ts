import type { Business, Sector } from '@/payload-types'

import { getBusinessesBySector } from './data'

/**
 * The site draws the group as an orienteering course: every business is a
 * numbered control, numbered in sector order. The numbers are stable as long
 * as sector and business order in the CMS stay the same.
 */
export type Control = {
  number: number
  code: string
  business: Business
  sector: Sector
}

export type Leg = { sector: Sector; controls: Control[] }

export const controlCode = (n: number) => String(n).padStart(2, '0')

export const buildCourse = (groups: Awaited<ReturnType<typeof getBusinessesBySector>>) => {
  let n = 0
  const legs: Leg[] = groups.map(({ sector, businesses }) => ({
    sector,
    controls: businesses.map((business) => {
      n += 1
      return { number: n, code: controlCode(n), business, sector }
    }),
  }))
  return { legs, controls: legs.flatMap((leg) => leg.controls) }
}

export const getCourse = async () => buildCourse(await getBusinessesBySector())

export const controlFor = async (slug: string) =>
  (await getCourse()).controls.find((c) => c.business.slug === slug) ?? null
