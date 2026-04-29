import clsx from 'clsx'
import CheckMarkIcon from '@/shared/assets/icons/checkbox-mark.svg?react'
import styles from './checkbox.module.css'

interface CheckboxProps {
  text: string
  value: string
  checked: boolean
  onChange: (checked: boolean) => void
  name?: string
  disabled?: boolean
  className?: string
}

export const Checkbox = ({
  text,
  value,
  checked,
  onChange,
  name,
  disabled = false,
  className,
}: CheckboxProps) => {
  return (
    <label className={clsx(styles.container, className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        name={name}
        value={value}
        disabled={disabled}
        className={styles.input}
        aria-label={text}
      />
      <span className={clsx(styles.box, { [styles.checked]: checked })}>
        {checked && <CheckMarkIcon className={styles.mark} aria-hidden="true" />}
      </span>
      <span className={clsx(styles.text, { [styles.textActive]: checked })}>{text}</span>
    </label>
  )
}
