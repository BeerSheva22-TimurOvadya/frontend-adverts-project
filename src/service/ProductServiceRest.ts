import { Observable, Subscriber } from 'rxjs';
import Product from '../model/Product';
import ProductService from './ProductService';

const POLLER_INTERVAL = 5000;

class Cache {
    cacheString: string = '';
    set(products: Product[]): void {
        this.cacheString = JSON.stringify(products);
    }
    reset() {
        this.cacheString = '';
    }
    isEqual(products: Product[]): boolean {
        return this.cacheString === JSON.stringify(products);
    }
    getCache(): Product[] {
        return !this.isEmpty() ? JSON.parse(this.cacheString) : [];
    }
    isEmpty(): boolean {
        return this.cacheString.length === 0;
    }
}

const cache = new Cache();

async function fetchRequestJson(url: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw response.statusText || 'Server is unavailable. Repeat later on';
    }
    return await response.json();
}

export default class ProductServiceRest implements ProductService {
    constructor(private url: string) {}

    getAllProducts(): Observable<Product[]> {
        return new Observable((subscriber) => {
            let intervalId: any;
            cache.reset();
            const subscriberNext = (url: string, subscriber: Subscriber<Product[]>) => {
                fetchRequestJson(url)
                    .then((products) => {
                        if (cache.isEmpty() || !cache.isEqual(products)) {
                            cache.set(products);
                            subscriber.next(products);
                        }
                    })
                    .catch((error) => subscriber.error(error));
            };
            subscriberNext(this.url, subscriber);
            intervalId = setInterval(() => subscriberNext(this.url, subscriber), POLLER_INTERVAL);
            return () => clearInterval(intervalId);
        });
    }

    async addProduct(product: Product): Promise<Product> {
        return fetchRequestJson(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
    }

    async deleteProduct(productId: number): Promise<void> {
        await fetchRequestJson(`${this.url}/${productId}`, { method: 'DELETE' });
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        return fetchRequestJson(`${this.url}/category/${category}`);
    }

    async getProductsByPrice(maxPrice: number): Promise<Product[]> {
        return fetchRequestJson(`${this.url}/price?maxPrice=${maxPrice}`);
    }

    async editProduct(productId: number, product: Product): Promise<Product> {
        return fetchRequestJson(`${this.url}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
    }
}
