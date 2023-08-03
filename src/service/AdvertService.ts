import { Observable } from 'rxjs';
import Advert from '../model/Advert';

export const fetchAdverts = (): Observable<Advert[]> => {
    return new Observable((subscriber) => {
        fetch('http://localhost:8080/adverts')
            .then((response) => response.json())
            .then((adverts) => {
                subscriber.next(adverts);
                subscriber.complete();
            })
            .catch((error) => subscriber.error(error));
    });
};

export const addAdvert = async (advert: Advert): Promise<Advert> => {
    const response = await fetch('http://localhost:8080/adverts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(advert),
    });
    return await response.json();
};

export const deleteAdvert = async (advertId: number): Promise<void> => {
    await fetch(`http://localhost:8080/adverts/${advertId}`, {
        method: 'DELETE',
    });
};

export const getAdvertsByCategory = async (category: string): Promise<Advert[]> => {
    const response = await fetch(`http://localhost:8080/adverts/category/${category}`);
    return await response.json();
};

export const getAdvertsByPrice = async (maxPrice: number): Promise<Advert[]> => {
    const response = await fetch(`http://localhost:8080/adverts/price?maxPrice=${maxPrice}`);
    return await response.json();
};

export const editAdvert = async (advertId: number, advert: Advert): Promise<Advert> => {
    const response = await fetch(`http://localhost:8080/adverts/${advertId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(advert),
    });
    return await response.json();
};
