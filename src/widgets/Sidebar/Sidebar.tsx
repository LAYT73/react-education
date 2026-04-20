import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Flex } from '@/shared/ui'

import TelegramIcon from '@/shared/assets/icons/telegram.svg?react'
import FacebookIcon from '@/shared/assets/icons/facebook.svg?react'
import InstagramIcon from '@/shared/assets/icons/instagram.svg?react'

import styles from './Sidebar.module.css'
import { BurgerIcon } from './components/BurgerIcon'

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
            <BurgerIcon className={styles.icon} />
          </button>

          <button type="button" className={styles.langButton} aria-label="English">
            Eng
          </button>
        </Flex>

        <Flex className={styles.panel} align="center" aria-hidden={!isOpen}>
          <Flex className={styles.content} direction="column" justify="center">
            <Flex className={styles.navigationContainer}>
              <nav className={styles.navigation} aria-label="Main menu">
                {navigationItems.map((item) => (
                  <a key={item} className={styles.link} href="#">
                    {item}
                  </a>
                ))}
              </nav>
              <Flex className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Telegram">
                  <TelegramIcon className={styles.socialIcon} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <FacebookIcon className={styles.socialIcon} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <InstagramIcon className={styles.socialIcon} />
                </a>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </aside>
  )
}
