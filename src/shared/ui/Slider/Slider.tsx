import { Button } from '@/shared/ui/Button'
import { SLIDER_SLIDES } from '@/shared/consts'
import LeftArrowIcon from '@/shared/assets/icons/slider/slider-left-arrow.svg?react'
import RightArrowIcon from '@/shared/assets/icons/slider/slider-right-arrow.svg?react'
import styles from './Slider.module.css'
import { useState } from 'react'

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(SLIDER_SLIDES[0])

  const handleNextSlide = () => {
    const currentIndex = SLIDER_SLIDES.findIndex((slide) => slide.id === currentSlide.id)
    const nextIndex = (currentIndex + 1) % SLIDER_SLIDES.length
    setCurrentSlide(SLIDER_SLIDES[nextIndex])
  }

  const handlePrevSlide = () => {
    const currentIndex = SLIDER_SLIDES.findIndex((slide) => slide.id === currentSlide.id)
    const prevIndex = (currentIndex - 1 + SLIDER_SLIDES.length) % SLIDER_SLIDES.length
    setCurrentSlide(SLIDER_SLIDES[prevIndex])
  }

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

      <button
        className={styles.arrowButton}
        aria-label="Previous slide"
        onClick={handlePrevSlide}
      >
        <LeftArrowIcon className={styles.arrowIcon} />
      </button>

      <button
        className={styles.arrowButton}
        aria-label="Next slide"
        onClick={handleNextSlide}
      >
        <RightArrowIcon className={styles.arrowIcon} />
      </button>

      <div className={styles.indicators}>
        {SLIDER_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            className={styles.indicator}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={
              index === SLIDER_SLIDES.findIndex((s) => s.id === currentSlide.id)
                ? 'true'
                : 'false'
            }
          />
        ))}
      </div>
    </div>
  )
}
