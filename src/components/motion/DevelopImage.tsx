'use client'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * Photos "develop" once as they enter: a wipe from the bottom edge while the
 * frame eases from grey and a slight zoom to full colour. Never replays.
 */
export function DevelopImage({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.div
        className="size-full"
        initial={reduce ? false : { scale: 1.08, filter: 'grayscale(1)' }}
        whileInView={{ scale: 1, filter: 'grayscale(0)' }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
