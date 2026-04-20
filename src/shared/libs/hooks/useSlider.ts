import { useCallback, useEffect, useRef, useState } from 'react'

type UseSliderParams = {
  slidesCount: number
  autoPlayIntervalMs: number
  autoPlayResumeDelayMs: number
}

const normalizeSlideIndex = (index: number, slidesCount: number) => {
  return ((index % slidesCount) + slidesCount) % slidesCount
}

export const useSlider = ({
  slidesCount,
  autoPlayIntervalMs,
  autoPlayResumeDelayMs,
}: UseSliderParams) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current === null) {
      return
    }

    clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = null
  }, [])

  const scheduleAutoPlayResume = useCallback(() => {
    clearResumeTimeout()

    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlayEnabled(true)
    }, autoPlayResumeDelayMs)
  }, [autoPlayResumeDelayMs, clearResumeTimeout])

  const runManualInteraction = useCallback(() => {
    setIsAutoPlayEnabled(false)
    scheduleAutoPlayResume()
  }, [scheduleAutoPlayResume])

  const goToSlide = useCallback(
    (index: number) => {
      if (slidesCount === 0) {
        return
      }

      runManualInteraction()
      setCurrentSlideIndex(normalizeSlideIndex(index, slidesCount))
    },
    [slidesCount, runManualInteraction],
  )

  const goToNextSlide = useCallback(() => {
    if (slidesCount === 0) {
      return
    }

    runManualInteraction()
    setCurrentSlideIndex((prevIndex) => normalizeSlideIndex(prevIndex + 1, slidesCount))
  }, [slidesCount, runManualInteraction])

  const goToPrevSlide = useCallback(() => {
    if (slidesCount === 0) {
      return
    }

    runManualInteraction()
    setCurrentSlideIndex((prevIndex) => normalizeSlideIndex(prevIndex - 1, slidesCount))
  }, [slidesCount, runManualInteraction])

  const normalizedSlideIndex =
    slidesCount === 0 ? 0 : normalizeSlideIndex(currentSlideIndex, slidesCount)

  useEffect(() => {
    if (!isAutoPlayEnabled || slidesCount === 0) {
      return
    }

    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => normalizeSlideIndex(prevIndex + 1, slidesCount))
    }, autoPlayIntervalMs)

    return () => {
      clearInterval(intervalId)
    }
  }, [autoPlayIntervalMs, isAutoPlayEnabled, slidesCount])

  useEffect(() => {
    return () => {
      clearResumeTimeout()
    }
  }, [clearResumeTimeout])

  return {
    currentSlideIndex: normalizedSlideIndex,
    goToNextSlide,
    goToPrevSlide,
    goToSlide,
  }
}
