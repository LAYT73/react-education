import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './Container.module.css'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'

type ContainerOwnProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  size?: ContainerSize
  padded?: boolean
  centered?: boolean
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
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  )
}
