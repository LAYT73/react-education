import { AppProviders } from './providers'
import { Router } from './router'
import { ErrorBoundary } from './ui'

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <Router />
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App
