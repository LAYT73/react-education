import { useOrderFlow } from '@/app/providers'
import { ROUTES } from '@/shared/consts'
import { Breadcrumbs, Button } from '@/shared/ui'
import { Header } from '@/widgets'
import { Fragment, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ErrorBoundary } from '../ErrorBoundary'
import styles from './orderLayout.module.css'

const ORDER_BREADCRUMBS = [
  { label: 'Местоположение', path: ROUTES.ORDER_FIRST_STEP.path },
  { label: 'Модель', path: ROUTES.ORDER_MODEL_STEP.path },
  { label: 'Дополнительно', path: ROUTES.ORDER_ADDITIONAL_STEP.path },
  { label: 'Итого', path: ROUTES.ORDER_TOTAL_STEP.path },
]

export const OrderLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { state, availableStepIndexes, isLocationComplete, isModelComplete } =
    useOrderFlow()

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
          {!normalizedPath.includes('total') ? (
            <Breadcrumbs
              items={ORDER_BREADCRUMBS}
              activePath={normalizedPath}
              isItemDisabled={(index) => index > availableStepIndexes}
              onItemClick={(item, index) => {
                if (index > availableStepIndexes) {
                  return
                }

                navigate(item.path)
              }}
            />
          ) : (
            <div style={{ padding: '8px 0' }} />
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          <main className={styles.content}>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>

          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Ваш заказ:</h3>

            {isLocationComplete && (
              <div className={styles.pickupRow}>
                <span className={styles.pickupLabel}>Пункт выдачи</span>
                <span className={styles.pickupDots} aria-hidden="true" />
                <span className={styles.pickupValue}>
                  {state.pickupPoint.split(', ').map((part: string, index: number) => (
                    <Fragment key={index}>
                      {part},{index < state.pickupPoint.split(', ').length - 1 && <br />}
                    </Fragment>
                  ))}
                </span>
              </div>
            )}

            {isModelComplete && (
              <>
                <div className={styles.pickupRow}>
                  <span className={styles.pickupLabel}>Модель</span>
                  <span className={styles.pickupDots} aria-hidden="true" />
                  <span className={styles.pickupValue}>{state.model}</span>
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Цена:</span>
                  <span className={styles.priceValue}>
                    от {state.modelPriceFrom?.toLocaleString()} до{' '}
                    {state.modelPriceTo?.toLocaleString()} ₽
                  </span>
                </div>
              </>
            )}

            <Button
              disabled={
                !isLocationComplete ||
                (normalizedPath.includes('model') && !isModelComplete)
              }
              className={styles.sidebarButton}
              onClick={() => {
                if (normalizedPath.includes('model')) {
                  navigate(ROUTES.ORDER_ADDITIONAL_STEP.path)
                } else {
                  navigate(ROUTES.ORDER_MODEL_STEP.path)
                }
              }}
            >
              {normalizedPath.includes('model') ? 'Дополнительно' : 'Выбрать модель'}
            </Button>
          </aside>
        </div>
      </div>
    </div>
  )
}
