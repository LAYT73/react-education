import { Button } from '@/shared/ui/Button'
import {
  SLIDER_AUTO_PLAY_INTERVAL_MS,
  SLIDER_AUTO_PLAY_RESUME_DELAY_MS,
  SLIDER_CONTENT_TRANSITION_SECONDS,
  SLIDER_IMAGE_TRANSITION_SECONDS,
  SLIDER_SLIDES,
} from '@/shared/consts'
import LeftArrowIcon from '@/shared/assets/icons/slider/slider-left-arrow.svg?react'
import RightArrowIcon from '@/shared/assets/icons/slider/slider-right-arrow.svg?react'
import { useSlider } from '@/shared/libs'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import styles from './slider.module.css'

export const Slider = () => {
  const slidesCount = SLIDER_SLIDES.length
  const shouldReduceMotion = useReducedMotion()
  const { currentSlideIndex, goToNextSlide, goToPrevSlide, goToSlide } = useSlider({
    slidesCount,
    autoPlayIntervalMs: SLIDER_AUTO_PLAY_INTERVAL_MS,
    autoPlayResumeDelayMs: SLIDER_AUTO_PLAY_RESUME_DELAY_MS,
  })

  const currentSlide = SLIDER_SLIDES[currentSlideIndex]

  if (!currentSlide) {
    return null
  }

  return (
    <div className={styles.slider} data-slide-variant={currentSlide.buttonVariant}>
      <div className={styles.track}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide.id}
            className={styles.slideLayer}
            style={{
              backgroundImage: `url(${currentSlide.image})`,
            }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
            transition={{
              duration: shouldReduceMotion ? 0 : SLIDER_IMAGE_TRANSITION_SECONDS,
              ease: 'easeInOut',
            }}
          />
        </AnimatePresence>

        <div className={styles.overlay} />

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`content-${currentSlide.id}`}
            className={styles.content}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{
              duration: shouldReduceMotion ? 0 : SLIDER_CONTENT_TRANSITION_SECONDS,
              ease: 'easeOut',
            }}
          >
            <h2 className={styles.title}>{currentSlide.title}</h2>
            <p className={styles.description}>{currentSlide.description}</p>
            <Button
              className={styles.button}
              variant={currentSlide.buttonVariant}
              width="small"
            >
              Подробнее
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        className={styles.arrowButton}
        aria-label="Previous slide"
        onClick={goToPrevSlide}
      >
        <LeftArrowIcon className={styles.arrowIcon} />
      </Button>

      <Button
        className={styles.arrowButton}
        aria-label="Next slide"
        onClick={goToNextSlide}
      >
        <RightArrowIcon className={styles.arrowIcon} />
      </Button>

      <div className={styles.indicators}>
        {SLIDER_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            className={styles.indicator}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlideIndex ? 'true' : 'false'}
            type="button"
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
