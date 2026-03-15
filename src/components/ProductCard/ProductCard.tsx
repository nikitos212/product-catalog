import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onOpen(product)}
      aria-label={`Открыть карточку товара ${product.title}`}
    >
      <span className={styles.imageWrapper}>
        <img className={styles.image} src={product.image} alt={product.title} />
      </span>

      <span className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.title}>{product.title}</span>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </span>
    </button>
  );
}
