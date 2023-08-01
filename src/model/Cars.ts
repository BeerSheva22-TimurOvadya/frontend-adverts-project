import { BaseProduct } from './Common';

export interface Car extends BaseProduct {
  category: 'Cars';
  brand: string;
  releaseYear: number;
  mileage: number;
  enginePower: number;
}
