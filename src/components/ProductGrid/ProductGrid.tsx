import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
}

export function ProductGrid({ products, onOpenProduct }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>Ничего не найдено</h2>
        <p className={styles.emptyDescription}>
          Попробуй изменить запрос — возможно, товар называется немного иначе.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
      ))}
    </div>
  );
}
