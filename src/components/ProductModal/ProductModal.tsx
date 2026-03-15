import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import { Modal } from '../Modal/Modal';
import styles from './ProductModal.module.css';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.title}>
      <div className={styles.layout}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={product.image} alt={product.title} />
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <button type="button" className={styles.buyButton}>
            Купить
          </button>
        </div>
      </div>
    </Modal>
  );
}
