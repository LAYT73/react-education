import { ROUTES } from '@/shared/consts'
import { Breadcrumbs, Button } from '@/shared/ui'
import { Header } from '@/widgets'
import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styles from './orderLayout.module.css'

const ORDER_BREADCRUMBS = [
  { label: 'Местоположение', path: ROUTES.ORDER_FIRST_STEP.path },
  { label: 'Модель', path: `${ROUTES.ORDER.path}/model` },
  { label: 'Дополнительно', path: `${ROUTES.ORDER.path}/additional` },
  { label: 'Итого', path: `${ROUTES.ORDER.path}/total` },
]

export const OrderLayout = () => {
  const { pathname } = useLocation()

  const normalizedPath = useMemo(() => {
    return pathname.endsWith('/') && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname
  }, [pathname])

  return (
    <div className={styles.page}>
      <div className={styles.sectionWithDivider}>
        <div className={styles.container}>
          <div className={styles.headerWrap}>
            <Header />
          </div>
        </div>
      </div>

      <div className={styles.sectionWithDivider}>
        <div className={styles.container}>
          <Breadcrumbs items={ORDER_BREADCRUMBS} activePath={normalizedPath} />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          <main className={styles.content}>
            <Outlet />
          </main>

          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Ваш заказ:</h3>

            <div className={styles.pickupRow}>
              <span className={styles.pickupLabel}>Пункт выдачи</span>
              <span className={styles.pickupDots} aria-hidden="true" />
              <span className={styles.pickupValue}>
                Ульяновск,
                <br /> Нариманова 42
              </span>
            </div>

            <p className={styles.priceRange}>
              <strong>Цена:</strong> от 8 000 до 12 000 ₽
            </p>

            <Button disabled className={styles.sidebarButton}>
              Выбрать модель
            </Button>
          </aside>
        </div>
      </div>
    </div>
  )
}
