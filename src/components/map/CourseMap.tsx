'use client'

import { ArrowRightIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import { SectorSymbol } from './symbols'

export type CourseControl = {
  number: number
  code: string
  name: string
  slug: string
  sectorId: number
  sectorName: string
}

export type CourseLeg = { id: number; name: string; slug: string; codes: string[] }

const W = 1000
const H = 640
const R = 30 // control circle radius in map units
const EASE = [0.16, 1, 0.3, 1] as const

/**
 * An authored course: legs of different lengths and bearings, like a real
 * orienteering course.
 * Controls beyond the authored list (if more businesses are added) continue on
 * a gentle arc so the map never breaks.
 */
const COURSE = [
  { x: 150, y: 470 },
  { x: 95, y: 300 },
  { x: 230, y: 175 },
  { x: 170, y: 55 },
  { x: 365, y: 95 },
  { x: 480, y: 215 },
  { x: 385, y: 330 },
  { x: 290, y: 455 },
  { x: 425, y: 570 },
  { x: 555, y: 455 },
  { x: 585, y: 320 },
  { x: 575, y: 150 },
  { x: 710, y: 60 },
  { x: 865, y: 105 },
  { x: 935, y: 225 },
  { x: 800, y: 300 },
]
const FINISH = { x: 870, y: 480 }

function layout(count: number) {
  const pts = COURSE.slice(0, count)
  for (let i = pts.length; i < count; i++) {
    pts.push({ x: 120 + ((i * 97) % 760), y: 600 - ((i * 53) % 90) })
  }
  return pts
}

/** A straight leg that stops at each circle's edge, as course lines do on a real map. */
function legPath(a: { x: number; y: number }, b: { x: number; y: number }, gap = R + 6) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  return `M${a.x + ux * gap} ${a.y + uy * gap}L${b.x - ux * gap} ${b.y - uy * gap}`
}

