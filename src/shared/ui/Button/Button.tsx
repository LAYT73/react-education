import clsx from 'clsx'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'green' | 'cian' | 'orange' | 'purple'
type ButtonWidth = 'small' | 'large'

interface ButtonProps {
  variant?: ButtonVariant
  width?: ButtonWidth
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export function Button({
  variant = 'primary',
  width = 'large',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
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
      <span className={styles.content}>{children}</span>
    </button>
  )
}
