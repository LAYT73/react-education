import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './Flex.module.css'

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
type FlexGap = 'none' | 'sm' | 'md' | 'lg' | 'xl'

type FlexOwnProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  inline?: boolean
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: FlexWrap
  gap?: FlexGap
}

type FlexProps<T extends ElementType> = FlexOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof FlexOwnProps<T>>

export const Flex = <T extends ElementType = 'div'>(props: FlexProps<T>) => {
  const {
    as,
    children,
    className,
    inline = false,
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    wrap = 'nowrap',
    gap = 'none',
    ...restProps
  } = props

  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        styles.flex,
        inline && styles.inline,
        styles[`direction-${direction}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        styles[`wrap-${wrap}`],
        styles[`gap-${gap}`],
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  )
}
