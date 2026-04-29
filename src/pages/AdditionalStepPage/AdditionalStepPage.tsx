import ResetIcon from '@/shared/assets/icons/reset-input.svg?react'
import {
  ADDITIONAL_SERVICE_OPTIONS,
  CAR_COLOR_OPTIONS,
  RENT_TARIFF_OPTIONS,
} from '@/shared/consts'
import { Checkbox, DateTimePicker, RadioButton } from '@/shared/ui'
import { useOrderFlow } from '@/app/providers'
import styles from './additionalStepPage.module.css'

export const AdditionalStepPage = () => {
  const { state, setColor, setAdditional, setRentFrom, setRentTo, setTariff } =
    useOrderFlow()

  const handleAdditionalChange = (value: string, checked: boolean) => {
    const nextAdditional = checked
      ? [...state.additional, value]
      : state.additional.filter((item) => item !== value)

    setAdditional(nextAdditional)
  }

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <p className={styles.label}>Цвет</p>
        <div className={styles.colorGroup}>
          {CAR_COLOR_OPTIONS.map((option) => (
            <RadioButton
              key={option.id}
              label={option.label}
              value={option.value}
              checked={state.color === option.value}
              onChange={(checked) => {
                if (checked) {
                  setColor(option.value)
                }
              }}
              name="carColor"
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Дата аренды</p>
        <div className={styles.dateGrid}>
          <p className={styles.dateLabel}>С</p>
          <DateTimePicker
            value={state.rentFrom}
            onChange={setRentFrom}
            clearIcon={<ResetIcon aria-label="Очистить поле" />}
            onClear={() => setRentFrom('')}
          />

          <p className={styles.dateLabel}>По</p>
          <DateTimePicker
            value={state.rentTo}
            onChange={setRentTo}
            clearIcon={<ResetIcon aria-label="Очистить поле" />}
            onClear={() => setRentTo('')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Тариф</p>
        <div className={styles.tariffGroup}>
          {RENT_TARIFF_OPTIONS.map((option) => (
            <RadioButton
              key={option.id}
              label={option.label}
              value={option.value}
              checked={state.tariff === option.value}
              onChange={(checked) => {
                if (checked) {
                  setTariff(option.value)
                }
              }}
              name="rentTariff"
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Доп услуги</p>
        <div className={styles.additionalGroup}>
          {ADDITIONAL_SERVICE_OPTIONS.map((option) => (
            <Checkbox
              key={option.id}
              text={option.text}
              value={option.value}
              checked={state.additional.includes(option.value)}
              onChange={(checked) => handleAdditionalChange(option.value, checked)}
              name="additionalServices"
            />
          ))}
        </div>
      </section>
    </div>
  )
}
