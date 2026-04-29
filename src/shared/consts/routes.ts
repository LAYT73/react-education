type RoutesType = {
  [key: string]: {
    path: string
  }
}

const ROUTES: RoutesType = {
  HOME: {
    path: '/',
  },
  ORDER: {
    path: '/order',
  },
  ORDER_FIRST_STEP: {
    path: '/order/first-step',
  },
  ORDER_MODEL_STEP: {
    path: '/order/model',
  },
  ORDER_ADDITIONAL_STEP: {
    path: '/order/additional',
  },
  ORDER_TOTAL_STEP: {
    path: '/order/total',
  },
  NOTFOUND: {
    path: '*',
  },
} as const

export { ROUTES, type RoutesType }
