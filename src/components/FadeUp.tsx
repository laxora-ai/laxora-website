'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
