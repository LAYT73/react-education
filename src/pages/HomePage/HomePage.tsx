import { Button, Flex } from '@/shared/ui'
import styles from './HomePage.module.css'
import GeoIcon from '@/shared/assets/location-icon.svg?react'

export const HomePage = () => {
  return (
    <Flex className={styles.wrapper}>
      <div className={styles.main}>
        <Flex justify="between" align="center" as="header">
          <h2 className={styles.logo}>Need for drive</h2>
          <Flex gap="sm" align="center">
            <GeoIcon className={styles.geoIcon} />
            <span className={styles.geoText}>Ульяновск</span>
          </Flex>
        </Flex>
        <Flex direction="column" justify="center" className={styles.content}>
          <h1 className={styles.title}>
            Каршеринг <br /> <span className={styles.titleLogo}>Need for drive</span>
          </h1>
          <p className={styles.subtitle}>Поминутная аренда авто твоего города</p>
          <Button className={styles.button} variant="primary" width="large">
            Забронировать
          </Button>
        </Flex>
        <Flex as="footer" align="center" justify="between" className={styles.footer}>
          <span className={styles.footerText}>© 2016-2019 «Need for drive»</span>
          <a href="tel:84952342244" className={styles.footerLink}>
            8 (495) 234-22-44
          </a>
        </Flex>
      </div>
      <div>123</div>
    </Flex>
  )
}
