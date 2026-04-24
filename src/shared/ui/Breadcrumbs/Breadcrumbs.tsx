import clsx from 'clsx'
import DividerIcon from '@/shared/assets/icons/breadcrumbs-divider.svg?react'
import styles from './breadcrumbs.module.css'

export type BreadcrumbItem = {
  label: string
  path: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  activePath: string
  className?: string
}

const getActiveIndex = (items: BreadcrumbItem[], activePath: string): number => {
  const exactMatch = items.findIndex((item) => item.path === activePath)

  if (exactMatch >= 0) {
    return exactMatch
  }

  return items.findIndex((item) => activePath.startsWith(item.path))
}

export const Breadcrumbs = ({ items, activePath, className }: BreadcrumbsProps) => {
  const activeIndex = getActiveIndex(items, activePath)

  return (
    <nav className={clsx(styles.root, className)} aria-label="Шаги оформления заказа">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isActive = index === activeIndex
          const isCompleted = activeIndex > -1 && index < activeIndex

          return (
            <li key={item.path} className={styles.item}>
              <span
                className={clsx(styles.label, {
                  [styles.active]: isActive,
                  [styles.completed]: isCompleted,
                  [styles.inactive]: !isActive && !isCompleted,
                })}
              >
                {item.label}
              </span>
              {index < items.length - 1 && (
                <DividerIcon className={styles.divider} aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
