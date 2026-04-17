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
      { path: ROUTES.NOTFOUND.path, element: <>NotFound</> },
    ],
  },
]
