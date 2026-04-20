import { useReducedMotion } from 'motion/react'

export const usePageAnimations = () => {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const fadeDown = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -18 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const staggerParent = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.11,
      },
    },
  }

  const pageInitial = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const pageTransition = {
    duration: 0.45,
    ease: 'easeOut' as const,
  }

  return {
    fadeUp,
    fadeDown,
    staggerParent,
    pageInitial,
    pageTransition,
    shouldReduceMotion,
  }
}
