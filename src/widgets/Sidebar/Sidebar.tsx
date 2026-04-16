import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Flex } from '@/shared/ui'
import MenuBtnIcon from '@/shared/assets/menu-btn.svg?react'
import MenuBtnMobileIcon from '@/shared/assets/menu-btn-mobile.svg?react'
import CloseIcon from '@/shared/assets/x-icon.svg?react'

import styles from './Sidebar.module.css'

const navigationItems = ['ПАРКОВКА', 'СТРАХОВКА', 'БЕНЗИН', 'ОБСЛУЖИВАНИЕ']

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen((currentState) => !currentState)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <aside
      className={clsx(styles.sidebar, isOpen && styles.open)}
      aria-expanded={isOpen}
      aria-label="Sidebar navigation"
      onClick={handleClose}
    >
      <Flex className={styles.shell} onClick={(event) => event.stopPropagation()}>
        <Flex className={styles.rail} direction="column" align="center" justify="between">
          <button
            type="button"
            className={styles.toggleButton}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={handleToggle}
          >
            {isOpen ? (
              <CloseIcon className={styles.icon} />
            ) : (
              <>
                <MenuBtnIcon className={clsx(styles.icon, styles.desktopIcon)} />
                <MenuBtnMobileIcon className={clsx(styles.icon, styles.mobileIcon)} />
              </>
            )}
          </button>

          <button type="button" className={styles.langButton} aria-label="English">
            Eng
          </button>
        </Flex>

        <Flex className={styles.panel} align="center" aria-hidden={!isOpen}>
          <Flex className={styles.content} align="center">
            <nav className={styles.navigation} aria-label="Main menu">
              {navigationItems.map((item) => (
                <a key={item} className={styles.link} href="#">
                  {item}
                </a>
              ))}
            </nav>
          </Flex>
        </Flex>
      </Flex>
    </aside>
  )
}
