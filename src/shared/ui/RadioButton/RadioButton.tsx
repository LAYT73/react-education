import clsx from 'clsx'
import styles from './radioButton.module.css'

interface RadioButtonProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  name?: string
  value?: string
  disabled?: boolean
  className?: string
}

export const RadioButton = ({
  label,
  checked,
  onChange,
  name,
  value,
  disabled = false,
  className,
}: RadioButtonProps) => {
  return (
    <label className={clsx(styles.container, className)}>
      <input
        type="radio"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        name={name}
        value={value}
        disabled={disabled}
        className={styles.input}
        aria-label={label}
      />
      <span className={clsx(styles.radio, { [styles.checked]: checked })} />
      <span className={clsx(styles.label, { [styles.labelActive]: checked })}>
        {label}
      </span>
    </label>
  )
}
