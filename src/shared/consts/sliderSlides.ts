export interface SliderSlide {
  id: number
  title: string
  description: string
  image: string
  buttonVariant: 'green' | 'cian' | 'orange' | 'purple'
}

export const SLIDER_SLIDES: SliderSlide[] = [
  {
    id: 1,
    title: 'Бесплатная парковка',
    description:
      'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    image: '/images/slider/slider-1.png',
    buttonVariant: 'green',
  },
  {
    id: 2,
    title: 'Страховка',
    description: 'Полная страховка автомобиля',
    image: '/images/slider/slider-2.png',
    buttonVariant: 'cian',
  },
  {
    id: 3,
    title: 'Бензин',
    description: 'Полный бак на любой заправке города за наш счёт',
    image: '/images/slider/slider-3.png',
    buttonVariant: 'orange',
  },
  {
    id: 4,
    title: 'Обслуживание',
    description: 'Автомобиль проходит еженедельное ТО',
    image: '/images/slider/slider-4.png',
    buttonVariant: 'purple',
  },
]
