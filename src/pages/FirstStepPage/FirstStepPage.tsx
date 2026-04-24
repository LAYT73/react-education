import { InputSearch } from '@/shared/ui'
import { YandexMap } from '@/shared/ui/YandexMap/YandexMap'
import { useMemo, useState } from 'react'
import styles from './firstStepPage.module.css'
import ResetIcon from '@/shared/assets/icons/reset-input.svg?react'
import { DEMO_MARKERS, MOCK_CITY_OPTIONS } from '@/shared/consts'

export const FirstStepPage = () => {
  const [cityValue, setCityValue] = useState('Ульяновск')
  const [pickupPointValue, setPickupPointValue] = useState('')
  const yandexApiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY ?? ''

  const filteredCityOptions = useMemo(() => {
    const normalizedValue = cityValue.trim().toLowerCase()

    if (!normalizedValue) {
      return MOCK_CITY_OPTIONS
    }

    return MOCK_CITY_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(normalizedValue),
    )
  }, [cityValue])

  const filteredPickupPointOptions = useMemo(() => {
    const normalizedValue = pickupPointValue.trim().toLowerCase()

    if (!normalizedValue) {
      return DEMO_MARKERS.map((marker) => ({
        id: marker.id,
        label: marker.title ?? String(marker.id),
      }))
    }

    return DEMO_MARKERS.map((marker) => ({
      id: marker.id,
      label: marker.title ?? String(marker.id),
    })).filter((option) => option.label.toLowerCase().includes(normalizedValue))
  }, [pickupPointValue])

  return (
    <div className={styles.page}>
      <div className={styles.fieldGroup}>
        <p className={styles.fieldLabel}>Город</p>
        <InputSearch
          className={styles.fieldInput}
          value={cityValue}
          onChange={setCityValue}
          options={filteredCityOptions}
          isDropdownOpen={cityValue.trim().length > 0}
          onOptionSelect={(option) => setCityValue(option.label)}
          onClear={() => setCityValue('')}
          placeholder="Введите город"
          clearIcon={<ResetIcon aria-label="Очистить поле" />}
        />
      </div>

      <div className={styles.fieldGroup}>
        <p className={styles.fieldLabel}>Пункт выдачи</p>
        <InputSearch
          className={styles.fieldInput}
          value={pickupPointValue}
          onChange={setPickupPointValue}
          options={filteredPickupPointOptions}
          isDropdownOpen={pickupPointValue.trim().length > 0}
          onOptionSelect={(option) => setPickupPointValue(option.label)}
          onClear={() => setPickupPointValue('')}
          placeholder="Начните вводить пункт выдачи"
          clearIcon={<ResetIcon aria-label="Очистить поле" />}
        />
      </div>

      <section className={styles.mapSection}>
        <p className={styles.mapTitle}>Выбрать на карте:</p>
        {yandexApiKey ? (
          <YandexMap
            apiKey={yandexApiKey}
            center={[54.318598, 48.405773]} // Ульяновск
            zoom={12}
            markers={DEMO_MARKERS}
            onMarkerClick={(marker) =>
              setPickupPointValue(marker.title ?? String(marker.id))
            }
            style={{
              height: '420px',
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          />
        ) : (
          <div className={styles.apiKeyWarning}>
            Укажи VITE_YANDEX_MAPS_API_KEY в .env, чтобы увидеть демо-карту.
          </div>
        )}
      </section>
    </div>
  )
}
