import AdvertService from '../service/AdvertService';
import AdvertServiceRest from '../service/AdvertServiceRest';

export const advertService: AdvertService = new AdvertServiceRest('http://localhost:8080/adverts');
