import type { Marker } from '../types/yandex-maps.types'

export const YANDEX_MAPS_V2_SCRIPT_SELECTOR = 'script[data-yandex-maps-v2="true"]'

export const MOCK_CITY_OPTIONS = [
  { id: 1, label: 'Ульяновск' },
  { id: 2, label: 'Самара' },
  { id: 3, label: 'Казань' },
  { id: 4, label: 'Москва' },
  { id: 5, label: 'Санкт-Петербург' },
  { id: 6, label: 'Екатеринбург' },
]

export const DEMO_MARKERS: Marker[] = [
  {
    id: 'ulyanovsk-narimanova',
    coordinates: [54.338555, 48.381168],
    title: 'ул. Нариманова 52, 432002',
    description: 'Основной салон в Ульяновске',
  },
  {
    id: 'ulyanovsk-goncharova',
    coordinates: [54.31677, 48.3952],
    title: 'ул. Гончарова 15, 432000',
    description: 'Склад в центре Ульяновска',
  },
  {
    id: 'samara-center',
    coordinates: [54.306869, 48.351398],
    title: 'ул. Пушкарева 8А, 432049',
    description: 'Салон в Ульяновске',
  },
]

export const DEFAULT_MAP_HEIGHT = '500px'
export const DEFAULT_CENTER: [number, number] = [55.76, 37.64]
export const DEFAULT_ZOOM = 10
export const MARKER_PRESET = 'islands#redDotIcon'
