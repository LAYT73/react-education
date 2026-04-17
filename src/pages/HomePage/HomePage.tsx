import { Button, Flex, Slider } from '@/shared/ui'
import { motion } from 'motion/react'
import styles from './HomePage.module.css'
import { usePageAnimations } from '@/shared/libs'
import { Footer, Header } from '@/widgets'

export const HomePage = () => {
  const { fadeUp, fadeDown, staggerParent, pageInitial, pageTransition } =
    usePageAnimations()

  return (
    <motion.div
      className={styles.page}
      initial={pageInitial.hidden}
      animate={pageInitial.visible}
      transition={pageTransition}
    >
      <Flex className={styles.wrapper}>
        <motion.div
          className={styles.main}
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeDown} transition={{ duration: 0.35 }}>
            <Header />
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

          <Footer />
        </motion.div>

        <div className={styles.sliderSection}>
          <Slider />
        </div>
      </Flex>
    </motion.div>
  )
}
