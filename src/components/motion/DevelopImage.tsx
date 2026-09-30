'use client'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * Photos "develop" once as they enter: a wipe from the bottom edge while the
 * frame eases from grey and a slight zoom to full colour. Never replays.
 *
 * The viewport trigger sits on an unclipped wrapper: an element fully hidden
 * by clip-path never reports as intersecting, so it would never reveal.
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
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="size-full overflow-hidden"
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          shown: {
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: { duration: 1.1, ease: [0.32, 0.72, 0, 1] },
          },
        }}
      >
        <motion.div
          className="size-full"
          variants={{
            hidden: { scale: 1.08, filter: 'grayscale(1)' },
            shown: {
              scale: 1,
              filter: 'grayscale(0)',
              transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
