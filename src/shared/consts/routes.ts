type RoutesType = {
  [key: string]: {
    path: string
  }
}

const ROUTES: RoutesType = {
  HOME: {
    path: '/',
  },
  ORDER_FIRST_STEP: {
    path: '/order/first-step',
  },
  NOTFOUND: {
    path: '*',
  },
}

export { ROUTES, type RoutesType }
