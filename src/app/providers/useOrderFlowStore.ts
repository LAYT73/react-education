import { create } from 'zustand'
import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { parseOrderDateTime } from '@/shared/utils'
type OrderStep = 'location' | 'model' | 'additional' | 'total'

type OrderState = {
  city: string
  pickupPoint: string
  pickupPointId: string | null
  model: string | null
  modelPriceFrom: number | null
  modelPriceTo: number | null
  additional: string[]
  color: string
  rentFrom: string
  rentTo: string
  tariff: string
  totalConfirmed: boolean
}

type OrderFlowActions = {
  setCity: (city: string) => void
  setPickupPoint: (pickupPoint: string, pickupPointId?: string | null) => void
  setModel: (
    model: string | null,
    priceFrom?: number | null,
    priceTo?: number | null,
  ) => void
  setAdditional: (additional: string[]) => void
  setColor: (color: string) => void
  setRentFrom: (rentFrom: string) => void
  setRentTo: (rentTo: string) => void
  setTariff: (tariff: string) => void
  setTotalConfirmed: (totalConfirmed: boolean) => void
}

type OrderFlowStore = {
  state: OrderState
} & OrderFlowActions

type OrderFlowContextValue = {
  state: OrderState
  isLocationComplete: boolean
  isModelComplete: boolean
  isAdditionalComplete: boolean
  completedSteps: OrderStep[]
  availableStepIndexes: number
} & OrderFlowActions

const initialState: OrderState = {
  city: '',
  pickupPoint: '',
  pickupPointId: null,
  model: null,
  modelPriceFrom: null,
  modelPriceTo: null,
  additional: [],
  color: '',
  rentFrom: '',
  rentTo: '',
  tariff: '',
  totalConfirmed: false,
}

const selectStepMeta = (state: OrderState) => {
  const isLocationComplete =
    state.city.trim().length > 0 &&
    state.pickupPoint.trim().length > 0 &&
    Boolean(state.pickupPointId)
  const isModelComplete = Boolean(state.model)
  const rentFromDate = parseOrderDateTime(state.rentFrom)
  const rentToDate = parseOrderDateTime(state.rentTo)
  const isAdditionalComplete =
    state.color.trim().length > 0 &&
    state.rentFrom.trim().length > 0 &&
    state.rentTo.trim().length > 0 &&
    state.tariff.trim().length > 0 &&
    Boolean(rentFromDate && rentToDate && rentToDate.getTime() > rentFromDate.getTime())

  const completedSteps: OrderStep[] = []

  if (isLocationComplete) {
    completedSteps.push('location')
  }

  if (isModelComplete) {
    completedSteps.push('model')
  }

  if (isAdditionalComplete) {
    completedSteps.push('additional')
  }

  if (state.totalConfirmed) {
    completedSteps.push('total')
  }

  const availableStepIndexes = !isLocationComplete
    ? 0
    : !isModelComplete
      ? 1
      : !isAdditionalComplete
        ? 2
        : 3

  return {
    isLocationComplete,
    isModelComplete,
    isAdditionalComplete,
    completedSteps,
    availableStepIndexes,
  }
}

const useOrderFlowStore = create<OrderFlowStore>((set) => ({
  state: initialState,
  setCity: (city) => {
    set((prev) => {
      if (prev.state.city === city) {
        return prev
      }

      return {
        state: {
          ...prev.state,
          city,
          pickupPoint: '',
          pickupPointId: null,
          model: null,
          modelPriceFrom: null,
          modelPriceTo: null,
          additional: [],
          color: '',
          rentFrom: '',
          rentTo: '',
          tariff: '',
          totalConfirmed: false,
        },
      }
    })
  },
  setPickupPoint: (pickupPoint, pickupPointId = null) => {
    set((prev) => {
      if (
        prev.state.pickupPoint === pickupPoint &&
        prev.state.pickupPointId === pickupPointId
      ) {
        return prev
      }

      return {
        state: {
          ...prev.state,
          pickupPoint,
          pickupPointId,
          model: null,
          modelPriceFrom: null,
          modelPriceTo: null,
          additional: [],
          color: '',
          rentFrom: '',
          rentTo: '',
          tariff: '',
          totalConfirmed: false,
        },
      }
    })
  },
  setModel: (model, priceFrom = null, priceTo = null) => {
    set((prev) => ({
      state: {
        ...prev.state,
        model,
        modelPriceFrom: priceFrom,
        modelPriceTo: priceTo,
        additional: [],
        color: '',
        rentFrom: '',
        rentTo: '',
        tariff: '',
        totalConfirmed: false,
      },
    }))
  },
  setAdditional: (additional) => {
    set((prev) => ({
      state: {
        ...prev.state,
        additional,
        totalConfirmed: false,
      },
    }))
  },
  setColor: (color) => {
    set((prev) => {
      if (prev.state.color === color) {
        return prev
      }

      return {
        state: {
          ...prev.state,
          color,
          totalConfirmed: false,
        },
      }
    })
  },
  setRentFrom: (rentFrom) => {
    set((prev) => {
      if (prev.state.rentFrom === rentFrom) {
        return prev
      }

      return {
        state: {
          ...prev.state,
          rentFrom,
          totalConfirmed: false,
        },
      }
    })
  },
  setRentTo: (rentTo) => {
    set((prev) => {
      if (prev.state.rentTo === rentTo) {
        return prev
      }

      return {
        state: {
          ...prev.state,
          rentTo,
          totalConfirmed: false,
        },
      }
    })
  },
  setTariff: (tariff) => {
    set((prev) => {
      if (prev.state.tariff === tariff) {
        return prev
      }

      return {
        state: {
          ...prev.state,
          tariff,
          totalConfirmed: false,
        },
      }
    })
  },
  setTotalConfirmed: (totalConfirmed) => {
    set((prev) => ({
      state: {
        ...prev.state,
        totalConfirmed,
      },
    }))
  },
}))

export const useOrderFlow = (): OrderFlowContextValue => {
  const {
    state,
    setCity,
    setPickupPoint,
    setModel,
    setAdditional,
    setColor,
    setRentFrom,
    setRentTo,
    setTariff,
    setTotalConfirmed,
  } = useOrderFlowStore(
    useShallow((store) => ({
      state: store.state,
      setCity: store.setCity,
      setPickupPoint: store.setPickupPoint,
      setModel: store.setModel,
      setAdditional: store.setAdditional,
      setColor: store.setColor,
      setRentFrom: store.setRentFrom,
      setRentTo: store.setRentTo,
      setTariff: store.setTariff,
      setTotalConfirmed: store.setTotalConfirmed,
    })),
  )

  const stepMeta = useMemo(() => selectStepMeta(state), [state])

  return useMemo(
    () => ({
      state,
      ...stepMeta,
      setCity,
      setPickupPoint,
      setModel,
      setAdditional,
      setColor,
      setRentFrom,
      setRentTo,
      setTariff,
      setTotalConfirmed,
    }),
    [
      state,
      stepMeta,
      setCity,
      setPickupPoint,
      setModel,
      setAdditional,
      setColor,
      setRentFrom,
      setRentTo,
      setTariff,
      setTotalConfirmed,
    ],
  )
}
