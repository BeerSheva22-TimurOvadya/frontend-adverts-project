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

async function fetchRequest(url: string, options: RequestInit): Promise<Response> {
    let responseText = '';
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const { statusText } = response;
            responseText = statusText;
            throw responseText;
        }
        return response;
    } catch (error: any) {
        throw responseText ? responseText : 'Server is unavailable. Repeat later on';
    }
}

async function fetchAllProducts(url: string): Promise<Product[]> {
    const response = await fetchRequest(url, {});
    return await response.json();
}

export default class ProductServiceRest implements ProductService {

    constructor(private url: string) {}

    getAllProducts(): Observable<Product[]> {
        let intervalId: any;
    return new Observable((subscriber) => {
        cache.reset();
        const subscriberNext = (url: string, subscriber: Subscriber<Product[]>) => {
            fetchAllProducts(url)
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
        const response = await fetchRequest(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        return await response.json();
    }

    async deleteProduct(productId: number): Promise<void> {
        await fetchRequest(`${this.url}/${productId}`, {
            method: 'DELETE',
        });
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        const response = await fetchRequest(`${this.url}/category/${category}`, {});
    return await response.json();
    }

    async getProductsByPrice(maxPrice: number): Promise<Product[]> {
        const response = await fetchRequest(`${this.url}/price?maxPrice=${maxPrice}`, {});
    return await response.json();
    }

    async editProduct(productId: number, product: Product): Promise<Product> {
        const response = await fetchRequest(`${this.url}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        return await response.json();
    }
}
