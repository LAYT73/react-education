import { Flex } from '@/shared/ui'
import styles from './footer.module.css'

export const Footer = () => {
  return (
    <Flex as="footer" align="center" justify="between" className={styles.footer}>
      <span className={styles.footerText}>© 2016-2019 «Need for drive»</span>
      <a href="tel:84952342244" className={styles.footerLink}>
        8 (495) 234-22-44
      </a>
    </Flex>
  )
}
