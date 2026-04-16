import { useRoutes } from 'react-router-dom'
import { routes } from './routes'

export function Router() {
  const routing = useRoutes(routes)

  return <>{routing}</>
}
