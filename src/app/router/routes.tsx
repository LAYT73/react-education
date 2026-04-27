import { ROUTES } from '@/shared/consts'
import type { RouteObject } from 'react-router-dom'
import { Layout, OrderLayout } from '../ui'
import {
  AdditionalStepPage,
  FirstStepPage,
  HomePage,
  ModelStepPage,
  TotalStepPage,
} from '@/pages'
import { RequireOrderStep } from './RequireOrderStep'

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME.path,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.ORDER.path,
        element: <OrderLayout />,
        children: [
          { path: ROUTES.ORDER_FIRST_STEP.path, element: <FirstStepPage /> },
          {
            element: <RequireOrderStep minAvailableStepIndex={1} />,
            children: [{ path: ROUTES.ORDER_MODEL_STEP.path, element: <ModelStepPage /> }],
          },
          {
            element: <RequireOrderStep minAvailableStepIndex={2} />,
            children: [
              { path: ROUTES.ORDER_ADDITIONAL_STEP.path, element: <AdditionalStepPage /> },
            ],
          },
          {
            element: <RequireOrderStep minAvailableStepIndex={3} />,
            children: [{ path: ROUTES.ORDER_TOTAL_STEP.path, element: <TotalStepPage /> }],
          },
        ],
      },
      { path: ROUTES.NOTFOUND.path, element: <>NotFound</> },
    ],
  },
]
