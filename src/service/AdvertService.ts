import { Observable } from 'rxjs';
import Advert from '../model/Advert';

export default interface AdvertService {
    getAllAdverts(): Observable<Advert[]>;
    addAdvert(advert: Advert): Promise<Advert>;
    deleteAdvert(advertId: number): Promise<void>;
    getAdvertsByCategory(category: string): Promise<Advert[]>;
    getAdvertsByPrice(maxPrice: number): Promise<Advert[]>;
    editAdvert(advertId: number, advert: Advert): Promise<Advert>;
}
