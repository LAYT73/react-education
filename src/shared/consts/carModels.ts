import { getImagePath } from '../utils'

export interface CarModel {
  id: string
  name: string
  type: 'all' | 'economy' | 'premium'
  priceFrom: number
  priceTo: number
  image: string
}

export const CAR_MODELS: CarModel[] = [
  {
    id: 'elantra',
    name: 'ELANTRA',
    type: 'economy',
    priceFrom: 12000,
    priceTo: 25000,
    image: getImagePath('images/model/elantra.png'),
  },
  {
    id: 'i30-n',
    name: 'i30 N',
    type: 'premium',
    priceFrom: 28000,
    priceTo: 40000,
    image: getImagePath('images/model/i30-n.png'),
  },
  {
    id: 'creta',
    name: 'CRETA',
    type: 'economy',
    priceFrom: 15000,
    priceTo: 28000,
    image: getImagePath('images/model/creta.png'),
  },
  {
    id: 'sonata',
    name: 'SONATA',
    type: 'premium',
    priceFrom: 32000,
    priceTo: 45000,
    image: getImagePath('images/model/sonata.png'),
  },
  {
    id: 'elantra2',
    name: 'ELANTRA22',
    type: 'economy',
    priceFrom: 12000,
    priceTo: 25000,
    image: getImagePath('images/model/elantra.png'),
  },
  {
    id: 'i30-n2',
    name: 'i30 N2',
    type: 'premium',
    priceFrom: 28000,
    priceTo: 40000,
    image: getImagePath('images/model/i30-n.png'),
  },
]

export const CAR_FILTER_OPTIONS = [
  { id: 'all', label: 'Все модели', value: 'all' as const },
  { id: 'economy', label: 'Эконом', value: 'economy' as const },
  { id: 'premium', label: 'Премиум', value: 'premium' as const },
]
