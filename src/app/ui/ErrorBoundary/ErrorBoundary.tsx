import React, { type ReactNode } from 'react'
import styles from './errorBoundary.module.css'
import { Button } from '@/shared/ui'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>Что-то пошло не так</h1>
          <p className={styles.description}>
            Приносим извинения за неудобство. Попробуйте перезагрузить страницу.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details className={styles.details}>
              <summary className={styles.summary}>Детали ошибки (dev)</summary>
              <pre className={styles.errorCode}>{this.state.error.toString()}</pre>
            </details>
          )}
          <Button onClick={() => window.location.reload()} className={styles.button}>
            Перезагрузить страницу
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
