import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const basename =
    import.meta.env.BASE_URL.length > 1
      ? import.meta.env.BASE_URL.replace(/\/$/, '')
      : import.meta.env.BASE_URL

  return <BrowserRouter basename={basename}>{children}</BrowserRouter>
}
