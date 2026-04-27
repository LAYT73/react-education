import ResetIcon from '@/shared/assets/icons/reset-input.svg?react'
import { InputSearch } from '@/shared/ui'
import { YandexMap } from '@/shared/ui/YandexMap/YandexMap'
import styles from './firstStepPage.module.css'
import { useLocationStep } from './model/useLocationStep'

export const FirstStepPage = () => {
  const {
    state,
    selectedCityOption,
    filteredCityOptions,
    filteredPickupPointOptions,
    displayedMarkers,
    mapCenter,
    showPickupValidation,
    pickupPlaceholder,
    setCity,
    setPickupPoint,
    handlePickupInputChange,
    handlePickupOptionSelect,
    handleMarkerClick,
  } = useLocationStep()
  const yandexApiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY ?? ''

  return (
    <div className={styles.page}>
      <div className={styles.fieldGroup}>
        <p className={styles.fieldLabel}>Город</p>
        <InputSearch
          value={state.city}
          onChange={setCity}
          options={filteredCityOptions}
          isDropdownOpen={state.city.trim().length > 0}
          onOptionSelect={(option) => setCity(option.label)}
          onClear={() => setCity('')}
          placeholder="Введите город"
          clearIcon={<ResetIcon aria-label="Очистить поле" />}
        />
      </div>

      <div className={styles.fieldGroup}>
        <p className={styles.fieldLabel}>Пункт выдачи</p>
        <InputSearch
          value={state.pickupPoint}
          onChange={handlePickupInputChange}
          options={filteredPickupPointOptions}
          isDropdownOpen={
            Boolean(selectedCityOption) && state.pickupPoint.trim().length > 0
          }
          onOptionSelect={handlePickupOptionSelect}
          onClear={() => setPickupPoint('', null)}
          placeholder={pickupPlaceholder}
          disabled={!selectedCityOption}
          clearIcon={<ResetIcon aria-label="Очистить поле" />}
        />
      </div>

      {showPickupValidation && (
        <p className={styles.validationText}>
          Выберите пункт выдачи из списка или на карте.
        </p>
      )}

      <section className={styles.mapSection}>
        <p className={styles.mapTitle}>Выбрать на карте:</p>
        {yandexApiKey ? (
          <YandexMap
            apiKey={yandexApiKey}
            center={mapCenter}
            zoom={12}
            markers={displayedMarkers}
            onMarkerClick={handleMarkerClick}
            className={styles.map}
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
