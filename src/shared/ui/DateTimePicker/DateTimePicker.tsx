import clsx from 'clsx'
import type { ReactNode } from 'react'

import { formatDateTimeForDisplay, formatDateTimeForInput } from '@/shared/utils'
import styles from './dateTimePicker.module.css'

interface DateTimePickerProps {
  value: string
  onChange: (nextValue: string) => void
  onClear?: () => void
  name?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  clearIcon?: ReactNode
  clearButtonLabel?: string
  showClearButton?: boolean
}

const DEFAULT_CLEAR_ICON = '\u00d7'

export const DateTimePicker = ({
  value,
  onChange,
  onClear,
  name,
  disabled = false,
  className,
  inputClassName,
  clearIcon,
  clearButtonLabel = 'Сбросить дату и время',
  showClearButton = true,
}: DateTimePickerProps) => {
  const hasValue = value.trim().length > 0
  const shouldShowClearButton = showClearButton && hasValue && !disabled
  const inputValue = formatDateTimeForInput(value)

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.field}>
        <input
          type="datetime-local"
          value={inputValue}
          onChange={(event) => onChange(formatDateTimeForDisplay(event.target.value))}
          name={name}
          disabled={disabled}
          className={clsx(styles.input, inputClassName)}
          step={60}
          aria-label="Дата и время"
        />

        {shouldShowClearButton && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={onClear}
            aria-label={clearButtonLabel}
          >
            {clearIcon ?? DEFAULT_CLEAR_ICON}
          </button>
        )}
      </div>
    </div>
  )
}
