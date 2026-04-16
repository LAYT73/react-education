type RoutesType = {
  [key: string]: {
    path: string
  }
}

const ROUTES: RoutesType = {
  HOME: {
    path: '/',
  },
  NOTFOUND: {
    path: '*',
  },
}

export { ROUTES, type RoutesType }
