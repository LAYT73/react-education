import { Button, Flex } from '@/shared/ui'
import { motion, useReducedMotion } from 'motion/react'
import styles from './HomePage.module.css'
import GeoIcon from '@/shared/assets/location-icon.svg?react'

export const HomePage = () => {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const fadeDown = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -18 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const staggerParent = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.11,
      },
    },
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Flex className={styles.wrapper}>
        <motion.div
          className={styles.main}
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeDown} transition={{ duration: 0.35 }}>
            <Flex justify="between" align="center" as="header">
              <h2 className={styles.logo}>Need for drive</h2>
              <Flex gap="sm" align="center">
                <GeoIcon className={styles.geoIcon} />
                <span className={styles.geoText}>Ульяновск</span>
              </Flex>
            </Flex>
          </motion.div>

          <Flex direction="column" justify="center" className={styles.content}>
            <motion.h1
              className={styles.title}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: 0.5 }}
            >
              Каршеринг <br /> <span className={styles.titleLogo}>Need for drive</span>
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: 0.9 }}
            >
              Поминутная аренда авто твоего города
            </motion.p>
            <motion.div transition={{ duration: 0.55, delay: 1.3 }} variants={fadeUp}>
              <Button className={styles.button} variant="primary" width="large">
                Забронировать
              </Button>
            </motion.div>
          </Flex>

          <Flex as="footer" align="center" justify="between" className={styles.footer}>
            <span className={styles.footerText}>© 2016-2019 «Need for drive»</span>
            <a href="tel:84952342244" className={styles.footerLink}>
              8 (495) 234-22-44
            </a>
          </Flex>
        </motion.div>
      </Flex>
    </motion.div>
  )
}
