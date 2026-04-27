import { useOrderFlow } from '@/app/providers'
import {
  CITY_CENTERS,
  DEMO_MARKERS,
  DEMO_PICKUP_POINTS,
  MOCK_CITY_OPTIONS,
} from '@/shared/consts'
import { useMemo } from 'react'

type SearchOption = {
  id: string | number
  label: string
}

export const useLocationStep = () => {
  const { state, setCity, setPickupPoint } = useOrderFlow()
  const normalizedCity = state.city.trim().toLowerCase()

  const selectedCityOption = useMemo(() => {
    return MOCK_CITY_OPTIONS.find(
      (option) => option.label.toLowerCase() === normalizedCity,
    )
  }, [normalizedCity])

  const pointsByCity = useMemo(() => {
    if (!selectedCityOption) {
      return []
    }

    return DEMO_PICKUP_POINTS.filter((point) => point.city === selectedCityOption.label)
  }, [selectedCityOption])

  const filteredCityOptions = useMemo(() => {
    const normalizedValue = state.city.trim().toLowerCase()

    if (!normalizedValue) {
      return MOCK_CITY_OPTIONS
    }

    return MOCK_CITY_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(normalizedValue),
    )
  }, [state.city])

  const filteredPickupPointOptions = useMemo(() => {
    const normalizedValue = state.pickupPoint.trim().toLowerCase()

    if (!selectedCityOption) {
      return []
    }

    if (!normalizedValue) {
      return pointsByCity.map((point) => ({
        id: point.id,
        label: point.title ?? String(point.id),
      }))
    }

    return pointsByCity
      .map((point) => ({
        id: point.id,
        label: point.title ?? String(point.id),
      }))
      .filter((option) => option.label.toLowerCase().includes(normalizedValue))
  }, [pointsByCity, selectedCityOption, state.pickupPoint])

  const selectedPickupPoint = useMemo(() => {
    return DEMO_PICKUP_POINTS.find((point) => {
      if (state.pickupPointId) {
        return String(point.id) === state.pickupPointId
      }

      return point.title?.toLowerCase() === state.pickupPoint.trim().toLowerCase()
    })
  }, [state.pickupPoint, state.pickupPointId])

  const displayedMarkers = useMemo(() => {
    if (!selectedCityOption) {
      return DEMO_MARKERS
    }

    const allowedIds = new Set(pointsByCity.map((point) => point.id))
    return DEMO_MARKERS.filter((marker) => allowedIds.has(marker.id))
  }, [pointsByCity, selectedCityOption])

  const mapCenter = useMemo<[number, number]>(() => {
    if (selectedPickupPoint) {
      return selectedPickupPoint.coordinates
    }

    if (selectedCityOption) {
      return CITY_CENTERS[selectedCityOption.label]
    }

    return CITY_CENTERS['Ульяновск']
  }, [selectedCityOption, selectedPickupPoint])

  const showPickupValidation = state.pickupPoint.trim().length > 0 && !state.pickupPointId

  const pickupPlaceholder = selectedCityOption
    ? 'Начните вводить пункт выдачи'
    : 'Сначала выберите город'

  const handlePickupInputChange = (value: string) => {
    const matchedPoint = pointsByCity.find(
      (point) => point.title?.toLowerCase() === value.trim().toLowerCase(),
    )

    setPickupPoint(value, matchedPoint ? String(matchedPoint.id) : null)
  }

  const handlePickupOptionSelect = (option: SearchOption) => {
    setPickupPoint(option.label, String(option.id))
  }

  const handleMarkerClick = (marker: { id: string | number; title?: string }) => {
    const pickupPoint = DEMO_PICKUP_POINTS.find((point) => point.id === marker.id)

    if (!pickupPoint) {
      setPickupPoint(marker.title ?? String(marker.id), String(marker.id))
      return
    }

    setCity(pickupPoint.city)
    setPickupPoint(pickupPoint.title ?? pickupPoint.address, String(pickupPoint.id))
  }

  return {
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
  }
}
