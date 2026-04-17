import { Button } from '@/shared/ui'
import { SLIDER_SLIDES } from '@/shared/consts'
import LeftArrowIcon from '@/shared/assets/icons/slider/slider-left-arrow.svg?react'
import RightArrowIcon from '@/shared/assets/icons/slider/slider-right-arrow.svg?react'
import styles from './Slider.module.css'

export const Slider = () => {
  const currentSlide = SLIDER_SLIDES[0]

  return (
    <div className={styles.slider}>
      <div
        className={styles.track}
        style={{
          backgroundImage: `url(${currentSlide.image})`,
        }}
      >
        <div className={styles.overlay} />

        <div className={styles.content}>
          <h2 className={styles.title}>{currentSlide.title}</h2>
          <p className={styles.description}>{currentSlide.description}</p>
          <Button
            className={styles.button}
            variant={currentSlide.buttonVariant}
            width="small"
          >
            Подробнее
          </Button>
        </div>
      </div>

      <button className={styles.arrowButton} aria-label="Previous slide">
        <LeftArrowIcon className={styles.arrowIcon} />
      </button>

      <button className={styles.arrowButton} aria-label="Next slide">
        <RightArrowIcon className={styles.arrowIcon} />
      </button>

      <div className={styles.indicators}>
        {SLIDER_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            className={styles.indicator}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === 0 ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  )
}
