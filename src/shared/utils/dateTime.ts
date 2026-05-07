export const formatDateTimeForInput = (value: string) => {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})\s(\d{2}):(\d{2})$/)

  if (!match) {
    return ''
  }

  const [, day, month, year, hours, minutes] = match

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const formatDateTimeForDisplay = (value: string) => {
  if (!value) {
    return ''
  }

  const [datePart, timePart] = value.split('T')

  if (!datePart || !timePart) {
    return ''
  }

  const [year, month, day] = datePart.split('-')

  if (!year || !month || !day) {
    return ''
  }

  return `${day}.${month}.${year} ${timePart}`
}

const parseDateTime = (value: string) => {
  const [datePart, timePart] = value.split(' ')

  if (!datePart || !timePart) {
    return null
  }

  const [day, month, year] = datePart.split('.')
  const [hours, minutes] = timePart.split(':')

  if (!day || !month || !year || !hours || !minutes) {
    return null
  }

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
  )
}

const formatDurationPart = (value: number, suffix: string) => {
  if (value <= 0) {
    return ''
  }

  return `${value}${suffix}`
}

export const formatDateTimeDuration = (startValue: string, endValue: string) => {
  const startDate = parseDateTime(startValue)
  const endDate = parseDateTime(endValue)

  if (!startDate || !endDate || endDate.getTime() <= startDate.getTime()) {
    return ''
  }

  const diffInMinutes = Math.floor((endDate.getTime() - startDate.getTime()) / 60000)
  const days = Math.floor(diffInMinutes / (24 * 60))
  const hours = Math.floor((diffInMinutes % (24 * 60)) / 60)
  const minutes = diffInMinutes % 60

  const parts = [
    formatDurationPart(days, 'д'),
    formatDurationPart(hours, 'ч'),
    formatDurationPart(minutes, 'м'),
  ].filter(Boolean)

  return parts.join(' ')
}

export const parseOrderDateTime = (value: string) => {
  const [datePart, timePart] = value.split(' ')

  if (!datePart || !timePart) {
    return null
  }

  const [day, month, year] = datePart.split('.')
  const [hours, minutes] = timePart.split(':')

  if (!day || !month || !year || !hours || !minutes) {
    return null
  }

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
  )
}
