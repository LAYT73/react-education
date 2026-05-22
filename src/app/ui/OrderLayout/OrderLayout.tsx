import { useOrderFlow } from '@/app/providers'
import { ADDITIONAL_SERVICE_OPTIONS, CAR_COLOR_OPTIONS, ROUTES } from '@/shared/consts'
import { Breadcrumbs, Button } from '@/shared/ui'
import { Header } from '@/widgets'
import { Fragment, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ErrorBoundary } from '../ErrorBoundary'
import { formatDateTimeDuration } from '@/shared/utils'
import styles from './orderLayout.module.css'

const ORDER_BREADCRUMBS = [
  { label: 'Местоположение', path: ROUTES.ORDER_FIRST_STEP.path },
  { label: 'Модель', path: ROUTES.ORDER_MODEL_STEP.path },
  { label: 'Дополнительно', path: ROUTES.ORDER_ADDITIONAL_STEP.path },
  { label: 'Итого', path: ROUTES.ORDER_TOTAL_STEP.path },
]

const ORDER_NUMBER = 'RU58491823'

export const OrderLayout = () => {
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const {
    state,
    availableStepIndexes,
    isLocationComplete,
    isModelComplete,
    isAdditionalComplete,
    setTotalConfirmed,
    resetOrder,
  } = useOrderFlow()

  const normalizedPath = useMemo(() => {
    return pathname.endsWith('/') && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname
  }, [pathname])

  const isModelStep = normalizedPath.includes('model')
  const isAdditionalStep = normalizedPath.includes('additional')
  const isTotalStep = normalizedPath.includes('total')

  const colorLabel = CAR_COLOR_OPTIONS.find(
    (option) => option.value === state.color,
  )?.label
  const tariffLabel = state.tariff === 'per-day' ? 'На сутки' : 'Поминутно'
  const rentalDuration = formatDateTimeDuration(state.rentFrom, state.rentTo)
  const selectedAdditionalServices = useMemo(
    () =>
      state.additional
        .map((serviceValue) => {
          const option = ADDITIONAL_SERVICE_OPTIONS.find(
            (currentOption) => currentOption.value === serviceValue,
          )

          if (!option) {
            return null
          }

          return option
        })
        .filter((option) => option !== null),
    [state.additional],
  )

  const additionalServicesPrice = selectedAdditionalServices.reduce(
    (sum, option) => sum + option.price,
    0,
  )

  const modelPriceLabel =
    state.modelPriceFrom !== null && state.modelPriceTo !== null
      ? isAdditionalComplete
        ? `${(state.modelPriceTo + additionalServicesPrice).toLocaleString()} ₽`
        : `от ${state.modelPriceFrom.toLocaleString()} до ${state.modelPriceTo.toLocaleString()} ₽`
      : ''

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
          {isTotalStep && state.totalConfirmed ? (
            <p className={styles.orderNumber}>Заказ номер {ORDER_NUMBER}</p>
          ) : (
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
          )}
        </div>
      </div>

      <div className={styles.contentSection}>
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
                        {part},
                        {index < state.pickupPoint.split(', ').length - 1 && <br />}
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
                </>
              )}

              {colorLabel && (
                <div className={styles.pickupRow}>
                  <span className={styles.pickupLabel}>Цвет</span>
                  <span className={styles.pickupDots} aria-hidden="true" />
                  <span className={styles.pickupValue}>{colorLabel}</span>
                </div>
              )}

              {rentalDuration && (
                <div className={styles.pickupRow}>
                  <span className={styles.pickupLabel}>Длительность аренды</span>
                  <span className={styles.pickupDots} aria-hidden="true" />
                  <span className={styles.pickupValue}>{rentalDuration}</span>
                </div>
              )}

              {state.tariff && (
                <div className={styles.pickupRow}>
                  <span className={styles.pickupLabel}>Тариф</span>
                  <span className={styles.pickupDots} aria-hidden="true" />
                  <span className={styles.pickupValue}>{tariffLabel}</span>
                </div>
              )}

              {state.additional.map((serviceValue) => {
                const serviceLabel = ADDITIONAL_SERVICE_OPTIONS.find(
                  (option) => option.value === serviceValue,
                )?.sidebarLabel

                if (!serviceLabel) {
                  return null
                }

                return (
                  <div className={styles.pickupRow} key={serviceValue}>
                    <span className={styles.pickupLabel}>{serviceLabel}</span>
                    <span className={styles.pickupDots} aria-hidden="true" />
                    <span className={styles.pickupValue}>Да</span>
                  </div>
                )
              })}

              {modelPriceLabel && (
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Цена:</span>
                  <span className={styles.priceValue}>{modelPriceLabel}</span>
                </div>
              )}

              <Button
                disabled={
                  isTotalStep
                    ? false
                    : !isLocationComplete ||
                      (isModelStep && !isModelComplete) ||
                      (isAdditionalStep && !isAdditionalComplete)
                }
                variant={isTotalStep && state.totalConfirmed ? 'orange' : 'primary'}
                className={styles.sidebarButton}
                onClick={() => {
                  if (isTotalStep) {
                    if (state.totalConfirmed) {
                      resetOrder()
                      navigate(ROUTES.ORDER_FIRST_STEP.path)
                      return
                    }

                    setIsOrderConfirmOpen(true)
                    return
                  }

                  if (isModelStep) {
                    navigate(ROUTES.ORDER_ADDITIONAL_STEP.path)
                    return
                  }

                  if (isAdditionalStep) {
                    navigate(ROUTES.ORDER_TOTAL_STEP.path)
                    return
                  }

                  navigate(ROUTES.ORDER_MODEL_STEP.path)
                }}
              >
                {isTotalStep && state.totalConfirmed
                  ? 'Отменить'
                  : isTotalStep
                    ? 'Заказать'
                    : isModelStep
                      ? 'Дополнительно'
                      : isAdditionalStep
                        ? 'Итого'
                        : 'Выбрать модель'}
              </Button>
            </aside>
          </div>
        </div>
      </div>

      {isOrderConfirmOpen && (
        <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
          <div className={styles.confirmCard}>
            <h2 className={styles.confirmTitle}>Подтвердить заказ</h2>
            <div className={styles.confirmActions}>
              <Button
                width="small"
                onClick={() => {
                  setTotalConfirmed(true)
                  setIsOrderConfirmOpen(false)
                }}
              >
                Подтвердить
              </Button>
              <Button
                width="small"
                variant="orange"
                onClick={() => setIsOrderConfirmOpen(false)}
              >
                Вернуться
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
