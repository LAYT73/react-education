import { Button } from '@/shared/ui/Button'
import type { ComponentType, ReactNode } from 'react'

export interface ModelCardButtonProps {
  children: ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
}

/**
 * HOC для обёртки Button с поведением для карточек моделей.
 * Централизует стилистику и поведение, позволяя менять дизайн в одном месте.
 */
export const withModelCardButton = (
  WrappedComponent: ComponentType<Record<string, unknown>> = Button,
) => {
  const ModelCardButton = ({
    children,
    onClick,
    className,
    disabled = false,
  }: ModelCardButtonProps) => {
    return (
      <WrappedComponent
        onClick={onClick}
        disabled={disabled}
        className={className}
        isTextButton={false}
      >
        {children}
      </WrappedComponent>
    )
  }

  ModelCardButton.displayName = 'ModelCardButton'

  return ModelCardButton
}

export const ModelCardButton = withModelCardButton(Button)
