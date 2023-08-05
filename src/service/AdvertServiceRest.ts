import { Observable, Subscriber } from 'rxjs';
import Advert from '../model/Advert';
import AdvertService from './AdvertService';

const POLLER_INTERVAL = 3000;

class Cache {
    cacheString: string = '';
    set(adverts: Advert[]): void {
        this.cacheString = JSON.stringify(adverts);
    }
    reset() {
        this.cacheString = '';
    }
    isEqual(adverts: Advert[]): boolean {
        return this.cacheString === JSON.stringify(adverts);
    }
    getCache(): Advert[] {
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

export default class AdvertServiceRest implements AdvertService {
    constructor(private url: string) {}

    getAllAdverts(): Observable<Advert[]> {
        return new Observable((subscriber) => {
            let intervalId: any;
            cache.reset();
            const subscriberNext = (url: string, subscriber: Subscriber<Advert[]>) => {
                fetchRequestJson(url)
                    .then((adverts) => {
                        if (cache.isEmpty() || !cache.isEqual(adverts)) {
                            cache.set(adverts);
                            subscriber.next(adverts);
                        }
                    })
                    .catch((error) => subscriber.error(error));
            };
            subscriberNext(this.url, subscriber);
            intervalId = setInterval(() => subscriberNext(this.url, subscriber), POLLER_INTERVAL);
            return () => clearInterval(intervalId);
        });
    }

    async addAdvert(advert: Advert): Promise<Advert> {
        return fetchRequestJson(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(advert),
        });
    }

    async deleteAdvert(advertId: number): Promise<void> {
        await fetchRequestJson(`${this.url}/${advertId}`, { method: 'DELETE' });
    }

    async getAdvertsByCategory(category: string): Promise<Advert[]> {
        return fetchRequestJson(`${this.url}/category/${category}`);
    }

    async getAdvertsByPrice(maxPrice: number): Promise<Advert[]> {
        return fetchRequestJson(`${this.url}/price?maxPrice=${maxPrice}`);
    }

    async editAdvert(advertId: number, advert: Advert): Promise<Advert> {
        return fetchRequestJson(`${this.url}/${advertId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(advert),
        });
    }
}
