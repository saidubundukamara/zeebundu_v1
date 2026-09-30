'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'

export const THEME_KEY = 'zb-theme'

const isDark = () => document.documentElement.dataset.theme === 'dark'

/** Re-render whenever <html data-theme> changes (this toggle, or another one on the page). */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

/** Switches between the day map (default) and the night map; remembered per browser. */
export function ThemeToggle({
  className,
  withLabel = false,
}: {
  className?: string
  withLabel?: boolean
}) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false)

  const toggle = () => {
    const next = !dark
    const apply = () => {
      if (next) document.documentElement.dataset.theme = 'dark'
      else delete document.documentElement.dataset.theme
    }
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
    } catch {}

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && 'startViewTransition' in document) {
      const root = document.documentElement
      root.classList.add('theme-switching')
      document
        .startViewTransition(apply)
        .finished.finally(() => root.classList.remove('theme-switching'))
    } else {
      apply()
    }
  }

  const label = dark ? 'Switch to day map' : 'Switch to night map'
  const Icon = dark ? SunIcon : MoonIcon

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={withLabel ? undefined : label}
      title={label}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-sm text-map-ink-soft transition-colors hover:bg-map-course-soft hover:text-map-course',
        withLabel ? 'px-3 font-heading text-lg font-bold tracking-[0.03em] uppercase' : 'w-10',
        className,
      )}
    >
      <Icon weight="light" className="size-5" aria-hidden />
      {withLabel && <span>{dark ? 'Day map' : 'Night map'}</span>}
    </button>
  )
}
