import { useMemo, useState } from 'react';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { ProductModal } from './components/ProductModal/ProductModal';
import { SearchInput } from './components/SearchInput/SearchInput';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';
import styles from './App.module.css';

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export default function App() {
  const { products, isLoading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      normalizeText(product.title).includes(normalizedQuery),
    );
  }, [products, searchQuery]);

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <header className={styles.hero}>
          <div>
            <h1 className={styles.title}>Каталог товаров</h1>
            <p className={styles.subtitle}>
              Загрузка товаров, фильтрация по названию
            </p>
          </div>

          <div className={styles.panel}>
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
            <p className={styles.counter}>
              Показано: <strong>{filteredProducts.length}</strong> из{' '}
              <strong>{products.length}</strong>
            </p>
          </div>
        </header>

        {isLoading && <p className={styles.state}>Загружаем товары...</p>}

        {!isLoading && error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && (
          <ProductGrid
            products={filteredProducts}
            onOpenProduct={(product) => setSelectedProduct(product)}
          />
        )}
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
