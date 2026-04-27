import { create } from 'zustand'
import { useMemo } from 'react'

type OrderStep = 'location' | 'model' | 'additional' | 'total'

type OrderState = {
  city: string
  pickupPoint: string
  pickupPointId: string | null
  model: string | null
  additional: string[]
  totalConfirmed: boolean
}

type OrderFlowActions = {
  setCity: (city: string) => void
  setPickupPoint: (pickupPoint: string, pickupPointId?: string | null) => void
  setModel: (model: string | null) => void
  setAdditional: (additional: string[]) => void
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
  additional: [],
  totalConfirmed: false,
}

const selectStepMeta = (state: OrderState) => {
  const isLocationComplete =
    state.city.trim().length > 0 &&
    state.pickupPoint.trim().length > 0 &&
    Boolean(state.pickupPointId)
  const isModelComplete = Boolean(state.model)
  const isAdditionalComplete = state.additional.length > 0

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
          additional: [],
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
          additional: [],
          totalConfirmed: false,
        },
      }
    })
  },
  setModel: (model) => {
    set((prev) => ({
      state: {
        ...prev.state,
        model,
        additional: [],
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
  const state = useOrderFlowStore((store) => store.state)
  const setCity = useOrderFlowStore((store) => store.setCity)
  const setPickupPoint = useOrderFlowStore((store) => store.setPickupPoint)
  const setModel = useOrderFlowStore((store) => store.setModel)
  const setAdditional = useOrderFlowStore((store) => store.setAdditional)
  const setTotalConfirmed = useOrderFlowStore((store) => store.setTotalConfirmed)

  const stepMeta = useMemo(() => selectStepMeta(state), [state])

  return useMemo(
    () => ({
      state,
      ...stepMeta,
      setCity,
      setPickupPoint,
      setModel,
      setAdditional,
      setTotalConfirmed,
    }),
    [
      state,
      stepMeta,
      setCity,
      setPickupPoint,
      setModel,
      setAdditional,
      setTotalConfirmed,
    ],
  )
}
