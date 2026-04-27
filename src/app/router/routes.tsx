import { ROUTES } from '@/shared/consts'
import type { RouteObject } from 'react-router-dom'
import { Layout } from '../ui'
import { HomePage } from '@/pages'

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME.path,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      // Заглушка для V-2
      { path: ROUTES.ORDER_FIRST_STEP.path, element: <>Order First Step</> },
      { path: ROUTES.NOTFOUND.path, element: <>NotFound</> },
    ],
  },
]
