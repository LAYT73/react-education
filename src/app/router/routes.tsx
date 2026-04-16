import { ROUTES } from '@/shared/consts'
import type { RouteObject } from 'react-router-dom'
import { Layout } from '../ui/Layout'

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME.path,
    element: <Layout />,
    children: [
      { index: true, element: <>Home</> },
      { path: ROUTES.NOTFOUND.path, element: <>NotFound</> },
    ],
  },
]
