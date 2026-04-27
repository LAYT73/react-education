import { useOrderFlow } from '@/app/providers'
import { ROUTES } from '@/shared/consts'
import { Navigate, Outlet } from 'react-router-dom'

type RequireOrderStepProps = {
  minAvailableStepIndex: number
}

export const RequireOrderStep = ({ minAvailableStepIndex }: RequireOrderStepProps) => {
  const { availableStepIndexes } = useOrderFlow()

  if (availableStepIndexes < minAvailableStepIndex) {
    return <Navigate to={ROUTES.ORDER_FIRST_STEP.path} replace />
  }

  return <Outlet />
}