export function CourseMap({
  controls,
  legs,
  intro,
  className,
}: {
  controls: CourseControl[]
  legs: CourseLeg[]
  intro?: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const router = useRouter()
  const pts = useMemo(() => layout(controls.length), [controls.length])
  const [sector, setSector] = useState<number | null>(null)
  const [focus, setFocus] = useState<number | null>(null)

  if (!controls.length) return null

  const start = { x: pts[0].x - 70, y: pts[0].y + 110 }
  const last = pts[pts.length - 1]
  const finish = controls.length === COURSE.length ? FINISH : { x: last.x - 110, y: last.y + 60 }
  const step = 0.11 // seconds between controls as the course draws
  const lit = (i: number) => sector === null || controls[i].sectorId === sector
  const active = focus !== null ? controls[focus] : null

  // Legend: the map key. Each sector has its symbol and its controls; hover or
  // focus lights that sector's controls on the course.
  const legend = (
    <nav aria-label="Sectors" className="mt-4">
      <p className="mb-1 flex items-center justify-between border-b border-map-ink pb-2 font-heading text-base font-extrabold tracking-[0.04em] uppercase">
        Legend
        <span className="font-sans text-xs font-normal tracking-normal text-map-ink-soft normal-case">
          {legs.length} sectors, {controls.length} businesses
        </span>
      </p>
      <ul
        className="grid gap-x-8 sm:grid-cols-2"
        onMouseLeave={() => setSector(null)}
      >
        {legs.map((leg, i) => (
          <li key={leg.id}>
            <Link
              href={`/businesses/sector/${leg.slug}`}
              onMouseEnter={() => setSector(leg.id)}
              onFocus={() => setSector(leg.id)}
              onBlur={() => setSector(null)}
              className={cn(
                'group flex items-center gap-3 border-b border-map-rule py-2.5 text-sm transition-colors lg:py-1.5',
                sector === leg.id ? 'text-map-course' : 'text-map-ink',
              )}
            >
              <SectorSymbol index={i} />
              <span className="min-w-0 flex-1 font-medium">{leg.name}</span>
              <span className="control-num text-base whitespace-nowrap text-map-course">
                {leg.codes.join(' ')}
              </span>
              <ArrowRightIcon
                aria-hidden
                weight="light"
                className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div
      className={cn(
        'grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14',
        className,
      )}
    >
      <div>{intro}</div>
      <div className="relative">
        <div className="relative">
          <svg
            viewBox={`-70 0 ${W + 140} ${H}`}
            className="h-auto w-full overflow-visible"
            role="group"
            aria-label="Course map: each numbered control is one Zeebundu business"
          >
            {/* Start triangle */}
            <motion.path
              d={`M${start.x} ${start.y - 30}L${start.x + 28} ${start.y + 18}L${start.x - 28} ${start.y + 18}Z`}
              fill="none"
              stroke="var(--map-course)"
              strokeWidth={4}
              strokeLinejoin="round"
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ transformOrigin: `${start.x}px ${start.y}px` }}
            />
            <motion.path
              d={legPath(start, pts[0], 34)}
              stroke="var(--map-course)"
              strokeWidth={4}
              fill="none"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
            />

            {/* Legs */}
            {pts.slice(1).map((p, i) => (
              <motion.path
                key={`leg-${i}`}
                d={legPath(pts[i], p)}
                stroke="var(--map-course)"
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1, opacity: lit(i) && lit(i + 1) ? 1 : 0.18 }}
                transition={{
                  pathLength: { duration: 0.3, delay: 0.55 + i * step, ease: 'easeOut' },
                  opacity: { duration: 0.3 },
                }}
              />
            ))}

            {/* Finish: double circle */}
            <motion.g
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: sector === null ? 1 : 0.18 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.6 + pts.length * step }}
            >
              <path
                d={legPath(last, finish, 36)}
                stroke="var(--map-course)"
                strokeWidth={4}
                fill="none"
              />
              <circle
                cx={finish.x}
                cy={finish.y}
                r={26}
                fill="none"
                stroke="var(--map-course)"
                strokeWidth={4}
              />
              <circle
                cx={finish.x}
                cy={finish.y}
                r={15}
                fill="none"
                stroke="var(--map-course)"
                strokeWidth={4}
              />
            </motion.g>

            {/* Controls */}
            {controls.map((c, i) => {
              const p = pts[i]
              const labelLeft = p.x > W - 140
              const href = `/businesses/${c.slug}`
              return (
                <motion.a
                  key={c.slug}
                  href={href}
                  aria-label={`Control ${c.code}: ${c.name}, ${c.sectorName}`}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(href)
                  }}
                  onMouseEnter={() => setFocus(i)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(i)}
                  onBlur={() => setFocus(null)}
                  className="cursor-pointer outline-none"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: lit(i) ? 1 : 0.2 }}
                  transition={{
                    duration: 0.35,
                    delay: reduce || sector !== null ? 0 : 0.5 + i * step,
                  }}
                >
                  <circle cx={p.x} cy={p.y} r={R + 18} fill="transparent" />
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={R}
                    stroke="var(--map-course)"
                    strokeWidth={focus === i ? 6 : 4}
                    fill={focus === i ? 'var(--map-course)' : 'transparent'}
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.45, delay: reduce ? 0 : 0.5 + i * step, ease: EASE }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  />
                  <text
                    x={labelLeft ? p.x - R - 10 : p.x + R + 8}
                    y={p.y - R + 6}
                    textAnchor={labelLeft ? 'end' : 'start'}
                    fill="var(--map-course)"
                    className="control-num"
                    style={{ fontSize: 40 }}
                  >
                    {c.number}
                  </text>
                </motion.a>
              )
            })}
          </svg>

          {/* Control description card, positioned over the hovered control */}
          {active && focus !== null && (
            <div
              className="pointer-events-none absolute z-10 hidden w-60 -translate-x-1/2 border border-map-ink bg-map-ground shadow-[0_12px_32px_-12px_rgb(21_23_27/0.35)] md:block"
              style={{
                left: `${((pts[focus].x + 70) / (W + 140)) * 100}%`,
                top: `calc(${(pts[focus].y / H) * 100}% + 3.25rem)`,
              }}
            >
              <p className="flex items-center justify-between border-b border-map-rule px-3 py-2">
                <span className="control-num text-2xl text-map-course">{active.code}</span>
                <span className="text-xs text-map-ink-soft">{active.sectorName}</span>
              </p>
              <p className="px-3 py-2.5 font-heading text-xl leading-tight font-extrabold uppercase">
                {active.name}
              </p>
            </div>
          )}
        </div>
        {legend}
      </div>
    </div>
  )
}
