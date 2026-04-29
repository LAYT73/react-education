import clsx from 'clsx'
import styles from './button.module.css'

type ButtonVariant = 'primary' | 'green' | 'cian' | 'orange' | 'purple'
type ButtonWidth = 'small' | 'large'

interface ButtonProps {
  variant?: ButtonVariant
  width?: ButtonWidth
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  isTextButton?: boolean
  textClassName?: string
}

export function Button({
  variant = 'primary',
  width = 'large',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
  textClassName,
  isTextButton = true,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.button,
        styles[variant],
        styles[width],
        {
          [styles.disabled]: disabled,
        },
        className,
      )}
    >
      {!isTextButton && children}
      {isTextButton && (
        <span className={clsx(styles.content, textClassName)}>{children}</span>
      )}
    </button>
  )
}
