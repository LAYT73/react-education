import clsx from 'clsx'
import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'

import styles from './InputSearch.module.css'

export type InputSearchOption = {
  id: string | number
  label: string
}

type InputSearchProps = {
  value: string
  onChange: (nextValue: string) => void
  options?: InputSearchOption[]
  isDropdownOpen?: boolean
  onOptionSelect?: (option: InputSearchOption) => void
  onClear?: () => void
  placeholder?: string
  name?: string
  autoComplete?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  dropdownClassName?: string
  optionClassName?: string
  clearIcon?: ReactNode
  clearButtonLabel?: string
  showClearButton?: boolean
}

const DEFAULT_CLEAR_ICON = '\u00d7'

export const InputSearch = ({
  value,
  onChange,
  options = [],
  isDropdownOpen = false,
  onOptionSelect,
  onClear,
  placeholder = 'Поиск',
  name,
  autoComplete = 'off',
  disabled = false,
  className,
  inputClassName,
  dropdownClassName,
  optionClassName,
  clearIcon,
  clearButtonLabel = 'Сбросить поиск',
  showClearButton = true,
}: InputSearchProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const hasValue = value.trim().length > 0
  const shouldShowClearButton = showClearButton && hasValue && !disabled
  const shouldShowDropdown = isDropdownOpen && isInputFocused && options.length > 0

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleClear = () => {
    onClear?.()
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.field}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          disabled={disabled}
          className={clsx(styles.input, inputClassName)}
        />

        {shouldShowClearButton && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label={clearButtonLabel}
          >
            {clearIcon ?? DEFAULT_CLEAR_ICON}
          </button>
        )}
      </div>

      {shouldShowDropdown && (
        <ul className={clsx(styles.dropdown, dropdownClassName)} role="listbox">
          {options.map((option) => (
            <li key={option.id} role="option" aria-selected={false}>
              <button
                type="button"
                className={clsx(styles.optionButton, optionClassName)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onOptionSelect?.(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
