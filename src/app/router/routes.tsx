import { ROUTES } from '@/shared/consts'
import type { RouteObject } from 'react-router-dom'
import { Layout, OrderLayout } from '../ui'
import { FirstStepPage, HomePage } from '@/pages'

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME.path,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.ORDER.path,
        element: <OrderLayout />,
        children: [{ path: ROUTES.ORDER_FIRST_STEP.path, element: <FirstStepPage /> }],
      },
      { path: ROUTES.NOTFOUND.path, element: <>NotFound</> },
    ],
  },
]
