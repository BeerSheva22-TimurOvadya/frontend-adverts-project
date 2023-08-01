import { BaseProduct, ElectronicsTypes } from './Common';

export interface Electronics extends BaseProduct {
  category: 'Electronics';
  brand: string;
  model: string;
  specifications: string;
  type: typeof ElectronicsTypes[number];
}
