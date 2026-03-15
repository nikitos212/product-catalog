import { useEffect, useState } from "react";
import {getProducts} from '../api/productsApi'
import type { Product } from '../types/product';

interface UseProductsResult {
    products: Product[];
    isLoading: boolean;
    error: string | null;
}

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        getProducts(controller.signal)
            .then(setProducts)
            .catch((error: unknown) => {
                if (controller.signal.aborted) return;

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Неизвестная ошибка.')
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
            );

        return () => {
            controller.abort();
        }    
    }, []);

    return {products, isLoading, error};
}