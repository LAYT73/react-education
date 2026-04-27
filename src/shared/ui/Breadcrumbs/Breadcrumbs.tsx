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
  isItemDisabled?: (index: number) => boolean
  onItemClick?: (item: BreadcrumbItem, index: number) => void
  className?: string
}

const getActiveIndex = (items: BreadcrumbItem[], activePath: string): number => {
  const exactMatch = items.findIndex((item) => item.path === activePath)

  if (exactMatch >= 0) {
    return exactMatch
  }

  return items.findIndex((item) => activePath.startsWith(item.path))
}

export const Breadcrumbs = ({
  items,
  activePath,
  isItemDisabled,
  onItemClick,
  className,
}: BreadcrumbsProps) => {
  const activeIndex = getActiveIndex(items, activePath)

  return (
    <nav className={clsx(styles.root, className)} aria-label="Шаги оформления заказа">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isActive = index === activeIndex
          const isCompleted = activeIndex > -1 && index < activeIndex
          const disabled = isItemDisabled?.(index) ?? false

          return (
            <li key={item.path} className={styles.item}>
              <button
                type="button"
                onClick={() => onItemClick?.(item, index)}
                disabled={disabled}
                className={clsx(styles.label, {
                  [styles.active]: isActive,
                  [styles.completed]: isCompleted,
                  [styles.inactive]: !isActive && !isCompleted,
                  [styles.disabled]: disabled,
                })}
              >
                {item.label}
              </button>
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
