import clsx from 'clsx'
import styles from './carModelCard.module.css'

export type CarModelCardProps = {
  name: string
  priceFrom: number
  priceTo: number
  image: string
  selected?: boolean
  onClick: () => void
}

export const CarModelCard = ({
  name,
  priceFrom,
  priceTo,
  image,
  selected = false,
  onClick,
}: CarModelCardProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.card, {
        [styles.selected]: selected,
      })}
      data-selected={selected}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>
            {priceFrom.toLocaleString()} - {priceTo.toLocaleString()} ₽
          </p>
        </div>

        <div className={styles.imageWrap}>
          <img src={image} alt={name} className={styles.image} />
        </div>
      </div>
    </button>
  )
}
