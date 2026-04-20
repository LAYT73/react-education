import { Flex } from '@/shared/ui'
import styles from './Header.module.css'
import GeoIcon from '@/shared/assets/icons/location-icon.svg?react'

export const Header = () => {
  return (
    <Flex className={styles.container} justify="between" align="center" as="header">
      <h2 className={styles.logo}>Need for drive</h2>
      <Flex gap="sm" align="center">
        <GeoIcon className={styles.geoIcon} />
        <span className={styles.geoText}>Ульяновск</span>
      </Flex>
    </Flex>
  )
}
