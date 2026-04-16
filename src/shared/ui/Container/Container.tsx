import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './Container.module.css'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type ContainerDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type ContainerAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type ContainerJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
type ContainerWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
type ContainerGap = 'none' | 'sm' | 'md' | 'lg' | 'xl'

type ContainerOwnProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  size?: ContainerSize
  padded?: boolean
  centered?: boolean
  flex?: boolean
  direction?: ContainerDirection
  align?: ContainerAlign
  justify?: ContainerJustify
  wrap?: ContainerWrap
  gap?: ContainerGap
}

type ContainerProps<T extends ElementType> = ContainerOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerOwnProps<T>>

export const Container = <T extends ElementType = 'div'>(props: ContainerProps<T>) => {
  const {
    as,
    children,
    className,
    size = 'full',
    padded = false,
    centered = true,
    flex = false,
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
        styles.container,
        styles[`size-${size}`],
        padded && styles.padded,
        centered && styles.centered,
        flex && styles.flex,
        flex && styles[`direction-${direction}`],
        flex && styles[`align-${align}`],
        flex && styles[`justify-${justify}`],
        flex && styles[`wrap-${wrap}`],
        styles[`gap-${gap}`],
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  )
}
