export const CAR_COLOR_OPTIONS = [
  { id: 'any', label: 'Любой', value: 'any' as const },
  { id: 'red', label: 'Красный', value: 'red' as const },
  { id: 'blue', label: 'Голубой', value: 'blue' as const },
]

export const RENT_TARIFF_OPTIONS = [
  { id: 'minute', label: 'Поминутно, 7₽/мин', value: 'per-minute' as const },
  { id: 'day', label: 'На сутки, 1999 ₽/сутки', value: 'per-day' as const },
]

export const ADDITIONAL_SERVICE_OPTIONS = [
  {
    id: 'full-tank',
    text: 'Полный бак, 500р',
    sidebarLabel: 'Полный бак',
    price: 500,
    value: 'full-tank',
  },
  {
    id: 'child-seat',
    text: 'Детское кресло, 200р',
    sidebarLabel: 'Детское кресло',
    price: 200,
    value: 'child-seat',
  },
  {
    id: 'right-wheel',
    text: 'Правый руль, 1600р',
    sidebarLabel: 'Правый руль',
    price: 1600,
    value: 'right-wheel',
  },
] as const
