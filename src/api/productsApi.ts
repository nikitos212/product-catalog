import type { Product } from '../types/product';

const PRODUCT_URL = '/api/product.json';

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
    const response = await fetch (PRODUCT_URL, {signal});

    if(!response.ok) {
        throw new Error('Не удалось загрузить товары. Попробуйте обновить страницу.');
    }

    return response.json() as Promise<Product[]>;
}