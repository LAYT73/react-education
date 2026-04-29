import { useState, useMemo } from 'react'
import { useOrderFlow } from '@/app/providers'
import { CAR_MODELS, CAR_FILTER_OPTIONS } from '@/shared/consts'
import { CarModelCard } from '@/entities/car'
import { RadioButton } from '@/shared/ui'
import styles from './modelStepPage.module.css'

type FilterType = 'all' | 'economy' | 'premium'

export const ModelStepPage = () => {
  const { state, setModel } = useOrderFlow()
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    if (filter === 'all') {
      return CAR_MODELS
    }
    return CAR_MODELS.filter((model) => model.type === filter)
  }, [filter])

  const handleModelSelect = (modelId: string) => {
    const model = CAR_MODELS.find((currentModel) => currentModel.id === modelId)

    if (model && state.model !== model.name) {
      setModel(model.name, model.priceFrom, model.priceTo)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.filterGroup}>
        {CAR_FILTER_OPTIONS.map((option) => (
          <RadioButton
            key={option.id}
            label={option.label}
            checked={filter === option.value}
            onChange={(checked) => {
              if (checked) {
                setFilter(option.value)
              }
            }}
            name="carFilter"
          />
        ))}
      </div>

      <div className={styles.modelsGrid}>
        {filteredModels.map((model) => (
          <CarModelCard
            key={model.id}
            name={model.name}
            priceFrom={model.priceFrom}
            priceTo={model.priceTo}
            image={model.image}
            selected={state.model === model.name}
            onClick={() => handleModelSelect(model.id)}
          />
        ))}
      </div>
    </div>
  )
}
