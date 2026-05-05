import { useMemo } from 'react'
import { useOrderFlow } from '@/app/providers'
import { CAR_MODELS } from '@/shared/consts'
import styles from './totalStepPage.module.css'

const MOCK_REG_NUMBER = 'K 761 HA 73'
const MOCK_FUEL_LEVEL = '100%'
const MOCK_AVAILABLE_FROM = '12.06.2019 12:00'

export const TotalStepPage = () => {
  const { state } = useOrderFlow()

  const selectedCar = useMemo(
    () => CAR_MODELS.find((model) => model.name === state.model),
    [state.model],
  )

  const carTitle = state.model ? state.model : 'Hyndai, i30 N'

  return (
    <section className={styles.page}>
      <div className={styles.detailsBlock}>
        {state.totalConfirmed && (
          <p className={styles.confirmedTitle}>Ваш заказ подтверждён</p>
        )}
        <h1 className={styles.title}>{carTitle}</h1>

        <p className={styles.plate}>{MOCK_REG_NUMBER}</p>

        <p className={styles.infoLine}>
          <span className={styles.infoLabel}>Топливо</span>
          <span className={styles.infoValue}>{MOCK_FUEL_LEVEL}</span>
        </p>

        <p className={styles.infoLine}>
          <span className={styles.infoLabel}>Доступна с</span>
          <span className={styles.infoValue}>{MOCK_AVAILABLE_FROM}</span>
        </p>
      </div>

      <div className={styles.imageWrap}>
        {selectedCar && (
          <img src={selectedCar.image} alt={carTitle} className={styles.image} />
        )}
      </div>
    </section>
  )
}
