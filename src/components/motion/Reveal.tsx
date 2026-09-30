'use client'

import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Content settles into place once as it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Staggered children, e.g. rows of a legend. Children should be <RevealItem>. */
export function RevealGroup({
  children,
  className,
  as = 'div',
  stagger = 0.06,
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'dl'
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li'
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  )
}
